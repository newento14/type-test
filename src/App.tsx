import React, { useEffect, useRef, useState } from 'react';
import Timer from './components/timer';
import { generate } from 'random-words';
import { useDispatch } from 'react-redux';
import { ActionTypes } from './types/mainReducer';
import { useTypedSelector } from './hooks/useTypedSelector';
import './app.css';

function App() {
    const dispatch = useDispatch();
    const { words, status } = useTypedSelector((state) => state.main);

    const [correctArray, setCorrectArray] = useState<boolean[]>([]);
    const [cursorPosition, setCursorPosition] = useState(0);
    const [text, setText] = useState('');

    const [wpm, setWpm] = useState<number>(0);
    const [lpm, setLpm] = useState<number>(0);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (status === 0 || status === 2) {
            setCursorPosition(0);
            setCorrectArray([]);
            setText('');

            if (status === 2) {
                getResult();
                inputRef.current?.blur();
            }

            const generatedWords = generate({ exactly: 100, minLength: 2, maxLength: 9 }).join(' ');
            dispatch({ type: ActionTypes.SET_WORDS, payload: generatedWords });
        }
    }, [status, dispatch]);

    function InputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (status !== 1) {
            dispatch({ type: ActionTypes.SET_STATUS, payload: 1 });
        }
        const value = e.target.value;
        setText(value);

        const newCursorPosition = value.length;
        setCursorPosition(newCursorPosition);

        const newCorrectArray = value
            .split('')
            .map((char, index) => char === words[index]);
        setCorrectArray(newCorrectArray);
    }

    function getResult() {
        let correctAnswers = 0;
        for (let i = 0; i < correctArray.length && i < words.length; ++i) {
            if (correctArray[i] && words[i] !== ' ') {
                ++correctAnswers;
            }
        }

        const lettersPerMinute = Math.round(correctAnswers * 2);
        const wordsPerMinute = Math.round(correctAnswers * 2 / 2.5);

        setLpm(lettersPerMinute);
        setWpm(wordsPerMinute);
    }

    return (
        <div className="mt-20 ml-20 mr-20">
            <Timer time={30} />
            <div
                className="flex flex-wrap select-none relative mt-2"
                onClick={() => {
                    inputRef.current?.focus();
                }}
            >
                <input
                    value={text}
                    ref={inputRef}
                    onChange={InputChangeHandler}
                    className="absolute z-50 bg-transparent w-full h-full"
                    type="text"
                    onPaste={(e) => e.preventDefault()}
                    onMouseDown={(e) => e.preventDefault()}
                    onKeyDown={(e) => {
                        if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'v' || e.key === 'V' || e.key === 'a' || e.key === 'A')) {
                            e.preventDefault();
                        }
                    }}
                />

                <div className="flex flex-wrap">
                    {words.split('').map((char, index) => (
                        <div key={index}>
                            {index < correctArray.length ? (
                                correctArray[index] ? (
                                    <div className="text-2xl w-3.5 text-gray-200 select-none p-0 ml-0 relative">
                                        {char}
                                        {index === cursorPosition && <div className="cursor"></div>}
                                    </div>
                                ) : (
                                    <div className="text-2xl w-3.5 text-red-400 select-none p-0 ml-0 relative">
                                        {char}
                                        {index === cursorPosition && <div className="cursor"></div>}
                                    </div>
                                )
                            ) : (
                                <div className="text-2xl w-3.5 text-gray-500 select-none p-0 ml-0 relative">
                                    {char}
                                    {index === cursorPosition && <div className="cursor"></div>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center">
                <button className="mt-5 text-gray-300 text-2xl" onClick={() => dispatch({ type: ActionTypes.SET_STATUS, payload: 0 })}>
                    Restart
                </button>
            </div>

            {status === 2 && (
                <div className="mt-15">
                    <p className="text-gray-300 text-2xl">Літер на хвилину: {lpm}</p>
                    <p className="text-gray-300 text-2xl">Слів на хвилину: {wpm}</p>
                </div>
            )}
        </div>
    );
}

export default App;