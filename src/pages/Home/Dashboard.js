export default function Dashboard(){
    return(
        <div id="content-dashboard">
            <div id="chart-dashboard">
                <h5 className="titles-dashboard">Chart statistics</h5>
                <div
                    className="acquisitions1"
                    style={{position: "relative", width: 500, height: 250}}
                >
                    <canvas id="acquisitions1"/>
                </div>
            </div>
            <div id="content-right-dashboard">
                <div id="total-money-dashboard-right">
                    <div id="total-money">
                        <h6>Ví của tôi</h6>
                        <p>100.000 VND</p>
                    </div>
                    <div id="category-money">
                        <div id="income-block">
                            <h6>Thu nhập</h6>
                            <p>200.000 VND</p>
                        </div>
                        <div id="account-block">
                            <h6>Tài khoản</h6>
                            <p>500.000 VND</p>
                        </div>
                        <div id="cash-block">
                            <h6>Tiền mặt</h6>
                            <p>500.000 VND</p>
                        </div>
                    </div>
                </div>
                <div id="current-account">
                    <h6>Tài khoản</h6>
                    <div id="card-bank">
                        <div id="card-left">
                            <p id="name-account">John Demin</p>
                            <p id="account-money">1.000.000 VND</p>
                            <p id="account-number">1234 **** **** 5671</p>
                        </div>
                        <div id="card-right">
                            <i className="fa-regular fa-credit-card-blank"/>
                            <div id="exp-block">
                                <p id="exp-title">Exp</p>
                                <p id="exp">09/24</p>
                            </div>
                        </div>
                    </div>
                    <div id="add-card">
                        <p>+ Add account</p>
                    </div>
                </div>
                <div id="planning">
                    <h6>Lập kế hoạch</h6>
                    <div className="plan-block">
                        <div className="name-and-price-plan">
                            <p className="name-plan">Buy a Macbook</p>
                            <p className="price-plan">15.000.000 đ/20.000.000 đ</p>
                        </div>
                        <div className="plan-bar">
                            <div className="bar">
                                <span className="percentage">70%</span>
                            </div>
                        </div>
                    </div>
                    <div className="button-detail-planning">
                        <i className="fa-solid fa-arrow-up-right"/>
                    </div>
                    <div className="plan-block">
                        <div className="name-and-price-plan">
                            <p className="name-plan">Buy a car</p>
                            <p className="price-plan">1.500.000.000 đ/2.000.000.000 đ</p>
                        </div>
                        <div className="plan-bar">
                            <div className="bar-2">
                                <span className="percentage">40%</span>
                            </div>
                        </div>
                    </div>
                    <div className="button-detail-planning">
                        <i className="fa-solid fa-arrow-up-right"/>
                    </div>
                </div>
            </div>
            <div className="payment-history">
                <div style={{display: "inline-block", width: "90%"}}>
                    <h5
                        style={{display: "inline-block", float: "left"}}
                        className="titles-dashboard"
                    >
                        Lịch sử chi tiêu
                    </h5>
                    <div
                        style={{
                            display: "inline-block",
                            float: "right",
                            cursor: "pointer",
                            fontSize: 20,
                            position: "relative"
                        }}
                        onClick="openPlan()"
                    >
                        <i
                            className="fa-sharp fa-solid fa-arrow-up-right-from-square"
                            style={{top: 0}}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}