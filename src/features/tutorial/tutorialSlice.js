import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  create,
  findByTitle,
  getAll,
  remove,
  removeAll,
  update,
} from "../../services/TutorialService";

const initialState = {
  tutorial: [],
  loading: false,
  error: "An Error Occured Try Again Later!",
};

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
    const res = await update({ id, data });
    return res.data;
  }
);

export const deleteTutorial = createAsyncThunk(
  "tutorials/deleteTutorial",
  async ({ id }) => {
    const res = await remove({ id });
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
    // createTutorial
    [createTutorial.fulfilled]: (state, action) => {
      state.push(action.payload);
      state.loading = false;
    },
    [createTutorial.pending]: (state) => {
      state.loading = true;
    },
    [createTutorial.rejected]: (state, action) => {
      state.loading = true;
      state.error = true;
    },

    // retrieveTutorials
    [retrieveTutorials.fulfilled]: (state, action) => {
      state.loading = false;
      return [...action.payload];
    },
    [retrieveTutorials.pending]: (state) => {
      state.loading = true;
    },
    [retrieveTutorials.rejected]: (state, action) => {
      state.loading = true;
      state.error = true;
    },

    // deleteTutorial
    [deleteTutorial.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
      state.loading = false;
    },
    [deleteTutorial.pending]: (state) => {
      state.loading = true;
    },
    [deleteTutorial.rejected]: (state, action) => {
      state.loading = true;
      state.error = true;
    },

    // deleteAllTutorials
    [deleteAllTutorials.fulfilled]: (state, action) => {
      state.loading = false;
      return [];
    },
    [deleteAllTutorials.pending]: (state) => {
      state.loading = true;
    },
    [deleteAllTutorials.rejected]: (state, action) => {
      state.loading = true;
      state.error = true;
    },

    // findTutorialsByTitle
    [findTutorialsByTitle.fulfilled]: (state, action) => {
      state.loading = false;
      return [...action.payload];
    },
    [findTutorialsByTitle.pending]: (state) => {
      state.loading = true;
    },
    [findTutorialsByTitle.rejected]: (state, action) => {
      state.loading = true;
      state.error = true;
    },
  },
});

export const {} = tutorialSlice.actions;
export default tutorialSlice.reducer;
