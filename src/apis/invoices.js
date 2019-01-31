import axios from 'axios';
import { getToken } from '../utils';
import config from '../config';

const generateSqlQuery = (pageSize, page, query) => `SELECT w.DetailID as id, b.BuySellNo as InvoiceNo, b.UserID as SalesRep, c.CompanyNm as Client, b.InvoiceDt as OrderDate, b.TradeType as ProductType, v.CompanyNm as Supplier, w.SWeight as Qty, w.SWeightUOM as QtyUom, w.SPrice as PriceSale, w.SPriceUOM as PriceUomSale, w.SCurrencyCd as CurrencySale, w.SAmount as TotalSale, w.PCurrencyCd as CurrencyBuy, w.PPrice as PriceBuy, w.PUOM as PriceUomBuy, w.PAmount as TotalBuy, b.DueDt as DueDate, b.Commission1 as Commission, b.AltCoEmail as ContactPoint FROM  (SELECT * FROM BuySell WHERE BuySellNo LIKE '%${query}%') AS b INNER JOIN Counterparty AS c ON b.CustID = c.CpID INNER JOIN Counterparty AS v ON b.VendorID = v.CpID INNER JOIN WksDetail AS w ON w.BuySellNo = b.BuySellNo ORDER BY InvoiceNo OFFSET ${(page * pageSize) || 0} ROWS FETCH NEXT ${pageSize || 0} ROWS ONLY`;

export const getInvoices = ({ pageSize, page, query }) => axios.post(`${config.url_sql}/sql`, { query: generateSqlQuery(pageSize, page, query) }, { headers: { authorization: `Bearer ${getToken()}` } });
