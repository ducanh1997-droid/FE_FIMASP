import {Link} from "react-router-dom";

export default function Wallet() {

    if (localStorage.getItem('id') === '' || localStorage.getItem('id') === null) {
        return (
            <>
                <h2>Bạn không có quyền truy cập link này</h2>
                <Link to={'/home'}>Trở về trang chủ để đăng nhập</Link>
            </>
        )
    } else {
        return (
            <div id="content-account">
                <h2 id="page-title-account">Danh sách tài khoản</h2>
                <hr id="hr-search-account"/>
                <div style={{display: "inline-block", marginTop: 15}}>
                    <h1 id="page-title-list-account" style={{float: "left"}}>
                        Thêm tài khoản
                    </h1>
                    <div
                        className="icon-border-dashboard"
                        style={{cursor: "pointer"}}
                        // onClick="createFormAddAccount()"
                    >
                        <i className="fa-solid fa-plus"/>
                    </div>
                </div>
                <hr id="hr-list-account"/>
                <table id="table-list-account">
                    <tbody>
                    <tr>
                        <th>Danh mục</th>
                        <th>Số tiền</th>
                        <th>Tên tài khoản</th>
                        <th>Hạn sử dụng</th>
                        <th>Sửa</th>
                        <th>Xoá</th>
                    </tr>
                    </tbody>
                    <tbody id="data-account"></tbody>
                </table>
            </div>

        )
    }
}