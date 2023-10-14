import React, {useEffect, useState} from 'react';

interface ITimer {
    time: number,
}

const Timer = ({time}:ITimer) => {
    const [timer, setTimer] = useState(time)

    useEffect(() => {
        const timerId = setInterval(() => {
        setTimer(c => c - 1);
        }, 1000)

        return () => {
            clearInterval(timerId); // Прибираємо інтервал при виході з компонента
        };
    },[time]);

    return (
      <div>
        {timer}
      </div>
    );
};

export default Timer;