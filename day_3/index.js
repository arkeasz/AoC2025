// import {readFile} from 'node:fs/promises'

// let commands = await readFile('./day_3/input.txt', "utf-8")

// const otherCommands =  `987654321111111
// 811111111111119
// 234234234234278
// 818181911112111`

// let testCommands = `123456789012345`

// const joltageBanks = (str) => {
//     const lines = str.trim().split('\n')
//     let total = 0

//     for (const line of lines) {
//         let best = -1

//         for (let i = 0; i < line.length - 1; i++) {
//             const a = Number(line[i])

//             for (let j = i + 1; j < line.length; j++) {
//                 const b = Number(line[j])
//                 const val = a * 10 + b
//                 if (val > best) best = val
//             }
//         }

//         total += best
//     }

//     console.log(total)
// }


import { readFile } from 'node:fs/promises';

const txt = await readFile('./day_3/input.txt', 'utf-8');
const funnyjolt = (txt) => {
//     const txt =  `987654321111111
// 811111111111119
// 234234234234278
// 818181911112111`
    const lines = txt.trim().split('\n');

    const K = 12; 

    let total = 0;

    for (const line of lines) {
        const digits = line.split('').map(Number);
        const n = digits.length;

        let remove = n - K; 
        const stack = [];

        for (const d of digits) {
            while (stack.length > 0 && stack[stack.length - 1] < d && remove > 0) {
                stack.pop();
                remove--;
            }
            stack.push(d);
        }

        console.log(stack)
        const best12 = stack.slice(0, K).join('');

        console.log(`Bank: ${line} -> Best 12-digit number: ${best12}`);

        total += Number(best12);
    }

    console.log("\nTOTAL:", total);
}

funnyjolt(txt);