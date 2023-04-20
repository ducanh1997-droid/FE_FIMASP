
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import React,{useEffect, useState} from "react";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

export default function Transaction(props) {
    const [transactions,setTransactions] = useState([]);

    const token = localStorage.getItem("token");
    const idUser = localStorage.getItem("id");

    const notifyUpdate = () => {
        toast.success("Cập nhật giao dịch thành công", {
            position: "top-center", style: {
                minWidth: '300px',
                fontSize: "20px"
            },
        })
    }
    const notify = () => {
        toast.success("Thêm giao dịch thành công", {
            position: "top-center", style: {
                minWidth: '300px',
                fontSize: "20px"
            },
        })
    }
    useEffect(() =>{
        if (props.createSuccess) {
            notify();
            props.closeCreate();
        }
        if (props.updateSuccess) {
            notifyUpdate();
            props.closeUpdate();
        }
        axios.get(`http://localhost:8080/user${idUser}/cashes`).then((response)=>{
            setTransactions(response.data.content);
        })
    },[props.close,props.createSuccess,props.updateSuccess])

    function save(values) {
        axios.get(`http://localhost:8080/user${idUser}/cashes/${values.dateStart}/${values.dateEnd}`).then((res)=>{
            setTransactions(res.data);
        })
    }

    const Validation = Yup.object().shape({
        dateStart: Yup.date().required( "Vui lòng chọn ngày bắt đầu"),
        dateEnd: Yup.date().required("Vui lòng chọn ngày kết thúc").min(
            Yup.ref('dateStart'),
            "Ngày kết thúc phải lớn hơn ngày bắt đầu"
        )

    })
    return(
        <div id="content-table" style={{filter:props.dialog || props.dialogUpdateIncome || props.dialogUpdateExpence?"blur(10px)":"blur(0px)"}}>
            <h2 id="page-title">Danh sách giao dịch</h2>
            <hr id="hr-search"/>
            <div style={{display: "inline-block", marginTop: 15}}>
                <h1 id="page-title-list" style={{float: "left"}}>
                    Thêm giao dịch
                </h1>
                <div
                    className="icon-border-dashboard"
                    style={{cursor: "pointer"}}
                    onClick={props.open}
                >
                    <i className="fa-solid fa-plus"/>
                </div>
            </div>
            <Formik initialValues={{
                dateStart:new Date().toISOString().slice(0, 10),
                dateEnd:new Date().toISOString().slice(0, 10)
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
                                        <label>
                                            <Field
                                                // onFocus={(e) => e.target.placeholder = ""}
                                                // placeholder={0}
                                                // defaultValue={0}
                                                type="date"
                                                id="dateStart"
                                                name={"dateStart"}
                                            />
                                            Ngày bắt đầu


                                        </label>
                            <div style={{color:"red",fontSize:"13px"}}>
                                                        <ErrorMessage name={'dateStart'}  />
                                                    </div>
                                        <label>
                                            <Field type="date" id="dateEnd" name={'dateEnd'}/>
                                            Ngày kết thúc
                                            &ensp;&ensp;

                                        </label>
                            <div style={{color:"red",fontSize:"13px"}}>
                                                        <ErrorMessage name={'dateEnd'}  />
                                                    </div>
                                        <button type={'submit'} className="edit">Tìm kiếm</button>
                        </div>
                    </Form>)}
            </Formik>
            <hr id="hr-list"/>

            <Toaster/>
            <table id="table-list">
                <tbody>
                <tr>
                    <th>Danh mục</th>
                    <th>Ngày</th>
                    <th>Ghi chú</th>
                    <th>Giá</th>
                    <th>Loại giao dịch</th>
                    <th>Sửa</th>
                    <th>Xoá</th>
                </tr>
                </tbody>
                <tbody id="data">
                {transactions.map((item)=>{
                    return(
                        <tr key={item.id}>
                            <td style={{paddingTop: 5, boxSizing: "border-box"}}>
                                <div style={{float: "left"}} className="icon-border-bus-dashboard" id={item.category.icon}>
                                    <i className={item.category.icon+' fa-light'}/>
                                </div>
                                <p>{item.category.name}</p>
                            </td>
                            <td style={{color: "#8d8d8d"}}>{item.date.slice(0,10)}</td>
                            <td>{item.name}</td>
                            <td>{item.money.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</td>
                            <td>{item.type=="expence"?"Chi phí":"Thu nhập"}</td>
                            <td>
                                <button onClick={()=>item.type=="expence"?props.openUpdateExpence(item.id,item.category.icon):props.openUpdateIncome(item.id,item.category.icon)} className={'btn btn-info'}>Sửa
                                </button>
                            </td>

                            <td>
                                {/*<a href="#" className="btn btn-delete">*/}
                                {/*    Xoá*/}
                                {/*</a>*/}
                                <button onClick={() => deleteTransaction(item.id)} className={'btn btn-delete'}>Xoá
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div id="paging"></div>

        </div>
    )
    function deleteTransaction(id){
        if(window.confirm("OK")){
            axios.delete(`http://localhost:8080/user${idUser}/cashes/${id}`,{headers: {"Authorization": `Bearer ${token}`}}).then((response)=>{
                axios.get(`http://localhost:8080/user${idUser}/cashes`).then((response)=>{
                    setTransactions(response.data.content);
                })
            })
        }
    }
}