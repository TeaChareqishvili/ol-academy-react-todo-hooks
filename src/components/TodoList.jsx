import "./TodoStyles.scss";
import { useState } from "react";
import { Input } from "./Input";


function TodoList() {
    const [todo, setTodo] = useState([]);
  
    const handleClick = (value) => {
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
  
    return (
      <>
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
                      <li style={item.status ? { textDecoration: "line-through" } : {}}>{item.text}</li>
                      <button onClick={() => deleteItem(id)}>delete</button>
                      <button onClick={() => editItem(id)}>Edit List</button>
                      <button onClick={() => markUsDone(id)}>Mark as {item.status ? 'Incomplete' : 'Complete'}</button>
                    </div>
                  )}
                </div>
              ))}
            </ul>
            <button className="deleteMarked" onClick={deleteCompletedTasks}>Delete Completed Tasks</button>
          </div>
        ) : (
         <p>Nothing In List</p>
        )}
      </>
    );
  }

  export {TodoList}