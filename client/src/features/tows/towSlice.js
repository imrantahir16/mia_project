import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import towService from "./towService";

const initialState = {
  tows: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create tows
export const createTow = createAsyncThunk(
  "tows/create",
  async (towData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await towService.createTow(towData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get all tows
export const getTows = createAsyncThunk("tows/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.accessToken;
    return await towService.getTows(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// delete user tow
export const deleteTow = createAsyncThunk(
  "tows/delete",
  async (towId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await towService.deleteTow(towId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const towSlice = createSlice({
  name: "tow",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tows.push(action.payload);
      })
      .addCase(createTow.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTows.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTows.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tows = action.payload;
      })
      .addCase(getTows.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tows = state.tows.filter((tow) => tow._id !== action.payload.id);
      })
      .addCase(deleteTow.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = towSlice.actions;
export default towSlice.reducer;
