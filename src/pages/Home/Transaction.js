
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import React,{useEffect, useState} from "react";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import "../../assets/css/transaction.css";
import arrow  from "./../../assets/img/448-arrow.png"
export default function Transaction(props) {
    const [transactions,setTransactions] = useState([]);

    const token = localStorage.getItem("token");
    const idUser = localStorage.getItem("id");
    const [searchDate,setSearchDate] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [numOfPage,setNumOfPage] = useState(7);
    const [totalPage,setTotalPage] = useState(1);
    const [totalElement,setTotalElement] = useState(0);
    const [valuesSearch,setValuesSearch] = useState({});
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
        setSearchDate(false);
        if (props.createSuccess) {
            notify();
            props.closeCreate();
        }
        if (props.updateSuccess) {
            notifyUpdate();
            props.closeUpdate();
        }
        let current =currentPage- 1
        axios.get(`http://localhost:8080/user${idUser}/cashes?page=${current}&size=${numOfPage}`).then((response)=>{
            setTransactions(response.data.content);
            setTotalPage(response.data.totalPages);
            setTotalElement(response.data.totalElements);
            setCurrentPage(response.data.number+1);
        })
    },[props.close,props.createSuccess,props.updateSuccess])


    function findAllTransaction(currentPage){
        currentPage-=1;
        axios.get(`http://localhost:8080/user${idUser}/cashes?page=${currentPage}&size=${numOfPage}`).then((response)=>{
            setTransactions(response.data.content);
            setTotalPage(response.data.totalPages);
            setTotalElement(response.data.totalElements);
            setCurrentPage(response.data.number+1);
        })
    }
    function search(values,currentPage) {
        setValuesSearch(values);
        currentPage-=1;
        if(values.dateEnd==="" || values.dateStart===""){
            setSearchDate(false)
            findAllTransaction(currentPage)
        }else{
            axios.get(`http://localhost:8080/user${idUser}/cashes/${values.dateStart}/${values.dateEnd}?page=${currentPage}&size=${numOfPage}`).then((response)=>{
                setSearchDate(true);
                setTransactions(response.data.content);
                setTotalPage(response.data.totalPages);
                setTotalElement(response.data.totalElements);
                setCurrentPage(response.data.number+1);
            })
        }
    }
    const Validation = Yup.object().shape({
        dateStart: Yup.date(),
        dateEnd: Yup.date().min(
            Yup.ref('dateStart'),
            "Ngày kết thúc phải lớn hơn ngày bắt đầu"
        )
    })
    function prevPage() {
        let prevPage =1
        if(currentPage>prevPage){
            if(searchDate){
                search(valuesSearch,currentPage-prevPage)
            }else{
                findAllTransaction(currentPage-prevPage);
            }
        }
    }
    function nextPage() {
        if(currentPage<Math.ceil(totalElement/numOfPage)){
            if(searchDate){
                search(valuesSearch,currentPage+1)
            }else{
                findAllTransaction(currentPage+1);
            }
        }
    }
    return(
        <>
            <div id="content-transaction" style={{filter:props.dialog || props.dialogUpdateIncome || props.dialogUpdateExpence?"blur(10px)":"blur(0px)"}}>
                <div id="header-transaction">
                    <div id="header-transaction-title">
                        <h1>Giao dịch</h1>
                        <p>Trang chủ </p><span>/ Giao dịch</span>
                    </div>
                    <div id="header-transaction-button-add" onClick={props.open}>
                        <i className="fa-solid fa-plus"/>
                        <p>Thêm giao dịch</p>
                    </div>
                </div>
                <Toaster/>
                <div id='block-search-transaction'>
                         <Formik initialValues={{
                            dateStart:"",
                            dateEnd:""
                        }}
                                onSubmit={(values) => {
                                    search(values,currentPage)}
                                }
                            validationSchema={Validation}
                                enableReinitialize={true}
                        >
                            {({ errors, touched,values,initialValues }) => (
                                <Form style={{display:'inline-flex'}}>
                                    <div>
                                        <div id='label-input-date-transaction'
                                              >
                                            <label>Ngày bắt đầu</label>
                                             <br/>
                                            <Field
                                                type="date"
                                                id="dateStart"
                                                name={"dateStart"}/>
                                        </div>
                                        <div style={{color:"red",fontSize:"13px"}}>

                                        </div>
                                    </div>
                                    <div>
                                        <div id='label-input-date-transaction'
                                             >
                                            <label>Ngày kết thúc</label><br/>
                                                <Field type="date" id="dateEnd" name={'dateEnd'}/>
                                        </div>
                                        <div style={{color:"red",fontSize:"13px"}}>
                                            <ErrorMessage name={'dateEnd'}  />
                                        </div>
                                    </div>
                                    <button id="btn-search-transaction-date" type={'submit'} className="edit">Tìm kiếm</button>
                                </Form>)}
                        </Formik>
                </div>
                <div id='list-transaction'>
                    <table id='table-list-transaction'>
                        <thead>
                           <tr>
                               <th style={{paddingLeft: "50px"}} >Danh mục</th>
                               <th>Ngày giao dịch</th>
                               <th>Ghi chú</th>
                               <th>Số tiền</th>
                               <th>Ví</th>
                               <th>Loại giao dịch</th>
                               <th>Hành động</th>
                           </tr>
                        </thead>
                        <tbody>
                        {transactions.map((item)=>{
                                        return(
                                            <tr key={item.id} className={'active-row'}>
                                                <td className={'feature-field'} style={{paddingTop: 5, boxSizing: "border-box",paddingLeft: "25px"}}>
                                                    <div style={{float: "left"}} className="icon-border-bus-dashboard" id={item.category?.icon}>
                                                        <i className={item.category?.icon+' fa-light'}/>
                                                    </div>
                                                    <p style={{display:"inline-block",marginLeft:"10px",marginTop:"5px"}}>{item.category===null? 'Danh mục này đã xóa': item.category.name }</p>
                                                </td>
                                                <td className={'feature-field'} style={{color: "#8d8d8d"}}>{item.date.slice(0,10)}</td>
                                                <td>{item.name}</td>
                                                <td className={'feature-field'}>{item.money.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</td>
                                                <td>{item.wallet.name}</td>
                                                <td>{item.type=="expence"?"Chi phí":"Thu nhập"}</td>
                                                <td style={{position:"relative"}}>
                                                    <i className="fa-regular fa-pen-to-square" onClick={()=>item.type=="expence"?props.openUpdateExpence(item.id,item.category.icon):props.openUpdateIncome(item.id,item.category.icon)}></i>
                                                    <i className="fa-solid fa-trash-can" onClick={() => deleteTransaction(item.id)}></i>
                                                </td>

                                            </tr>
                                        )
                                    })}

                        </tbody>
                    </table>
                </div>
                <div id='pagination'>
                    <button className='btn-pre-next1' onClick={prevPage}><img src={arrow} alt=""/>Trước</button>
                    <ul>
                        <li className='link-pagination active active-link' >{currentPage}</li>
                    </ul>

                    <button className='btn-pre-next2' onClick={nextPage}>Sau <img src={arrow} alt=""/></button>
                </div>
            </div>
        </>
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