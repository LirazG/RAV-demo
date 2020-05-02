//dependencies
import React, { useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import SvgIcon from '@material-ui/core/SvgIcon'
import { NavLink } from 'react-router-dom'
//components
import Banner from '../../Globals/Banner/Banner'
import ProgressCircle from '../../Globals/ProgressCircle/ProgressCircle'
import ScanCategory from './parts/ScanCategory'
//icons
import { CloseRounded, PauseRounded, PlayArrowRounded, CheckRounded } from '@material-ui/icons'
//context
import { ScanContext } from '../../../Context/scanContext'
//types 
import { HANDLE_SCAN_STATE_CHANGE, ACTIVATE_SCAN } from '../../../types/scanTypes'

const ProgressCircleStyles = {
    height: 260,
    width: 260,
    strokeWidth: 20
}

const ScanPage = (props) => {
    const { scanState, scanDispatch } = useContext(ScanContext)
    const fakePathArray = scanState.fakePathArray
    const fakePathArrayIndex = scanState.fakePathArrayIndex
    const percentCompleted = Math.floor(((fakePathArrayIndex + 1) / fakePathArray.length) * 100)

    const scanCategories = [
        {name: 'Memory', startIndex: -1, numberOfFiles: fakePathArray.length * 0.1},
        {name: 'Startups', startIndex: 50, numberOfFiles: fakePathArray.length * 0.1},
        {name: 'File System', startIndex: 100, numberOfFiles: fakePathArray.length * 0.5},
        {name: 'Browsers', startIndex: 350, numberOfFiles: fakePathArray.length * 0.1},
        {name: 'Programs', startIndex: 400, numberOfFiles: fakePathArray.length * 0.1},
        {name: 'Privacy', startIndex: 450, numberOfFiles: fakePathArray.length * 0.1}
    ]

    useEffect(() => {
        scanDispatch({type: ACTIVATE_SCAN, payload: props.match.params.scanType})
    }, [fakePathArray, scanState.pause])

    const handleScanState = (payload) => {
        scanDispatch({type: HANDLE_SCAN_STATE_CHANGE, payload})
        if(!payload.scanOn && !Object.keys(payload).includes('pause'))
        props.history.push('/status')
    }

    return (
        <div className="scan-page">
            <div className="scan-page__content">
                <header className="scan-page__heading">
                    { scanState.scanType === 0 ? 
                        <h1>Quick scanning</h1>
                        :scanState.scanType === 1 ? 
                        <h1>Full scanning</h1>
                        :
                        <h1>Custom scanning</h1>
                    }

                   {percentCompleted < 100 ? 
                        <p>
                        {fakePathArray[fakePathArrayIndex] ?
                            fakePathArray[fakePathArrayIndex]
                            :
                            'Scanning process'
                        }
                        </p>
                        :
                        null
                    }
                </header>
                <main className="scan-page__main">
                    <section>
                        <ProgressCircle 
                            styles={ProgressCircleStyles} 
                            percentage={percentCompleted}
                            scanActive={!scanState.pause && percentCompleted < 100}
                        >
                            {percentCompleted < 100 ? 
                                <div className="scan-page__main__progress">
                                    <h1>{percentCompleted}%</h1>
                                    {scanState.pause ? 
                                        <p>Scan paused</p>
                                        :
                                        <p>Scanning...</p>
                                    }
                                </div>
                                :
                                <div className="scan-page__main__progress">
                                    <SvgIcon component={CheckRounded} className="scan-page__main__progress__done-icon" />
                                    <h2>Done!</h2>
                                </div>
                            }
                        </ProgressCircle>

                        {percentCompleted < 100 ? 
                            <div className="scan-page__main__actions">
                                {scanState.pause ? 
                                    <figure onClick={()=>{handleScanState({pause: false})}}>
                                        <SvgIcon component={PlayArrowRounded} />
                                    </figure>
                                    :
                                    <figure onClick={()=>{handleScanState({pause: true})}}>
                                        <SvgIcon component={PauseRounded} />
                                    </figure>
                                }

                                <figure onClick={()=>{handleScanState({scanOn: false, fakePathArrayIndex: 0})}}>
                                    <SvgIcon component={CloseRounded} />
                                </figure>
                            </div>
                            :
                            <div className="scan-page__main__scan-results">
                                <p><b>We have detected 14 threats on your computer.</b></p>
                                <p>We recommend you to remove them now.</p>
                            </div>
                        }


                    </section>

                    {scanState.scanType !== 2 ? 
                        <section style={percentCompleted === 100 ? {height:'105%'}:{}}>
                            {scanCategories.map( (category, index) => 
                                <ScanCategory 
                                    name={category.name}
                                    completed={fakePathArrayIndex + 1 >= category.startIndex + category.numberOfFiles}
                                    isRuning={
                                        category.startIndex <= fakePathArrayIndex + 1
                                        && 
                                        fakePathArrayIndex + 1 < category.startIndex + category.numberOfFiles
                                    }
                                    isPaused={scanState.pause}
                                    totalFiles={category.numberOfFiles}
                                    threats={index === 3 || index === 4 ? index * 2:0}
                                    scannedFiles={fakePathArrayIndex + 1 - category.startIndex}
                                />
                            )}

                            {percentCompleted === 100 ?
                                <div className="scan-page__main__scan-cta">
                                    <NavLink to={'/'}>Review threats ></NavLink>
                                    <button>Remove all</button>
                                </div>
                                :
                                null
                            }
                            
                        </section>
                        :
                        <section></section>
                    }

                </main>
            </div>

            <Banner />
        </div>
    )
}

export default withRouter(ScanPage)
