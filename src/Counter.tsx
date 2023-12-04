import React from "react";

export const Counter:React.FC<{counter:number,maxValue:number,setMode:boolean,message?:string,errorMode:boolean}> = ({counter,maxValue,setMode,errorMode}) => {

    return (

        <div className={counter===maxValue && !setMode ? "redTable table common" : "table common"}>
            {setMode && !errorMode && <span className="message">enter values and press 'set'</span>}
            {errorMode && <span className="message redTable">Incorrect value!</span>}
            {!setMode && !errorMode && counter}
        </div>
    );
};

