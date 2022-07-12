import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Inventory from "./DynamicPage/Inventory";
import SignIn from "./entry/SignIn";
import SignUp from "./entry/SignUp";
import Denied from "./Error/Denied";
import NoFound from "./Error/NoFound";
import Home from "./Home/Home";
import Dashboard from "./nestedRoutes/Dashboard";
import AddNewProduct from "./nestedRoutes/forAdmins/AddNewProduct";
import ManageOrders from "./nestedRoutes/forAdmins/ManageOrders";
import ManageProducts from "./nestedRoutes/forAdmins/ManageProducts";
import ManageUsers from "./nestedRoutes/forAdmins/ManageUsers";
import AddReview from "./nestedRoutes/forUsers/AddReview";
import MyOrders from "./nestedRoutes/forUsers/MyOrders";
import Profile from "./nestedRoutes/Profile";
import RequireAdmin from "./RequireAuth/RequireAdmin";
import RequireCommon from "./RequireAuth/RequireCommon";
import RequireUser from "./RequireAuth/RequireUser";
import Footer from "./Shared/Footer";
import Navbar from "./Shared/Navbar";

function App() {
  return (
    <div className="App">
      <Toaster></Toaster>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route
          path="/dashboard"
          element={
            <RequireCommon>
              <Dashboard></Dashboard>
            </RequireCommon>
          }
        >
          <Route index element={<Profile></Profile>}></Route>
          <Route
            path="addReview"
            element={
              <RequireUser>
                <AddReview></AddReview>
              </RequireUser>
            }
          ></Route>
          <Route
            path="myOrders"
            element={
              <RequireUser>
                <MyOrders></MyOrders>
              </RequireUser>
            }
          ></Route>
          <Route
            path="manageUsers"
            element={
              <RequireAdmin>
                <ManageUsers></ManageUsers>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="addNewProduct"
            element={
              <RequireAdmin>
                <AddNewProduct></AddNewProduct>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="manageOrders"
            element={
              <RequireAdmin>
                <ManageOrders></ManageOrders>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="manageProducts"
            element={
              <RequireAdmin>
                <ManageProducts></ManageProducts>
              </RequireAdmin>
            }
          ></Route>
        </Route>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
        <Route path="/signIn" element={<SignIn></SignIn>}></Route>
        <Route
          path="/home/:id"
          element={
            <RequireCommon>
              <Inventory></Inventory>
            </RequireCommon>
          }
        ></Route>
        <Route path="/denied" element={<Denied></Denied>}></Route>
        <Route path="/*" element={<NoFound></NoFound>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
