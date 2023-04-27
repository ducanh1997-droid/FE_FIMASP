import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

export function CreateCategory(){
    const idUser = localStorage.getItem('id');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [category, setCategory] = useState({});

    const Validation = Yup.object().shape({
        name: Yup.string().max(15, "Không quá 15 ký tự"),
        typeCategory: Yup.string().required("Vui lòng nhập kiểu danh mục").min(3, "Vui lòng nhập chi tiêu!").max(25, "Tên quá dài"),

    })

    useEffect(() => {
        axios.get(`http://localhost:8080/user${idUser}/categories`).then((resp) => {
            setCategories(resp.data)
            console.log(resp.data)
        })
    }, []);


    return (
        <>
            <div>

                <Formik initialValues={{
                    name: '',
                    typeCategory: ''
                }}
                        onSubmit={(value) => {
                            save(value)
                        }
                        }
                        validationSchema={Validation}
                        enableReinitialize={true}
                >
                    {({errors, touched, values, initialValues}) => (
                        <Form style={{width: "55%"}}>
                            <div className='container-popup-transaction'>
                                <div className='row-form'>


                                    <div className='col-form'>

                                        <div className="tab-header">
                                            <div className={"active"} id="income"
                                                 style={{width: "100%", fontSize: "20px"}}>
                                                Thêm danh mục
                                            </div>
                                        </div>

                                        <div className='inputBox'>
                                            <span>Tên danh mục </span>
                                            <Field type="text" name={"name"}/>
                                        </div>
                                        <div className='inputBox'>
                                            <span>Kiểu danh mục </span>
                                            <Field type="text" name={'typeCategory'}/>
                                        </div>


                                        <div className='block-category' id='block-fa-plus'>


                                            <select id={'nameIcon'}>{categories.map((icons) => {
                                                return (
                                                    <>

                                                        <option value={icons.icon} >
                                                            {icons.name}
                                                        </option>
                                                    </>
                                                )
                                            })} </select>



                                        </div>
                                        <div style={{display: "inline-flex", width: "100%", marginTop: "20px"}}>
                                            <button type="submit" className={'btn-submit-transaction'}>Submit</button>

                                            <Link className={'btn-reject-transaction'} to={'/plan'}>Cancel</Link>
                                        </div>


                                    </div>

                                    <div className='col-form'>

                                        <div className='inputBox'>


                                        </div>
                                    </div>
                                </div>


                            </div>
                        </Form>)}
                </Formik>
            </div>
        </>
    )

    function save(value) {
    let category1 ={
        name: value.name,
        typeCategory: value.typeCategory,
        icon: document.getElementById('nameIcon').value
    }
    axios.post(`http://localhost:8080/user${idUser}/categories`, category1).then((resp)=>{
        console.log(resp)
        navigate('/plan')
        Swal.fire({
            icon: 'success',
            title: 'Create success!',
        })
    }).catch(err =>{
        console.log(err)
        Swal.fire({
            icon: 'error',
            title: 'Update failed!',
        })
    })


    }
}