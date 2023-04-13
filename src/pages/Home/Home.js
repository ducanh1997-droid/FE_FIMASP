
import '../../assets/css/reset.css'
import '../../assets/css/home.css'
import '../../v6.3.0/css/all.css'
import '../../v6.3.0/css/sharp-regular.css'
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Transaction from "./Transaction";
import  React, {useEffect, useMemo, useState} from "react";
import Plan from "./Plan";
import Wallet from "./Wallet";
import CreateForm from "./CreateForm";
import context from "../../store/Context";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
export default function Home(props) {
    let content = props.content;
    const [dialog,setDialog] = useState(false);

    function openDialog() {
        setDialog(true);
    }
    function closeDialog() {
        setDialog(false)
    }
    function renderSwitch() {

        switch(content) {
            case 'Dashboard':

                return <Dashboard/>;

            case 'Transaction':

                return <Transaction dialog={dialog} open={openDialog} />;
            case 'Plan':

                return <Plan/>;
            case 'Wallet':

                return <Wallet/>;

            case 'Profile':

                return <Profile/>;
            case 'ChangePassword':

                return <ChangePassword/>;
            default:
                return 'foo';
        }
    }
    return (
        <>
            <div id='Wrapper'>
                <Header dialog={dialog} close={closeDialog}/>
            </div>
            <div id='WrapperContent'>
                <Sidebar/>
                <div id='content'>
                    {renderSwitch()}
                </div>
            </div>
        </>

    );

}



