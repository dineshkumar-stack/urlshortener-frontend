import React from 'react'
import Inputtag from '../Inputtag'
import Button from '../Button'
import { useReducer } from 'react'
import { loginApi } from '../Api'
import { useNavigate } from 'react-router-dom'
import logo from "../Image/Icon.jpg"
import "./login.css";

const reducer = (state, action) => {

    switch (action.type) {
        case "TYPING": {
            return {
                ...state,
                [action.field]: action.payload
            }
        }
        default:
            return state;
    }
}


function Login() {

    const [state, dispatch] = useReducer(reducer, { email: "", password: "" })

    const navigate = useNavigate();

    const handleTypeing = (e) => {
        dispatch({ type: "TYPING", field: e.target.type, payload: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // console.log(state);
            const response = await loginApi(state)
            console.log(response);
            localStorage.setItem("email", response.data.email)
            localStorage.setItem("token", response.data.token)
            navigate("/urlshortener")
        } catch (err) {
            console.log(err);
            alert(err.response.data.message);
        }

    }

    return (
        <div className='form'>
            <div className='brand'>
                <img className="logo" src={logo} alt="logo" />
                <h2>URL Shortener</h2>
            </div>
            <form className="container" onSubmit={(e) => handleLogin(e)}>
                <h1>Welcome...</h1>
                <hr />
                <Inputtag type={"email"} placeholder={"enter email"} name={"Email"} onChange={(e) => handleTypeing(e)} />
                <Inputtag type={"password"} placeholder={"enter password"} name={"Password"} onChange={(e) => handleTypeing(e)} />
                <Button type={"submit"} name={"Login"} />
                <div className='bottomform'>
                    <p onClick={() => navigate("/forgotpassword/emailverify")}>Forgot Password?</p>
                    <p onClick={() => navigate("/")}>Sign Up?</p>
                </div>
            </form>
        </div>

    )
}

export default Login;