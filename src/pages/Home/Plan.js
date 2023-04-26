import {Link} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import "../../assets/css/transaction.css";

export default function Plan() {
    const idAcc = localStorage.getItem('id');
    const [categories, setCategories] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`http://localhost:8080/user${idAcc}/categories`).then((resp) => {
            console.log(resp)
            setCategories(resp.data)
        }).catch(err => {
            Swal.fire('Data not found')
        })
    },[])


    if (localStorage.getItem('id') === '' || localStorage.getItem('id') === null) {
        return (
            <>
                <h2>Bạn không có quyền truy cập link này</h2>
                <Link to={'/home'}>Trở về trang chủ để đăng nhập</Link>
            </>
        )
    } else {
        return (
            <div id="content-plan">
                <h2 id="page-title-plan">Hiện tại có {categories.length} ví</h2>
                <hr id="hr-search-plan"/>
                <div style={{display: "inline-block", marginTop: 15}}>
                    <h1 id="page-title-list-plan" style={{float: "left"}}>Thêm ví</h1>
                    <div
                        className="icon-border-dashboard"
                        style={{cursor: "pointer"}}
                     onClick={createCategory}
                    >
                        <i className="fa-solid fa-plus"/>
                    </div>
                </div>
                <hr id="hr-list-plan"/>
                <table id="table-list-plan">
                    <tbody>
                    <tr>
                        <th>STT</th>
                        <th>Icon</th>
                        <th>Tên ví</th>
                        <th>Kiểu ví</th>
                        <th>Hành động</th>
                    </tr>
                    </tbody>
                    <tbody id="data-plan">
                    {categories.map((item)=>{
                        return(
                            <tr key={item.id} className={'active-row'}>
                                <td>{categories.indexOf(item) +1}</td>
                                <td className={'feature-field'} style={{paddingTop: 5, boxSizing: "border-box",paddingLeft: "25px"}}>
                                    <div style={{float: "left"}} className="icon-border-bus-dashboard" >
                                        <i className={item.icon +' fa-light'}/>
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.typeCategory}</td>
                                <td style={{position:"relative"}}>
                                    <i className="fa-regular fa-pen-to-square"></i>&nbsp;&nbsp;&nbsp;
                                    <i className="fa-solid fa-trash-can" onClick={() => deleteCategory(item.id)}></i>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }

    function createCategory() {



    }

    function deleteCategory(id) {

        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/user${idAcc}/categories/${id}`
                    , {headers: {"Authorization": `Bearer ${token}`}}).then((resp) =>{
                    console.log(resp)
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    axios.get(`http://localhost:8080/user${idAcc}/categories`).then((resp) => {
                        console.log(resp)
                        setCategories(resp.data)
                    }).catch(err => {
                        Swal.fire('Data not found')
                    })

                }).catch(err => Swal.fire('Has Error!'))

            }
        })

    }
}