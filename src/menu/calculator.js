import React, { useState } from "react";
import './style/calculator.css';
import angkaTerbilang from "@develoka/angka-terbilang-js";

const Calculator = () => {
    const [result, setResult] = useState("");
    const handleClick = (e) => {
        setResult(
            result.concat(e.target.name)
        );
    }

    // bersihkan layar
    const clear = () => {
        setResult("");
    }

    const backspace = () => {
        setResult(result.slice(0, -1));
    }

    const calculate = () => {
        try {
            setResult(eval(result).toString());
            console.log(result);
        } catch (error) {
            console.log(error);
            setResult("error");
        }
    }

    const translate = () => {
        try {
            setResult(angkaTerbilang(result));
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container">
                <button className="highlight_translate" onClick={translate}>Translate</button>
                <form action="/">
                    <input type="text" onChange={(e) => {setResult(e.target.value);}} value={result} />
                </form>
                <div className="keypad">
                    <button className="highlight" onClick={clear} id="clear">Clear</button>
                    <button className="highlight" onClick={backspace} id="backspace">Del</button>
                    <button className="highlight" name="/" onClick={handleClick}>&divide;</button>
                    <button name="7" onClick={handleClick}>7</button>
                    <button name="8" onClick={handleClick}>8</button>
                    <button name="9" onClick={handleClick}>9</button>
                    <button className="highlight" name="*" onClick={handleClick}>&times;</button>
                    <button name="4" onClick={handleClick}>4</button>
                    <button name="5" onClick={handleClick}>5</button>
                    <button name="6" onClick={handleClick}>6</button>
                    <button className="highlight" name="-" onClick={handleClick}>&ndash;</button>
                    <button name="1" onClick={handleClick}>1</button>
                    <button name="2" onClick={handleClick}>2</button>
                    <button name="3" onClick={handleClick}>3</button>
                    <button className="highlight" name="+" onClick={handleClick}>+</button>
                    <button name="0" onClick={handleClick}>0</button>
                    <button name="." onClick={handleClick}>.</button>
                    <button className="highlight" onClick={calculate} id="result">=</button>
                </div>
            </div>
        </>
    );
}


export default Calculator;