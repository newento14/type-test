import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {ActionTypes} from "../types/mainReducer";

interface ITimer {
    time: number,
}

const Timer = ({time}:ITimer) => {
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(time)
    const status = useTypedSelector(x => x.main.status)

    useEffect(() => {
        if (status !== 1) {
            setTimer(time);
            return;
        }

        const timerId = setTimeout(() => {
            setTimer(timer - 1);

        }, 1000)

        if (timer <= 0) {
            dispatch({type: ActionTypes.SET_STATUS, payload: 2});
            setTimer(time);
        }

        return () => {
            clearInterval(timerId);
        };
    },[status, timer]);

    return (
      <>
          {status === 1 &&
          <p className="text-2xl text-orange-300">{timer}</p>}
      </>
    );
};

export default Timer;