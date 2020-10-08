import React from 'react';
import DrumPad from './drumPad';
export default function PadBank({ power, currentPadBank, updateDisplay, ...props})  {

    let padBank;
    if (power) {
    padBank = currentPadBank.map((drumObj, i, padBankArr) => {
        return (
        <DrumPad
            key={i}
            clip={padBankArr[i].url}
            clipId={padBankArr[i].id}
            keyCode={padBankArr[i].keyCode}
            keyTrigger={padBankArr[i].keyTrigger}
            power={power}
            updateDisplay={updateDisplay}
        />
        );
    });
    } else {
    padBank = currentPadBank.map((drumObj, i, padBankArr) => {
        return (
        <DrumPad
            key={i}
            clip='#'
            clipId={padBankArr[i].id}
            keyCode={padBankArr[i].keyCode}
            keyTrigger={padBankArr[i].keyTrigger}
            power={power}
            updateDisplay={updateDisplay}
        />
        );
    });
    }
    return <div className='pad-bank'>{padBank}</div>;
}