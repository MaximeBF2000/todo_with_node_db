console.log("app.js is loaded")
const d = document

const todoContainer = d.querySelector(".todos")

const todoHTML = (text, done, id) => (
  `
  <div class="todo ${done ? "done" : ""}">
    <p class="text">${text}</p>
    <a href="/remove/${id}" class="remove center"> 🗑️ </a>
    <a href="/done/${id}" class="done center"> ✔️ </a>
  </div>
  `
)

async function getTodos(){
  const response = await axios.get("/todos")
  const todos = response.data

  todos.forEach(todo => {
    todoContainer.innerHTML += todoHTML(todo.text, todo.done, todo._id)
  })
}

getTodos()
