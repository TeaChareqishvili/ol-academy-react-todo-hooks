import { useState } from "react";

function TodoFunction() {
  const [todo, setTodo] = useState([]);

  const handleClick = (value) => {
    const isDuplicate = todo.some((item) => item.text === value);
    if (isDuplicate) {
      alert("Error: The same list already exists!");
      return;
    }
    setTodo([...todo, { text: value, status: false, editing: false }]);
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
    const isDuplicate = updatedTodo.some(
      (item, index) => item.text === editedValue && index !== id
    );
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

  const moveItem = (id, direction) => {
    setTodo((prevTodo) => {
      const updatedTodo = [...prevTodo];
      const newIndex = direction === "up" ? id - 1 : id + 1;
      [updatedTodo[id], updatedTodo[newIndex]] = [
        updatedTodo[newIndex],
        updatedTodo[id],
      ];
      return updatedTodo;
    });
  };

  const moveItemUp = (id) => {
    if (id > 0) {
      moveItem(id, "up");
    }
  };

  const moveItemDown = (id) => {
    if (id < todo.length - 1) {
      moveItem(id, "down");
    }
  };

  const deleteAllTasks = () => {
    setTodo([]);
  };

  return {
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
  };
}

export { TodoFunction };
