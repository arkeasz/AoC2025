import { readFile } from "node:fs/promises";

let txt = await readFile('./day_6/input.txt', "utf-8");

const othertxt = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `
const lines = (text) => {
    let l = text.split('\n').map(line => line).filter(line => line.length > 0)
    console.log('Processing text:\n', l);
    return l;
}

const mathCephalopod = (lines) => {
    let m = 0;
    let n = 0;
    const rows = lines.length;
    const cols = lines[0].length;
    console.log('Total rows:', rows, 'Total columns:', cols);
    let numbers = []
    for (let i = 0; i < rows; i++) {
        numbers.push([]);
        
        for (let j = 0; j < lines[0].split(/\s+/).length - 1; j++) {
            numbers[i].push('');
        }
    }
    console.log('Initialized numbers array:', numbers);
    for (let i = cols-1; i >= 0; i--) {
        let sign = lines[rows - 1][i].trim();
        let numberRemain = '';
        for (let j = 0; j < rows - 1; j++) {
            numberRemain = numberRemain + lines[j][i];
        }
        console.log('Extracted numberRemain:', numberRemain, 'with sign:', sign, 'at position m:', m, 'n:', n);
        if (numberRemain == 0) {
            m = 0;
            continue
        };
        numbers[m][n] = numberRemain.trim();

        numbers[rows - 1][n] = sign;
        if (sign.length !== 0) {
            console.log('next n');
            n++;
            m = 0;
        }
        if (m > rows - 2) {
            m = 0;
            n++
        } else {
            m++
        }
    }   

    // numbers = numbers.map(line => line.filter(n => n.length > 0));
    console.log('Final transformed numbers array:', numbers);
    return numbers;
}



/** PART 1 */
const solveMathPart = (lines) => {
    const rows = lines.length;
    const cols = lines[0].length;
    console.log('Total rows:', rows, 'Total columns:', cols);
    let result = 0;
    for (let i = 0; i < cols; i++) {
        let sign = lines[rows - 1][i];
        console.log('Processing column:', i, 'with sign:', sign);
        let remaining = sign === '+' ? 0 : 1;
        for (let j = 0; j < rows - 1; j++) {
            console.log('Current value:', lines[j][i]);
            if (lines[j][i].trim().length === 0) continue;
            if (sign === '+') {
                remaining += Number(lines[j][i]);
            } else  {
                remaining *= Number(lines[j][i]);
            }
        }
        console.log('Column result:', remaining);
        result += remaining;
    }

    return result
}

// let res = solveMath(lines(othertxt));
// console.log("Result:", res);

// lines(othertxt);

/** PART 2 using PART 1 */

let arr = mathCephalopod(lines(txt));
console.log('Transformed Array for Part 2:', arr);
let res2 = solveMathPart(arr)
console.log("Final Result for Part 2:", res2);
console.log(10442199710797 > 10442199219139)