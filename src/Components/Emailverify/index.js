import React, { useState } from 'react'
import Inputtag from '../Inputtag'
import { emailVerifyApi, forgotPasswordApi } from '../Api';
import "./emailverify.css";

function Emailverify() {
    const [email, setEmail] = useState("");
    const [disable, setDisable] = useState(true);
    const [change, setChange] = useState(false)


    const handleClick = async (e) => {
        try {
            e.preventDefault();
            const response = await emailVerifyApi({ email });
            console.log(response);
            setDisable(false);
            setChange(true);
            alert("Email verified successfully, Reset your password")
        } catch (err) {
            console.log(err);
            setDisable(true);
            alert(err.response.data.message)
        }
    }

    const handleForgotPassword = async (e) => {
        try {
            e.preventDefault();
            const response = await forgotPasswordApi({ email });
            console.log(response)
            alert("Mail sent: Pleace check your mail for password reset");
            setDisable(true);
            setChange(true);
        } catch (err) {
            console.log(err);
        }
    }

    const handleOnChange = (e) => {
        setEmail(e.target.value);
        setChange(false);
    }

    return (
        <form className='form'>
            <div className='emailverify'>
                <Inputtag type={"email"} placeholder={"type email and click verify..."} name={"Email address"} onChange={(e) => handleOnChange(e)} />
                <button type={"submit"} disabled={change} onClick={handleClick} >Click for Verify </button>
            </div>
            <button className="reset" type={"submit"} disabled={disable} onClick={(e) => handleForgotPassword(e)}>Reset Password</button>
        </form>
    )
}

export default Emailverify