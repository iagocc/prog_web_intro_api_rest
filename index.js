import express from "express"

const news = [
  {
    "id": 1,
    "titulo": "Bem vindo ao jornal!",
    "texto": "Primeira notícia do jornal..."
  },
  {
    "id": 2,
    "titulo": "Bem vindo ao jornal 2!",
    "texto": "Segunda notícia do jornal..."
  },
  {
    "id": 3,
    "titulo": "Bem vindo ao jornal 3!",
    "texto": "Terceira notícia do jornal..."
  },
]

const app = express()
app.use(express.urlencoded({ extended: true }))

app.get("/noticia", function(req, res) {
  res.json(news)
})

function selectNewsById(newsId) {
  return news.filter(newsItem => newsItem.id === newsId)
}

app.get("/noticia/:id", function(req, res) {
  const newsId = parseInt(req.params.id)
  const selectedNews = selectNewsById(newsId)
  res.json(selectedNews)
})

app.post("/noticia", function(req, res) {
  const newNews = {
    "id": parseInt(req.body.id),
    "titulo": req.body.titulo,
    "texto": req.body.texto
  }
  news.push(newNews)
  res.send(newNews)
})

app.listen(8080, function() {
  console.log("Servidor rodando")
})