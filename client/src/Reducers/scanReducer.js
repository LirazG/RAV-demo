import { 
    ACTIVATE_SCAN,
    SET_SCAN_FILE_ARRAY,
    SET_SCAN_FILE_INDEX,
    HANDLE_SCAN_STATE_CHANGE
} from '../types/scanTypes'

export const scanReducer = (state, action) => {
    switch(action.type) {
        case ACTIVATE_SCAN:
            return {...state, scanOn: true, scanType: action.payload ? Number(action.payload):0}
        case SET_SCAN_FILE_ARRAY:
            return {...state, fakePathArray: action.payload}
        case HANDLE_SCAN_STATE_CHANGE:
            return {...state, ...action.payload }
        case SET_SCAN_FILE_INDEX:
            return {...state, fakePathArrayIndex: action.payload}
        default:
            return state
    }
}