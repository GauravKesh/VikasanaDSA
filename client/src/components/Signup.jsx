import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Signup() {

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const validateInput = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        if (!usernameRegex.test(username)) {
            return { msg: 'username must be 2-30 alphanum', val: false }
        }
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
            .post("http://localhost:3001/users", { username, email, password })
            .then((result) => {
                navigate("/login");
            })
            .catch((err) => {
                const errorMsg = err.response?.data?.message || "Registration failed";
                alert(errorMsg);
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
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>

                            <input
                                type="text"
                                id="username"
                                name="first_name"
                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

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
                                Create an account
                            </button>
                        </div>

                    </form>
                    <p className="mt-4 text-sm text-gray-500">
                        Already have an account ?
                        <a href="/login" className="text-gray-700 underline"> Log in</a>.
                    </p>
                </div>
            </div>
        </section>
    </>
}

export default Signup 