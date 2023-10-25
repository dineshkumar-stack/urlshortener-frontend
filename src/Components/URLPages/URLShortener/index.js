import React, { useState } from 'react'
import { longURLApi } from '../../Api'
import Header from '../../Header'
import './url.css';
import { useNavigate } from 'react-router-dom';



function URLShortener() {

    const [longURL, setLongURL] = useState("")
    const [shortURL, setShortURL] = useState("")
    const navigate = useNavigate()

    const handleLongURL = async () => {
        try {
            if (longURL !== "") {
                const token = localStorage.getItem("token")
                const config = { headers: { "x-auth-token": token } }
                const response = await longURLApi({ longurl: longURL }, config)
                console.log(response.data)
                setShortURL(`https://urlshortener-backend-star.onrender.com/${response.data.data}`)
            } else {
                alert("Enter URL")
            }

        } catch (err) {
            console.log(err);
            if (err.response.data.message === "Invalid Authorization") {
                const confirmed = window.confirm("Please login to continue")
                if (confirmed) {
                    navigate("/")
                }
            }
            if (err.response.data.message === "Token expired") {
                alert("Token expired login again")
                localStorage.clear()
                navigate("/")
            }
        }

    }

    const handleCopy = () => {
        // console.log('check', shortURL);
        if (shortURL) {
            navigator.clipboard.writeText(shortURL);
            alert("copied");
        }
    }

    return (
        <div>
            <div>
                <Header></Header>
            </div>
            <div className='Dashboard'>
                <div>
                    <div className='longURL'>
                        <div>
                            <h1>Paste long URL</h1>
                        </div>
                        <div>
                            <input type="text" onChange={(e) => setLongURL(e.target.value)} />
                            <button type="submit" onClick={handleLongURL}> Create Short URL </button>
                        </div>
                    </div>
                    {shortURL && <div className='shortURL'>
                        <div>
                            <h2>ShortURL</h2>
                        </div>
                        <div>
                            <a href={shortURL} target='_blank' rel="noreferrer" >{shortURL} </a>
                            <button onClick={handleCopy}>Copy</button>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default URLShortener