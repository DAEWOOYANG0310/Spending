import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([
    {
      id: new Date().getTime() + 1,
      text: "잠자기",
      completed: true,
    },
    {
      id: new Date().getTime() + 2,
      text: "일어나기",
      completed: false,
    },
  ]);
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const newTodoHandler = (e) => {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: input,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const delHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const changeHandler = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <h1>할 일 목록</h1>
      <form onSubmit={newTodoHandler}>
        <input
          type="text"
          placeholder="할 일을 추가하세요"
          value={input}
          onChange={handleInputChange}
        />
        <button type="submit">추가</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
            <button onClick={() => changeHandler(todo.id)}>
              {todo.completed ? "취소" : "완료"}
            </button>

            <button onClick={() => delHandler(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
