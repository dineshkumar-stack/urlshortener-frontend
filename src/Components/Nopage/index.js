import React from 'react'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

function Nopage() {

    const navigate = useNavigate();

    const pageError = () => {
        navigate("/urlshortener");
    }

    return (
        <div>
            <h1 style={{ textAlign: "center", color: "#007bff" }}>404 Page Not Found</h1>
            <Button type={"submit"} name={"Home"} onClick={pageError} style={{ width: "100px" }} />
        </div>
    )
}

export default Nopage