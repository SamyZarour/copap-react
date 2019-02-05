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
    const adminFields = ['w.PCurrencyCd as CurrencyBuy', 'w.PPrice as PriceBuy', 'w.PUOM as PriceUomBuy', 'w.PAmount as TotalBuy'];
    const queryFields = [...(isAdmin ? adminFields : []), 'w.DetailID as id', 'b.BuySellNo as InvoiceNo', 'b.UserID as SalesRep', 'c.CompanyNm as Client', 'b.OrderDt as OrderDate', 'b.TradeType as ProductType', 'v.CompanyNm as Supplier', 'w.SWeight as Qty', 'w.SWeightUOM as QtyUom', 'w.SPrice as PriceSale', 'w.SPriceUOM as PriceUomSale', 'w.SCurrencyCd as CurrencySale', 'w.SAmount as TotalSale', 'b.DueDt as DueDate', 'b.Commission1 as Commission', 'b.AltCoEmail as ContactPoint'];
    const buySellFilters = [`VendorID LIKE '${brand || '%'}'`, `CustID LIKE '${customer || '%'}'`, `BuySellNo LIKE '${invoiceNumber || '%'}'`, `RefPONo LIKE '${poNumber || '%'}'`, `RefSONo LIKE '${soNumber || '%'}'`, `TradeType LIKE '${productType || '%'}'`, `ShipToID LIKE '${destinationCountry || '%'}'`, `OrderDt > '${orderDateFrom || '01/01/1970'}'`, `OrderDt ${orderDateTo ? `< '${orderDateTo}'` : '> \'01/01/1970\''}`, `DueDt > '${dueDateFrom || '01/01/1970'}'`, `DueDt ${dueDateTo ? `< '${dueDateTo}'` : '> \'01/01/1970\''}`];
    const workDetailsFilters = [`SAmount > '${valueLow || '0'}'`, valueHigh ? `SAmount < '${valueHigh}'` : 'SAmount > 0', `SWeight > '${quantityLow || '0'}'`, quantityHigh ? `SWeight < '${quantityHigh}'` : 'SWeight > 0'];
    const serializeFilters = filters => filters.length > 0 ? ` WHERE ${filters.join(' AND ')}` : '';
    const serializeFields = fields => fields.length > 0 ? fields.join(', ') : '*';
    return `SELECT ${isCount ? 'COUNT(*)' : serializeFields(queryFields)} FROM  (SELECT * FROM BuySell${serializeFilters(buySellFilters)}) AS b INNER JOIN Counterparty AS c ON b.CustID = c.CpID INNER JOIN Counterparty AS v ON b.VendorID = v.CpID INNER JOIN (SELECT * FROM WksDetail${serializeFilters(workDetailsFilters)}) AS w ON w.BuySellNo = b.BuySellNo${isCount ? '' : ` ORDER BY InvoiceNo OFFSET ${((page - 1) * pageSize) || 0} ROWS FETCH NEXT ${pageSize || 0} ROWS ONLY`};`;
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
