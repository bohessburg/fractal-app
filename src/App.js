import React, {useRef, useEffect, useState, useCallback} from 'react'
import './App.css';
import {histogram, mapRange, palettes} from './Plots.js'

function App() {
  const canvasRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [iterationSet, setIterationCount] = useState(100);
  const [selectedPalette, setSelectedPalette] = useState('red');

  const drawFractal = useCallback((ctx,maxIterations,plotType,palette) => {
    const paletteFunc = palettes[palette];

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

    }
  }

  if(plotType === 'histogram') {
    const hue = histogram(iterationCounts, maxIterations);

    for(let x = 0; x < width; x++) {
      for(let y = 0; y < height; y++) {
        const color = hue[y][x] === -1 ? 'black' : paletteFunc(hue[y][x]);
        ctx.fillStyle = color;
        ctx.fillRect(x,y,1,1);
      }
    }
  }

},[]);

useEffect(() => {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  drawFractal(context, iterationSet, 'histogram',selectedPalette);
},[iterationSet,drawFractal,selectedPalette]);

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
    <select value={selectedPalette} onChange = {e=>setSelectedPalette(e.target.value)}>
      <option value="red">red</option>
      <option value="green">green</option>
      <option value="blue">blue</option>
      <option value="violet">violet</option>
      <option value="cyan">cyan</option>
      <option value="yellow">yellow</option>
      <option value="gray">gray</option>
      <option value="rainbow">rainbow</option>
      
      </select>
    <canvas ref={canvasRef} width={800} height={600} />
  </div>
);
  }

export default App;