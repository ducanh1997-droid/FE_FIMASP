export default function Plan(){
    return(
        <div id="content-plan">
            <h2 id="page-title-plan">Danh sách Kế hoạch</h2>
            <hr id="hr-search-plan"/>
            <div style={{display: "inline-block", marginTop: 15}}>
                <h1 id="page-title-list-plan" style={{float: "left"}}>
                    Thêm kế hoạch
                </h1>
                <div
                    className="icon-border-dashboard"
                    style={{cursor: "pointer"}}
                    onClick="createFormAddPlan()"
                >
                    <i className="fa-solid fa-plus"/>
                </div>
            </div>
            <hr id="hr-list-plan"/>
            <table id="table-list-plan">
                <tbody>
                <tr>
                    <th>Danh mục</th>
                    <th>Số tiền</th>
                    <th>Ghi chú</th>
                    <th>Khoảng thời gian</th>
                    <th>Tỉ lệ</th>
                    <th>Sửa</th>
                    <th>Xoá</th>
                </tr>
                </tbody>
                <tbody id="data-plan">
                <tr>
                    <td style={{paddingTop: 5, boxSizing: "border-box"}}>
                        <div style={{float: "left"}} className="icon-border-bus-dashboard">
                            <i className="fa-light fa-bus"/>
                        </div>
                        <p>Tài khoản</p>
                    </td>
                    <td>150.000 đ</td>
                    <td>Mua xe máy</td>
                    <td style={{color: "#8d8d8d"}}>20/11/2020 - 20/11/2020</td>
                    <td>
                        <a href="#" onClick="openEditForm()" className="btn btn-info">
                            Sửa
                        </a>
                    </td>
                    <td>
                        <a href="#" className="btn btn-delete">
                            Xoá
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}