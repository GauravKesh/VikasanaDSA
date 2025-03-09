import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Login() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const validateInput = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return { msg: 'Enter valid email!', val: false }
    }
    if (password.length < 6) {
      return { msg: 'Password is atleast 7 characters long', val: false }
    }
    return { msg: 'appr', val: true }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputErr = validateInput()
    if (!inputErr.val) {
      alert(inputErr.msg)
      return;
    }
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        if (result.data.message === "Success") {
          localStorage.setItem("token", result.data.token);
          console.log(result.data.token, "nice")
          navigate("/home", { replace: true }); // Replace history to avoid back button issues
        } else {
          alert(result.data.message || "Wrong credentials");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("An error occurred during login");
      });
  };

  return <>

    <section className="bg-white mx-auto">
      <div className="grid place-items-center h-screen">
        <div className="max-w-xl lg:max-w-3xl">

          <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Welcome to Squid 🦑
          </h1>

          <form onSubmit={handleSubmit} action="#" className="mt-8 grid grid-cols-5 gap-6">

            <div className="col-span-6">
              <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

              <input
                type="email"
                id="Email"
                name="email"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

              <input
                type="password"
                id="Password"
                name="password"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <button
                className="w-full inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
              >
                Login
              </button>
            </div>

          </form>
          <p className="mt-4 text-sm text-gray-500">
            Don't have an account ?
            <a href="/register" className="text-gray-700 underline"> Sign Up</a>.
          </p>
        </div>
      </div>
    </section>
  </>
}

export default Login 