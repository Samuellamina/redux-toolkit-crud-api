import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  create,
  findByTitle,
  getAll,
  remove,
  removeAll,
  update,
} from "../../services/TutorialService";

const initialState = [];

export const createTutorial = createAsyncThunk(
  "tutorials/createTutorial",
  async ({ title, description }) => {
    const res = await create({ title, description });
    return res.data;
  }
);

export const retrieveTutorials = createAsyncThunk(
  "tutorials/retrieveTutorials",
  async () => {
    const res = await getAll();
    return res.data;
  }
);

export const updateTutorial = createAsyncThunk(
  "tutorials/updateTutorial",
  async ({ id, data }) => {
    const res = await update(id, data);
    return res.data;
  }
);

export const deleteTutorial = createAsyncThunk(
  "tutorials/deleteTutorial",
  async ({ id }) => {
    const res = await remove(id);
    return res.data;
  }
);

export const deleteAllTutorials = createAsyncThunk(
  "tutorials/deleteAllTutorials",
  async () => {
    const res = await removeAll();
    return res.data;
  }
);

export const findTutorialsByTitle = createAsyncThunk(
  "tutorials/findTutorialsByTitle",
  async ({ title }) => {
    const res = await findByTitle(title);
    return res.data;
  }
);

const tutorialSlice = createSlice({
  name: "tutorials",
  initialState,
  reducers: {},
  extraReducers: {
    [createTutorial.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveTutorials.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateTutorial.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (tutorial) => tutorial.id === action.payload.id
      );
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteTutorial.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllTutorials.fulfilled]: (state, action) => {
      return [];
    },
    [findTutorialsByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

export const {} = tutorialSlice.actions;
export default tutorialSlice.reducer;
