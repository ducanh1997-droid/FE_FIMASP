import {useEffect, useRef, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import axios from "axios";
export default function CreateTransaction(props){
    const[active,setActive] = useState(true)

    const [activeCategory,setActiveCategory] = useState("fa-dumbbell")

    const wrapperRef = useRef(null);
    useEffect(() => {
        /**
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
    }, [wrapperRef]);

    function openIncome(){
        setActive(true);
    }

    function openExpences(){
        setActive(false);
    }

    function category(e){
        setActiveCategory(e.currentTarget.id);
    }

    const Validation = Yup.object().shape({
        fullName: Yup.string().required("Không được để trống!").max(20, "Dài quá 20 kí tự!"),
        phoneNumber: Yup.string().required("Không được để trống!").min(9, "Số điện thoại không đúng định dạng!")
            .max(11, "Số điện thoại không đúng định dạng!"),
        birthday:Yup.string().required("Không được để trống!").matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,{message:"Chưa đúng định dạng"})
    })

    function save(values) {
        axios.put(`http://localhost:8080/user/update/1`,values).then(()=>{

        })
    }
return(
    <Formik initialValues={{
        fullName: "",
        birthday: "",
        phoneNumber: "",
        avatar: "",
        address: "",
        city: "",
        zip:"",
        gender:"",
        email:""
    }}
            onSubmit={(values) => {
                save(values)}
            }
            validationSchema={Validation}
            enableReinitialize={true}
    >
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
                <div className="form">
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <label>
                                    <input
                                        onFocus="this.placeholder = ''"
                                        placeholder={0}
                                        defaultValue={0}
                                        type="text"
                                        id="money"
                                    />
                                    VND
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>
                                    <input type="text" id="action"/>
                                    Ghi chú
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Tài khoản</label>
                                <div className="select-box">
                                    <select id="select-box1" className="select">
                                        <option value="Choice 1">Tài khoản 1</option>
                                        <option value="Choice 2">Tài khoản 1</option>
                                        <option value="Choice 3">Tiền mặt</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td id="category-expense">
                                <label>Danh mục</label><br/><br/>
                                <div className={activeCategory==="fa-dumbbell"&&"active-category"} className="block-category" id="block-fa-dumbbell" >
                                    <div className="icon-border" id="fa-dumbbell" style={{borderRadius:activeCategory==="fa-dumbbell"?"2px":"100px"}} onClick={category}>
                                        <i className="fa-light fa-dumbbell"></i>
                                    </div>
                                    <p id="1">Tập thể dục</p>
                                </div>
                                <div className={activeCategory==="fa-bus"&&"active-category"} className="block-category" id="block-fa-bus" >
                                    <div className="icon-border" id="fa-bus" style={{borderRadius:activeCategory==="fa-bus"?"2px":"100px"}} onClick={category}>
                                        <i className="fa-light fa-bus"></i>
                                    </div>
                                    <p id="2">Di chuyển</p>
                                </div>
                                <div className={activeCategory==="fa-mug-saucer"&&"active-category"} className="block-category" id="block-fa-mug-saucer">
                                    <div className="icon-border" style={{borderRadius:activeCategory==="fa-mug-saucer"?"2px":"100px"}} id="fa-mug-saucer" onClick={category}>
                                        <i className="fa-light fa-mug-saucer"></i>
                                    </div>
                                    <p id="2">Cafe</p>
                                </div>
                                <br/>
                                <br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="date1">Chọn ngày</label>
                                <input type="date" id="date1" name="date1" className="date"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="edit">OK</button>
                                <button className="cancel" onClick={props.close}>
                                    Huỷ
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="tab-expences" className={!active?"active":""}>
                <div className="form">
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <label>
                                    <input
                                        onFocus="this.placeholder = ''"
                                        placeholder={0}
                                        defaultValue={0}
                                        type="text"
                                        id="money1"
                                    />
                                    VND
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>
                                    <input type="text" id="action1"/>
                                    Ghi chú
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Tài khoản</label>
                                <div className="select-box">
                                    <select id="select-box2" className="select">
                                        <option value="Choice 1">Tài khoản 1</option>
                                        <option value="Choice 2">Tài khoản 1</option>
                                        <option value="Choice 3">Tiền mặt</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td id="category-income">
                                <label>Danh mục</label><br/><br/>
                                <div className={activeCategory==="fa-dumbbell"&&"active-category"} className="block-category" id="block-fa-dumbbell" >
                                    <div className="icon-border" id="fa-dumbbell" style={{borderRadius:activeCategory==="fa-dumbbell"?"2px":"100px"}} onClick={category}>
                                        <i className="fa-light fa-dumbbell"></i>
                                    </div>
                                    <p id="1">Tập thể dục</p>
                                </div>
                                <div className={activeCategory==="fa-bus"&&"active-category"} className="block-category" id="block-fa-bus" >
                                    <div className="icon-border" id="fa-bus" style={{borderRadius:activeCategory==="fa-bus"?"2px":"100px"}} onClick={category}>
                                        <i className="fa-light fa-bus"></i>
                                    </div>
                                    <p id="2">Di chuyển</p>
                                </div>
                                <div className={activeCategory==="fa-mug-saucer"&&"active-category"} className="block-category" id="block-fa-mug-saucer">
                                    <div className="icon-border" style={{borderRadius:activeCategory==="fa-mug-saucer"?"2px":"100px"}} id="fa-mug-saucer" onClick={category}>
                                        <i className="fa-light fa-mug-saucer"></i>
                                    </div>
                                    <p id="2">Cafe</p>
                                </div>
                                <br/>
                                <br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="date2">Chọn ngày</label>
                                <input type="date" name="date2" className="date" id="date2"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="edit">OK</button>
                                <button className="cancel" onClick={props.close}>
                                    Huỷ
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </Formik>
)
}