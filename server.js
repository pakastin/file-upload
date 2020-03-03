const express = require('express');
const Busboy = require('busboy');
const fs = require('fs');

const app = express();

app.post('/upload', (req, res, next) => {
  const busboy = new Busboy({
    headers: req.headers
  });

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const writeStream = fs.createWriteStream('./upload/' + filename);

    file.pipe(writeStream);
  });
  busboy.on('finish', () => {
    res.send('ok');
  });
  req.pipe(busboy);
});

app.use(express.static('public'));

app.listen(80);
