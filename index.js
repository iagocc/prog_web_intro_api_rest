import express from "express"

const app = express()

app.get("/", function(req, res) {
  res.send("Hello Word")
})

app.listen(8080)