import { Navigate } from "react-router-dom";
import LayoutDefault from "../components/Layout/LayoutDefault";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import Search from "../pages/Search";
import Company from "../pages/Company";
import CompanyDetail from "../pages/Company/CompanyDetail";
import JobDetail from "../pages/Job/JobDetail";
import PrivateRoutes from "../components/PrivateRoutes";
import LayoutAdmin from "../components/Layout/LayoutAdmin";
import Dashboard from "../pages/Dashboard";
import CVManage from "../pages/CVManage";
import CVDetail from "../pages/CVManage/CVDetail"
import InfoCompany from "../pages/InfoCompany";
import JobsManage from "../pages/JobManage";
import JobDetailAdmin from "../pages/JobManage/JobDetail";
import CreateJob from "../pages/JobManage/CreateJob";

export const routes = [
  //Public
  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "company",
        element: <Company />
      },
      {
        path: "company/:id",
        element: <CompanyDetail />
      },
      {
        path: "job/:id",
        element: <JobDetail />
      },
      {
        path: "*",
        element: <Navigate to="/" />
      }
    ]
  },
  //End Public

  //Private
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: "admin",
            element: <Dashboard />
          },
          {
            path: "logout",
            element: <Logout />
          },
          {
            path: "cv-manage",
            element: <CVManage />
          },
          {
            path: "info-company",
            element: <InfoCompany />
          }, 
          {
            path: "job-manage",
            element: <JobsManage />
          },
          {
            path: "job-detail/:id",
            element: <JobDetailAdmin />
          },
          {
            path: "cv-detail/:id",
            element: <CVDetail />
          },
          {
            path: "create-job",
            element: <CreateJob />
          }
        ]
      }
    ]
  }
  //End Private
]