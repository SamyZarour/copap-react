import axios from 'axios';
import { getToken } from '../utils';
import config from '../config';

const generateBrandNameQuery = () => 'SELECT DISTINCT v.CompanyNm as label, v.CpID as value FROM BuySell AS b INNER JOIN Counterparty AS v ON b.VendorID = v.CpID';
const generateClientNameQuery = () => 'SELECT DISTINCT c.CompanyNm as label, c.CpID as value FROM BuySell AS b INNER JOIN Counterparty AS c ON b.CustID = c.CpID';
const generateProductTypeQuery = () => 'SELECT DISTINCT TradeType as ProductType FROM BuySell';
const generateDestinationationCountry = () => 'SELECT DISTINCT ShipToID FROM BuySell';
export const generateInvoicesQuery = (
    isAdmin,
    isCount,
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
    const queryFields = [...(isAdmin ? adminFields : []), { field: 'b.BuySellNo', label: 'InvoiceNo' }, { field: 'b.UserID', label: 'SalesRep' }, { field: 'c.CompanyNm', label: 'Client' }, { field: 'b.OrderDt', label: 'OrderDate' }, { field: 'b.TradeType', label: 'ProductType' }, { field: 'v.CompanyNm', label: 'Supplier' }, { field: 'w.SWeightUOM', label: 'QtyUom' }, { field: 'w.SPrice', label: 'PriceSale' }, { field: 'w.SPriceUOM', label: 'PriceUomSale' }, { field: 'w.SCurrencyCd', label: 'CurrencySale' }, { field: 'b.DueDt', label: 'DueDate' }, { field: 'b.Commission1', label: 'Commission' }, { field: 'b.AltCoEmail', label: 'ContactPoint' }];
    const buySellFilters = [`VendorID LIKE '${brand || '%'}'`, `CustID LIKE '${customer || '%'}'`, `BuySellNo LIKE '${invoiceNumber || '%'}'`, `RefPONo LIKE '${poNumber || '%'}'`, `RefSONo LIKE '${soNumber || '%'}'`, `TradeType LIKE '${productType || '%'}'`, `ShipToID LIKE '${destinationCountry || '%'}'`, `OrderDt >= '${orderDateFrom || '01/01/1970'}'`, `OrderDt ${orderDateTo ? `<= '${orderDateTo}'` : '> \'01/01/1970\''}`, `DueDt >= '${dueDateFrom || '01/01/1970'}'`, `DueDt ${dueDateTo ? `<= '${dueDateTo}'` : '> \'01/01/1970\''}`];
    const havingFilters = [`SUM(w.SAmount) >= ${valueLow || 0}`, valueHigh ? `SUM(w.SAmount) <= ${valueHigh}` : 'SUM(w.SAmount) >= 0', `SUM(w.SWeight) >= ${quantityLow || 0}`, quantityHigh ? `SUM(w.SWeight) <= ${quantityHigh}` : 'SUM(w.SWeight) >= 0'];
    const serializeFilters = (type, filters) => filters.length > 0 ? ` ${type} ${filters.join(' AND ')}` : '';
    const serializeFields = fields => fields.length > 0 ? fields.map(f => f.field).join(', ') : '*';
    const serializeFieldsWithLabel = fields => fields.length > 0 ? fields.map(f => `${f.field} as ${f.label}`).join(', ') : '*';
    const generateQuery = () => `SELECT ${serializeFieldsWithLabel([...queryFields, ...queryAgregators])} FROM  (SELECT * FROM BuySell${serializeFilters('WHERE', buySellFilters)}) AS b INNER JOIN Counterparty AS c ON b.CustID = c.CpID INNER JOIN Counterparty AS v ON b.VendorID = v.CpID INNER JOIN WksDetail AS w ON w.BuySellNo = b.BuySellNo GROUP BY ${serializeFields(queryFields)}${serializeFilters('HAVING', havingFilters)}${isCount ? '' : ` ORDER BY InvoiceNo OFFSET ${((page - 1) * pageSize) || 0} ROWS FETCH NEXT ${pageSize || 0} ROWS ONLY`}`;
    return isCount ? `SELECT COUNT(*) AS count FROM (${generateQuery()}) AS Invoices` : generateQuery();
};

export const getInvoices = ({
    isAdmin,
    isCount,
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
}) => axios.post(`${config.url_sql}/sql`, { query: generateInvoicesQuery(isAdmin, isCount, page, pageSize, brand, valueLow, valueHigh, quantityLow, quantityHigh, customer, invoiceNumber, poNumber, soNumber, productType, destinationCountry, orderDateFrom, orderDateTo, dueDateFrom, dueDateTo) }, { headers: { authorization: `Bearer ${getToken()}` } });

export const getBrands = () => axios.post(`${config.url_sql}/sql`, { query: generateBrandNameQuery() }, { headers: { authorization: `Bearer ${getToken()}` } });
export const getCustomers = () => axios.post(`${config.url_sql}/sql`, { query: generateClientNameQuery() }, { headers: { authorization: `Bearer ${getToken()}` } });
export const getProductTypes = () => axios.post(`${config.url_sql}/sql`, { query: generateProductTypeQuery() }, { headers: { authorization: `Bearer ${getToken()}` } });
export const getDestinationCountries = () => axios.post(`${config.url_sql}/sql`, { query: generateDestinationationCountry() }, { headers: { authorization: `Bearer ${getToken()}` } });
