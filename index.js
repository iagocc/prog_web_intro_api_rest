import express from "express"
import postgresql from 'pg'

const { Client } = postgresql
const credentials = {
  user: 'postgres',
  host: 'localhost',
  database: 'aula0',
  password: 'postgrespw',
  port: 49153
}

const app = express()
app.use(express.urlencoded({ extended: true }))

app.get("/noticia", async function(req, res) {
  const client = new Client(credentials)
  client.connect()
  const news = await client.query('SELECT * FROM noticia')
  await client.end()
  res.json(news.rows)
})

async function selectNewsById(newsId) {
  const client = new Client(credentials)
  client.connect()
  const news = await client.query('SELECT * FROM noticia WHERE id = $1', [newsId])
  await client.end()
  return news.rows
}

app.get("/noticia/:id", async function(req, res) {
  const newsId = parseInt(req.params.id)
  const selectedNews = await selectNewsById(newsId)
  res.json(selectedNews)
})

app.post("/noticia", async function(req, res) {
  const newNews = {
    "titulo": req.body.titulo,
    "texto": req.body.texto
  }

  const client = new Client(credentials)
  client.connect()
  const news = await client.query('INSERT INTO noticia (titulo, texto) VALUES ($1, $2) RETURNING *', [newNews.titulo, newNews.texto])
  client.end()

  res.json(newNews)
})

app.listen(4000, function() {
  console.log("Servidor rodando")
})