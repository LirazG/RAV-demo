//dependencies
import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import SvgIcon from '@material-ui/core/SvgIcon'
//components
import Banner from '../Globals/Banner/Banner'
//icons
import { Lock } from '@material-ui/icons'
//context
import { ScanContext } from '../../Context/scanContext'

const GenericPage = (props) => {
    const { scanState } = useContext(ScanContext);

    return (
        <div className="generic-page">
            <main className="generic-page__content">
                {props.data.map(item => {
                    return <div className="generic-page__content__feature" key={item.header}>
                                <figure
                                    style={item.disabled ? {cursor:'initial'}:{}}
                                    onClick={()=>{
                                        if(item.disabled || item.locked){
                                            console.log('popup here')
                                        } else {
                                            item.type === 'scan' && scanState.scanOn ? 
                                            props.history.push(`/scan/${scanState.scanType}`)
                                            :
                                            props.history.push(item.link)
                                        }
                                    }}
                                >
                                    <img src={item.image} alt="feature" style={!item.disabled ? {transform:'scale(0.55)'}:{transform:'scale(1.08)'}}/>
                                    {item.locked ? 
                                        <span className="generic-page__content__feature__lock">
                                            <SvgIcon component={Lock}/>
                                        </span>
                                        :
                                        null
                                    }
                                </figure>
                                <h6 style={item.disabled ? {opacity:'0.6'}:{}}>{item.header}</h6>
                                <p style={item.disabled ? {opacity:'0.3'}:{}}>{item.text}</p>
                           </div>
                })}
            </main>
            <Banner />
        </div>
    )
}

export default withRouter(GenericPage)
