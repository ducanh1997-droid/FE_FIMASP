export default function  ChoiceModalBox(){
return(
    <div className={"choice-modal-box"}>
        <ul>
            <li><i className={"far fa-edit"}></i><span>Sửa ví</span></li>
            <li><i className={"fa fa-trash"}></i><span>Xóa ví</span></li>
            <li><i className={"fas fa-angle-double-down"}></i><span>Chuyển đến giao dịch</span></li>
        </ul>
    </div>
)
}