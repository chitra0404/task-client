import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../../config/api";

function Login() {
    const [user, setUser] = useState({ email: "", password: "" });
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => { setOpen(false) };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setOpen(true);
        try {
            const res = await axios.post(`${Base_Url}/api/login`, user);
            console.log(res);
            if (res?.status === 200) {
                setUser({ email: "", password: "" });
                localStorage.setItem("tokenAuth", res.data.token);
                console.log(res.data.token);
                console.log("role",res.data.role)
                localStorage.setItem("email", res.data.email);
                const userRole = res.data.role; 
                if (userRole === 'Admin') {
                    navigate("/admin");
                } else {
                    navigate("/dashboard");
                }
            } else {
                handleClose();
            }
        } catch (error) {
            handleClose();
            console.log(error, error.message);
            setUser({ ...user, password: "" });
            window.alert(`Invalid. Try again`);
        }
    }

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
                width: '100%',
                maxWidth: '500px',
                padding: '2rem',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                height: 'auto',
                minHeight: '400px' 
            }}>
                <form onSubmit={handleLoginSubmit}>
                    <div className="text-center mb-4">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                        <span className="h1 fw-bold">Login</span>
                    </div>

                    <div className="form-outline mb-4">
                        <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            placeholder="Email address"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div className="form-outline mb-4">
                        <input
                            type="password"
                            id="password"
                            className="form-control form-control-lg"
                            placeholder="Enter your Password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <p className="mb-1 text-center">
                        <span className="text-primary fw-bold">
                            {open ? "Successfully logged in" : null}
                        </span>
                    </p>

                    <div className="pt-1 mb-4 text-center">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                            Login
                        </button>
                    </div>

                    <p className="mb-1 pb-lg-2 text-center" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <Link to="/" style={{ color: "#393f81" }}>
                            Register here
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default Login;
