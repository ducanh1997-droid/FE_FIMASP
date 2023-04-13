export default function Profile(){
    return(
        <>
            <div id="content-profile">
                <div id='general-information'>
                    <h2>Thông tin chung</h2>
                    <div>
                        <label htmlFor="">Họ và tên</label><br/>
                        <input type="text" placeholder='Nhập tên của bạn'/>
                    </div>
                    <div className='input-right'>
                        <label htmlFor="">Ngày sinh</label><br/>
                        <input type="date"/>
                    </div>
                    <div>
                        <label htmlFor="">Giới tính</label><br/>
                        <input type="text" placeholder='Chọn tính của bạn'/>
                    </div>
                    <div className='input-right'>
                        <label htmlFor="">Email</label><br/>
                        <input type="text" value='minhanh2@gmail.com' disabled/>
                    </div>
                </div>
                <div id='address-information'>
                    <h2>Địa chỉ</h2>
                    <div className='address-1'>
                        <label htmlFor="">Địa chỉ</label><br/>
                        <input type="text" placeholder='Nhập địa chỉ của bạn'/>
                    </div>
                    <div className='address-2 input-right'>
                        <label htmlFor="">Thành phố</label><br/>
                        <input type="text" placeholder='Thành phố'/>
                    </div>
                    <div className='address-3'>
                        <label htmlFor="">Zip</label><br/>
                        <input type="text" placeholder='Zip'/>
                    </div>
                </div>
                <div id='button-save-profile'>
                    <button>Lưu hồ sơ</button>
                </div>
            </div>
            <div id="sidebar-profile">
                <div className={'img8x'}>
                    <img src="https://luv.vn/wp-content/uploads/2021/11/avatar-gai-xinh-41.jpg" alt=""/>
                </div>
                <div className="content-profile">
                    <div className="details-profile">
                        <h2>Nguyễn Minh Anh <br/><span>minhanh2@gmail.com</span></h2>
                        <div className="descriptions-profile">
                            <h3>20/12/1997<br/><span>Birthday</span></h3>
                            <h3>Hà Nội<br/><span>Address</span></h3>
                            <h3>0362676605<br/><span>Phone</span></h3>
                        </div>
                    </div>
                </div>

            </div>
            <div className='attach-avatar'>
                <div className='attach-title'>
                    <h2>Chọn ảnh avatar</h2>
                </div>
                <div>
                    <div className="attach-img8">
                        <img src="https://luv.vn/wp-content/uploads/2021/11/avatar-gai-xinh-41.jpg" alt=""/>
                    </div>
                    <div className="attach-icon">
                        <i className="fa-solid fa-paperclip"></i>
                    </div>
                    <div className='attach-choose-file'>
                        <h4>Chọn ảnh</h4>
                        <p>JPG,GIF hoặc PNG nhỏ hơn 800KB</p>
                    </div>
                </div>
            </div>
        </>

    )
}