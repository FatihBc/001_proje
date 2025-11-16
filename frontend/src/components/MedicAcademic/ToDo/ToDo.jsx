import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, updateTodo, toggleTodo } from "./sliceTodo.js";
import { FaEdit, FaCheck } from "react-icons/fa";
import { IoMdRemoveCircle } from "react-icons/io";
import { useTheme } from "../../../context/useTheme.js";

function ToDo() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list);
  const inputRef = useRef();
  const { theme } = useTheme();

  const [editableId, setEditableId] = useState(null);
  const [newContent, setNewContent] = useState("");

  const createTodo = () => {
    const text = inputRef.current.value.trim();
    if (text) {
      dispatch(addTodo({ id: Date.now(), text, completed: false }));
      inputRef.current.value = "";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") createTodo();
  };

  const handleRemove = (id) => {
    dispatch(removeTodo(id));
    if (editableId === id) {
      setEditableId(null);
      setNewContent("");
    }
  };

  const startEdit = (todo) => {
    setEditableId(todo.id);
    setNewContent(todo.text);
  };

  const handleUpdate = (id) => {
    if (newContent.trim()) {
      dispatch(updateTodo({ id, text: newContent.trim() }));
      setEditableId(null);
      setNewContent("");
    }
  };

  const cancelEdit = () => {
    setEditableId(null);
    setNewContent("");
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`p-2 rounded-lg shadow-md border h-full w-full ${
        isDark
          ? "bg-[#2a2a2a] border-[#2a2a2a] text-white"
          : "bg-[#ecf3f4] border-gray-300 text-black"
      }`}
    >
      <div className="mx-auto max-w-2xl">
        {/* Input Row */}
        <div
          className={`flex justify-between overflow-hidden border shadow-sm rounded-lg ${
            isDark ? "border-gray-600" : "border-gray-300"
          }`}
        >
          <input
            ref={inputRef}
            onKeyPress={handleKeyPress}
            className={`w-3/4 px-4 py-3 text-sm outline-none border-none focus:ring-0 ${
              isDark ? "bg-[#2a2a2a] text-white" : "text-[#2a2a2a]"
            }`}
            type="text"
            placeholder="Add todo..."
          />
          <div className="w-1/4 flex justify-end rounded-lg">
            <button
              onClick={createTodo}
              className="bg-[#0c6b80] hover:bg-[#0e7a92] text-white m-2 p-2 font-semibold text-sm transition-colors duration-200 rounded-lg! focus:outline-none w-3/4 flex justify-center"
            >
              Add
            </button>
          </div>
        </div>

        {/* Todo List Section */}
        <div>
          {todos.length === 0 ? (
            <div className="text-center py-8">
              <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
                List is empty
              </p>
            </div>
          ) : (
            <ul className="p-0">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`flex justify-between items-center p-3 rounded-lg mt-2 border hover:shadow-md transition-shadow ${
                    isDark
                      ? "bg-[#2a2a2a] border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {/* Todo Content */}
                  <div className="flex-1 flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo.id)}
                      className="mr-2! h-4 w-4 text-[#0c6b80] focus:ring-[#0c6b80] border-gray-300 rounded"
                    />
                    {editableId === todo.id ? (
                      <input
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className={`w-full px-3 py-2 rounded-md outline-none focus:ring-2 ${
                          isDark
                            ? "bg-[#2a2a2a] text-white border border-[#289bb5] focus:ring-[#289bb5]"
                            : "bg-white text-black border border-blue-300 focus:ring-[#ecf3f4]"
                        }`}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleUpdate(todo.id);
                          if (e.key === "Escape") cancelEdit();
                        }}
                      />
                    ) : (
                      <span
                        className={`${
                          todo.completed
                            ? "line-through text-gray-400"
                            : isDark
                            ? "text-white"
                            : "text-gray-700"
                        }`}
                      >
                        {todo.text}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 ml-4">
                    {editableId === todo.id ? (
                      <>
                        <FaCheck
                          className="text-green-600 text-l mx-2! cursor-pointer hover:text-green-900 transition-colors"
                          onClick={() => handleUpdate(todo.id)}
                        />
                        <button
                          onClick={cancelEdit}
                          className="text-red-600 text-sm font-medium hover:text-red-900 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <FaEdit
                          className="text-[#0c6b80] text-xl mx-2! cursor-pointer hover:text-[#0e7a92] transition-colors"
                          onClick={() => startEdit(todo)}
                        />
                        <IoMdRemoveCircle
                          className="text-red-500 text-xl cursor-pointer hover:text-red-700 transition-colors"
                          onClick={() => handleRemove(todo.id)}
                        />
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="mt-6 pt-3 border-t border-gray-200">
            <p
              className={`text-center text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Total todo: {todos.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ToDo;
