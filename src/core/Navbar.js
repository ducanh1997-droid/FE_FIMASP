import {Link, Route, Routes} from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

export default function Navbar() {
    return (
        <>
            <Routes>
                {/*<Route path={'product'} element={<ProductManager data={'values'} />}></Route>*/}
                {/*<Route path={'form-product'} element={<FormProduct/>}></Route>*/}
                <Route path={'/dashboard'} element={<Home content="Dashboard"/>}></Route>
                <Route path={'/transaction'} element={<Home content="Transaction"/>}></Route>
                <Route path={'/plan'} element={<Home content="Plan"/>}></Route>
                <Route path={'/wallet'} element={<Home content="Wallet"/>}></Route>
                <Route path={'/setting'} element={<Home content="Setting"/>}></Route>
                <Route path={'/profile'} element={<Home content="Profile"/>}></Route>
                <Route path={'/changePassword'} element={<Home content="ChangePassword"/>}></Route>
                <Route path={'/logout'} element={<Login/>}></Route>
            </Routes>
        </>
    );
}
