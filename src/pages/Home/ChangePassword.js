import {useState} from "react";
import toast, { Toaster } from 'react-hot-toast';
export default function ChangePassword(){
    const notify = () => {
        toast.success("Đổi mật khẩu thành công",{
            position:"bottom-center",style: {
                minWidth: '300px',
                fontSize:"20px"
            },
        })
    }
    const [eye1,setEye1] = useState(false)
    const [eye2,setEye2] = useState(false)
    function eyeIcon1() {
        setEye1(!eye1);
    }
    function eyeIcon2() {
        setEye2(!eye2);
    }

    return(
        <div id='change-password-block'>
            <h2>Thay đổi password</h2>
            <div className='input-password-box'>
                <input type={eye1==false?"password":"text"} id='password' placeholder='mật khẩu cũ'/>
                <i className={eye1==false?"fa-solid fa-eye-slash":"fa-solid fa-eye"} onClick={eyeIcon1}></i>
            </div>
            <div className='input-password-box'>
                <input type={eye2==false?"password":"text"} id='re-password' placeholder='mật khẩu mới'/>
                <i className={eye2==false?"fa-solid fa-eye-slash":"fa-solid fa-eye"} onClick={eyeIcon2}></i>

            </div>
            <div onClick={notify} id='button-change-password'>
                <button>Đổi mật khẩu</button>
            </div>

            <Toaster />
        </div>
    )
}