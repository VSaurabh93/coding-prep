import XLSX from 'xlsx';

const URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQRA0935pTouBgpjjXfiJfJKqAKH3UzxFlba7BJapyr4SRkGjJvE2Bn4iiGgXd4gZT6a4y-RZDFwulS/pub?output=xlsx';

const fetchData = async () => {
  const res = await fetch(URL,{
    mode: 'cors'
  });
  if (!res.ok) throw new Error('fetch failed');
  const buffer = await res.arrayBuffer();

  return readDataFromXLSX(buffer);
};

export default fetchData;

function readDataFromXLSX(buffer) {
  const respArr = new Uint8Array(buffer);
  const workbook = XLSX.read(respArr, { type: 'array' });
  return workbook.Sheets.Algos;
}
