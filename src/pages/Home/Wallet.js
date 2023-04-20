import {useState} from "react";
import axios from "axios";
import AWalletElement from "./AWalletElement";
import WalletDetailContent from "./WalletDetailContent";
import CreateWalletForm from "./createWalletForm";

import("./Wallet.css")
export default function Wallet(){
    const [wallets,setWallets]=useState([])
    const [walletChoice,setWalletChoice]=useState(null)
    const [isUpdate,setIsUpdate]=useState(true)
    const [click,setClick]=useState(false)
    const [showCreateForm,setShow]=useState(false)

    const idUser = localStorage.getItem("id");
    if(isUpdate){
        axios.get(`http://localhost:8080/user${idUser}/wallets`).then((res)=>{
            setWallets(res.data)
            setIsUpdate(false)
            setWalletChoice(res.data[0])
        })
    }
    return(<>
        <div className="content-account wallet-content-account" style={!showCreateForm?{filter: "blur(0px)"}:{filter: "blur(3px)"}}>
            <div
                className="icon-border-wallet"
                style={{cursor: "pointer"}}
                onClick={()=>{setShow(true)}}
            >
                <i className="fa-solid fa-plus"/>
            </div>
            <div className={"wallet-container"}>
                {wallets.map(wallet=>{
                    return <AWalletElement key={wallet?.id} setClick={setClick} wallet={wallet} setWalletChoice={setWalletChoice}></AWalletElement>
                })
                }
            </div>
            <div className={"wallet-detail"}>
                <WalletDetailContent wallet={walletChoice} click={click} setClick={setClick} setWalletChoice={setWalletChoice} setIsUpdate={setIsUpdate}></WalletDetailContent>
            </div>
            <div className={"wallet-statistics"}></div>
            <div className={"wallet-chart"}></div>
        </div>
            {showCreateForm&&<CreateWalletForm setIsUpdate={setIsUpdate} setShow={setShow}></CreateWalletForm>}
        </>
    )
}