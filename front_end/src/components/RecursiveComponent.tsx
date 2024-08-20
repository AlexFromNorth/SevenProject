import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {  deleteList, updateList } from "../store/listSlice";
import NewListForm from "./NewListForm";
import { List } from "../types/types";
import { AppDispatch } from "../store";

interface RecursiveComponentProps extends List {
  depth?: number;
}

const RecursiveComponent: React.FC<RecursiveComponentProps> = ({ id, title, cost, child, depth = 1 }) => {
  const dispatch: AppDispatch = useDispatch(); // Используем тип AppDispatch

  const [currentTitle, setTitle] = useState(title);
  const [currentCost, setCost] = useState(cost);
  const [toggleForm, setToggleForm] = useState(false);

  const style = { marginLeft: 10 + depth * 5 };

  const handlerFunction = () => {
    dispatch(updateList({ title: currentTitle, cost: currentCost, id }));
  };

  return (
    <li className={`parent parent-${depth}`} style={style}>
      <div className="item">
        <button onClick={() => setToggleForm(!toggleForm)}>+</button>
        <input
          type="text"
          value={currentTitle}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          value={currentCost}
          onChange={(e) => setCost(+e.target.value)}
        />
        <button onClick={handlerFunction}>Обновить</button>
        <button onClick={() => dispatch(deleteList(id))}>Удалить</button>
        {toggleForm && <NewListForm parentId={id} />}
      </div>

      {Array.isArray(child) && child.length > 0 && (
        <ul className="child">
          {child.map((childItem) => (
            <RecursiveComponent
              key={childItem.id}
              {...childItem}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default RecursiveComponent;
