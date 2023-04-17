import React,{useEffect, useState} from "react";
import axios from "axios";

export default function Transaction(props) {
    const [transactions,setTransactions] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:8080/cashes/1").then((response)=>{
            setTransactions(response.data);
        })
    },[props.close])

    return(
        <div id="content-table" style={{filter:props.dialog==true?"blur(10px)":"blur(0px)"}}>
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
            <hr id="hr-list"/>
            <table id="table-list">
                <tbody>
                <tr>
                    <th>Danh mục</th>
                    <th>Ngày</th>
                    <th>Tên</th>
                    <th>Giá</th>
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
                            <td>
                                <a href="#" /*onClick="openEditForm()"*/ className="btn btn-info">
                                    Sửa
                                </a>
                            </td>
                            <td>
                                <a href="#" className="btn btn-delete">
                                    Xoá
                                </a>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div id="paging"></div>
        </div>
    )
}