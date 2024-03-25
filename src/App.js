import React, {useRef, useEffect, useState} from 'react'
import './App.css';

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

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        //map each pixel to a complex number c = a+bi
        let a = mapRange(x, -2, 2, width);
        let b = mapRange(y, -2, 2, height);

        const ca = a;
        const cb = b;
        let n = 0;

        //iterate the function: f(z) = z^2 + c on itself, starting at z=0
        while (n < iterations) {
          //(a+bi)^2 = (a^2 - b^2) + 2abi
          const aa = a * a;
          const bb = b * b;
          const twoab = 2.0 * a * b;

          //new value for z (z_n = z_(n-1)^2 + c)
          a = aa - bb + ca;
          b = twoab + cb;

          //if |z| > 2, c is not part of the mandelbrot set
          if (aa + bb > 4.0) {
            break;
          }
          n++;
        }

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