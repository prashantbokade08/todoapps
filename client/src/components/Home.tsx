import { useEffect, useState } from "react";
import { Todo } from "../types";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");
  const baseurl = `http://localhost:3000`;
  const fetchdata = async () => {
    const { data } = await axios.get(`${baseurl}/todos`);
    setTodos(data);
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const handleAdd = async () => {
    if (task === "") return;
    await axios.post(`${baseurl}/todos`, {
      task,
    });
    fetchdata();
    setTask("");
  };

  const handleDelete = async (todo: Todo) => {
    await axios.delete(`${baseurl}/todos`, {
      data: {
        todo,
      },
    });
    fetchdata();
  };

  return (
    <div className="main">
      <div className="input_part">
        <label>
          Todo ::{" "}
          <input
            type="text"
            name="name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </label>
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="todos">
        {!todos.length && <h1> No Todos Found </h1>}
        {todos.map((todo, index) => (
          <div className="todo" key={index}>
            <p> {todo.name} </p>
            <button onClick={() => handleDelete(todo)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
