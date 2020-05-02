
//****** COMPONENT PROPS ********//

// header:          string, header text  
// subHeader?:      string, sub header text
// threatReview?:   boolean, show thread review link or not
// buttonText:      string, button text  
// callback:        function, callback on button click
// componentState:  boolean, in danger/protected component state

//*******************************//

//dependencies
import React from 'react'
import { NavLink } from 'react-router-dom'
import SvgIcon from '@material-ui/core/SvgIcon'
//icons
import { PriorityHigh, Done, Cancel, CheckCircle } from '@material-ui/icons';

const Threat = (props) => {
    return (
        <div className="threat">
        <aside className="threat__status" style={props.componentState ? {backgroundColor:'rgb(1, 229, 175)'}:{backgroundColor:'rgb(255, 81, 102)'}}>
            <figure>
                {props.componentState ? 
                    <SvgIcon component={Done} style={props.componentState ? {color:'rgb(1, 229, 175)'}:{color:'rgb(255, 81, 102)'}}/>
                    :
                    <SvgIcon component={PriorityHigh} style={props.componentState ? {color:'rgb(1, 229, 175)'}:{color:'rgb(255, 81, 102)'}}/>
                }
            </figure>
        </aside>
        <div className="threat__content">
            <section className="threat__content__data">
                <figure className="threat__content__data__icon">
                    <SvgIcon 
                        component={props.icon}
                        style={
                            props.icon.displayName === 'TollIcon' ? 
                            {transform:'rotate(90deg)'}
                            :
                            {}
                        }
                    /> 
                    <span style={props.componentState ? {color:'rgb(1, 229, 175)'}:{color:'rgb(255, 81, 102)'}}>
                        {props.componentState ?
                            <SvgIcon component={CheckCircle} />
                            :
                            <SvgIcon component={Cancel} />
                        }
                    </span>
                </figure>
                <span className="threat__content__data__text">
                    <h6>{props.header}</h6>
                    <p>{props.subHeader ? props.subHeader:null}</p>
                </span>
            </section>

            <section className="threat__content__cta">
                {props.threatReview ? 
                    <NavLink
                        to="/"
                        className="status-page__protection__quick-scan"
                        style={
                            props.componentState ? 
                            {color:'black', opacity:'0.2', pointerEvents:'none'}
                            :
                            {}
                        }
                    >
                        Review threats
                    </NavLink>
                    :
                    <p></p>
                }

                <button
                    style={
                        props.componentState ? 
                        {color:'black', opacity:'0.2', pointerEvents:'none',border:'2px solid black'}
                        :
                        {}
                    }
                >
                    {props.buttonText}
                </button>
            </section>
        </div>
    </div>
    )
}

export default Threat
