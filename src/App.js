import React, {useRef, useEffect, useState, useCallback} from 'react'
import './App.css';
import {histogram, mapRange} from './Plots.js'

function App() {
  const canvasRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [iterationSet, setIterationCount] = useState(100);

  const drawFractal = useCallback((ctx,maxIterations,plotType,palette) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    var iterationCounts = [...Array(height)].map(e => Array(width).fill(0));

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

        while (n < maxIterations) {

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
        
        
        //const testhue = histogram('purple', [[1,40],[37,19],[100,0]]);
        //console.log(testhue);

        //const bright = mapRange(n, 0, 255, maxIterations);
        //const color = n === maxIterations ? 'black' : `rgb(${bright},0,${bright})`;
        //const color = n === maxIterations ? 'black' : `rgb(${hue[y][x]},0,${hue[y][x]})`;

        //ctx.fillStyle = color;
        //ctx.fillRect(x,y,1,1);
    }
  }

  if(plotType === 'histogram') {
    const hue = histogram(iterationCounts, maxIterations);

    var val_r = 0;
    var val_g = 0;
    var val_b = 0;

    switch(palette){
      case 'red':
        val_r = 1;
        break;
      case 'green':
        val_g = 1;
        break;
      case 'blue':
        val_b = 1;
        break;
      case 'purple':
        val_b = 1;
        val_r = 1;
        break;
      case 'yellow':
        val_r = 1;
        val_g = 1;
        break;
      case 'cyan':
        val_b = 1;
        val_g = 1;
        break;
      case 'gray':
        val_r = 1;
        val_g = 1;
        val_b = 1;
        break;
    }

    for(let x = 0; x < width; x++) {
      for(let y = 0; y < height; y++) {
        const color = iterationCounts[y][x] === maxIterations ? 'black' : `rgb(${hue[y][x]*val_r},${hue[y][x]*val_g},${hue[y][x]*val_b})`;
        ctx.fillStyle = color;
        ctx.fillRect(x,y,1,1);
      }
    }
  }

},[]);

useEffect(() => {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  drawFractal(context, iterationSet, 'histogram','cyan');
},[iterationSet,drawFractal]);

const handleInputChange = (event) => {
  setInputValue(event.target.value);
};

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    const newIterationCount = Number(inputValue) || 100;
    setIterationCount(newIterationCount);
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