import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewList } from "../store/listSlice";
import { AppDispatch } from "../store/store";

interface NewListFormProps {
  parentId: number;
}

const NewListForm: React.FC<NewListFormProps> = ({ parentId }) => {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState(0);

  const dispatch: AppDispatch  = useDispatch();

  const addElement = () => {
    dispatch(addNewList({ title, cost, id: parentId }));
    setTitle("");
    setCost(0);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Стоимость"
        value={cost}
        onChange={(e) => setCost(+e.target.value)}
      />
      <button onClick={addElement}>Добавить в список</button>
    </div>
  );
};

export default NewListForm;
