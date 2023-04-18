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
                  // onFocus="this.placeholder = ''"
                  placeholder={"0"}
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
        <div className={!active?"active":""} id="tab-expences">
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
      <div id="popup1">
       <div className="tab-header">
        <div className="active" id="add-account-title" /*onClick="openIncome()"*/>
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

