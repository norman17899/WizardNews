const postBank = require('./postBank')

const express = require("express");
const app = express();

app.get("/", (req, res) => {

  const posts = postBank.list();

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
 </head>
  <body>
  <h1>Wizard News</h1>
    <ul>
  ${posts.map(post => `<li>${post.title}</li>`).join('')}
    </ul>
  </body>
  </html>`;

res.send(html)});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
