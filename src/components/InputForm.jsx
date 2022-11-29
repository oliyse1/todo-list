import React, { useState, useRef, useEffect } from "react";

const InputForm = ({ edit, addItem }) => {
  const [input, setInput] = useState(edit ? edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    //prevent refreshing page when button is clicked
    e.preventDefault();

    addItem({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {edit ? (
        <>
          <input
            placeholder="Update task"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="task-input edit"
          />
          <button onClick={handleSubmit} className="task-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Add a task"
            value={input}
            onChange={handleChange}
            name="text"
            className="task-input"
            ref={inputRef}
          />
          <button onClick={handleSubmit} className="task-button">
            Add task
          </button>
        </>
      )}
    </form>
  );
};

export default InputForm;
