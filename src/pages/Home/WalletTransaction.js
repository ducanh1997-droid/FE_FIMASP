import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

export default function WalletTransaction({wallet,setCurrentIndex}){
    const [transactions,setTransaction]=useState([])
    const [page,setPage]=useState(0)
    const [totalPages,setTotalPages]=useState(0)
    const [pageChoice,setPageChoice]=useState(0)
    const [currenWallet,setCurrentWallet]=useState()
    // const [pageChoice,setPageChoice]=useState(0)
    let index=page*5;
    useEffect(()=>{
        axios.get(`http://localhost:8080/user1/cashes/${wallet?.id}/page${page}`).then((res)=> {
            setTransaction(res.data.content)
            setTotalPages(res.data.totalPages)
        })
    },[page])
    useEffect(()=>{
        axios.get(`http://localhost:8080/user1/cashes/${wallet?.id}/page${page}`).then((res)=> {
            setTransaction(res.data.content)
            setTotalPages(res.data.totalPages)
            setPage(0)
        })
    },[wallet])
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
return(
    <>
        <div className={"wallet-transaction-list"}>
            <div className={"wallet-head"}>
                <div className={"wallet-head-between"}>
                    <div className={"wallet-head-content"}><h2>Transaction History</h2></div>
                    <div className={"wallet-head-content"}>
                        <div
                            className="icon-border-wallet"
                            style={{cursor: "pointer"}}
                            // onClick={()=>{setShow(true)}}
                        >
                            <i className="fa-solid fa-plus"/>
                            <span>Add Wallet</span>
                        </div>
                    </div>
                </div>
            </div>
            <table className={"transaction-list-table"}>
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
                    transactions.map(transaction=>{
                        return(
                            <tr key={transaction?.id} >
                                <td>{++index}</td>
                                <td>{transaction?.name}</td>
                                <td>{transaction?.money}</td>
                                <td>{transaction?.type}</td>
                                <td></td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot></tfoot>
            </table>
            <button onClick={()=>{setPage(page-1)}}> {"<"} </button>
            {createPageDiv(createPageArray(page+1))}
            <button onClick={()=>{setPage(page+1)}}>></button>
        </div>
    </>
)
}