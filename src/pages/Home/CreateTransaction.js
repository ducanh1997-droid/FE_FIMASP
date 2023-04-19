import React,{useEffect, useRef, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import axios from "axios";
export default React.memo(function CreateTransaction(props){
    const[active,setActive] = useState(true)
    const [wallets,setWallets] = useState([]);
    const [categories,setCategories] = useState([]);
    const [categoriesIncome,setCategoriesIncome] = useState([])
    const [activeCategory,setActiveCategory] = useState("fa-dumbbell")
    const [categorygetId,setCategoryGetId] = useState("1")
    // const [category, setCategory] = useState({
    //     activeCategory: "fa-dumbbell",
    //     categoryId: "",
    // });
    const wrapperRef = useRef(null);
    useEffect(() => {
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
                props.close()
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef,props]);

    function openIncome(){
        setActive(true);
    }

    function openExpences(){
        setActive(false);
    }

    function categoryActive(e){
        // setCategory({
        //     activeCategory: e.currentTarget.id,
        //     categoryId: e.target.id,
        // })
        setActiveCategory(e.currentTarget.id);
        setCategoryGetId(e.target.id)
    }


    const Validation = Yup.object().shape({
        name: Yup.string().max(15, "Không quá 15 ký tự"),
        money: Yup.number().required("Vui lòng nhập chi tiêu!").min(0, "Vui lòng nhập chi tiêu!"),
        wallet: Yup.object().shape({
            id: Yup.string().required("Vui lòng chọn ví!"),
        })
    })

    const Validation1 = Yup.object().shape({
        name: Yup.string().max(15, "Không quá 15 ký tự"),
        money: Yup.number().required("Vui lòng nhập chi tiêu!").min(0, "Vui lòng nhập chi tiêu!"),
        wallet: Yup.object().shape({
            id: Yup.string().required("Vui lòng chọn ví!"),
        })
    })


return(
    <>
                    <div id="popup" ref={wrapperRef} style={{display:props.dialog==true?"block":"none"}}>
                        <div className="tab-header">
                            <div className={active?"active":""} id="expense" onClick={openIncome}>
                                Chi phí
                            </div>
                            <div className={!active?"active":""} id="income" onClick={openExpences}>
                                Thu nhập
                            </div>
                        </div>
                        <div className="tab-indicator" style={{left:active?`calc(calc(100%/2)*${0})`:`calc(calc(100%/2)*${1})`}}/>
                        <div className="tab-body">
                            <div className={active?"active":""}>
                            <Formik initialValues={{
                                date: new Date().toISOString().slice(0, 10),
                                money: "",
                                type:"expence",
                                name:"",
                                wallet: {
                                    id:""
                                },

                                account:{
                                    id:'1'
                                },
                                category:{
                                    id:'1'
                                }
                            }}
                                    onSubmit={(values,actions) => {

                                        save(values)
                                        actions.resetForm()
                                    }
                                    }
                                validationSchema={Validation}
                                    enableReinitialize={true}
                            >
                                {({ errors, touched,values,initialValues  }) => (
                                    <Form>

                                <div className="form">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <label>
                                                    <Field
                                                        onFocus={(e) => e.target.placeholder = ""}
                                                        placeholder={0}
                                                        defaultValue={0}
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
                                                    ?{background:"rgb(141,191,114)",cursor:"not-allowed"}:{background:"rgb(79 161 34)",cursor:"pointer"}} className="edit">Lưu</button>
                                                <button  type={'button'} className="cancel" onClick={props.close}>
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
                            <div id="tab-expences" className={!active?"active":""}>
                            <Formik initialValues={{
                                date: new Date().toISOString().slice(0, 10),
                                money: "",
                                type:"income",
                                name:"",
                                wallet: {
                                    id:""
                                },

                                account:{
                                    id:'1'
                                },
                                category:{
                                    id:'1'
                                }
                            }}
                                    onSubmit={(values) => {
                                        save(values)}
                                    }
                                validationSchema={Validation1}
                                    enableReinitialize={true}
                            >
                                {({ errors, touched,values,initialValues }) => (
                                    <Form>

                                <div className="form">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <label>
                                                    <Field
                                                        onFocus={(e) => e.target.placeholder = ""}
                                                        placeholder={0}
                                                        defaultValue={0}
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
                                        <td>
                                            <label>
                                                <Field type="text" id="action" name={'name'}/>
                                                Ghi chú&ensp;&ensp;
                                                <span style={{color:"red"}}>
                                                        <ErrorMessage name={'name'}  />
                                                    </span>
                                            </label>
                                        </td>
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
                                            <td id="category-income">
                                                <label>Danh mục</label><br/><br/>
                                                {categoriesIncome.map((item)=>{
                                                    return(
                                                        <div  className="block-category" id={"block-"+item.icon} >
                                                            <div className="icon-border" id={item.icon} style={{borderRadius:activeCategory===item.icon?"2px":"100px"}} onClick={categoryActive}>
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
                                                    ?{background:"rgb(141,191,114)",cursor:"not-allowed"}:{background:"rgb(79 161 34)",cursor:"pointer"}} className="edit" >Lưu</button>
                                                <button type={'button'} className="cancel" onClick={props.close}>
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
                        </div>
                    </div>
    </>

)
    function save(values) {
        values.category.id = categorygetId;
        console.log(values)
        axios.post('http://localhost:8080/user1/cashes',values).then(()=>{
            props.close()
        })
    }
})