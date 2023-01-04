import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const TaskItem = ({
  id,
  text,
  index,
  completeItem,
  deleteItem,
  setEdit,
  moveItem,
  isComplete,
}) => {
  // code from here:
  // https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_js/04-sortable/simple?from-embed=&file=/src/Card.js
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "ITEM",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  //   const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div
      className={isComplete ? "task-row complete" : "task-row"}
      ref={ref}
      data-handler-id={handlerId}
    >
      <div className="textbox" onClick={() => completeItem(id)}>
        {text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => deleteItem(id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: id, value: text })}
          className="edit-icon"
        />
      </div>
    </div>
  );
};

export default TaskItem;
