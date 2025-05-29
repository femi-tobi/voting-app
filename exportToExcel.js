const sqlite3 = require('sqlite3').verbose();
const ExcelJS = require('exceljs');

const db = new sqlite3.Database('./db/database.sqlite');

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Votes');

worksheet.columns = [
  { header: 'Email', key: 'email', width: 30 },
  { header: 'Votes', key: 'data', width: 100 }
];

db.all('SELECT * FROM votes', [], (err, rows) => {
  if (err) {
    console.error('Error fetching data:', err.message);
    return;
  }

  rows.forEach(row => {
    worksheet.addRow({
      email: row.email,
      data: row.data
    });
  });

  workbook.xlsx.writeFile('votes.xlsx')
    .then(() => {
      console.log('✅ Excel file "votes.xlsx" created successfully!');
      db.close();
    })
    .catch(err => {
      console.error('Failed to write Excel file:', err);
    });
});
