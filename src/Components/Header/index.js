import React, { useEffect, useRef, useState } from 'react';
import './header.css';
import avatar from "../Image/User-avatar.svg.png"
import { useNavigate } from 'react-router-dom';


// Custom hook to handle click outside behavior
function useClickOutside(ref, callback) {
    // console.log("ref", ref)
    // console.log("callback", callback)
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
}


function Header() {

    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null);

    const email = localStorage.getItem("email")
    // console.log(email)


    // Use the custom hook to handle click outside behavior
    useClickOutside(menuRef, () => {
        setShowMenu(false);
    });

    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    return (
        <div className='header'>
            <div className="header_left">
                <h2 onClick={() => navigate("/urlshortener")}>URL Shortener</h2>
            </div>
            <div className="header_center">
                <ul className='header_list'>
                    <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                    <li onClick={() => navigate("/allurls")}>Created URLs</li>
                </ul>
            </div>
            {email ? (
                <div className="profile-container">
                    <div onClick={() => setShowMenu(!showMenu)} className='profile-icon'>
                        <img src={avatar} alt="profile" />
                    </div>
                    {
                        showMenu && (
                            <div ref={menuRef} className='profile-menu' >
                                <p>{email}</p>
                                <button onClick={handleLogout}> logout</button>
                            </div>
                        )
                    }
                </div>
            ) :
                (<div className="header_right">
                    <button onClick={() => navigate("/")}>Log in</button>
                    <button onClick={() => navigate("/signup")}>Sign up</button>
                </div>)}
        </div>
    )
}

export default Header;