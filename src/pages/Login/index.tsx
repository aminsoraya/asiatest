import React from "react";
import "./index.scss";

export default function Login() {
  return (
    <main className="main">
      <div className="login">
        <div className="header">
          <span>ورود</span>
        </div>
        <div className="body">
          <div className="input_row">
            <label>نام کاربری</label>
            <input type="text" />
          </div>
          <div className="input_row">
            <label>کلمه عبور</label>
            <input type="text" />
          </div>
          <div className="input_row">
            <button>ورود</button>
          </div>
        </div>
      </div>
    </main>
  );
}
