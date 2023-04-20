import {Field, Form, Formik} from "formik";
import {useState} from "react";
import axios from "axios";
import("./CreateWalletForm.css")

export default function CreateWalletForm({setShow,setIsUpdate}){
    const [activeIcon,setActiveIcon] = useState("")
    const [activeColor,setActiveColor] = useState("")
    const idUser = localStorage.getItem("id")
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
        axios.post(`http://localhost:8080/user${idUser}/wallets`,wallet).then(()=>{
            setIsUpdate(true)
            setShow(false)
        })
    }
    return (
        <div className={"form-create-wallet"}>
            <Formik
                initialValues={{
                    id: "",
                    name: "",
                    totalMoney: "",
                    limitMoney: ""
                }}
                onSubmit={(values) => {
                    if(activeIcon!==""&&activeColor!==""){
                        save(values)
                    }
                }}
            >
                {({values})=><Form>
                    <table className={"walletDetail-content"}>
                        <thead></thead>
                        <tbody>
                        <tr>
                            <td><p>Name:</p></td>
                            <td><Field name={"name"}></Field></td>
                        </tr>
                        <tr>
                            <td><p>Total Money:</p></td>
                            <td><Field name={"totalMoney"}></Field></td>
                        </tr>
                        <tr>
                            <td><p>Icon:</p></td>
                            <td>
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
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><p>Background:</p></td>
                            <td>
                                <div className={"color-sample"} style={{backgroundImage: "linear-gradient(to right bottom, green, black, blue)",opacity:activeColor==="linear-gradient(to right bottom, green, black, blue)"?"1":"0.3"}} onClick={setColor}></div>
                                <div className={"color-sample"} style={{backgroundImage: "linear-gradient(to right, red, yellow)",opacity:activeColor==="linear-gradient(to right, red, yellow)"?"1":"0.3"}} onClick={setColor}></div>
                                <div className={"color-sample"} style={{backgroundImage: "linear-gradient(to right, blue, purple)",opacity:activeColor==='linear-gradient(to right, blue, purple)'?"1":"0.3"}} onClick={setColor}></div>
                            </td>
                        </tr>
                        <tr>
                            <td><p>Limit:</p></td>
                            <td><Field name={"limitMoney"}></Field></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type={"submit"}>Confirm</button>
                                <button type="button"
                                        onClick={()=>{setShow(false)}}
                                >Close</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className={"sample-wallet-context"}>
                        <p>Sample wallet</p>
                        <div className={"wallet"} style={{backgroundImage: activeColor}}>
                            <p className={"logoName"}>Fimasp</p>
                            <i className={activeIcon}></i>
                            <div className={"walletDetail"}>
                                <p>Wallet 's name:</p>
                                <p className={"walletName"}>{values?.name}</p>
                            </div>
                            <div className={"walletMoney"}>
                                <p>{values?.totalMoney}</p>
                            </div>
                            <div className={"walletLimit"}>
                                <p>Limit:</p>
                                <p className={"walletName"}>{values?.limitMoney}</p>
                            </div>
                        </div>
                    </div>
                </Form>
            }
            </Formik>
        </div>
    );
}