import React from "react";
import "./Dashboard.css";
import { Link, Outlet } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineUnorderedList,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdPayment } from "react-icons/md";

const Dashboard = () => {
  return (
    <>
      <div className="p-3 bg-primary">
        <h1 className="text-capitalize text-center text-light">dashboard</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 position-relative">
            {/* offcanvas */}
            <div className="custom_drawer bg-primary ">
              <div className="d-flex justify-content-center">
                <ul className="nav flex-column pt-5">
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-light d-flex align-items-center"
                      aria-current="page"
                      to="/"
                    >
                      <AiFillHome className="dash-icon" />
                      <span className="custom-drawer-text">Home</span>
                    </Link>
                  </li>
                  <li className="nav-item text-light">
                    <Link
                      className="nav-link text-light align-items-center"
                      to="my-orders"
                    >
                      <AiOutlineUnorderedList className="dash-icon" />
                      <span className="custom-drawer-text">My Orders</span>
                    </Link>
                  </li>
                  <li className="nav-item text-light">
                    <Link
                      className="nav-link text-light align-items-center"
                      to="payment"
                    >
                      <MdPayment className="dash-icon" />
                      <span className="custom-drawer-text">Payment</span>
                    </Link>
                  </li>
                  <li className="nav-item text-light">
                    <Link
                      className="nav-link text-light align-items-center"
                      to="payment"
                    >
                      <AiOutlineLogout className="dash-icon" />
                      <span className="custom-drawer-text">Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* end of offcanvas */}
          </div>
          <div className="col-10">
            <div className="p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
