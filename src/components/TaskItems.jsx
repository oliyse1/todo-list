import React, { useState } from "react";
import InputForm from "./InputForm";
import TaskItem from "./TaskItem";

const TaskItems = ({
  items,
  completeItem,
  deleteItem,
  updateItem,
  moveItem,
}) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (item) => {
    updateItem(edit.id, item);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <InputForm edit={edit} addItem={submitUpdate} />;
  }

  return items.map((todo, index) => (
    <TaskItem
      key={todo.id}
      id={todo.id}
      text={todo.text}
      isComplete={todo.isComplete}
      index={index}
      completeItem={completeItem}
      deleteItem={deleteItem}
      setEdit={setEdit}
      moveItem={moveItem}
    />
  ));
};

export default TaskItems;
