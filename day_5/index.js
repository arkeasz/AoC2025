
import { readFile } from "node:fs/promises";

let txt = await readFile('./day_5/input.txt', "utf-8");
let otherTXT = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`

// const checkIDs = (txt) => {
//     const lines = txt.split('\n');
//     let ranges = [];
//     let ids = [];
//     let isRangeSection = true;

//     for (const line of lines) {
//         console.log(line)
//         if (line.trim() === '') {
//             isRangeSection = false;
//             continue;
//         }
//         if (isRangeSection) {
//             const [start, end] = line.split('-').map(Number);
//             ranges.push({ start, end });
//         } else {
//             ids.push(Number(line.trim()));
//         }
//     }

//     let countFresh = 0;
//     for (const id of ids) {
//         for (const range of ranges) {
//             if (id >= range.start && id <= range.end) {
//                 console.log(`ID ${id} is within range ${range.start}-${range.end}`); // log log
//                 countFresh++;              
//                 break; // No need to check other ranges for this ID
//             }
//         }
//     }
//     console.log("Count of IDs within ranges:", countFresh);
// }

/** PART 2 */
const checkIDs = (ranges) => {
    let newRanges = [];
    ranges = [...ranges].sort((a, b) => a.start - b.start);

    for (let i = 0; i < ranges.length; i++) {
        const { start, end } = ranges[i];
        
        if (i < ranges.length - 1) {
            const next = ranges[i+1];
            console.log('Comparing ranges:', { start, end }, next.start);
            if (end >= next.start) {

                newRanges.push({ start, end: Math.max(next.end , end) });
                i++
            } else {
                newRanges.push({ start, end });
            }
        } else {
                newRanges.push({ start, end });
        }
    }
    if (newRanges.length === ranges.length) return ranges
    
    return checkIDs(newRanges);
}

const lines = txt.split('\n');
let ranges = [];
let ids = [];
let isRangeSection = true;

for (const line of lines) {
    if (line.trim() === '') {
        isRangeSection = false;
        continue;
    }
    if (isRangeSection) {
        const [start, end] = line.split('-').map(Number);
        ranges.push({ start, end });
    } else {
        ids.push(Number(line.trim()));
    }
}

let res = checkIDs(ranges);
let sum = 0;
for (const r of res) {
    sum += (r.end - r.start + 1);
}
console.log("Result:", sum);