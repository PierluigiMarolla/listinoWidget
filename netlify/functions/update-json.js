const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const newData = JSON.parse(event.body);
  const filePath = path.resolve(__dirname, './../../src/json/log.json');

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);
    Object.assign(json, newData);
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File JSON aggiornato con successo' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: 'Errore nel leggere o salvare il file JSON',
    };
  }
};