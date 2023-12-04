import React, {ChangeEvent} from "react";
import {MinMaxType} from "./App";

type MinMaxValueInputPropsType = {
    labelValue: string,
    value: number,
    errorMode: boolean,
    onChangeValueHandler: (newValue: number, name: keyof MinMaxType) => void
    name: keyof MinMaxType
}
export const MinMaxValueInput: React.FC<MinMaxValueInputPropsType> = ({
                                                                          labelValue,
                                                                          value,
                                                                          errorMode,
                                                                          onChangeValueHandler,name
                                                                      }) => {
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeValueHandler(+e.currentTarget.value, name)
    }

    return (
        <label className="label">{labelValue}
            <input type="number"
                   className={errorMode ? "inputNum errorInput" : "inputNum"}
                   value={value} onChange={onChangeInputHandler}/>
        </label>
    );
};

