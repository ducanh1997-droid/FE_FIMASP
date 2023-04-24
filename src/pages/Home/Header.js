import {useEffect, useRef, useState} from "react";

export default function Header(props){

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
 return(
     <div id="Header">

      <div id="popup1">
       <div className="tab-header">
        <div className="active" id="add-account-title" >
         Thêm tài khoản
        </div>
       </div>
       <div className="tab-body">
        <div className="active">
         <div className="form">
          <table>
           <tbody>
           <tr>
            <td>
             <label>
              <input
                  // onFocus="this.placeholder = ''"
                  placeholder={"0"}
                  defaultValue={0}
                  type="text"
                  id="money2"
              />{" "}
              VND
             </label>
            </td>
           </tr>
           <tr>
            <td>
             <label>
              <input type="text" id="action2"/> Tên tài khoản
             </label>
            </td>
           </tr>
           <tr></tr>
           <tr>
            <td id="category-account">
             <label>Danh mục</label>
             <br/>
             <br/>
            </td>
           </tr>
           <tr>
            <td>
             <label htmlFor="date1">Hạn sử dụng thẻ(nếu có)</label>
             <input type="date" id="date3" name="date3" className="date"/>
            </td>
           </tr>
           <tr>
            <td>
             <button className="edit">OK</button>
             <button className="cancel" /*onClick="closeFormAccount()"*/>
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
      <div id="popup2">
       <div className="tab-header">
        <div className="active" id="add-plan-title">
         Thêm kế hoạch
        </div>
       </div>
       <div className="tab-body">
        <div className="active">
         <div className="form">
          <table>
           <tbody>
           <tr>
            <td>
             <label>
              <input
                  // onFocus="this.placeholder = ''"
                  placeholder={"0"}
                  defaultValue={0}
                  type="text"
                  id="money3"
              />{" "}
              VND
             </label>
            </td>
           </tr>
           <tr>
            <td>
             <label>
              <input type="text" id="action3"/> Ghi chú
             </label>
            </td>
           </tr>
           <tr></tr>
           <tr>
            <td id="category-plan">
             <label>Danh mục</label>
             <br/>
             <br/>
            </td>
           </tr>
           <tr>
            <td>
             <label htmlFor="date4">Ngày bắt đầu</label>
             <input type="date" id="date4" name="date4" className="date"/>
            </td>
           </tr>
           <tr>
            <td>
             <label htmlFor="date5">Ngày kết thúc</label>
             <input type="date" id="date5" name="date5" className="date"/>
            </td>
           </tr>
           <tr>
            <td>
             <button className="edit">OK</button>
             <button className="cancel" /*onClick="closeFormPlan()"*/>
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
      <div id="logo-wrapper">
       <img
           id="logo"
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUFVYOKFCw-qPIrFP8__C_LGr6lIggosXNbw&usqp=CAU"
           alt=""
       />
       <h5 id="text-logo">Fimasp</h5>
      </div>
      <div id="page">
       <h1>Trang chủ</h1>
      </div>
      <div id="avatar">
       <img src={localStorage.getItem('avatar')} alt=""/>
      </div>
     </div>

 )
}

