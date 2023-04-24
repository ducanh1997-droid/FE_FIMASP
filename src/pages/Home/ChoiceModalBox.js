import axios from "axios";
import {useState} from "react";

export default function  ChoiceModalBox({wallet,setIsUpdate,setWalletChoice,setUpdate}){
    function deleteWallet(){
        if (window.confirm("Confirm to delete")){
            axios.delete(`http://localhost:3000/wallets/${wallet.id}`).then(()=>{
                alert("Success to delete")
                setIsUpdate(true)
                setWalletChoice(null)
            })
        }
    }
return(
    <div className={"choice-modal-box"}>
        <ul>
            <li onClick={()=>{setUpdate(true)}}><i className={"far fa-edit"}></i><span>Sửa ví</span></li>
            <li onClick={deleteWallet}><i className={"fa fa-trash"} ></i><span>Xóa ví</span></li>
            <li ><i className={"fas fa-angle-double-down"} ></i><span>Chuyển đến giao dịch</span></li>
        </ul>
    </div>
)
}