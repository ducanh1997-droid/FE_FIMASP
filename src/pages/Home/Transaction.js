export default function Transaction(props) {
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
                <tr>
                    <td style={{paddingTop: 5, boxSizing: "border-box"}}>
                        <div style={{float: "left"}} className="icon-border-bus-dashboard">
                            <i className="fa-light fa-bus"/>
                        </div>
                        <p>Di chuyển</p>
                    </td>
                    <td style={{color: "#8d8d8d"}}>20/12/2020</td>
                    <td>Vé tháng xe bus</td>
                    <td>150.000 đ</td>
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
                <tr>
                    <td style={{paddingTop: 10, boxSizing: "border-box"}}>
                        <div style={{float: "left"}} className="icon-border-dashboard">
                            <i className="fa-light fa-dumbbell"/>
                        </div>
                        <p>Tập thể dục</p>
                    </td>
                    <td>20/12/2020</td>
                    <td>Mua quần áo đá bóng</td>
                    <td>150.000 đ</td>
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
            <div id="paging"></div>
        </div>
    )
}