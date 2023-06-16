import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import emergencyService from "./emergencyService";

const initialState = {
  emergencies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  error: null,
  editingId: null,
  deletingId: null,
};

// create
export const createEmergency = createAsyncThunk(
  "emergencies/create",
  async (emergencyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await emergencyService.createEmergency(emergencyData, token);
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

// get all emergencies
export const getEmergencies = createAsyncThunk(
  "emergencies/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await emergencyService.getEmergencies(token);
    } catch (error) {
      // console.log(error);
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

// delete emergency
export const deleteEmergency = createAsyncThunk(
  "emergencies/delete",
  async (emergencyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await emergencyService.deleteEmergency(emergencyId, token);
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

const emergencySlice = createSlice({
  name: "emergency",
  initialState,
  reducers: {
    reset: (state) => initialState,
    setEditingId: (state, action) => {
      state.editingId = action.payload;
    },

    setDeletingId: (state, action) => {
      state.deletingId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmergency.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEmergency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.emergencies.push(action.payload);
      })
      .addCase(createEmergency.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEmergencies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmergencies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.emergencies = action.payload;
      })
      .addCase(getEmergencies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteEmergency.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEmergency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.emergencies = state.emergencies.filter(
          (emergency) => emergency._id !== action.payload.id
        );
      })
      .addCase(deleteEmergency.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setEditingId, setDeletingId } = emergencySlice.actions;
export default emergencySlice.reducer;
