import React,{useEffect, useRef, useState} from "react";

import * as Yup from 'yup'
import axios from "axios";
import {useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
export default React.memo(function UpdateTransactionExpence(props){
    const[cash,setCash] = useState({})
    const [wallets,setWallets] = useState([]);
    const [categories,setCategories] = useState([]);
    const [categoriesIncome,setCategoriesIncome] = useState([])
    const [activeCategory,setActiveCategory] = useState("")
    const [categorygetId,setCategoryGetId] = useState("1")
    // const [category, setCategory] = useState({
    //     activeCategory: "fa-dumbbell",
    //     categoryId: "",
    // });
    const wrapperRef = useRef(null);
    useEffect(() => {
        setActiveCategory(props.icon);
        axios.get(`http://localhost:8080/user1/cashes/detail/${props.idCashUpdate}`).then((response) => {
            setCash(response.data)
        })
        axios.get("http://localhost:8080/user1/wallets").then((res)=>{
            setWallets(res.data)
        })
        axios.get("http://localhost:8080/categories/expences").then((res)=>{
            setCategories(res.data)
        })
        axios.get("http://localhost:8080/categories/income").then((res)=>{
            setCategoriesIncome(res.data)
        })
        /*
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                props.closeUpdateExpence()
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props,wrapperRef]);

    function categoryActive(e){
        // setCategory({
        //     activeCategory: e.currentTarget.id,
        //     categoryId: e.target.id,
        // })
        setActiveCategory(e.currentTarget.id);
        setCategoryGetId(e.target.id)
    }


    // const Validation = Yup.object().shape({
    //     fullName: Yup.string().required("Không được để trống!").max(20, "Dài quá 20 kí tự!"),
    //     phoneNumber: Yup.string().required("Không được để trống!").min(9, "Số điện thoại không đúng định dạng!")
    //         .max(11, "Số điện thoại không đúng định dạng!"),
    //     birthday:Yup.string().required("Không được để trống!").matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,{message:"Chưa đúng định dạng"})
    // })


    return(
        <>
            <div id="popup" ref={wrapperRef} style={{display:props.dialogUpdateExpence?"block":"none"}}>
                <div className="tab-header">
                    <div className={"active"} id="expense" style={{width:"100%"}}>
                        Chi phí
                    </div>
                </div>
                        <Formik initialValues={{
                            date: cash.date,
                            money: cash.money,
                            type:"expence",
                            name: cash.name,
                            wallet: cash.wallet,

                            account:{
                                id:'1'
                            },
                            category:cash.category,
                        }}
                                onSubmit={(values) => {
                                    save(values)}
                                }
                            // validationSchema={Validation}
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
                                                            // onFocus={(e) => e.target.placeholder = ""}
                                                            // placeholder={0}
                                                            // defaultValue={0}
                                                            type="text"
                                                            id="money"
                                                            name={"money"}
                                                        />
                                                        VND
                                                    </label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>
                                                        <Field type="text" id="action" name={'name'}/>
                                                        Ghi chú
                                                    </label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Tài khoản</label>
                                                    <div className="select-box">
                                                        <Field as="select" name={"wallet.id"} id="select-box1" className="select">
                                                            <option value={''}>-----------</option>
                                                            {wallets.map((item,id)=>{
                                                                return(
                                                                    <option key={id} value={item.id}>{item.name}</option>
                                                                )
                                                            })
                                                            }
                                                        </Field>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td id="category-expense">
                                                    <label>Danh mục</label><br/><br/>
                                                    {categories.map((item)=>{
                                                        return(
                                                            <div  className="block-category" id={"block-"+item.icon} >
                                                                <div className="icon-border" id={item.icon} style={{borderRadius:activeCategory===item.icon?"2px":"100px"}} onClick={categoryActive}>
                                                                    <i id={item.id} className={"fa-light " + item.icon} ></i>
                                                                </div>
                                                                <p >{item.name}</p>
                                                            </div>
                                                        )
                                                    })}
                                                    {/*<div  className="block-category" id="block-fa-mug-saucer">*/}
                                                    {/*    <div className="icon-border" style={{borderRadius:activeCategory==="fa-mug-saucer"?"2px":"100px"}} id="fa-mug-saucer" onClick={categoryActive}>*/}
                                                    {/*        <i className="fa-light fa-mug-saucer"></i>*/}
                                                    {/*    </div>*/}
                                                    {/*    <p id="2">Cafe</p>*/}
                                                    {/*</div>*/}

                                                    {/*<div  className="block-category" id="block-fa-bus" >*/}
                                                    {/*    <div className="icon-border" id="fa-bus" style={{borderRadius:activeCategory==="fa-bus"?"2px":"100px"}} onClick={categoryActive}>*/}
                                                    {/*        <i className="fa-light fa-bus"></i>*/}
                                                    {/*    </div>*/}
                                                    {/*    <p id="2">Di chuyển</p>*/}
                                                    {/*</div>*/}
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
                                                    <button type={'submit'} className="edit">OK</button>
                                                    <button type={'button'} className="cancel" onClick={props.closeUpdateExpence}>
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
        console.log(values)
        console.log("OK")
        axios.put(`http://localhost:8080/user1/cashes/${props.idCashUpdate}`,values).then(()=>{
            props.closeUpdateExpence()
        })
    }
})