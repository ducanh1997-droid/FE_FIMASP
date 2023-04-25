import axios from "axios";
import {useState} from "react";

export default function  ChoiceModalBox({wallet,setIsUpdate,setWalletChoice,setUpdate}){
    const  userId = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    function deleteWallet(){
        if (window.confirm("Confirm to delete")){
            axios.delete(`http://localhost:8080/user${userId}/wallets/${wallet.id}`,{headers: {"Authorization": `Bearer ${token}`}}).then(()=>{
                alert("Success to delete")
                setIsUpdate(true)
                setWalletChoice(null)
            })
        }
    }

    function scrollTransaction() {
        window.scrollTo(0,720)
    }

    return(
    <div className={"choice-modal-box"}>
        <ul>
            <li onClick={()=>{setUpdate(true)}}><i className={"far fa-edit"}></i><span>Sửa ví</span></li>
            <li onClick={deleteWallet}><i className={"fa fa-trash"} ></i><span>Xóa ví</span></li>
            <li onClick={scrollTransaction}><i className={"fas fa-angle-double-down"} ></i><span>Giao dịch</span></li>
        </ul>
    </div>
)
}