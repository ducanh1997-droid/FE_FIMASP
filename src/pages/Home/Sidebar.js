import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export default function Sidebar(){
    let navigate = useNavigate();
    const [active,setActive] = useState('dashboard');
    const [activeSetting,setActiveSetting] = useState('profile');
    return(
        <div id="sidebar">
            <ul id="menu-sidebar">
                <li onClick={isActive}>
                    <i className="fa-solid fa-chart-simple" style={{color:(active ==='dashboard'?"#ffffff":"#8d8d8d")}}></i>
                    <Link id="dashboard" className={active ==='dashboard'&&"active-sidebar"} to={'/dashboard'}>Trang chủ</Link>
                </li>
                <li onClick={isActive}>
                    <i className="fa-solid fa-user" style={{color:(active ==='exchange'?"#ffffff":"#8d8d8d")}}></i>
                    <Link id="exchange" className={active ==='exchange'&&"active-sidebar"} to={`/transaction`}>Giao dịch</Link>
                </li>
                <li onClick={isActive}>
                    <i className="fa-solid fa-ruler" style={{color:(active ==='plan'?"#ffffff":"#8d8d8d")}}></i>
                    <Link id="plan" className={active ==='plan'&&"active-sidebar"} to={`/plan`}>Lập kế hoạch</Link>
                    {/*<a id="plan"  href="#">Lập kế hoạch</a>*/}
                </li>
                <li onClick={isActive}>
                    <i className="fa-solid fa-piggy-bank" style={{color:(active ==='account'?"#ffffff":"#8d8d8d")}}></i>
                    <Link id="account" className={active ==='account'&&"active-sidebar"} to={`/wallet`}>Tài khoản</Link>
                </li>
                <li onClick={isActive}>
                    <i className="fa-solid fa-gear" style={{color:(active ==='setting'?"#ffffff":"#8d8d8d")}}></i>
                    <Link id="setting" className={active ==='setting'&&"active-sidebar"} to={`/profile`}>Cài đặt</Link>
                </li>
                <li onClick={isActiveSetting} style={{display:(active==='setting'?'block':'none')}}>

                    <Link id="profile" className={activeSetting ==='profile'&&"active-setting"} to={`/profile`}>Hồ sơ cá nhân</Link>
                </li>
                <li onClick={isActiveSetting} style={{display:(active==='setting'?'block':'none')}}>

                    <Link id="changePassword" className={activeSetting ==='changePassword'&&"active-setting"} to={`/changePassword`}>Đổi mật khẩu</Link>
                </li>
                <li onClick={isActiveSetting} style={{display:(active==='setting'?'block':'none')}}>

                    <Link id="logout" className={activeSetting ==='logout'&&"active-setting"} to={`/logout`}>Đăng xuất</Link>
                </li>

                {/*<li onClick="isActive()">*/}
                {/*    <i className="fa-solid fa-chart-column"></i>*/}
                {/*    <a id="chart" href="#">Biểu đồ</a>*/}
                {/*</li>*/}
            </ul>
        </div>
    )
    function isActive(e){
        setActive(e.target.id);
    }

    function isActiveSetting(e){
        setActiveSetting(e.target.id);
    }
}