import React, { useState } from "react";
import "./index.scss";
import axios from "../../api/axios";
import { ToastifyError } from "../../components/toastify";
import { EnumResponseStatus, IApiResponse } from "../../bussiness";

export default function Login() {
  const [username, setUsername] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const canSave = username && password;

  const login = async () => {
    if (canSave) {
      setLoading(true);
      let { message, status }: IApiResponse = await axios
        .post("Account/Login", { username, password })
        .then(({ data }) => data);

      if (status == EnumResponseStatus.invalid) {
        setError(message);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <main className="main">
        <div className="login">
          <div className="header">
            <span>ورود</span>
          </div>
          <div className="body">
            <div className="input_row">
              <label>نام کاربری</label>
              <input
                type="text"
                onChange={(event) => setUsername(event.target.value)}
                value={username}
              />
            </div>
            <div className="input_row">
              <label>کلمه عبور</label>
              <input
                type="password"
                onChange={(event) => setPassword(event.currentTarget.value)}
                value={password}
              />
            </div>
            <div className="input_row">
              <button onClick={login}>ورود</button>
            </div>
          </div>
        </div>
      </main>
      <ToastifyError text={error!} />
    </>
  );
}
