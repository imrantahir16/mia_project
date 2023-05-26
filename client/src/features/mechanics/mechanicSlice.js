import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mechanicService from "./mechanicService";

const initialState = {
  mechanics: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create
export const createMechanic = createAsyncThunk(
  "mechanics/create",
  async (mechanicData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await mechanicService.createMechanic(mechanicData, token);
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

// get all mechanics
export const getMechanics = createAsyncThunk(
  "mechanics/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await mechanicService.getMechanics(token);
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

// delete user mechanic
export const deleteMechanic = createAsyncThunk(
  "mechanics/delete",
  async (mechanicId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await mechanicService.deleteMechanic(mechanicId, token);
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

const mechanicSlice = createSlice({
  name: "mechanic",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMechanic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMechanic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mechanics.push(action.payload);
      })
      .addCase(createMechanic.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMechanics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMechanics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mechanics = action.payload;
      })
      .addCase(getMechanics.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMechanic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMechanic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mechanics = state.mechanics.filter(
          (mechanic) => mechanic._id !== action.payload.id
        );
      })
      .addCase(deleteMechanic.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = mechanicSlice.actions;
export default mechanicSlice.reducer;
