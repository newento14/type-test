export enum ActionTypes {
    SET_WORDS = "SET_WORDS",
    SET_STATUS = "SET_STATUS",
}

export interface IState {
    words: string,
    status: number,
}

export interface FetchSetWordsAction {
    type: ActionTypes.SET_WORDS,
    payload: string,
}
export interface  FethcSetStatusAction{
    type: ActionTypes.SET_STATUS,
    payload: number,
}
export type Actions = FetchSetWordsAction | FethcSetStatusAction;