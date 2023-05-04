
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, Routes} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Home from "./pages/Home/Home";
import ConfirmAccount from "./pages/Login/ConfirmAccount";


function App() {
    let x=1;
    const routes=createBrowserRouter(createRoutesFromElements(
        <>
            <Route path={'/'} element={<Navigate to={"/home"}></Navigate>}></Route>
            <Route path={'/dashboard'} element={<Home content="Dashboard"/>}></Route>
            <Route path={'/transaction'} element={<Home content="Transaction"/>}></Route>
            <Route path={'/category'} element={<Home content="Category"/>}></Route>
            <Route path={'/analytic'} element={<Home content="Analytic"/>}></Route>
            <Route path={'/wallet/:status?'} element={<Home content="Wallet"/>}></Route>
            <Route path={'/setting'} element={<Home content="Setting"/>}></Route>
            <Route path={'/profile'} element={<Home content="Profile"/>}></Route>
            <Route path={'/changePassword'} element={<Home content="ChangePassword"/>}></Route>
            <Route path={'/confirm-email/:id'} element={<ConfirmAccount/>}></Route>
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
