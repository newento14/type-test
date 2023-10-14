import React, {useEffect, useRef, useState} from 'react';
import Timer from "./components/timer";
import { generate, count } from "random-words";
import {useDispatch} from "react-redux";
import {ActionTypes} from "./types/mainReducer";
import {useTypedSelector} from "./hooks/useTypedSelector";
import './app.css'

function App() {
    const dispatch = useDispatch();
    const {words, status} = useTypedSelector(x => x.main)
    const [correctArray, setCorrectArray] = useState<boolean[]>([])
    const [cursorPosition, setCursorPosition] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (status === 0 || status === 2) {
            const temp = generate(100);
            dispatch({type: ActionTypes.SET_WORDS, payload: temp.map(x => x + " ") });
        }
    }, [status]);

    function isCorrect(a:string, b:string):boolean {
        return a !== b;
    }


    function InputChangeHandler(e:React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setCursorPosition(value.length);

        if (value.length < correctArray.length) {
            setCorrectArray(correctArray.slice(0, value.length));
        } else {

            if (isCorrect(words[value.length - 1], value[value.length - 1])) {
                setCorrectArray([ ...correctArray,true]);
            } else {
                setCorrectArray([ ...correctArray,false]);
            }
        }
    }

    return (
    <div className="">
        <Timer time={30} />
        <div className="flex flex-wrap select-none ml-20 mr-20 relative" onClick={() => {
            inputRef.current?.focus();
        }}>
            <input
                ref={inputRef}
                onChange={InputChangeHandler}
                className="absolute z-50 bg-transparent w-full h-full"
                type="text"
                // onCopy={(e) => e.preventDefault()}
                // onCut={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                // onSelect={(e) => e.preventDefault()}
                onMouseDown={(e) => e.preventDefault()}
                onKeyDown={(e) => {
                    if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'v' || e.key === 'V' || e.key === 'a' || e.key === 'A')) {
                        e.preventDefault();
                    }
                }}
            />


            {words.map((word, wordIndex) => (
                <div className="word" key={wordIndex}>

                </div>
            ))}

            {/*{words.map((x, index) => (*/}
            {/*    <div key={index}>*/}
            {/*        {index < correctArray.length*/}
            {/*            ?   correctArray[index]*/}
            {/*                ?  <div className="text-2xl w-3.5 text-gray-200 select-none p-0 ml-0 relative">*/}
            {/*                    {x}*/}
            {/*                    {index === cursorPosition &&*/}
            {/*                        <div className="cursor"></div>*/}
            {/*                    }*/}
            {/*                </div>*/}
            {/*                :  <div className="text-2xl w-3.5 text-red-400 select-none p-0 ml-0 relative">*/}
            {/*                    {x}*/}
            {/*                    {index === cursorPosition &&*/}
            {/*                        <div className="cursor"></div>*/}
            {/*                    }*/}
            {/*                </div>*/}


            {/*            : <div className="text-2xl w-3.5 text-gray-500 select-none p-0 ml-0 relative">*/}
            {/*                {x}*/}
            {/*                {index === cursorPosition &&*/}
            {/*                    <div className="cursor"></div>*/}
            {/*                }*/}
            {/*            </div>*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>
    </div>
  );
}

export default App;
