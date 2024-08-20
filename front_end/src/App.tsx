import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/listSlice";
import RecursiveComponent from "./components/RecursiveComponent";
import { RootState, AppDispatch } from "./store";
import { List} from "./types/types";


import "./App.css";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const list: List = useSelector((state: RootState) => state.list.list);


  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="App">
      
      <RecursiveComponent  key={list.id} {...list} />

    </div>
  );
};

export default App;