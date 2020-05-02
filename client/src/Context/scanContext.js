//dependencies
import React, { createContext, useReducer, useEffect } from 'react'
import { scanReducer } from '../Reducers/scanReducer'
//types
import { SET_SCAN_FILE_ARRAY, SET_SCAN_FILE_INDEX, HANDLE_SCAN_STATE_CHANGE } from '../types/scanTypes'
// electron 
const electron = window.require("electron")
const { ipcRenderer } = electron

export const ScanContext = createContext()

const ScanContextProvider = (props) => {
    const initialState = {
        scanOn: false,
        pause: false,
        scanType: 0,
        fakePathArray: [],
        fakePathArrayIndex: 0
    }
    const [state, dispatch] = useReducer(scanReducer, initialState)

    // get fake array of files to scan from electron side app
    useEffect(() => {
        ipcRenderer.send('data:fake_array')
    }, [])

    ipcRenderer.on('data:fake_array', function (event, fakePathArray) {
        dispatch({type: SET_SCAN_FILE_ARRAY, payload: fakePathArray})
    })

    //scan functionallity

    useEffect(() => {
        fakeWebSocket(state.fakePathArrayIndex)
    }, [state.scanOn, state.pause])

    //scan function
    const fakeWebSocket = async(startingIndex) => {
        
        if(state.pause || !state.scanOn){
            var id = window.setTimeout(function() {}, 0)
            while (id--) {
                window.clearTimeout(id) // will do nothing if no timeout with id is present
            }
            return
        }

        if(state.scanOn)
        for( let i = startingIndex; i < state.fakePathArray.length; i++){
            const randomMs = Math.floor(Math.random() * 1000) + 1  
            const promise = new Promise(resolve => setTimeout(resolve, randomMs));
            await promise.then(()=>{
                dispatch({type: SET_SCAN_FILE_INDEX, payload: i})
                if(state.fakePathArray.length - 1 === i) {
                    dispatch({type: HANDLE_SCAN_STATE_CHANGE, payload: {scanOn: false}})
                }
            })
        }
    }
  
    return (
        <ScanContext.Provider value={{scanState: state, scanDispatch: dispatch}} >
            {props.children}
        </ScanContext.Provider>
    )
}

export default ScanContextProvider