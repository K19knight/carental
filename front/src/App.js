import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AuthProvider from "./auth/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import React from "react";
import NotLoggedIn from "./components/routes/NotLoggedIn";
import LoggedIn from "./components/routes/LoggedIn";
import IsAdmin from "./components/routes/IsAdmin";
import AddCar from "./pages/AddCar";
import Cars from "./pages/Cars";
import RentCar from "./pages/RentCar";
import MyRents from "./pages/MyRents";

function App() {
    let routes = (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cars' element={<Cars/>}/>
            <Route element={<NotLoggedIn/>}>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Route>


            <Route element={<LoggedIn/>}>
                <Route path='/rent-car/:carId' element={<RentCar/>}/>
                <Route path='/my-rents' element={<MyRents/>}/>
                <Route element={<IsAdmin/>}>
                    <Route path='/add-car' element={<AddCar/>}/>
                </Route>
            </Route>

        </Routes>
    )


    return (
        <Router>
            <AuthProvider>
                <div id="container">
                    <Navbar/>
                    {routes}
                </div>
            </AuthProvider>
        </Router>

    );
}

export default App;
