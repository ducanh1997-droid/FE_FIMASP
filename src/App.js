import logo from './logo.svg';
import Navbar from "./core/Navbar";
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, Routes} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";


function App() {
    let x=1;
    const routes=createBrowserRouter(createRoutesFromElements(
        <>
            <Route path={'/'} element={<Navigate to={"/home"}></Navigate>}></Route>
            <Route path={'/dashboard'} element={<Home content="Dashboard"/>}></Route>
            <Route path={'/transaction'} element={<Home content="Transaction"/>}></Route>
            <Route path={'/plan'} element={<Home content="Plan"/>}></Route>
            <Route path={'/wallet'} element={<Home content="Wallet"/>}></Route>
            <Route path={'/setting'} element={<Home content="Setting"/>}></Route>
            <Route path={'/profile'} element={<Home content="Profile"/>}></Route>
            <Route path={'/changePassword'} element={<Home content="ChangePassword"/>}></Route>
            <Route path={'/logout'} element={<Login/>}></Route>
            <Route path={"/home"} element={<HomePage></HomePage>}></Route>
        </>
    ))
  return (
    <div className="App">
        <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
