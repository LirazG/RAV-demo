// dependencies
import React, { useState, useRef, useEffect, Fragment } from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
// images
import Logo from '../../../Assets/Images/ReasonAV.png'
//icons 
import { Close, Minimize, Menu, InfoOutlined, SettingsOutlined } from '@material-ui/icons'
// electron 
const electron = window.require("electron")
const { ipcRenderer } = electron

const Navbar = () => {
    const [menuState, setMenuState] = useState(false)
    const wrapperRef = useRef(null)

    const handleClickOutside = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target))
        setMenuState(false)
    }

    const minimizeWindow = () => {
        ipcRenderer.send('window:minimize')
    }
    
    const closeWindow = () => {
        ipcRenderer.send('window:close')
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
          document.removeEventListener("click", handleClickOutside, false);
        }
    }, [])
    
    return (
        <nav className="navbar">
            <img src={Logo} alt="logo" className="navbar__logo"/>
            <section className="navbar__content">
                <button>UPGRADE TO PREMIUM</button>
                <span ref={wrapperRef}>
                    <SvgIcon
                        className="navbar__content__icon navbar__content__icon--menu"
                        component={Menu}
                        onClick={() => {setMenuState(!menuState)}}
                    />

                    {menuState ? 
                        <Fragment>
                            <i></i>
                            <aside className="navbar__content__menu" >
                                <div className="navbar__content__menu__item">
                                    <p>Settings</p>
                                    <SvgIcon component={SettingsOutlined} />
                                </div>
                                <div className="navbar__content__menu__item">
                                    <p>About Reason</p>
                                    <SvgIcon component={InfoOutlined} />
                                </div>
                            </aside>
                        </Fragment>
                        :
                        null
                    }
                </span>
                <SvgIcon
                    className="navbar__content__icon"
                    component={Minimize}
                    onClick={() => {minimizeWindow()}}
                />
                <SvgIcon
                    className="navbar__content__icon"
                    component={Close}
                    onClick={() => {closeWindow()}} 
                />
            </section>
        </nav>
    )
}

export default Navbar
