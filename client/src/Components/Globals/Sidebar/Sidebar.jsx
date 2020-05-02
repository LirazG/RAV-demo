// dependencies
import React, { useState, useContext } from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import { NavLink } from 'react-router-dom'
//icons 
import { LockOpen, VisibilityOutlined, Speed, RadioButtonUnchecked } from '@material-ui/icons'
//context
import { ScanContext } from '../../../Context/scanContext'
// navigation data array
const navSections = [
    {text: 'Status', image: RadioButtonUnchecked, className: 'sidebar__item__icon sidebar__item__icon__rotation', scan: true},
    {text: 'Protection', image: LockOpen, className: 'sidebar__item__icon'},
    {text: 'Privacy', image: VisibilityOutlined, className: 'sidebar__item__icon'},
    {text: 'Performance', image: Speed, className: 'sidebar__item__icon'}
]

const Sidebar = (props) => {

    const [activePage, setActivePage] = useState(0)
    const { scanState } = useContext(ScanContext)

    return (
        <nav className="sidebar">
            {navSections.map((item, index) => 
                <NavLink
                    className={activePage === index ? "sidebar__item sidebar__item--active":"sidebar__item"}
                    key={item.text} 
                    to={ scanState.scanOn && item.scan ? '/scan/' + index:'/' + item.text.toLowerCase()}
                    onClick={()=>{setActivePage(index)}}
                >
                    {item.scan ? 
                        <div className="sidebar__item__spinner-container">
                            <div className={scanState.scanOn && !scanState.pause ? "spinner-side spinner-side--active":"spinner-side"}></div>
                            <figure className="sidebar__item__spinner-container--circle"/>
                        </div>
                        :
                        <SvgIcon component={item.image} className={item.className ? item.className:null}/>
                    }
                    
                    <p className="sidebar__item__text">{item.text}</p>
                </NavLink>
            )}
                
            <div className="sidebar__item sidebar__item__last">
                <p className="sidebar__item__last__text">Get full protection now</p>
                <button className="sidebar__item__last__button">Upgrade</button>
            </div>
        </nav>
    )
}

export default Sidebar
