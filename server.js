const express = require('express')
const app = express()
const connnectDB = require("./connectDB")
const Todo = require("./TodoModel")

require("dotenv").config()
const PORT = process.env.PORT || 3000

connnectDB()

app.use(express.static("dist"))
app.use(express.urlencoded({ extended: false }))

app.post('/add', async (req, res) => {
  try{
    const { text } = req.body
    const newTodo = new Todo({ text })
    await newTodo.save()
    res.redirect("/")
  } catch(err){
    res.json({ msg: "Text field required" })
  }
})

app.get("/todos", async (req, res) => {
  const todos = await Todo.find()
  console.log(todos)
  res.send(todos)
})

app.get("/done/:id", async (req, res) => {
  try{
    const id = req.params.id
    const todoToCheck = await Todo.findById(id)
    const status = todoToCheck.done
    await todoToCheck.update({
      done: !status
    })
    res.redirect("/")
  } catch(err){
    res.json({ error: err.message })
  }
})

app.get("/remove/:id", async (req, res) => {
  try{
    const id = req.params.id
    const todoToDelete = await Todo.findById(id)
    await todoToDelete.remove()
    res.redirect("/")
  } catch(err){
    res.json({ error: err.message })
  }
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))