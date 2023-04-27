/* eslint-disable jsx-a11y/alt-text */
import { Link, useNavigate } from "react-router-dom";
import lockSvg from "../assets/lock.svg";
import eyeSvg from "../assets/eye.svg";
import { useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import "../styles/style.scss";

const Register = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(1);
  const [role, setRole] = useState("Patient");
  const [userData, setUserData] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/register",
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      res.data.error
        ? toast.error(res.data.error, {theme: "light", position: "top-right" })
        : toast.success(res.data.message, "success");
      res.data.message.includes("registered successfully!") &&
        navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.error
          ? error.response.data.error
          : error.response.data.message,
        {theme: "light", position: "top-right"}
      );
    }
  };

  return (
    <div className="fomContainer">
      <form onSubmit={handleRegister}>
        <div className="header">
          <h2>Register</h2>
          <p>
            Already signed up?{" "}
            <Link to="/login" className="link">
              Login
            </Link>
          </p>
          {toggle === 2 && (
            <p
              className="link"
              onClick={() => {
                setToggle(1);
              }}
            >
              Back
            </p>
          )}
        </div>
        {toggle === 1 && (
          <>
            <div className="input">
              <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px"}}><input style={{width: "unset"}} type="radio" name="roles" onChange={(e) => {setRole(e.target.value); setUserData({ ...userData, role: e.target.value });}} value="Patient" checked={role=== 'Patient'}/> Patient</div>
              <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px"}}><input style={{width: "unset"}} type="radio" name="roles" onChange={(e) => {setRole(e.target.value); setUserData({ ...userData, role: e.target.value });}} value="Physician"/> Physician</div>
              <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px"}}><input style={{width: "unset"}} type="radio" name="roles" onChange={(e) => {setRole(e.target.value); setUserData({ ...userData, role: e.target.value });}} value="Pharmacist"/> Pharmacist</div>
            </div>
            <div className="btn-container">
              <button
                style={{width: "unset"}}
                className="submit-button"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(userData);
                  setToggle(2);
                }}
              >
                Continue
              </button>
            </div>
          </>
        )}

        {toggle === 2 && (
          <>
            <div className="input">
              <input
                type="text"
                placeholder="Enter your full names"
                onChange={(e) => {
                  setUserData({ ...userData, fullNames: e.target.value });
                  // console.log(userData)
                }}
                required
              />
            </div>
            {role === "Patient" && (
              <div className="input">
                <input
                  type="text"
                  placeholder="Enter your username"
                  onChange={(e) => {
                    setUserData({ ...userData, username: e.target.value });
                  }}
                  required
                />
              </div>
            )}
            {role === "Physician" && (
              <div className="input">
                <input
                  type="email"
                  placeholder="Your Email address"
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                  required
                />
              </div>
            )}{" "}
            {role === "Pharmacist" && (
              <div className="input">
                <input
                  type="text"
                  placeholder="Your phone number"
                  onChange={(e) => {
                    setUserData({ ...userData, phone: e.target.value });
                  }}
                  required
                />
              </div>
            )}
            <div className="input password-input">
              <input
                type="password"
                placeholder="Create a password"
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                }}
                required
              />
              <div className="icon">
                <img src={eyeSvg} />
              </div>
            </div>
            <div className="input">
              <input
                type="number"
                placeholder="Enter your age"
                onChange={(e) => {
                  setUserData({ ...userData, age: e.target.value });
                }}
                required
              />
            </div>
            <div className="radioContainer">
              <div className="radio">
                <input
                  name="gender"
                  type="radio"
                  value="Male"
                  // defaultChecked
                  onChange={(e) => {
                    setUserData({ ...userData, gender: e.target.value });
                  }}
                  required
                />
                <p>Male</p>
              </div>
              <div className="radio">
                <input
                  name="gender"
                  type="radio"
                  value="Female"
                  onChange={(e) => {
                    setUserData({ ...userData, gender: e.target.value });
                  }}
                  required
                />
                <p>Female</p>
              </div>
            </div>
            <div className="btn-container">
              <div className="lock">
                <img src={lockSvg} />
              </div>
              <button className="submit-button" type="submit">
                Sign up
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
