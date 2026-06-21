import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            toast.success("Login Successful!");

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Login Failed"
            );

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-96">

                <h1 className="text-3xl font-bold text-center text-blue-600">

                    Personal Finance Tracker

                </h1>

                <p className="text-center text-gray-500 mb-8 mt-2">

                    Welcome Back

                </p>

                <form onSubmit={handleSubmit}>

                    <input

                        type="email"

                        name="email"

                        placeholder="Email"

                        onChange={handleChange}

                        className="w-full border p-3 rounded-lg mb-4"

                    />

                    <input

                        type="password"

                        name="password"

                        placeholder="Password"

                        onChange={handleChange}

                        className="w-full border p-3 rounded-lg mb-6"

                    />

                    <button

                        type="submit"

                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"

                    >

                        Login

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;