import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./login/authSlice";
import AdminSlice from "./admin_add/index";
import SeoSlice from "./seo/index";
import ContactSlice from './contact/index';
import PortfolioSlice from './portfolio/index'
import BlogSlice from './blog/index'
export const store = configureStore({
  reducer: {
    admin: authSlice,
    adminadd: AdminSlice,
    contact: ContactSlice,
    portfolio: PortfolioSlice,
    seo:SeoSlice,
    blog: BlogSlice
  },
});