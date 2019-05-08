import axios from 'axios';
import { getToken } from '../utils';
import config from '../config';

const generateTraderQuery = () => 'SELECT DISTINCT UserID as label, UserID as value FROM BuySell';
const generateBrandNameQuery = () => 'SELECT DISTINCT v.CompanyNm as label, v.CpID as value FROM BuySell AS b INNER JOIN Counterparty AS v ON b.VendorID = v.CpID';
const generateClientNameQuery = () => 'SELECT DISTINCT c.CompanyNm as label, c.CpID as value FROM BuySell AS b INNER JOIN Counterparty AS c ON b.CustID = c.CpID';
const generateProductTypeQuery = () => 'SELECT DISTINCT TradeType as ProductType FROM BuySell';
const generateDestinationationCountry = () => 'SELECT DISTINCT ShipToID FROM BuySell';
const generateCustomerInfoQuery = customer => `SELECT c.PhoneBusiness, c.PhoneMobile, c.Email, c.CompanyNm, c.ContactNm, c2.Role, SUM(w.SWeight) as TotalQty, SUM(w.SAmount) as TotalSale, a.Addr1, a.Addr2, a.Addr3 FROM (SELECT * FROM Contact WHERE CpID='${customer}') as c INNER JOIN Counterparty as c2 ON c2.CpID = c.CpID INNER JOIN BuySell as b ON b.CustID = c.CpID INNER JOIN WksDetail AS w ON w.BuySellNo = b.BuySellNo INNER JOIN Address AS a ON a.CpID = c.CpID GROUP BY c.PhoneBusiness, c.PhoneMobile, c.Email, c.CompanyNm, c.ContactNm, w.SWeight, c2.Role, a.Addr1, a.Addr2, a.Addr3`;
const generateCustomerProductTypesQuery = customer => `SELECT DISTINCT b.TradeType as ProductType FROM (SELECT * FROM Contact WHERE CpID='${customer}') as c INNER JOIN BuySell as b ON b.CustID = c.CpID`;
const generateCustomerLastPurchaseQuery = customer => `SELECT TOP 1 b.OrderDt FROM (SELECT CpID FROM CounterParty WHERE CpID='${customer}') AS c INNER JOIN BuySell AS b ON c.CpID = b.CustID`;

export const generateInvoicesQuery = (
    isAdmin,
    isCount,
    isPaged,
    userId,
    invoiceType,
    page,
    pageSize,
    brand,
    valueLow,
    valueHigh,
    quantityLow,
    quantityHigh,
    customer,
    invoiceNumber,
    poNumber,
    soNumber,
    productType,
    destinationCountry,
    orderDateFrom,
    orderDateTo,
    dueDateFrom,
    dueDateTo
) => {
    const adminAgregators = [{ field: 'SUM(w.PAmount)', label: 'TotalBuy' }];
    const adminFields = [{ field: 'w.PCurrencyCd', label: 'CurrencyBuy' }, { field: 'w.PPrice', label: 'PriceBuy' }, { field: 'w.PUOM', label: 'PriceUomBuy' }];
    const queryAgregators = [...(isAdmin ? adminAgregators : []), { field: 'SUM(w.SWeight)', label: 'Qty' }, { field: 'SUM(w.SAmount)', label: 'TotalSale' }];
    const queryFields = [...(isAdmin ? adminFields : []), { field: 'b.InvoiceDt', label: 'InvoiceDate' }, { field: 'b.ShipFromID', label: 'ShipFromID' }, { field: 'b.ShippingDt', label: 'ShippingDate' }, { field: 'b.CompletedDt', label: 'CompletedDate' }, { field: 'b.BuySellNo', label: 'InvoiceNo' }, { field: 'p.ReferrerNo', label: 'SalesRep' }, { field: 'c.CompanyNm', label: 'Client' }, { field: 'b.OrderDt', label: 'OrderDate' }, { field: 'b.TradeType', label: 'ProductType' }, { field: 'v.CompanyNm', label: 'Supplier' }, { field: 'w.SWeightUOM', label: 'QtyUom' }, { field: 'w.SPrice', label: 'PriceSale' }, { field: 'w.SPriceUOM', label: 'PriceUomSale' }, { field: 'w.SCurrencyCd', label: 'CurrencySale' }, { field: 'b.DueDt', label: 'DueDate' }, { field: 'b.AltCoEmail', label: 'ContactPoint' }];
    const buySellFilters = [`UserID LIKE '${userId || '%'}'`, `VendorID LIKE '${brand || '%'}'`, `CustID LIKE '${customer || '%'}'`, `BuySellNo LIKE '${invoiceNumber || '%'}'`, `RefPONo LIKE '${poNumber || '%'}'`, `RefSONo LIKE '${soNumber || '%'}'`, `TradeType LIKE '${productType || '%'}'`, `ShipToID LIKE '${destinationCountry || '%'}'`, `OrderDt >= '${orderDateFrom || '01/01/1970'}'`, `OrderDt ${orderDateTo ? `<= '${orderDateTo}'` : '> \'01/01/1970\''}`, `DueDt >= '${dueDateFrom || '01/01/1970'}'`, `DueDt ${dueDateTo ? `<= '${dueDateTo}'` : '> \'01/01/1970\''}`, ['0', '1'].includes(invoiceType) ? `Completed = ${invoiceType}` : '(Completed = 1 OR Completed = 0)'];
    const havingFilters = [`SUM(w.SAmount) >= ${valueLow || 0}`, valueHigh ? `SUM(w.SAmount) <= ${valueHigh}` : 'SUM(w.SAmount) >= 0', `SUM(w.SWeight) >= ${quantityLow || 0}`, quantityHigh ? `SUM(w.SWeight) <= ${quantityHigh}` : 'SUM(w.SWeight) >= 0'];
    const serializeFilters = (type, filters) => filters.length > 0 ? ` ${type} ${filters.join(' AND ')}` : '';
    const serializeFields = fields => fields.length > 0 ? fields.map(f => f.field).join(', ') : '*';
    const serializeFieldsWithLabel = fields => fields.length > 0 ? fields.map(f => `${f.field} as ${f.label}`).join(', ') : '*';
    const generateQuery = () => `SELECT ${serializeFieldsWithLabel([...queryFields, ...queryAgregators])} FROM  (SELECT * FROM BuySell${serializeFilters('WHERE', buySellFilters)}) AS b INNER JOIN Counterparty AS c ON b.CustID = c.CpID INNER JOIN Counterparty AS v ON b.VendorID = v.CpID INNER JOIN WksDetail AS w ON w.BuySellNo = b.BuySellNo LEFT JOIN POSalesReps AS p ON CONVERT(VARCHAR(24), p.POID) = b.BuySellNo GROUP BY ${serializeFields(queryFields)}${serializeFilters('HAVING', havingFilters)}${isCount ? '' : ` ORDER BY OrderDate DESC${(isPaged ? ` OFFSET ${((page - 1) * pageSize) || 0} ROWS FETCH NEXT ${pageSize || 0} ROWS ONLY` : '')}`}`;
    return isCount ? `SELECT COUNT(*) AS count FROM (${generateQuery()}) AS Invoices` : generateQuery();
};

export const generatePOQuery = userId => `SELECT * FROM (SELECT * FROM PO WHERE UserID='${userId}') as p LEFT JOIN BuySell as b ON b.RefPONo = p.PONumber;`;

export const getInvoices = ({
    isAdmin,
    isCount,
    isPaged = true,
    userId,
    invoiceType,
    page,
    pageSize,
    brand,
    valueLow,
    valueHigh,
    quantityLow,
    quantityHigh,
    customer,
    invoiceNumber,
    poNumber,
    soNumber,
    productType,
    destinationCountry,
    orderDateFrom,
    orderDateTo,
    dueDateFrom,
    dueDateTo
}) => axios.post(`${config.url}/api/sql`, { query: generateInvoicesQuery(isAdmin, isCount, isPaged, userId, invoiceType, page, pageSize, brand, valueLow, valueHigh, quantityLow, quantityHigh, customer, invoiceNumber, poNumber, soNumber, productType, destinationCountry, orderDateFrom, orderDateTo, dueDateFrom, dueDateTo) }, { headers: { authorization: `Bearer ${getToken()}` } });

export const getTraders = () => axios.post(`${config.url}/api/sql`, { query: generateTraderQuery() }, { headers: { authorization: `Bearer ${getToken()}` } });
export const getBrands = () => axios.post(`${config.url}/api/sql`, { query: generateBrandNameQuery() }, { headers: { authorization: `Bearer ${getToken()}` } });
export const getCustomers = () => axios.post(`${config.url}/api/sql`, { query: generateClientNameQuery() }, { headers: { authorization: `Bearer ${getToken()}` } });
export const getProductTypes = () => axios.post(`${config.url}/api/sql`, { query: generateProductTypeQuery() }, { headers: { authorization: `Bearer ${getToken()}` } });
export const getDestinationCountries = () => axios.post(`${config.url}/api/sql`, { query: generateDestinationationCountry() }, { headers: { authorization: `Bearer ${getToken()}` } });
export const getCustomerInfo = customer => axios.post(`${config.url}/api/sql`, { query: generateCustomerInfoQuery(customer) }, { headers: { authorization: `Bearer ${getToken()}` } });
export const getCustomerProductTypes = customer => axios.post(`${config.url}/api/sql`, { query: generateCustomerProductTypesQuery(customer) }, { headers: { authorization: `Bearer ${getToken()}` } });
export const getCustomerLastPurchase = customer => axios.post(`${config.url}/api/sql`, { query: generateCustomerLastPurchaseQuery(customer) }, { headers: { authorization: `Bearer ${getToken()}` } });
