const express = require('express');
const path = require('path');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000; 


app.use(express.static(path.resolve(__dirname,'public')));

app.get('*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at http://localhost:${PORT}`);
});