import React, {memo, useEffect, useRef, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import axios from "axios";
export default React.memo(function UpdateTransactionIncome(props){
    const[cash,setCash] = useState({})
    const [wallets,setWallets] = useState([]);
    const [categories,setCategories] = useState([]);
    const [categoriesIncome,setCategoriesIncome] = useState([])
    const [activeCategory,setActiveCategory] = useState("")
    const [categorygetId,setCategoryGetId] = useState("1")
    const wrapperRef = useRef(null);

    const idUser = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    useEffect(() => {
        setActiveCategory(props.icon);
        axios.get(`http://localhost:8080/user${idUser}/cashes/detail/${props.idCashUpdate}`).then((response) => {
            setCash(response.data)
        })

        axios.get(`http://localhost:8080/user${idUser}/wallets`).then((res)=>{
            setWallets(res.data)
        })

        axios.get("http://localhost:8080/categories/expences").then((res)=>{
            setCategories(res.data)
        })
        axios.get("http://localhost:8080/categories/income").then((res)=>{
            setCategoriesIncome(res.data)
        })
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                props.closeUpdateIncome()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props,wrapperRef]);
    function categoryActive(e){
        setActiveCategory(e.currentTarget.id);
        setCategoryGetId(e.currentTarget.classList.item(0))
    }
    const Validation = Yup.object().shape({
        name: Yup.string().max(15, "Không quá 15 ký tự"),
        money: Yup.string().required("Vui lòng nhập chi tiêu!").min(0, "Vui lòng nhập chi tiêu!").matches(/^[0-9]+$/, "Không đúng định dạng số!"),
        wallet: Yup.object().shape({
            id: Yup.string().required("Vui lòng chọn ví!"),
        })
    })
    return(
        <>
            <div id="popup" ref={wrapperRef} style={{display:props.dialogUpdateIncome?"block":"none"}}>
                <div className="tab-header">
                    <div className={"active"} id="income" style={{width:"100%",fontSize:"20px"}}>
                        Thu nhập
                    </div>
                </div>
                        <Formik initialValues={{
                            date: cash.date,
                            money: cash.money,
                            type:"income",
                            name: cash.name,
                            wallet: {
                                "id":cash.wallet?.id
                            },
                            account:{
                                id:idUser
                            },
                            category:cash.category,
                        }}
                                onSubmit={(values) => {
                                    save(values)}
                                }
                            validationSchema={Validation}
                                enableReinitialize={true}
                        >
                            {({ errors, touched,values,initialValues }) => (
                                <Form>

                                    <div className="form">
                                        <table style={{width:"100%",marginLeft:"10%"}}>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <label>
                                                        <Field
                                                            type="text"
                                                            id="money"
                                                            name={"money"}
                                                        />
                                                        VND &ensp;&ensp;
                                                        <span style={{color:"red"}}>
                                                        <ErrorMessage name={'money'}  />
                                                    </span>
                                                    </label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>
                                                        <Field type="text" id="action" name={'name'}/>
                                                        Ghi chú&ensp;&ensp;
                                                        <span style={{color:"red"}}>
                                                        <ErrorMessage name={'name'}  />
                                                    </span>
                                                    </label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Tài khoản</label>
                                                    <div className="select-box">
                                                        <Field as="select" name={"wallet.id"} id="select-box1" className="select">
                                                            <option value={''}>-- Chọn ví --</option>
                                                            {wallets.map((item,id)=>{
                                                                return(
                                                                    <option key={id} value={item.id}>{item.name}</option>
                                                                )
                                                            })
                                                            }
                                                        </Field>
                                                        &ensp;&ensp;
                                                        <span style={{color:"red"}}>
                                                        <ErrorMessage name={'wallet.id'}  />
                                                    </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td id="category-expense">
                                                    <label>Danh mục</label><br/><br/>
                                                    {categoriesIncome.map((item)=>{
                                                        return(
                                                            <div  className="block-category" id={"block-"+item.icon}>
                                                                {activeCategory===item.icon&&setCategoryGetId(item.id)}
                                                                <div className={item.id +' icon-border'} id={item.icon} style={{borderRadius:activeCategory===item.icon?"2px":"100px"}} onClick={categoryActive}>
                                                                    <i id={item.id} className={"fa-light " + item.icon} ></i>
                                                                </div>
                                                                <p >{item.name}</p>
                                                            </div>
                                                        )
                                                    })}
                                                    <br/>
                                                    <br/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label htmlFor="date1">Chọn ngày</label>
                                                    <Field type="date" id="date1" name={"date"} className="date"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <button type={'submit'} style={Object.keys(errors).length!==0
                                                        ?{background:"rgb(141,191,114)",cursor:"not-allowed"}:{background:"rgb(79 161 34)",cursor:"pointer"}} className="edit">OK</button>
                                                    <button type={'button'} className="cancel" onClick={props.closeUpdateIncome}>
                                                        Huỷ
                                                    </button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Form>)}
                        </Formik>
            </div>
        </>
    )
    function save(values) {
        values.id = props.idCashUpdate;
        values.category.id = categorygetId;
        axios.put(`http://localhost:8080/user${idUser}/cashes/${props.idCashUpdate}`,values,{headers: {"Authorization": `Bearer ${token}`}}).then(()=>{
            props.updateSuccess()
            props.closeUpdateIncome()
        })
    }
})