import React, { useEffect, useState } from "react";
import axios from "axios"

const Register = (s) => {

    const [input, setInput] = useState({
        user: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        let obj = input;
        setInput({ ...obj, [name]: value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (input.password !== input.confirmPassword) alert("Passwords do not match!")

        const newUser = {
            user: input.user,
            password: input.password,
            address: s.state.accounts[0]
        }

        axios.post('https://uid-server.herokuapp.com/register', newUser).then(
            res => {
                alert(res.data)

            }
        )
    }

    return (
        <div class="register">
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
                <span>Confirm Password</span>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="password"
                    value={input.confirmPassword}
                    onChange={e => handleChange(e)}
                />
                <button
                    onClick={e => handleLogin(e)}>
                    SIGN UP
                </button>
            </div>
        </div>
    );
}
export default Register;
