
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Inventory from './DynamicPage/Inventory';
import SignIn from './entry/SignIn';
import SignUp from './entry/SignUp';
import Home from './Home/Home';
import Dashboard from './nestedRoutes/Dashboard';
import ManageUsers from './nestedRoutes/forAdmins/ManageUsers';
import AddReview from './nestedRoutes/forUsers/AddReview';
import MyOrders from './nestedRoutes/forUsers/MyOrders';
import Profile from './nestedRoutes/Profile';
import Footer from './Shared/Footer';
import Navbar from './Shared/Navbar';

function App() {
  return (
    <div className="App">
      <Toaster></Toaster>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}>
          <Route index element={<Profile></Profile>}></Route>
          <Route path="addReview" element={<AddReview></AddReview>}></Route>
          <Route path="myOrders" element={<MyOrders></MyOrders>}></Route>
          <Route path="manageUsers" element={<ManageUsers></ManageUsers>}></Route>
        </Route>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
        <Route path="/signIn" element={<SignIn></SignIn>}></Route>
        <Route path="/home/:id" element={<Inventory></Inventory>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
