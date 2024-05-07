import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const token=cookies.get("token")

export const PortfolioAdd = createAsyncThunk("portfolio/post", async (body) => {
  return await axios.post(`${API_URL}/portfolio`, body,{
    headers:{
     token:token
    }
  }).then((res) => res);
});
export const PortfolioGet = createAsyncThunk("portfolio/get", async () => {
  return await axios
    .get(`${API_URL}/portfolio`)
    .then((response) =>response.data);
});

export const PortfolioDelete = createAsyncThunk(
  "portfoli/delete",
  async (id) => {
    return await axios
      .delete(`${API_URL}/portfolio/${id}`,{
        headers:{
         token:token
        }
      })
      .then((response) => response.data);
  }
);
export const PortfolioPut = createAsyncThunk(
  "portfolio/put",
  async ({ body, id }) => {
    return await axios
      .put(`${API_URL}/portfolio/${id}`, body,{
        headers:{
         token:token
        }
      })
      .then((response) => console.log(response.data));
  }
);

export const UploadCategoryImage = createAsyncThunk("CategoryImg/upload", async (e) => {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  formData.append("upload_preset", "itjktwid");
  try {
    return await axios
      .post("https://api.cloudinary.com/v1_1/dpifedy1z/upload", formData)
      .then((response) => response?.data.secure_url);
  } catch (error) {
    return error;
  }
});
const PortfolioSlice = createSlice({
  name: "admin",
  initialState: {
    portfolioGet: {
      loading: false,
      data: [],
      error: false,
      success: false,
    },
    portfolioPost: {
      Success: false,
      Error: false,
      loading: false,
    },
    portfolioDelete: {
      Success: false,
      Error: false,
      loading: false,
    },
    portfolioPut: {
      Error: false,
      Loading: false,
      Success: false,
    },
    uploadCategoryImage: {
      Error: false,
      Loading: false,
      Success: false,
      data: "",
    },
  },
  extraReducers: {
    // get
    [PortfolioGet.pending]: (state, action) => {
      state.portfolioGet.loading = true;
    },
    [PortfolioGet.fulfilled]: (state, action) => {
      state.portfolioGet.loading = false;
      state.portfolioGet.success = true;
      state.portfolioGet.data = action.payload;
      state.portfolioGet.error = false;
    },
    [PortfolioGet.rejected]: (state, action) => {
      state.portfolioGet.loading = false;
      state.portfolioGet.error = true;
      state.portfolioGet.success = false;
    },
    // add
    [PortfolioAdd.pending]: (state, action) => {
      state.portfolioPost.loading = true;
    },
    [PortfolioAdd.fulfilled]: (state, action) => {
      state.portfolioPost.loading = false;
      state.portfolioPost.Success = true;
      state.portfolioPost.Error = false;
    },
    [PortfolioAdd.rejected]: (state, action) => {
      state.portfolioPost.loading = false;
      state.portfolioPost.Error = true;
      state.portfolioPost.Success = false;
    },
    // delete
    [PortfolioDelete.pending]: (state, action) => {
      state.portfolioDelete.loadingDelete = true;
    },
    [PortfolioDelete.fulfilled]: (state, action) => {
      state.portfolioDelete.loading = false;
      state.portfolioDelete.Success = true;
      state.portfolioDelete.Error = false;
    },
    [PortfolioDelete.rejected]: (state, action) => {
      state.portfolioDelete.loading = false;
      state.portfolioDelete.Error = true;
      state.portfolioDelete.Success = false;
    },
    // put

    [PortfolioPut.pending]: (state, action) => {
      state.portfolioPut.loading = true;
    },
    [PortfolioPut.fulfilled]: (state, action) => {
      state.portfolioPut.Error = false;
      state.portfolioPut.Success = true;
      state.portfolioPut.Loading = false;
    },
    [PortfolioPut.rejected]: (state, action) => {
      state.portfolioPut.Error = true;
      state.portfolioPut.Success = false;
      state.portfolioPut.Loading = false;
    },

    [UploadCategoryImage.pending]: (state, action) => {
      state.uploadCategoryImage.Loading = true;
    },
    [UploadCategoryImage.fulfilled]: (state, action) => {
      state.uploadCategoryImage.Error = false;
      state.uploadCategoryImage.Success = true;
      state.uploadCategoryImage.Loading = false;
      state.uploadCategoryImage.data = action.payload;
      // console.log( );
    },
    [UploadCategoryImage.rejected]: (state, action) => {
      state.uploadCategoryImage.Error = true;
      state.uploadCategoryImage.Success = false;
      state.uploadCategoryImage.Loading = false;
    },
  },
});

export const {} = PortfolioSlice.actions;
export default PortfolioSlice.reducer;
