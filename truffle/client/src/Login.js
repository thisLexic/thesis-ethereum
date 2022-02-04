import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import EthCrypto from 'eth-crypto';
import axios from "axios"
import Main from './Main';

const Login = (s) => {
    let history = useHistory();
    const [state, setState] = useState({});
    const [input, setInput] = useState({
        user: '',
        password: ''
    })

    useEffect(() => {
        setState(s.state);
      }, [s.state])

    const handleChange = (e) => {
        const { name, value } = e.target;
        let obj = input;
        setInput({ ...obj, [name]: value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const loginUser = {
            user: input.user,
            password: input.password
        }
        await axios.post('http://localhost:3001/login', loginUser).then(
            res => {
                if (res.data == 'Incorrect Username or Password.') {
                    alert(res.data)
                } else {
                    alert(res.data)
                    localStorage.setItem("user", input.user)
                    history.push("/main");
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
