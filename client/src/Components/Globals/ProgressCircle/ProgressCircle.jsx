//dependencies
import React from 'react'

const ProgressCircle = (props) => {
    const maxStroke = 3.1416 * (2 * (props.styles.width / 2 - 10))

    const strokeDasharray = () => {
        const firstStrokeCalc = (props.percentage / 100) * maxStroke

        if(props.percentage <= 49){
            return `${firstStrokeCalc} ${maxStroke - firstStrokeCalc}`
        } else {
            return `${firstStrokeCalc}`
        }
    }

    const strokeDasharrayScanIndicator = () => {
        const maxStroke = 3.1416 * (2 * (props.styles.width / 2) - props.styles.strokeWidth - 6)
        const firstStrokeCalc = (25 / 100) * maxStroke
        return `${firstStrokeCalc} ${maxStroke - firstStrokeCalc}`
    }


    return (
        <figure className="progress-circle" style={props.styles}>
            <div className="progress-circle__content">

                {props.percentage > 0 ? 
                    <svg
                        className="progress-circle__content__progress-bar" 
                        style={{ 
                            strokeDasharray: strokeDasharray(),
                            strokeWidth: props.styles.strokeWidth
                        }}
                    >
                        <circle
                            cx={props.styles.width / 2}
                            cy={props.styles.height / 2}
                            r={(props.styles.width / 2) - 10}
                        />
                    </svg> 
                    :
                    null
                }

                <svg 
                    className={
                        props.scanActive ?
                        "progress-circle__content__scan-indicator progress-circle__content__scan-indicator--active"
                        :
                        "progress-circle__content__scan-indicator"
                    }
                    style={{
                        strokeDasharray: strokeDasharrayScanIndicator()
                    }}
                >
                    <circle
                        cx={props.styles.width / 2}
                        cy={props.styles.height / 2}
                        r={(props.styles.width / 2) - props.styles.strokeWidth - 6}
                    />
                </svg> 

                {props.children}
            </div>
        </figure>
    )
}

export default ProgressCircle
