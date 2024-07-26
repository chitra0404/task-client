import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from 'axios';
import { Base_Url } from "../../config/api";

function Register() {
    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (values) => {
        const userData = {
            name: values.name,
            email: values.email,
            password: values.password,
            role: values.role, 
        };

        try {
            await axios.post(`${Base_Url}/api/register`, userData);
            setFeedback("Registration successful");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            setFeedback("User already exists, try with a new email ID");
            console.error("Registration error:", error);
        }
    };

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = "*Required";
        }
        if (!values.email) {
            errors.email = "*Required";
        }
        if (!values.password) {
            errors.password = "*Required";
        } else if (values.password.length < 6) {
            errors.password = "*Minimum 6 characters";
        }
        if (!values.repassword) {
            errors.repassword = "*Required";
        }
        if (values.repassword !== values.password) {
            errors.repassword = "*Password mismatch";
        }
        if (!values.role) {
            errors.role = "*Required";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            repassword: "",
            role: "", 
        },
        validate,
        onSubmit: (values) => {
            handleSignup(values);
            formik.resetForm();
        },
    });

    return (
        <section style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            width: '100vw',
            backgroundColor: 'rgb(7, 76, 87)' 
        }}>
            <div style={{ 
                backgroundColor: '#fff', 
                padding: '2rem', 
                borderRadius: '8px', 
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '500px',
                textAlign: 'center'
            }}>
                <h1 style={{ color: '#333', marginBottom: '2rem' }}>Task</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-outline mb-3">
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Enter your name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ width: '100%' }}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <span className="fw-bold" style={{ color: "red" }}>
                                {formik.errors.name}
                            </span>
                        )}
                    </div>

                    <div className="form-outline mb-3">
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ width: '100%' }}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <span className="fw-bold" style={{ color: "red" }}>
                                {formik.errors.email}
                            </span>
                        )}
                    </div>

                    <div className="form-outline mb-3">
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ width: '100%' }}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <span className="fw-bold" style={{ color: "red" }}>
                                {formik.errors.password}
                            </span>
                        )}
                    </div>

                    <div className="form-outline mb-3">
                        <input
                            type="password"
                            id="repassword"
                            className="form-control"
                            placeholder="Repeat password"
                            value={formik.values.repassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ width: '100%' }}
                        />
                        {formik.touched.repassword && formik.errors.repassword && (
                            <span className="fw-bold" style={{ color: "red" }}>
                                {formik.errors.repassword}
                            </span>
                        )}
                    </div>

                    <div className="form-outline mb-3">
                        <select
                            id="role"
                            className="form-control"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ width: '100%' }}
                        >
                            <option value="" label="Select role" />
                            <option value="User" label="User" />
                            <option value="Admin" label="Admin" />
                        </select>
                        {formik.touched.role && formik.errors.role && (
                            <span className="fw-bold" style={{ color: "red" }}>
                                {formik.errors.role}
                            </span>
                        )}
                    </div>

                    <div className="form-outline text-center mb-3">
                        {feedback && (
                            <span className={`fw-bold ${feedback.includes("successful") ? "text-primary" : "text-danger"}`}>
                                {feedback}
                            </span>
                        )}
                    </div>

                    <div className="d-flex justify-content-center mb-3">
                        <button type="submit" className="btn btn-dark">
                            Register
                        </button>
                    </div>

                    <p className="text-muted">
                        Have already an account?{" "}
                        <Link to="/login" className="fw-bold text-body">
                            <u>Login here</u>
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default Register;
