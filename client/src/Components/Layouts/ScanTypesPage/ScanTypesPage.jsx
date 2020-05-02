//dependencies
import React, { useContext } from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import { NavLink } from 'react-router-dom'
//images
import ScanImg from '../../../Assets/Images/scan-icon.png'
//data
import scanTypesData from '../../../Data/scanTypesData'
//context
import { ScanContext } from '../../../Context/scanContext'
//types
import { ACTIVATE_SCAN } from '../../../types/scanTypes'


const ScanTypes = () => {
    const { scanDispatch } = useContext(ScanContext);
    
    const startScan = (payload) => {
        scanDispatch({type: ACTIVATE_SCAN, payload})
    }

    return (
        <div className="scan-types">
            <h1>Scans</h1>
            {scanTypesData.map((scanType, index)=>
                <div className="scan-types__item" key={scanType.header}>
                    <figure className="scan-types__item__display">
                        <img src={ScanImg} alt="scan"/>
                        <figure>
                            <SvgIcon component={scanType.icon}/>
                        </figure>
                    </figure>
                    <section className="scan-types__item__info">
                        <span>
                            <h4>{scanType.header}</h4>
                            {scanType.recommended ? <figure>Recommended</figure>:null }
                        </span>
                        <p>{scanType.text}</p>
                    </section>
                    <NavLink
                        to={'/scan/' + index}
                        className="scan-types__item__button"
                        onClick={()=>{startScan(index)}}
                    >
                        Scan
                    </NavLink>
                </div>
            )}
        </div>
    )
}

export default ScanTypes
