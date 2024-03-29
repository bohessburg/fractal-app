import React, {useRef, useEffect, useState} from 'react'
import './App.css';
import {histogram} from './Plots.js'

function App() {
  const canvasRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [iterationCount, setIterationCount] = useState(100);

  const mapRange = (value, range_min, range_max, value_range) => {
    return ((range_max - range_min) / value_range) * value + range_min
  };

  const drawFractal = (ctx,iterations) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    var iterationCounts = Array.from({ length: height }, () => new Array(width).fill(0));

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {

        let ca = mapRange(x, -2, 0.5, width);
        let cb = mapRange(y, -1.2, 1.2, height);
        let w = 0;
        let n = 0;
        let a = 0;
        let b = 0;
        let a2 = 0;
        let b2 = 0;

        while (n < iterations) {

          if (a2 + b2 > 4.0) {
            break;
          }
          a = a2 - b2 + ca;
          b = w - a2 - b2 + cb;

          a2 = a * a;
          b2 = b * b;

          w = (a + b) * (a + b);
          
          n++;
        }
        iterationCounts[y][x] = n;

        const bright = mapRange(n, 0, 255, iterations);
        
        const color = n === iterations ? 'black' : `rgb(${bright},0,${bright})`;

        ctx.fillStyle = color;
        ctx.fillRect(x,y,1,1);
    }
  }
};

useEffect(() => {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  drawFractal(context, iterationCount);
},[iterationCount]);

const handleInputChange = (event) => {
  setInputValue(event.target.value);
};

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    const newIterationCount = Number(inputValue) || 100;
    setIterationCount(newIterationCount);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
  }
};

return (
  <div className="App">
    <input
      type = 'text'
      value = {inputValue}
      onChange = {handleInputChange}
      onKeyPress = {handleKeyPress}
      />
    <canvas ref={canvasRef} width={800} height={600} />
  </div>
);
  }

export default App;