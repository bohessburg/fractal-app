
const mapRange = (value, range_min, range_max, value_range) => {
    return ((range_max - range_min) / value_range) * value + range_min
};



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
            let iteration = iterationCounts[y][x];
            for (let i = 0; i <= iteration; i++) {
                //temporary coloring to establish basic functionality
                hue[y][x] += mapRange(numIterationsPerPixel[i],0,255,1) / total;
            }
        }
    }
    
    return hue;

}

export{histogram, mapRange}