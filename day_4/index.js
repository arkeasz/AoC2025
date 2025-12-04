import { readFile } from 'node:fs/promises';

const txt = await readFile('./day_4/input.txt', 'utf-8'); // square matrix
const otherTXT = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

/** PART 1 */

// const forkliftAccesed = (txt) => {
//     const lines = txt.split('\n').filter(line => line.trim() !== '');
//     let arr2D = []; 
//     for (const line of lines) {
//         arr2D.push(line.split(''));
//     }

//     let totalX = 0;
//     let arr2DResult = arr2D.slice();

//     for (let m = 0; m < arr2D.length; m++) {
//         for (let n = 0; n < arr2D[m].length; n++) {
//             let stack = 0;
//             if (arr2D[m][n] === '@') {
                
//                 console.log(arr2D[m][n-1]);
//                 if (n > 0 && arr2D[m][n-1] === '@') {
//                     console.log(`position [${m}][${n-1}] is @`);
//                     stack++;
//                 } 
                
//                 if (n < arr2D.length - 1 && arr2D[m][n+1] === '@') {
//                     console.log(`position [${m}][${n+1}] is @`);
//                     stack++;
//                 } 
                
//                 if (m > 0 && arr2D[m-1][n] === '@') {
//                     console.log(`position [${m-1}][${n}] is @`);
//                     stack++;
//                 }
                
//                 if (m < arr2D[n].length - 1 && arr2D[m+1][n] === '@') {
//                     console.log(`position [${m+1}][${n}] is @`);
//                     stack++;
//                 } 
                
//                 if (n > 0 && m > 0 && arr2D[m - 1][n - 1] === '@') {
//                     console.log(`position [${m-1}][${n-1}] is @`);
//                     stack++;
//                 }
                
//                 if (n > 0 && m < arr2D[n].length - 1 && arr2D[m + 1][n - 1] === '@') {
//                     console.log(`position [${m+1}][${n-1}] is @`);
//                     stack++;
//                 }
                
//                 if (n < arr2D.length - 1 && m > 0 && arr2D[m - 1][n + 1] === '@') {
//                     console.log(`position [${m-1}][${n+1}] is @`);
//                     stack++;
//                 }
                
//                 if (n < arr2D.length - 1 && m < arr2D[n].length - 1 && arr2D[m + 1][n + 1] === '@') {
//                     console.log(`position [${m+1}][${n+1}] is @`);
//                     stack++;
//                 } 

//                 console.log(`stack for position [${m}][${n}] is: ${stack}`);
//                 if (stack < 4) {
//                     totalX++;
//                     // arr2DResult[m][n] = 'X';
//                 }
//             } else {
//                 continue;
//             }
//         }
//     }

    
//     // console.log(arr2D.length);
//     // console.log(arr2D[0].length);
//     console.log(arr2DResult)
//     console.log('totalX:', totalX);
// }

// forkliftAccesed(otherTXT);

forkliftAccesed(txt);

/** PART 2 */
const forkliftAccesed = (arr2D, result) => {
    let totalX = 0;
    let arr2DResult = structuredClone(arr2D);
    let rows = arr2D.length;
    let cols = arr2D[0].length;
    for (let m = 0; m < rows; m++) {
        for (let n = 0; n < cols; n++) {
            let stack = 0;
            if (arr2D[m][n] === '@') {
                
                if (n > 0 && arr2D[m][n-1] === '@') stack++;
                
                if (n < cols - 1 && arr2D[m][n+1] === '@') stack++;
                
                if (m > 0 && arr2D[m-1][n] === '@') stack++;
                
                if (m < rows - 1 && arr2D[m+1][n] === '@') stack++;
                
                if (n > 0 && m > 0 && arr2D[m - 1][n - 1] === '@') stack++;
                
                if (n > 0 && m < rows - 1 && arr2D[m + 1][n - 1] === '@') stack++;
                
                if (n < cols - 1 && m > 0 && arr2D[m - 1][n + 1] === '@') stack++;
                
                if (n < cols - 1 && m < rows - 1 && arr2D[m + 1][n + 1] === '@') stack++; 

                if (stack < 4) {
                    totalX++;
                    arr2DResult[m][n] = 'X';
                }
            } else {
                continue;
            }
        }
    }

    let newResult = result + totalX;

    if (totalX == 0) {
        return newResult;
    } else {
        return forkliftAccesed(arr2DResult, newResult);
    }
}

const lines = txt.trim().split('\n').filter(line => line.trim() !== '');

let arr= []; 
for (const line of lines) {
    arr.push(line.split(''));
}
let result = forkliftAccesed(arr, 0);
console.log(result)