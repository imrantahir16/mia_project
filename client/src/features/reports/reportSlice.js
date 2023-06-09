import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportService from "./reportService";

const initialState = {
  reports: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  error: null,
  editingId: null,
  deletingId: null,
};

// create
export const createReport = createAsyncThunk(
  "reports/create",
  async (reportData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await reportService.createReport(reportData, token);
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

// get all reports
export const getReports = createAsyncThunk(
  "reports/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await reportService.getReports(token);
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

// delete report
export const deleteReport = createAsyncThunk(
  "reports/delete",
  async (reportId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await reportService.deleteReport(reportId, token);
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

const reportSlice = createSlice({
  name: "report",
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
      .addCase(createReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reports.push(action.payload);
      })
      .addCase(createReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reports = action.payload;
      })
      .addCase(getReports.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reports = state.reports.filter(
          (report) => report._id !== action.payload.id
        );
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setEditingId, setDeletingId } = reportSlice.actions;
export default reportSlice.reducer;
