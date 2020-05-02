//dependencies
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
//components
import Threat from './Parts/Threat'
import ProgressCircle from '../../Globals/ProgressCircle/ProgressCircle'
//images
import Risk from '../../../Assets/Images/risk.png'
//icons
import { Toll, Timer, VisibilityOutlined } from '@material-ui/icons'
//context
import { ScanContext } from '../../../Context/scanContext'
//types
import { ACTIVATE_SCAN } from '../../../types/scanTypes'

const ProgressCircleStyles = {
    height: 260,
    width: 260,
    strokeWidth: 20,
    backgroundColor: 'rgb(255, 81, 102)'
}

const StatusPage = () => {
    const { scanDispatch } = useContext(ScanContext)

    return (
        <div className="status-page">
            <section>
                <div className="status-page__first-section">
                    <ProgressCircle
                        styles={ProgressCircleStyles} 
                        percentage={0}
                        scanActive={false}
                    >
                        <span className="status-page__first-section__content">
                            <img src={Risk} alt="risk"/>
                            <p>You are</p>
                            <p style={false ? {color:'rgb(1, 229, 175)'}:{color:'rgb(255, 81, 102)'}}>at risk</p>
                        </span>
                    </ProgressCircle>

                    <NavLink
                        to="/scan/0"
                        className="status-page__first-section__quick-scan"
                        onClick={()=>{scanDispatch({type: ACTIVATE_SCAN, payload: 0})}}
                    >
                        Quick scan
                    </NavLink>
                    <span className="status-page__first-section__scan-info">
                        <p><b>Last quick scan:</b> 1 day ago </p>
                        <p><b>Last full system scan:</b> 4 days ago </p>
                    </span>
                </div>
            </section>
            <section className="status-page__threats">
                <Threat
                    icon={Toll}
                    header={'Viruses and Malware'}
                    subHeader={'1 threat'}
                    threatReview={true}
                    buttonText={'Removing..'}
                    componentState={false}
                />
                <Threat
                    icon={Timer}
                    header={'Real time protection'}
                    threatReview={true}
                    buttonText={'Enable'}
                    componentState={true}
                />
                <Threat
                    icon={VisibilityOutlined}
                    header={'Privacy'}
                    subHeader={'At risk'}
                    threatReview={false}
                    buttonText={'Fix now'}
                    componentState={false}
                />
            </section>
        </div>
    )
}

export default StatusPage
