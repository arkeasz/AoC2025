import { readFile } from "node:fs/promises";

let txt = await readFile('./day_7/input.txt', "utf-8");

const othertxt = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`

const lines = (text) => {
    let l = text.split('\n').map(line => line.split(''))
    // console.log('Processing text:\n', l);
    return l;
}

const cationsTeleport = (lines, times, splitter) => {
    const rows = lines.length;
    const cols = lines[0].length;
    let newsplitter = 0;
    let actualRow = lines[times]
    let newMarks = [];

    actualRow.forEach((cell, index) => {
        if (cell === 'S' || cell == '|') {
            if (lines[times + 1] && lines[times + 1][index] === '.') newMarks.push([times+1, index]);
        }

        if (cell == '.') {
            if (times > 0) {
                if (lines[times-1] && lines[times-1][index] == '|') newMarks.push([times, index])
            }
        }

        if (cell == '|' && lines[times+1][index]) newMarks.push([times, index])

        if (cell === '^') {
            if (lines[times-1][index] == '|') {
                newsplitter++
            }
            // newsplitter++
            console.log('Found ^ at times:', times, 'index:', index);
            if (times > 1) {
                if (lines[times - 1] && lines[times - 1][index] === '.' && lines[times-2][index] != '.') newMarks.push([times-1, index]);
            }
            if (index > 0) {
                if (lines[times][index - 1] && lines[times][index - 1] === '.') {
                    newMarks.push([times, index-1])
                };        
            }
            if (index < cols) {
                if (lines[times][index + 1] && lines[times][index + 1] === '.') newMarks.push([times, index+1]);
            }
        }
    });

    console.log(newMarks)

    for (let [r, c] of newMarks) {
        lines[r][c] = '|';
    }

    for(const line of lines) {
        console.log(line.join(""))
    }

    if (newMarks.length > 0 ) times++;
    splitter += newsplitter
    if (newMarks.length == 0 || times >= rows) {
        return splitter;
    } else {
        return cationsTeleport(lines, times, splitter);
    }   

}

let ti = cationsTeleport(lines(othertxt),0,0);
// console.log('Final grid after cation teleportation:');
console.log(ti);