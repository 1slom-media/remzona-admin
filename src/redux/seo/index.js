import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const SeoPost = createAsyncThunk("Seo/post", async (body) => {
  return await axios
    .post(`${API_URL}/seo`, body, { headers: { token: cookies.get("token") } })
    .then((res) => res);
});

export const SeoGet = createAsyncThunk("Seo/get", async () => {
  return await axios.get(`${API_URL}/seo`).then((response) => response.data);
});

export const SeoDelete = createAsyncThunk("Seo/delete", async (id) => {
  return await axios
    .delete(`${API_URL}/seo/${id}`, {
      headers: { token: cookies.get("token") },
    })
    .then((res) => res);
});
export const SeoPut = createAsyncThunk("Seo/put", async ({ body, id }) => {
  return await axios
    .put(`${API_URL}/seo/${id}`, body, {
      headers: { token: cookies.get("token") },
    })
    .then((res) => res);
});

const SeoSlice = createSlice({
  name: "Seo",
  initialState: {
    SeoGet: {
      loading: false,
      data: [],
      error: false,
      success: false,
    },
    SeoPost: {
      Success: false,
      Error: false,
      loading: false,
    },
    SeoDelete: {
      Success: false,
      Error: false,
      loading: false,
    },
    SeoPut: {
      Error: false,
      Loading: false,
      Success: false,
    },
  },
  extraReducers: {
    // get
    [SeoGet.pending]: (state, action) => {
      state.SeoGet.loading = true;
    },
    [SeoGet.fulfilled]: (state, action) => {
      state.SeoGet.loading = false;
      state.SeoGet.success = true;
      state.SeoGet.data = action.payload;
      state.SeoGet.error = false;
    },
    [SeoGet.rejected]: (state, action) => {
      state.SeoGet.loading = false;
      state.SeoGet.error = true;
      state.SeoGet.success = false;
    },
    // add
    [SeoPost.pending]: (state, action) => {
      state.SeoPost.loading = true;
    },
    [SeoPost.fulfilled]: (state, action) => {
      state.SeoPost.loading = false;
      state.SeoPost.Success = true;
      state.SeoPost.Error = false;
    },
    [SeoPost.rejected]: (state, action) => {
      state.SeoPost.loading = false;
      state.SeoPost.Error = true;
      state.SeoPost.Success = false;
    },
    // delete
    [SeoDelete.pending]: (state, action) => {
      state.SeoDelete.loadingDelete = true;
    },
    [SeoDelete.fulfilled]: (state, action) => {
      state.SeoDelete.loading = false;
      state.SeoDelete.Success = true;
      state.SeoDelete.Error = false;
    },
    [SeoDelete.rejected]: (state, action) => {
      state.SeoDelete.loading = false;
      state.SeoDelete.Error = true;
      state.SeoDelete.Success = false;
    },
    // put
    [SeoPut.pending]: (state, action) => {
      state.SeoPut.loading = true;
    },
    [SeoPut.fulfilled]: (state, action) => {
      state.SeoPut.Error = false;
      state.SeoPut.Success = true;
      state.SeoPut.Loading = false;
    },
    [SeoPut.rejected]: (state, action) => {
      state.SeoPut.Error = true;
      state.SeoPut.Success = false;
      state.SeoPut.Loading = false;
    },
  },
});

export const {} = SeoSlice.actions;
export default SeoSlice.reducer;
