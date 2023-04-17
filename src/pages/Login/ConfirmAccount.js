import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

export default function ConfirmAccount() {
    const navigate = useNavigate();
    const param = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/user/confirm/${param.id}`).then((response) => {
            console.log(response)
        })
    }, [param.id])

    return(
        <>
            <h1>Confirm success!</h1>
            <Link className={'btn btn-primary'} to={'/home'}>Home</Link> &nbsp;
            <Link className={'btn btn-warning'} to={'/login'}>Login</Link> &nbsp;
        </>
    )

}