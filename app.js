const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  // ключ API
  client_id: 'YOUR_CLIENT_ID',
  client_secret: 'YOUR_CLIENT_SECRET',
  redirect_uri: 'YOUR_REDIRECT_URI'
});

const sheets = google.sheets('v4');

const vehicles = [
  ['Toyota Corolla', 2015],
  ['Ford Mustang', 2018],
  ['Honda Civic', 2020],
  ['Nissan GT-R', 2019],
  ['Volkswagen Golf', 2017]
];

async function writeToSheet() {
  const spreadsheetId = 'YOUR_SPREADSHEET_ID';
  const range = 'Sheet1!A1:B6'; // діапазон ячеєк для запису

  try {
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: { values: vehicles }
    });
    console.log(`Data written to sheet: ${response.data.updatedRange}`);
  } catch (err) {
    console.error('Error writing to sheet:', err);
  }
}

writeToSheet();
