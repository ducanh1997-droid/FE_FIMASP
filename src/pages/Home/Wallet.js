import React, {useState} from "react";
import axios from "axios";
import AWalletElement from "./AWalletElement";
import WalletDetailContent from "./WalletDetailContent";
import CreateWalletForm from "./createWalletForm";
import SimpleSlider from "./demo";
import DashBoardWalletElement from "./DashBoardWallet";

import("./Wallet.css")
export default function Wallet(){
    let index=0;
    let [nav1,setNav1]=useState();
    const [wallets,setWallets]=useState([])
    const [walletChoice,setWalletChoice]=useState(null)
    const [isUpdate,setIsUpdate]=useState(true)
    const [click,setClick]=useState(false)
    const [showCreateForm,setShow]=useState(false)
    if(isUpdate){
        axios.get("http://localhost:3000/wallets").then((res)=>{
            setWallets(res.data)
            setIsUpdate(false)
            setWalletChoice(res.data[0])
        })
    }
    return(<>
        <div className="content-account wallet-content-account" style={!showCreateForm?{filter: "blur(0px)"}:{filter: "blur(3px)"}}>

            <div className={"wallet-head"}>
                <div className={"wallet-head-between"}>
                    <div className={"wallet-head-content"}><h1>Wallet</h1></div>
                    <div className={"wallet-head-content"}>
                        <div
                            className="icon-border-wallet"
                            style={{cursor: "pointer"}}
                            onClick={()=>{setShow(true)}}
                        >
                            <i className="fa-solid fa-plus"/>
                            <span>Add Wallet</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"wallet-container"}>
                 <h1>Wallet 's list</h1>
                 <table className={"wallet-list-table"}>
                <thead>
                <tr>
                    <td>Index</td>
                    {/*<td>Wallet image</td>*/}
                    <td>Name</td>
                    <td>Total money</td>
                    <td>Limit money</td>
                    <td>Description</td>
                </tr>
                </thead>
                <tbody>
                {
                    wallets.map(wallet=>{
                return(
                    <tr key={wallet.id} id={""+index} onClick={(e)=>{nav1.slickGoTo(e.currentTarget.id)}}>
                        <td>{++index}</td>
                        {/*<td><div className={"table-wallet-container"}></div></td>*/}
                        <td>{wallet.name}</td>
                        <td>{wallet.totalMoney}</td>
                        <td>{wallet.limitMoney}</td>
                        <td></td>
                    </tr>
                )
                })}
                </tbody>
                <tfoot></tfoot>
            </table>
            </div>
                  <SimpleSlider wallets={wallets} nav1={nav1} setNav1={setNav1}></SimpleSlider>
            {/*<div className={"wallet-statistics"}></div>*/}
            {/*<div className={"wallet-chart"}>*/}
            {/*    <WalletDetailContent wallet={walletChoice} click={click} setClick={setClick} setWalletChoice={setWalletChoice} setIsUpdate={setIsUpdate}></WalletDetailContent>*/}
            {/*</div>*/}
        </div>
            {showCreateForm&&<CreateWalletForm setIsUpdate={setIsUpdate} setShow={setShow}></CreateWalletForm>}
        </>
    )
}