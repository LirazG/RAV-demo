//****** COMPONENT PROPS ********//

// name:            string, category name  
// completed:       boolean, true if all category files were scanned
// isRuning:        boolean, true if category is being scanned
// isPaused:        boolean, scan paused or not
// totalFiles:      integer, number of total files in category
// threats:         integer, number of total threats in category
//scannedFiles:     integer, number of total scanned files in category

//*******************************//

// dependencies
import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
//icons
import { RadioButtonUncheckedRounded, LoopRounded, PriorityHighRounded, CheckRounded } from '@material-ui/icons'
const ScanCategory = (props) => {
    return (
        <div className="scan-category">
            <section className="scan-category__name">
                <h6 style={props.completed ? {}:{opacity:'0.3'}}>{props.name}</h6>
            </section>
            
            <section className="scan-category__data">
                {props.isRuning || props.completed ? 
                    <span className="scan-category__data--proccessed">
                        <p>Scanned: {props.scannedFiles < props.totalFiles ? props.scannedFiles:props.totalFiles }</p>
                        <p>Threats: {props.completed ? props.threats:props.isRuning ? 0:null}</p>
                    </span>
                    :
                    <span className="scan-category__data--unproccessed">
                        <p>Waiting</p>
                    </span>
                }
            </section>

            <section
                className={
                    props.completed && props.threats > 0 ? 
                    "scan-category__result scan-category__result--danger"
                    :props.completed && props.threats === 0 ? 
                    "scan-category__result scan-category__result--safe"
                    :
                    "scan-category__result"
                }
            >
                <figure>
                    {props.completed && props.threats > 0 ? 
                        <SvgIcon
                            className="scan-category__result__icon"
                            component={PriorityHighRounded}
                            style={{fontSize:'2.3rem'}}
                        />
                        :props.completed && props.threats === 0 ?
                        <SvgIcon
                            className="scan-category__result__icon"
                            component={CheckRounded}
                            style={{fontSize:'2.3rem'}}
                        />
                        :props.isRuning ? 
                        <SvgIcon
                            className={
                                !props.isPaused ? 
                                "scan-category__result__icon scan-category__result__icon--scanning"
                                :
                                "scan-category__result__icon"
                            }
                            component={LoopRounded}
                        />
                        :
                        <SvgIcon
                            className="scan-category__result__icon"
                            component={RadioButtonUncheckedRounded}
                            style={{opacity:'0.2'}}
                        />
                    }
                </figure>
            </section>
        </div>
    )
}

export default ScanCategory
