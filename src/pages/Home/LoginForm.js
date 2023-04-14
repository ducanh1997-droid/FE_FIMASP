import * as Yup from "yup"
import "./Loginform.css"
import {Formik, Form, Field, ErrorMessage} from "formik";
import {useEffect, useRef, useState} from "react";
import PasswordTooltip from "./PasswordTooltip";
import OtherTooltip from "./OtherTooltip";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function LoginForm({setShown}){
    const navigate = useNavigate();
    const [active,setActive]=useState(false)
    const [pwtActive,setPwtActive]=useState(false)
    const [emailActive,setEmailActive]=useState(false)
    const [confirmActive,setConfirmActive]=useState(false)
    const wrapperRef = useRef(null);
    const emailRef = useRef(null);
    const confirmRef = useRef(null);
    const [pwStrict,setPwStrict]=useState({})
    const [pwValue,setPwValue]=useState("")
    const [pwStatus,setPwStatus]=useState(true)
    const validationStrict = Yup.object().shape({
        email: Yup.string().required("Not blank field").matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,{message: "Not valid email",excludeEmptyString: true}),
        passwordConfirm: Yup.string().required("Not blank field").oneOf([pwValue],"Passwords do not match ")
    })
    useEffect(() => {

        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setPwtActive(false)
            }
            if (emailRef.current && !emailRef.current.contains(event.target)) {
                setEmailActive(false)
            }
            if (confirmRef.current && !confirmRef.current.contains(event.target)) {
                setConfirmActive(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
    function createPwStrict(event){
        let pw=event.target.value;
        setPwValue(pw)
        let pwStrict1={
            length: (/.{8,}/).test(pw),
            number: (/(?=.*?[0-9])/).test(pw),
            upperCase: (/(?=.*?[A-Z])/).test(pw),
            lowerCase: (/(?=.*?[a-z])/).test(pw),
            symbol: (/(?=.*?[#?!@$%^&*-])/).test(pw)
        };
        setPwStrict(pwStrict1);
    }
    function authen(values){
        let account ={
            username: values.email,
            password: values.password
        }

        axios.post(`http://localhost:8080/user/login`, account).then((resp) => {
            if(resp.data === ""){
                window.alert("Account does not exist!")
                return;
            }
            localStorage.setItem('id', resp.data.id)
            // navigate('')
        })
    }
    function save(values){
        let account ={
            username : values.email,
            password: values.password,
            role:{
                id:'1'
            }
        }
        axios.post('http://localhost:8080/user/register', account).then(() => {
            window.alert("Register success!")
            // navigate('')
        })
    }
return(
    <>
        <div className={"LoginForm"}>
            {/*<h2>Sign in/up Form</h2>*/}
            <div className={active?"container right-panel-active":"container"} id="container">
                <span className="close" onClick={()=>{setShown(false)}}>&times;</span>
                <div className="form-container sign-up-container">
                    <Formik
                        initialValues={{
                            // username: "",
                            email:"",
                            password:"",
                            passwordConfirm:""
                        }
                        }
                        onSubmit={(values)=>{
                            if(pwStatus){save(values)}
                        }}
                        validationSchema={validationStrict}
                    >
                        {({ errors, touched }) => (
                        <Form id="register-form">
                            <h1>Create Account</h1>
                            <span>or use your email for registration</span>
                            {emailActive&&errors.email && touched.email &&<OtherTooltip msg={errors.email}></OtherTooltip>}
                            <Field  name="email" >
                                {({
                                      field,
                                      form: { touched1, errors1 },
                                      meta,
                                  }) => (
                                    <>
                                        <input type="text" id="email" {...field}  className={errors.email && touched.email?"Error":""} onFocus={()=>{setEmailActive(true)}} ref={emailRef}  placeholder="Email"/>
                                    </>
                                )}
                            </Field>
                            {pwtActive&&<PasswordTooltip stat={setPwStatus} prop={pwStrict}></PasswordTooltip>}
                            <Field name="password">
                            {({
                                  field, // { name, value, onChange, onBlur }
                                  form: { touched, errors1 }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                  meta,
                              }) => (
                                  <>
                                        <input id="password" type="password" {...field} value={pwValue} className={!pwStatus?"Error":""} ref={wrapperRef} onChange={createPwStrict} onFocus={()=>{setPwtActive(true)}} placeholder="Password"/>
                                  </>
                                )}
                            </Field>
                            {confirmActive&&errors.passwordConfirm && touched.passwordConfirm &&<OtherTooltip msg={errors.passwordConfirm} top={281}></OtherTooltip>}
                            <Field  name="passwordConfirm" >
                                {({
                                      field,
                                      form: { touched1, errors1 },
                                      meta,
                                  }) => (
                                    <>
                                        <input type="password" id="passwordConfirm" {...field}  className={errors.passwordConfirm && touched.passwordConfirm?"Error":""} onFocus={()=>{setConfirmActive(true)}} ref={confirmRef}  placeholder="Password confirm"/>
                                    </>
                                )}
                            </Field>
                            <button type={"submit"}>Sign Up</button>
                        </Form>
                        )}
                    </Formik>
                </div>
                <div className="form-container sign-in-container">
                    <Formik initialValues={{
                        email1:"",
                        password1:""
                    }}
                            onSubmit={(values)=>{
                                // authen(values)
                                navigate("/dashboard")
                            }}
                    // validationSchema={validationStrict}
                    >
                        <Form id="login-from">
                            <h1>Sign in</h1>
                            <span>or use your account</span>
                            <Field type="text" id="email1" name="email1" placeholder="Email" />
                            <ErrorMessage name={"email1"}></ErrorMessage>
                            <Field type="password" id="password1" name="password1" placeholder="Password" />
                            <ErrorMessage name={"password1"}></ErrorMessage>
                            <a href="#">Forgot your password?</a>
                            <button type={"submit"}>Sign In</button>
                        </Form>
                    </Formik>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={()=>{setActive(false)}}>
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={()=>{setActive(true)}}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
)
}
