import {Link, Route, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

export function UpdateCategory(props) {
    const navigate = useNavigate();
    const param = useParams();
    const [category, setCategory] = useState({});
    const [categories, setCategories] = useState([]);
    const idUser = localStorage.getItem('id');
    const token = localStorage.getItem("token");
    const [wallets, setWallets] = useState([]);
    const [activeCategory, setActiveCategory] = useState("")
    const [categorygetId, setCategoryGetId] = useState("1")

    function categoryActive(e) {

        setActiveCategory(e.currentTarget.id);
        setCategoryGetId(e.currentTarget.classList.item(0))
    }


    useEffect(() => {
        axios.get(`http://localhost:8080/user${idUser}/categories/${param.id}`).then((resp) => {
            setCategory(resp.data)
            console.log(resp.data)
        })
    }, []);
    useEffect(() => {
        axios.get(`http://localhost:8080/user${idUser}/categories`).then((resp) => {
            setCategories(resp.data)
            console.log(resp.data)
        })
    }, []);


    const Validation = Yup.object().shape({
        name: Yup.string().max(15, "Không quá 15 ký tự"),
        typeCategory: Yup.string().required("Vui lòng nhập kiểu danh mục").min(3, "Vui lòng nhập chi tiêu!").max(25, "Tên quá dài"),

    })

    return (
        <>
            <div>

                <Formik initialValues={{
                    name: category.name,
                    typeCategory: category.typeCategory

                }}
                        onSubmit={(values) => {
                            save(values)
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
                                                Sửa danh mục
                                            </div>
                                        </div>

                                        <div className='inputBox'>
                                            <span>Tên danh mục </span>
                                            <Field type="text" name={"name"}/>
                                        </div>
                                        <div className='inputBox'>
                                            <span>kiểu danh mục </span>
                                            <Field type="text" name={'typeCategory'}/>
                                        </div>


                                        <div className='block-category' id='block-fa-plus'>

                                            <div className={category.id + ' icon-border'} id={category.icon}
                                                 style={{borderRadius: activeCategory === category.icon ? "2px" : "100px"}}>
                                                <i id={category.id} className={"fa-light " + category.icon}></i>
                                            </div>
                                            <p id={'icon-category'}>{category.icon}</p>

                                            <select>{categories.map((icons) => {
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

    function save(values) {
        let category1 = {
            id: category.id,
            name: values.name,
            typeCategory: values.typeCategory,
            icon: category.icon

        }

        console.log(category1)

        axios.put(`http://localhost:8080/user${idUser}/categories/${category.id}`, category1,
            {headers: {"Authorization": `Bearer ${token}`}}).then((resp) => {
            console.log(resp)
            navigate('/plan')
            Swal.fire({
                icon: 'success',
                title: 'Update success!',
            })
        }).catch(err => {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Update failed!',
            })
        })
    }

}