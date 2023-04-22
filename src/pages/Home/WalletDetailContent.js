
import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import axios from "axios";
import ChoiceModalBox from "./ChoiceModalBox";
import("./WalletDetailContent.css");
export default function WalletDetailContent({wallet,setIsUpdate,setWalletChoice,click,setClick,setUpdate}){
    const [editActive,setEditActive]=useState(false)
    const [activeIcon,setActiveIcon] = useState("")
    const [activeColor,setActiveColor] = useState("")
    const [shown,setShown]=useState(false)
    useEffect(()=>{
        if(click){
        setActiveIcon(wallet.icon)
        setActiveColor(wallet.backgroundColor)
        setClick(false)
        }
    },[click])
    function setIcon(e){
        setActiveIcon(e.currentTarget.id);
    }
    function setColor(e){
        setActiveColor(e.currentTarget.style.backgroundImage)
    }
    function save(values){
      let wallet={
          id: values.id,
          name: values.name,
          totalMoney: values.totalMoney,
          icon: activeIcon,
          backgroundColor: activeColor,
          limitMoney: values.limitMoney
      }
      axios.put(`http://localhost:3000/wallets/${wallet.id}`,wallet).then((res)=>{
            setEditActive(false)
          setIsUpdate(true)
          setWalletChoice(res.data)
        }
      )
    }
    function deleteWallet(){
        if (window.confirm("Confirm to delete")){
            axios.delete(`http://localhost:3000/wallets/${wallet.id}`).then(()=>{
                alert("Success to delete")
                setIsUpdate(true)
                setWalletChoice(null)
            })
        }
    }
    return wallet ===null?(<></>): (<Formik
            initialValues={{
                id: wallet.id,
                name: wallet.name,
                totalMoney: wallet.totalMoney,
                limitMoney: wallet.limitMoney
            }}
            onSubmit={(values)=>{save(values)}}
            enableReinitialize={true}
        >
        {()=>(
            <Form className={"walletDetail-content"}>
                <div className={"choice-box-icon"} onClick={()=>{setShown(!shown)}}>
                    <i className={"fa fa-ellipsis-v"} style={{fontSize: "25px",left: "0",top: "0"}}></i>
                </div>
            <table className={"walletDetail-content-table"}>
                <thead></thead>
                <tbody>
                <tr>
                    <td><p>Name:</p></td>
                    <td>{!editActive?<p>{wallet.name}</p>:<Field name={"name"}></Field>}</td>
                </tr>
                <tr>
                    <td><p>Total Money:</p></td>
                    <td>{!editActive?<p>{wallet.totalMoney}</p>:<Field name={"totalMoney"}></Field>}</td>
                </tr>
                <tr>
                    <td><p>Icon:</p></td>
                    <td>{!editActive?<i className={wallet.icon}></i>:<>
                        <div className="block-wallet" id="block-fa-dumbbell" >
                        <div className="icon-wallet" id="fas fa-credit-card" style={{borderRadius:activeIcon==="fas fa-credit-card"?"2px":"100px"}} onClick={setIcon}>
                            <i className="fas fa-credit-card"></i>
                        </div>
                        <p id="1">Tập thể dục</p>
                    </div>
                        <div className="block-wallet" id="block-fa-bus" >
                        <div className="icon-wallet" id="fa-light fa-bus" style={{borderRadius:activeIcon==="fa-light fa-bus"?"2px":"100px"}} onClick={setIcon}>
                        <i className="fa-light fa-bus"></i>
                        </div>
                        <p id="2">Di chuyển</p>
                        </div>
                        <div  className="block-wallet" id="block-fa-mug-saucer">
                        <div className="icon-wallet" style={{borderRadius:activeIcon==="fa-light fa-mug-saucer"?"2px":"100px"}} id="fa-light fa-mug-saucer" onClick={setIcon}>
                        <i className="fa-light fa-mug-saucer"></i>
                        </div>
                        <p id="2">Cafe</p>
                        </div></>
                    }
                    </td>
                </tr>
                <tr>
                    <td><p>Background:</p></td>
                    <td>{!editActive?<div className={"color-sample"} style={{backgroundImage: wallet.backgroundColor}}></div>:(
                        <>
                        <div className={"color-sample"} style={{backgroundImage: "linear-gradient(to right bottom, green, black, blue)",opacity:activeColor==="linear-gradient(to right bottom, green, black, blue)"?"1":"0.3"}} onClick={setColor}></div>
                        <div className={"color-sample"} style={{backgroundImage: "linear-gradient(to right, red, yellow)",opacity:activeColor==="linear-gradient(to right, red, yellow)"?"1":"0.3"}} onClick={setColor}></div>
                        <div className={"color-sample"} style={{backgroundImage: "linear-gradient(to right, blue, purple)",opacity:activeColor==='linear-gradient(to right, blue, purple)'?"1":"0.3"}} onClick={setColor}></div>
                        </>
                        )}
                    </td>
                </tr>
                <tr>
                    <td><p>Limit:</p></td>
                    <td>{!editActive?<p>{wallet.limitMoney}</p>:<Field name={"limitMoney"}></Field>}</td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        {editActive &&<button type={"submit"}>Confirm</button>}
                        <button type={!editActive?"button":"reset"}
                                onClick={()=>{
                                    setEditActive(!editActive)
                                    setClick(false)
                                }}
                        >{!editActive?"Edit":"Back"}</button>
                    </td>
                </tr>
                </tbody>
            </table>
                <div>
                    {shown&&<ChoiceModalBox wallet={wallet} setWalletChoice={setWalletChoice} setUpdate={setUpdate} setIsUpdate={setIsUpdate}></ChoiceModalBox>}
                </div>
            </Form>)}
        </Formik>
        )
}