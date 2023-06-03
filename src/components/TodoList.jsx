import "./TodoStyles.scss";

import { Input } from "./Input";
import { TodoFunction } from './TodoFunction';


function TodoList() {
  const {
    handleClick,
    deleteItem,
    editItem,
    handleEditChange,
    handleEditSave,
    markUsDone,
    deleteCompletedTasks,
    moveItemUp,
    moveItemDown,
    deleteAllTasks,
    todo,
  } = TodoFunction()

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
                    <button onClick={() => moveItemUp(id)} disabled={id === 0}>
                      Move Up
                    </button>
                    <button
                      onClick={() => moveItemDown(id)}
                      disabled={id === todo.length - 1}
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
