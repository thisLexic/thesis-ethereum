import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = (s) => {
    let navigate = useNavigate();
    const [input, setInput] = useState({
        user: '',
        password: ''
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        let obj = input;
        setInput({ ...obj, [name]: value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const loginUser = {
            user: input.user,
            password: input.password,
            address: s.state.accounts[0]
        }
        
        await axios.post('https://uid-server.karlocabugwang1.repl.co/login', loginUser).then(
            res => {
                if (res.data === 'Login Successful!') {
                    alert(res.data)
                    localStorage.setItem("user", input.user)
                    if (input.user === "admin") return navigate("/admin");
                    navigate("/main");
                } else {
                    alert(res.data)
                    
                }

            }

        )

        
    }

    return (
        <div class="login">
            <div>
                <span>Username</span>
                <input
                    type="text"
                    name="user"
                    placeholder="username"
                    value={input.user}
                    onChange={e => handleChange(e)}
                />
                <span>Password</span>
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={input.password}
                    onChange={e => handleChange(e)}
                />
                <button
                    onClick={e => handleLogin(e)}>
                    LOG IN
                </button>
            </div>


        </div>
    );
}
export default Login;
