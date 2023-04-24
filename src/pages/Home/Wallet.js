import React, {useEffect, useState} from "react";
import axios from "axios";
import AWalletElement from "./AWalletElement";
import WalletDetailContent from "./WalletDetailContent";
import CreateWalletForm from "./createWalletForm";
import SimpleSlider from "./demo";
import WalletTransaction from "./WalletTransaction";


import("./Wallet.css")
export default function Wallet(){
    let [nav1,setNav1]=useState();
    const [wallets,setWallets]=useState([])
    const [walletChoice,setWalletChoice]=useState(null)
    const [currentIndex,setCurrentIndex]=useState(0)
    const [isUpdate,setIsUpdate]=useState(true)
    const [click,setClick]=useState(false)
    const [showCreateForm,setShow]=useState(false)
    const idUser = localStorage.getItem("id");
    const [showUpdateForm,setUpdate]=useState(false)
    const [page,setPage]=useState(0)
    const [totalPages,setTotalPages]=useState(0)
    let index=page*5;
    useEffect(()=>{
        axios.get(`http://localhost:8080/user${idUser}/wallets/page${page}`).then((res)=> {
            setWallets(res.data.content)
            setTotalPages(res.data.totalPages)
            setIsUpdate(false)
            setWalletChoice(res.data[0])
        })
    },[page,isUpdate])
    function createPageArray(value){
        let array=[]
        if(totalPages>=5) {
            if (4 < value && value < totalPages - 3) {
                for (let i = 0; i < 5; i++) {
                    array.push(i + value - 2)
                }
                return array
            } else if (value <= 4) {
                array = [1, 2, 3, 4, 5]
                return array
            } else {
                array = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
                return array
            }
        } else{
            for (let i = 1; i <= totalPages; i++) {
                array.push(i)
            }
            return array
        }
    }
    function createPageDiv(arrays){
        return<div>
            {4<page+1&&<button>1...</button>}
            {arrays.map(arr=>{
                return <button style={{backgroundColor: arr!==page+1?"white":"red"}} id={""+arr} onClick={(e)=>{setPage(+e.currentTarget.id-1)}}>{arr}</button>
            })}
            {totalPages-3>page+1&&<button>...{totalPages}</button>}
        </div>
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
                    <tr key={wallet.id} id={""+index} onClick={(e)=>{
                        nav1.slickGoTo(e.currentTarget.id-5*page );
                        setWalletChoice(wallets[+e.currentTarget.id])
                        setCurrentIndex(e.currentTarget.id-5*page)
                    }
                    }>
                        <td>{++index}</td>
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
                <div className={"pagination-btn-container"}>
                <button onClick={()=>{setPage(page-1)}}> {"<"} </button>
                {createPageDiv(createPageArray(page+1))}
                <button onClick={()=>{setPage(page+1)}}>></button>
                </div>
            </div>
                  <SimpleSlider wallets={wallets} nav1={nav1} setNav1={setNav1} setUpdate={setUpdate} setWalletChoice={setWalletChoice} setIsUpdate={setIsUpdate}></SimpleSlider>
            {/*<div className={"wallet-statistics"}></div>*/}
            {/*<div className={"wallet-chart"}>*/}
            {/*    <WalletDetailContent wallet={walletChoice} click={click} setClick={setClick} setWalletChoice={setWalletChoice} setIsUpdate={setIsUpdate}></WalletDetailContent>*/}
            {/*</div>*/}
           <WalletTransaction wallet={wallets[currentIndex]} setCurrentIndex={setCurrentIndex}></WalletTransaction>
        </div>
            {showCreateForm&&!showUpdateForm&&<CreateWalletForm setIsUpdate={setIsUpdate} setShow={setShow}></CreateWalletForm>}
            {!showCreateForm&&showUpdateForm&&<CreateWalletForm setIsUpdate={setIsUpdate} wallet={walletChoice} setWalletChoice={setWalletChoice} setUpdate={setUpdate}></CreateWalletForm>}

        </>
    )
}