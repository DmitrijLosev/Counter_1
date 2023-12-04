import React, {useState} from "react";
import "./App.css";
import {Button} from "./Button";
import {Counter} from "./Counter";
import {MinMaxValueInput} from "./MinMaxValueInput";

export type MinMaxType = {
    minValue: number
    maxValue: number
}


function App() {

    const minValueAsNumber = JSON.parse(localStorage.getItem("minValue") || "null")
    const maxValueAsNumber = JSON.parse(localStorage.getItem("maxValue") || "null")
    const minInitialValue = minValueAsNumber ? minValueAsNumber : 0
    const maxInitialValue = maxValueAsNumber ? maxValueAsNumber : 1

    const [counter, setCounter] = useState(minInitialValue)
    const [minMax, setMinMax] = useState<MinMaxType>({
        minValue: minInitialValue,
        maxValue: maxInitialValue
    })
    const {minValue, maxValue} = minMax;
    const [setMode, setSetMode] = useState(false)

    const incCounter = () => {
        if (counter < maxInitialValue) {
            setCounter(counter + 1)
        }
    }
    const resetCounter = () => {
        if (counter > minInitialValue) {
            setCounter(minInitialValue)
        }
    }
    const onChangeValueHandler = (newValue: number, name: keyof MinMaxType) => {
        setSetMode(true)
        setMinMax({...minMax,[name]:newValue})
    }
    const setSettingsButtonHandler = () => {
        setCounter(minValue)
        localStorage.setItem("minValue", JSON.stringify(minValue))
        localStorage.setItem("maxValue", JSON.stringify(maxValue))
        setSetMode(false)
    }

    const errorMode = minValue < 0 || maxValue < 1 || maxValue <= minValue
    const minValueInputErrorMode = minValue < 0 || maxValue <= minValue;
    const maxValueInputErrorMode = maxValue < 1 || maxValue <= minValue;
    return (
        <div className="App">
            <div className="common set">
                <div className="common">
                    <MinMaxValueInput labelValue="start value: " value={minValue} errorMode={minValueInputErrorMode}
                                      onChangeValueHandler={onChangeValueHandler} name={"minValue"}/>
                    <MinMaxValueInput labelValue="max value: " value={maxValue} errorMode={maxValueInputErrorMode}
                                      onChangeValueHandler={onChangeValueHandler} name={"maxValue"}/>
                </div>
                <div className="common buttons">
                    <Button onClick={setSettingsButtonHandler}
                            disabled={(minValue === minInitialValue && maxValue === maxInitialValue) || errorMode}>set</Button>
                </div>
            </div>
            <div className="counter common">
                <Counter counter={counter} maxValue={maxValue}
                         setMode={setMode}
                         errorMode={errorMode}/>
                <div className="buttons common">
                    <Button onClick={incCounter} disabled={counter === maxValue || errorMode}>inc</Button>
                    <Button onClick={resetCounter} disabled={counter === minValue || errorMode}>reset</Button>
                </div>
            </div>
        </div>
    );
}

export default App;
