import React, { useState } from 'react'
import Inputtag from '../Inputtag'
import Button from '../Button'
import { singUpApi } from '../Api'
import { useReducer } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
import logo from "../Image/Icon.jpg"

function reducer(state, action) {
    //  console.log("state", state, "action", action)

    switch (action.type) {
        case "FIRST": {
            return {
                ...state,
                firstname: action.payload
            }
        }
        case "LAST": {
            return {
                ...state,
                lastname: action.payload
            }
        }
        case "EMAIL": {
            return {
                ...state,
                email: action.payload
            }
        }
        case "PASSWORD": {
            return {
                ...state,
                password: action.payload
            }
        }
        default: {
            return state;
        }
    }
}


function Signup() {

    const [state, dispatch] = useReducer(reducer, {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })

    const [mailSent, setMailSent] = useState(false)

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await singUpApi(state)
            console.log(response);
            alert("Mail Sent: Please check your Mail and Activate your account")
            setMailSent(true)

        } catch (err) {
            // console.log('err', err);
            alert(err.response.data.message);
        }

    }

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className='form'>
            <div className='brand'>
                <img className="logo" src={logo} alt="logo" />
                <h2>URL Shortener</h2>
            </div>
            <form >
                <div className='container'>
                    <h1>Sign Up</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />
                    <Inputtag type={"text"} placeholder={"enter first name"} name={"First Name"} onChange={(e) => dispatch({ type: "FIRST", payload: e.target.value })} />
                    <Inputtag type={"text"} placeholder={"enter last name"} name={"Last Name"} onChange={(e) => dispatch({ type: "LAST", payload: e.target.value })} />
                    <Inputtag type={"email"} placeholder={"enter email"} name={"Email address"} onChange={(e) => dispatch({ type: "EMAIL", payload: e.target.value })} />
                    <Inputtag type={"password"} placeholder={"password"} name={"Password"} onChange={(e) => dispatch({ type: "PASSWORD", payload: e.target.value })} />
                    {mailSent && <p style={{ textDecoration: "none" }} className='mailsent'>Mail Sent</p>}
                    <Button type={"submit"} name={"SignUp"} onClick={(e) => handleSignUp(e)} />
                </div>
            </form>
            <div className='signuplogin' onClick={handleLogin}>
                <p>Go to Login Page?</p>
            </div>
        </div>
    )
}

export default Signup