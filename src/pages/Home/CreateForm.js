export default function CreateForm(){

return(
    <div id="popup">
        <div className="tab-header">
            <div className="active" id="expense" onClick="openIncome()">
                Chi phí
            </div>
            <div id="income" onClick="openExpences()">
                Thu nhập
            </div>
        </div>
        <div className="tab-indicator"/>
        <div className="tab-body">
            <div className="active">
                <div className="form">
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <label>
                                    <input
                                        onFocus="this.placeholder = ''"
                                        placeholder={0}
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
                                <label>Danh mục</label>
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
                                <button className="cancel" onClick="closeForm()">
                                    Huỷ
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="tab-expences">
                <div className="form">
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <label>
                                    <input
                                        onFocus="this.placeholder = ''"
                                        placeholder={0}
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
                                <label>Danh mục</label>
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
                                <button className="cancel" onClick="closeForm()">
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

)
}