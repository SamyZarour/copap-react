import axios from 'axios';
import { getToken } from '../utils';
import config from '../config';

const generateSqlQuery = query => `SELECT TOP 100 p.PayableID as PayableID, p.InvoiceNo as InvoiceNumber, c.CompanyNm as Client, p.InvoiceDt as OrderDate, b.TradeType as ProductType, v.CompanyNm as Supplier, w.SWeight as QTY, wl.PriceCust as SalesPriceSale, wl.PricePerCust as PricePerUnitSale, wl.PricePer as PricePerUnitBuy, b.DueDt as DueDate, b.Commission1 FROM  (SELECT * FROM Payables WHERE InvoiceNo = '${query}') AS p INNER JOIN Buysell AS b ON p.BuySellNo = b.BuySellNo INNER JOIN Counterparty AS c ON b.CustID = c.CpID INNER JOIN Counterparty AS v ON b.VendorID = v.CpID INNER JOIN WksDetail AS w ON w.BuySellNo = p.BuySellNo INNER JOIN WksDelivery AS wl ON wl.BuySellNo = p.BuySellNo`;

export const getInvoices = ({ query }) => axios.post(`${config.url_sql}/sql`, { query: generateSqlQuery(query) }, { headers: { authorization: `Bearer ${getToken()}` } });
