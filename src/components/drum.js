import React, { useState} from 'react';
import PadBank from './padBank';
import { bankOne, bankTwo } from '../constants/'
  
export default function Drum() {
    const [power, setPower] = useState(true);
    const [display, setPDisplay] = useState(String.fromCharCode(160));
    const [currentPadBank, setCurrentPadBank] = useState(bankOne);
    const [currentPadBankId, setCurrentPadBankId] = useState('Heater Kit');
    const [sliderVal, setSliderVal] = useState(0.3);

    function powerControl() {
        setPower(!power)
        setPDisplay(String.fromCharCode(160));
    }
    function selectBank() {
      if (power) {
        if (currentPadBankId === 'Heater Kit') {
            setCurrentPadBank(bankTwo);
            setPDisplay('Smooth Piano Kit');
            setCurrentPadBankId('Smooth Piano Kit');
        } else {
          setCurrentPadBank(bankOne);
          setPDisplay( 'Heater Kit');
          setCurrentPadBankId( 'Heater Kit');
        }
      }
    }
    function displayClipName(name) {
      if (power) {
        setPDisplay(name)
      }
    }
    function adjustVolume(e) {
      if (power) {
        setSliderVal(e.target.value);
        setPDisplay('Volume: ' + Math.round(e.target.value * 100))
        setTimeout(() => clearDisplay(), 1000);
      }
    }
    function clearDisplay() {
      setPDisplay(String.fromCharCode(160))
    }
    const powerSlider = power ? { float: 'right' } : { float: 'left' };
    const bankSlider = currentPadBank === bankOne ? { float: 'left' } : { float: 'right'};
    {
    const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach(sound => {
        sound.volume = sliderVal;
    });
    }
    return (
        <div className='inner-container' id='drum-machine'>
            <PadBank
                clipVolume={sliderVal}
                currentPadBank={currentPadBank}
                power={power}
                updateDisplay={displayClipName}
            />

            <div className='controls-container'>
            <div className='control'>
                <p>Power</p>
                <div className='select' onClick={powerControl}>
                <div className='inner' style={powerSlider} />
                </div>
            </div>
            <p id='display'>{display}</p>
            <div className='volume-slider'>
                <input
                max='1'
                min='0'
                onChange={adjustVolume}
                step='0.01'
                type='range'
                value={sliderVal}
                />
            </div>
            <div className='control'>
                <p>Bank</p>
                <div className='select' onClick={selectBank}>
                <div className='inner' style={bankSlider} />
                </div>
            </div>
            </div>
        </div>
    );
}