import {readFile} from 'node:fs/promises';

let commands = await readFile('./input.txt', "utf-8");

function generateByRange(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) result.push(i);
  return result;
}

const othercommands = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

function notValid(id) {
    const s = id.toString();

    // if (/^(\d)\1+$/.test(s)) return true;

    for (let size = 1; size <= s.length / 2; size++) {
        if (s.length % size !== 0) continue;

        const part = s.slice(0, size);
        if (part.repeat(s.length / size) === s) return true;
    }

    return false;
}

function checkID(ids) {
    let total = 0;

    ids.split(',').forEach(range => {
        const [a, b] = range.split('-').map(Number);
        generateByRange(a, b).forEach(num => {
            if (notValid(num)) total += num;
        });
    });

    return total;
}

console.log("Result:", checkID(othercommands));


// import {readFile} from 'node:fs/promises'

// let commands = await readFile('./input.txt', "utf-8")

// function generateByRange(start, end, step = 1) {
//   const result = [];
//   if (step > 0) {
//     for (let i = start; i <= end; i += step) {
//       result.push(i);
//     }
//   } else if (step < 0) {
//     for (let i = start; i >= end; i += step) {
//       result.push(i);
//     }
//   }
//   return result;
// }

// const othercommands = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`

// const notValid = (id) => {
//     let str_id = id.toString();
//     let sequence = '';
    
//     // https://stackoverflow.com/questions/75255072/to-check-the-repeating-digits-in-a-single-number-in-js

//     for (let i = 1; i < str_id.length; i++) {
//         if (str_id.length % i !== 0) continue;
//         sequence = str_id.slice(0, i);
//         let stemp = sequence.repeat(2);
//         if (stemp === str_id) return true;
//     }

//     return false;
// }

// const checkID = (ids) => {
//     let ids_arr = ids.split(',').map(id => {
//         let i = id.split('-')
//         return {
//             first: parseInt(i[0]),
//             last: parseInt(i[1])
//         }
//     })

//     let no_valid = 0;
//     ids_arr.forEach(({first, last})=> {
//         console.log(`Generating range from ${first} to ${last}`);
//         let range = generateByRange(first, last);
//         range.forEach(num => {
//             if (notValid(num)) {
//                 no_valid += num;
//             }
//         })
//     });

//     return no_valid
// }

// let res = checkID(commands)
// console.log("Result:", res);