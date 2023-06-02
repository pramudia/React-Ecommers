import React, { Fragment, useState, useEffect } from 'react';
// import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import "./Login.css";

function Login() {
    const [Users, fetchUsers] = useState([]);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const emailJs = "abed@gmail.com";
    const passwordJs = "admin123";
    const token = "okq69LF5S3y69m1sr30Y3YZecPA80I6h";

    useEffect(() => {
        fetch('http://localhost:3004/users')
            .then((res) => res.json())
            .then((res) => {
                fetchUsers(res)
            })
    }, []);


    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const login = (e) => {
        // const emailSet = setEmail(e.target.value)
        // const passwordSet = setPassword(e.target.value)
        // this.Users.map((item) => {
        //     return email = item.email, password = item.password
        // })


        if (email == emailJs && password == passwordJs) {
            localStorage.setItem('token', token)
            navigate('/')
        } else {
            alert("email / password salah")
        }


    }


    return (
        <Fragment>

            <div className="conatinerLogin">
                <div className="background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>
                <form className='formLogin'>
                    <h3>Login Here</h3>

                    <label name="username">Username</label>
                    <input type="text" placeholder="email : abed@gmail.com" id="email" className="email"
                        value={email} onChange={handleEmail}
                    />

                    <label name="password">Password</label>
                    <input type="password" placeholder="Password : admin123" id="password"
                        value={password} onChange={handlePassword}
                    />
                    {error && <small>{error}</small>}
                    <button id="login-btn" className="login-btn" onClick={login}>Log In</button>
                </form>
            </div>

        </Fragment >
    )
}

export default Login