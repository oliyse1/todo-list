import React, { useState } from "react";
import TaskItems from "./TaskItems";
import InputForm from "./InputForm";

const TaskList = () => {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    //also tests whether it contains only spaces
    if (!item.text || /^\s*$/.test(item.text)) {
      return;
    }

    const newItems = [item, ...items];

    setItems(newItems);
  };

  const updateItem = (itemId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? newValue : item))
    );
  };

  const deleteItem = (itemId) => {
    const removedList = [...items].filter((item) => item.id !== itemId);

    setItems(removedList);
  };

  const moveItem = (dragIndex, hoverIndex) => {
    // const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, prevState[dragIndex]);
      return [...newItems];
    });
  };

  const completeItem = (itemId) => {
    let updatedItems = items.map((item) => {
      if (item.id === itemId) {
        item.isComplete = !item.isComplete;
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <>
      <h1>What are your plans?</h1>
      <InputForm addItem={addItem} />
      <TaskItems
        items={items}
        completeItem={completeItem}
        deleteItem={deleteItem}
        updateItem={updateItem}
        moveItem={moveItem}
      />
    </>
  );
};

export default TaskList;
