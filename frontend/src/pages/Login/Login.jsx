import React, { useState } from "react";
import logo from "@/assets/logo2.png";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/login/login.module.css";
import { apiRoutes } from "@/utils/apiRoutes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getData } from "@/features/user/userSlice";
import Loading from "@/components/Loading/Loading";


const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputBox = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogIn = () => {
    const emailPattern = /^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.[A-Za-z]{2,4}$/;
    setValidEmail(!emailPattern.test(data.email));
    setValidPassword(data.password === "");
    if (
      emailPattern.test(data.email) &&
      data.password !== ""
    ) {
      handleApiCalling(data);
    }
  };

  const handleApiCalling = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(apiRoutes.loginURI, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      localStorage.setItem("campusvinculum", response.data.token);
      toast.success("Login Successfully", { position: "top-center" });
      window.location.reload();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response?.data.message === "email or password doesn't exists") {
        setMessage(true);
      }
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className={styles.main}>
        

        <div className={styles.login_container}>
          <div className={styles.logo_box}>
            <img src={logo} alt="Campus Vinculum Logo" className={styles.logo} />
          </div>
          <h2 className={styles.form_title}>Sign in to your account</h2>
          <form onSubmit={(e) => e.preventDefault()} className={styles.login_form}>
            {message && (
              <div className={styles.div_wrapper}>
                <span className={styles.message}>User doesn't exist</span>
              </div>
            )}
            <div className={styles.div_wrapper}>
              <div className={styles.form_input_box}>
                <label className={styles.form_data_wrapper}>
                  <span className={styles.input_title}>Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="  Enter your email"
                    className={styles.input_box}
                    onChange={handleInputBox}
                  />
                </label>
                {validEmail && (
                  <span className={styles.invalid_user}>Invalid Email Address</span>
                )}
              </div>
            </div>

            <div className={styles.div_wrapper}>
              <div className={styles.form_input_box}>
                <label className={styles.form_data_wrapper}>
                  <span className={styles.input_title}>Password</span>
                  <div className={styles.password_box}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="  Enter your password"
                      name="password"
                      onChange={handleInputBox}
                      className={styles.password_input_box}
                    />
                    <button
                      type="button"
                      className={styles.eye_botton}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <HiEyeOff /> : <HiEye />}
                    </button>
                  </div>
                </label>
                {validPassword && (
                  <span className={styles.invalid_user}>*Please Enter Your Password</span>
                )}
              </div>
            </div>

            <div className={styles.forgot_password_box}>
              <label htmlFor="checkbox" className={styles.remember_me}>
                <input type="checkbox" name="checkbox" id="checkbox" />
                <span className={styles.remember_me_text}>Remember me</span>
              </label>
            </div>

            <div className={styles.form_input_box}>
              <button className={styles.login_button} onClick={handleLogIn}>
                Login
              </button>
            </div>

      
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
