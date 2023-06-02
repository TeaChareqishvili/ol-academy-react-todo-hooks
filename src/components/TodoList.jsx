import "./TodoStyles.scss";
import { useState } from "react";
import { Input } from "./Input";

function TodoList() {
  const [todo, setTodo] = useState([]);

  const handleClick = (value) => {
    const isDuplicate = todo.some((item) => item.text === value);
  if (isDuplicate) {
    alert("Error: The same list already exists!");
    return;
  }
    setTodo([...todo, { text: value, status: false }]);
  };

  const deleteItem = (id) => {
    setTodo(todo.filter((_, i) => i !== id));
  };

  const editItem = (id) => {
    const updatedTodo = [...todo];
    updatedTodo[id].editing = true;
    setTodo(updatedTodo);
  };

  const handleEditChange = (event, id) => {
    const updatedTodo = [...todo];
    updatedTodo[id].text = event.target.value;
    setTodo(updatedTodo);
  };

  
  const handleEditSave = (id) => {
    const updatedTodo = [...todo];
    const editedValue = updatedTodo[id].text;
    const isDuplicate = updatedTodo.some((item, index) => item.text === editedValue && index !== id);
    if (isDuplicate) {
      alert("Error: The same list already exists!");
      return;
    }
    updatedTodo[id].editing = false;
    setTodo(updatedTodo);
  };

  const markUsDone = (id) => {
    const newTodo = todo.map((item, index) => {
      if (index === id) {
        return { ...item, status: !item.status };
      } else {
        return item;
      }
    });
    setTodo(newTodo);
  };

  const deleteCompletedTasks = () => {
    setTodo(todo.filter((item) => !item.status));
  };

  const moveItemUp = (id) => {
    if (id > 0) {
      setTodo((prevTodo) => {
        const updatedTodo = [...prevTodo];
        [updatedTodo[id - 1], updatedTodo[id]] = [
          updatedTodo[id],
          updatedTodo[id - 1],
        ];
        return updatedTodo;
      });
    }
  };

  const moveItemDown = (id) => {
    if (id < todo.length - 1) {
      setTodo((prevTodo) => {
        const updatedTodo = [...prevTodo];
        [updatedTodo[id], updatedTodo[id + 1]] = [
          updatedTodo[id + 1],
          updatedTodo[id],
        ];
        return updatedTodo;
      });
    }
  };
  const deleteAllTasks = () => {
    setTodo([]);
  };

  return (
    <div className="listWrapper">
      <Input handleClick={handleClick} />
      {todo && todo.length > 0 ? (
        <div className="todo">
          <ul>
            {todo.map((item, id) => (
              <div key={id}>
                {item.editing ? (
                  <div>
                    <input
                      type="text"
                      value={item.text}
                      onChange={(event) => handleEditChange(event, id)}
                    />
                    <button onClick={() => handleEditSave(id)}>Save</button>
                  </div>
                ) : (
                  <div>
                    <li
                      style={
                        item.status ? { textDecoration: "line-through" } : {}
                      }
                    >
                      {item.text}
                    </li>
                    <button onClick={() => deleteItem(id)}>delete</button>
                    <button onClick={() => editItem(id)}>Edit List</button>
                    <button onClick={() => markUsDone(id)}>
                      Mark as {item.status ? "Incomplete" : "Complete"}
                    </button>
                    <button
                      onClick={() => moveItemUp(id)}
                      disabled={id === 0} // Disable the button if it's the first item
                    >
                      Move Up
                    </button>
                    <button
                      onClick={() => moveItemDown(id)}
                      disabled={id === todo.length - 1} // Disable the button if it's the last item
                    >
                      Move Down
                    </button>
                  </div>
                )}
              </div>
            ))}
          </ul>
          <button className="deleteMarked" onClick={deleteCompletedTasks}>
            Delete Completed Tasks
          </button>
          <button className="deleteAll" onClick={deleteAllTasks}>
            Delete All Tasks
          </button>
        </div>
      ) : (
        <p>Nothing In List</p>
      )}
    </div>
  );
}

export { TodoList };
