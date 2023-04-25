
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
import CreateTransaction from "./CreateTransaction";
import context from "../../store/Context";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import UpdateTransaction from "./UpdateTransactionIncome";
import UpdateTransactionIncome from "./UpdateTransactionIncome";
import UpdateTransactionExpence from "./UpdateTransactionExpence";
export default React.memo(function Home(props) {
    let content = props.content;
    const [dialog,setDialog] = useState(false);
    const [dialogUpdateIncome,setDialogUpdateIncome] = useState(false);
    const [dialogUpdateExpence,setDialogUpdateExpence] = useState(false);
    const [idCashUpdate,setIdCashUpdate] = useState(0)
    const [idIconCategoryUpdate,setIdIconCategoryUpdate] = useState("");

    const [createTransactionSuccess,setCreateTransactionSuccess] = useState(false);
    const [updateTransactionSuccess,setUpdateTransactionSuccess] = useState(false);

    const [imgHeader,setImgHeader] = useState(localStorage.getItem("avatar"));


    function openUpdateTransactionSuccess() {
        setUpdateTransactionSuccess(true);
    }
    function closeUpdateTransactionSuccess() {
        setUpdateTransactionSuccess(false)
    }

    function openCreateTransactionSuccess() {
        setCreateTransactionSuccess(true);
    }
    function closeCreateTransactionSuccess() {
        setCreateTransactionSuccess(false)
    }

    function openDialog() {
        setDialog(true);
    }
    function closeDialog() {
        setDialog(false)
    }
    function openDialogUpdateIncome(id,icon) {
        setDialogUpdateIncome(true);
        setIdCashUpdate(id);
        setIdIconCategoryUpdate(icon);
    }
    function closeDialogUpdateIncome() {
        setDialogUpdateIncome(false)
    }
    function openDialogUpdateExpence(id,icon) {
        setDialogUpdateExpence(true);
        setIdCashUpdate(id);
        setIdIconCategoryUpdate(icon);
    }
    function closeDialogUpdateExpence() {
        setDialogUpdateExpence(false)
    }
    function renderSwitch() {

        switch(content) {
            case 'Dashboard':

                return <Dashboard/>;

            case 'Transaction':

                return <Transaction updateSuccess={updateTransactionSuccess} closeUpdate={closeUpdateTransactionSuccess} createSuccess={createTransactionSuccess} closeCreate={closeCreateTransactionSuccess} dialog={dialog} close={closeDialog} open={openDialog}
                        openUpdateIncome={openDialogUpdateIncome} dialogUpdateIncome={dialogUpdateIncome} closeUpdateIncome={closeDialogUpdateIncome}
                        openUpdateExpence={openDialogUpdateExpence} dialogUpdateExpence={dialogUpdateExpence} closeUpdateExpence={closeDialogUpdateExpence}/>;
            case 'Plan':

                return <Plan/>;
            case 'Wallet':

                return <Wallet/>;

            case 'Profile':

                return <Profile setImageHeader={setImgHeader} />;
            case 'ChangePassword':

                return <ChangePassword/>;
            default:
                return 'foo';
        }
    }
    return (
        <>
            <div id='Wrapper'>
                <UpdateTransactionIncome updateSuccess={openUpdateTransactionSuccess} dialogUpdateIncome={dialogUpdateIncome} idCashUpdate={idCashUpdate} icon={idIconCategoryUpdate} closeUpdateIncome={closeDialogUpdateIncome} />
                <UpdateTransactionExpence updateSuccess={openUpdateTransactionSuccess} dialogUpdateExpence={dialogUpdateExpence} idCashUpdate={idCashUpdate} icon={idIconCategoryUpdate}  closeUpdateExpence={closeDialogUpdateExpence} />
                <CreateTransaction createSuccess={openCreateTransactionSuccess} dialog={dialog} close={closeDialog} open={openDialog}/>
                <Header imageHeader={imgHeader} dialog={dialog} close={closeDialog}/>
            </div>
            <div id='WrapperContent'>
                <Sidebar/>
                <div id='content'>
                    {renderSwitch()}
                </div>
            </div>
        </>

    );

})



