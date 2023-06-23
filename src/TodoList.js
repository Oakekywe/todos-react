import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [completed, setCompleted] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
      setCompleted([...completed, false]);
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

    const updatedCompleted = [...completed];
    updatedCompleted.splice(index, 1);
    setCompleted(updatedCompleted);
  };

  const handleEditClick = (index) => {
    const todoToEdit = todos[index];
    setNewTodo(todoToEdit);
    setEditIndex(index);
  };

  const handleToggleComplete = (index) => {
    const updatedCompleted = [...completed];
    updatedCompleted[index] = !updatedCompleted[index];
    setCompleted(updatedCompleted);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const remainingCount = completed.filter((isCompleted) => !isCompleted).length;

  return (
    <div className="container mx-auto px-4 py-8 lg:px-12 ">
      {/* heading & search */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="mb-4">
          <input
            type="text"
            className="border border-gray-300 px-4 py-2"
            placeholder="Search todos"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      {/* box */}
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
          className="bg-blue-500 text-white px-4 py-2 rounded-sm"
          onClick={editIndex === -1 ? handleAddTodo : handleEditTodo}
        >
          {editIndex === -1 ? "Add" : "Edit"}
        </button>
      </div>

      <ul className="list-disc">
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            className={`flex items-center justify-between mb-2 ${
              completed[index] ? "line-through" : ""
            }`}
          >
            <span>{todo}</span>
            <div>
              <button
                className="text-blue-500 text-xl mr-3"
                onClick={() => handleEditClick(index)}
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
              <button
                className="text-red-500 text-xl"
                onClick={() => handleDeleteTodo(index)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
              <button
                className="text-green-500 ml-3 text-xl"
                onClick={() => handleToggleComplete(index)}
              >
                {completed[index] ? (
                  <i className="fa-regular fa-circle-xmark"></i>
                ) : (
                  <i className="fa-regular fa-circle-check"></i>
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* remain amount */}
      <div className="mt-4 text-gray-500">
        {remainingCount} {remainingCount <= 1 ? "task" : "tasks"} remaining
      </div>
    </div>
  );
};

export default TodoList;
