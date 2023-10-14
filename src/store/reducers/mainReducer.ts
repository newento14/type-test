import {Actions, ActionTypes, IState} from "../../types/mainReducer";

const defaultState: IState = {
    words: "",
    status: 0,
}

export const mainReducer = (state = defaultState, action:Actions): IState => {
    switch (action.type) {
        case ActionTypes.SET_WORDS:
            return {
                ...state,
                words: action.payload,
            }
        case ActionTypes.SET_STATUS:
            return {
                ...state,
                status: action.payload,
            }
        default:
            return state;
    }
}