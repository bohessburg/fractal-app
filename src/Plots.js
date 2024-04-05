
const mapRange = (value, range_min, range_max, value_range) => {
    return ((range_max - range_min) / value_range) * value + range_min
};

const singleHueRed = (value) => {return `rgb(${value},0,0)`;}
const singleHueGreen = (value) => {return `rgb(0,${value},0)`;}
const singleHueBlue = (value) => {return `rgb(0,0,${value})`;}
const singleHueViolet = (value) => {return `rgb(${value},0,${value})`;}
const singleHueCyan = (value) => {return `rgb(0,${value},${value})`;}
const singleHueYellow = (value) => {return `rgb(${value},${value},0)`;}
const singleHueGray = (value) => {return `rgb(${value},${value},${value})`;}

const palettes = {
    'red' : singleHueRed,
    'green' : singleHueGreen,
    'blue' : singleHueBlue,
    'violet' : singleHueViolet,
    'cyan' : singleHueCyan,
    'yellow' : singleHueYellow,
    'gray' : singleHueGray
}

const histogram = (iterationCounts,maxIterations) => {
    const width = iterationCounts[0].length;
    const height = iterationCounts.length;

    var numIterationsPerPixel = Array(maxIterations).fill(0);
    const total = width*height;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            numIterationsPerPixel[iterationCounts[y][x]]++;
        }
    }

    var hue = [...Array(height)].map(e => Array(width).fill(0));
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (iterationCounts[y][x] === maxIterations) {
                hue[y][x] = -1;
            }
            else {
                let iteration = iterationCounts[y][x];
                for (let i = 0; i <= iteration; i++) {
                    //temporary coloring to establish basic functionality
                    hue[y][x] += mapRange(numIterationsPerPixel[i],0,255,1) / total;
                }
            }
        }
    }
    
    return hue;

}

export{histogram, mapRange, singleHueRed, palettes}