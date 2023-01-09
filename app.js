const postBank = require('./postBank')

const express = require("express");
const app = express();

app.use(express.static('public'))

app.get("/", (req, res) => {
  
  
  const posts = postBank.list();

  const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel='stylesheet' href='/style.css' />
    </head>
      <body>
      <div class='news-list'>
        <header><img src ='/logo.png' /> Wizard News </header>
        ${posts.map(post => `
          <div class='news-item'>
            <p>
              <span class='news-position'> ${post.id}. ▲</span>
              <a href="/posts/${post.id}">${post.title}</a>
              <small> (by ${post.name})</small>
            </p>
            <small class='news-info'>
              ${post.upvotes} upvotes | ${post.date}
            </small>
          </div>`
        ).join('')}
      </div>
    </body>
    </html>`;

  res.send(html)
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);

  if (!post.id) {
    res.status(404)

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p class="post">Accio Page! 🧙‍♀️ ... Page Not Found</p>
        <p class="back-to-home"><a href="/">Back to Home Page</a></p>
      </div>
    </body>
    </html>`

    res.send(html)

  } else {

  const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel='stylesheet' href='/style.css' />
    </head>
      <body>
      <div class='news-list'>
        <header><img src ='/logo.png' /> Wizard News </header>
      <p class="post-title">${post.title}<small> (by ${post.name})</small></p>
      <p class="post">${post.content}</p>
      <p class="back-to-home"><a href="/">Back to Home Page</a></p>
      </div>
    </body>
    </html>`;

  res.send(html);
}});

const {PORT = 1337} = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
