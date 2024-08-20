import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { List, ListState } from "../types/types";
import { createList, deleteFolderById, updateElement } from "../utils/utils";

// Асинхронный экшен для загрузки данных
export const fetchData = createAsyncThunk<
  List,
  undefined,
  { rejectValue: string }
>("test/fetchData", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch("http://localhost:3000/folder/list");

    if (!response.ok) {
      throw new Error("Failed to fetch test data");
    }

    return (await response.json()) as List;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});

// Асинхронный экшен для удаления данных
export const deleteList = createAsyncThunk<
  void,
  number,
  { rejectValue: string; dispatch: any }
>("todos/deleteList", async function (id, { rejectWithValue, dispatch }) {
  try {
    const response = await fetch(`http://localhost:3000/folder/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete folder");
    }

    // После успешного удаления вызываем removeList для обновления локального состояния
    dispatch(removeList({ id }));
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});

// Асинхронный экшен для добавления новой папки
export const addNewList = createAsyncThunk<
  List,
  { title: string; cost: number; id: number },
  { rejectValue: string; dispatch: any }
>("test/addNewList", async function ({ title, cost, id }, { rejectWithValue, dispatch }) {
  try {
    const list = {
      title,
      cost,
    };
    
    const response = await fetch(`http://localhost:3000/folder/create/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });

    if (!response.ok) {
      throw new Error("Failed to add new folder");
    }

    const responseData = await response.json();
    
    // Используем action addList для добавления нового элемента
     dispatch(addList({ ...responseData, id }));

    return responseData as List;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});

// Асинхронный экшен для добавления обновления 
export const updateList = createAsyncThunk<
  List,
  { title: string; cost: number; id: number },
  { rejectValue: string; dispatch: any }
>("test/updateList", async function ({ title, cost, id }, { rejectWithValue, dispatch }) {
  try {
    const list = {
      title,
      cost,
    };
    
    const response = await fetch(`http://localhost:3000/folder/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });

    if (!response.ok) {
      throw new Error("Failed to update folder");
    }
    
    const updatedList = await response.json();
    dispatch(updateListState(updatedList));
    return updatedList as List;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});



// Изначальное состояние
const initialState: ListState = {
  list: {id: 0, title:'', cost:0, child:[]},
  status: null,
  error: null,
};

// Создание slice
const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    removeList(state, action: PayloadAction<{ id: number }>) {
      deleteFolderById(state.list, action.payload.id);
    },
    addList(state, action: PayloadAction<List>) {
      createList(state.list, action.payload);
      console.log(state.list)
    },
    updateListState(state, action: PayloadAction<List>) {
      updateElement(state.list, action.payload.title, action.payload.cost, action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<List>) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(addNewList.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteList.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateList.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(
        fetchData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Unknown error";
        }
      )
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const { removeList, addList, updateListState } = testSlice.actions;
export default testSlice.reducer;
