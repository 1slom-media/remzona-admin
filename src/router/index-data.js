import { lazy } from "react";
import Cookies from "universal-cookie";
const Login = lazy(() => import("../pages/login/index"));
const AddAdmin = lazy(() => import("../pages/add_admin/index"));
const Contact = lazy(() => import("../pages/contact/index"));
const Portfolio = lazy(() => import("../pages/portfolio/index"));
const Blog = lazy(() => import("../pages/blog/index"));
const Seo =lazy(()=>import("../pages/seo/index"));
const cookie = new Cookies();

export const RouterData = [
  {
    id: 1,
    path: "/",
    component: <Login />,
  },
  {
    id: 2,
    path: "/adminadd",
    component: cookie.get("token") ? <AddAdmin /> : null,
  },
  {
    id: 3,
    path: "/contact",
    component: cookie.get("token") ? <Contact /> : null,
  },
  {
    id: 4,
    path: "/portfolio",
    component: cookie.get("token") ? <Portfolio /> : null,
  },
  {
    id: 5,
    path: "/blog",
    component: cookie.get("token") ? <Blog /> : null,
  },
  {
    id: 6,
    path: "/seo",
    component: cookie.get("token") ? <Seo/>: null,
  }
];
