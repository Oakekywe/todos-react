import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (editIndex === -1) {
        handleAddTodo();
      } else {
        handleEditTodo();
      }
    }
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const handleEditTodo = () => {
    if (newTodo.trim()) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = newTodo;
      setTodos(updatedTodos);
      setNewTodo("");
      setEditIndex(-1);
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleEditClick = (index) => {
    const todoToEdit = todos[index];
    setNewTodo(todoToEdit);
    setEditIndex(index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow border border-gray-300 px-4 py-2 mr-2"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={editIndex === -1 ? handleAddTodo : handleEditTodo}
        >
          {editIndex === -1 ? "Add" : "Edit"}
        </button>
      </div>
      <ul className="list-disc">
        {todos.map((todo, index) => (
          <li key={index} className="flex items-center justify-between mb-2">
            <span>{todo}</span>
            <div>
              <button
                className="text-blue-500 mr-2"
                onClick={() => handleEditClick(index)}
              >
                Edit
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDeleteTodo(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
