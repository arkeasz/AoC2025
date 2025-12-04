/**
 * PART ONE
 */
//  se tiene un dial del 0 al 99
// DN (D: direccion, N: numero)
// la dirección indica si la rotación es a la derecha o izquierda
// el numero indica el numero de rotaciones
// donde la rotacion L haria que el dial fuese al emnor numero 
// y la rotacion R haria que el dial fuese al mayor numero


// The dial starts by pointing at 50.
// The dial is rotated L68 to point at 82. 50 - 68 = -18 → 100 - 18  = 82 → pos - numeric + 100
// The dial is rotated L30 to point at 52. 82 - 30 = 52
// The dial is rotated R48 to point at 0.  52 + 48 = 100 → 100 - 100 = 0
// The dial is rotated L5 to point at 95.  0  - 5  = -5  → 100 - 5   = 95
// The dial is rotated R60 to point at 55. 95 + 60 = 155 → 155 - 100 = 55
// The dial is rotated L55 to point at 0.  55 - 55 = 0
// The dial is rotated L1 to point at 99.
// The dial is rotated L99 to point at 0.
// The dial is rotated R14 to point at 14.
// The dial is rotated L82 to point at 32.

// import { log } from 'node:console';
// import {readFile} from 'node:fs/promises'

// async function fetchText(url) {
//   try {
//     const response = await fetch(url);
//     const blob = await response.text();
//     return blob
//   } catch (error) {
//     console.log(error); 
//   }
// }

// let commands = await readFile('./input.txt', "utf-8")

// // console.log(commands)

// const detectZeros = (str) => {
//   let zeros = 0;
//   let pos = 50;
//   console.log("-----------------START----------------")
//   // console.log("the dial starts by pointing at 50")
//   str.split('\n').forEach(s => {
//     const direction = s[0]
//     const numeric = Number(s.slice(1, 4))
//     // console.log("◘ the dial is rotated", s, "to point at", pos)
//     // console.log(zeros)
//     if (direction == "L") { 
//         if (numeric > pos) {
//             // zeros += 1 + Math.floor((numeric - pos - 1) / 100);
//             pos = Math.abs(((numeric % 100 - pos) % 100) - 100)
//         } else {
//             pos = Math.abs(pos - numeric)
//         }
//     } 
    
//     if (direction == "R") {
//         // zeros += Math.floor((numeric + pos)/100)
//         pos = (numeric + pos) % 100
//     }

//     if (pos == 100) pos = 0
//     if (pos == 0) zeros++
    
//   });
//   console.log(zeros)
// }

// let othercommands = `L68
// L30
// R48
// L5
// R60
// L55
// L1
// L99
// R14
// L82`
// detectZeros(commands)


/**
 * PART TWO
 */

import {readFile} from 'node:fs/promises'

let commands = await readFile('./day_1/input.txt', "utf-8")


const detectZeros = (str) => {
  let zeros = 0;
  let pos = 50;
  str = str.trim().split('\n').filter(s => s.trim()).join('\n')
  console.log("-----------------START----------------")
  console.log("the dial starts by pointing at 50")
  str.split('\n').forEach(s => {
    s = s.trim()
    const direction = s[0]
    const numeric = Number(s.slice(1, 4))

    if (direction == "L") { 
      if (numeric > pos ) {
          zeros += Math.round(Math.abs((pos - numeric)) / 100);
          pos = Math.abs(((numeric % 100 - pos) % 100) - 100)
        } else {
            pos = Math.abs(pos - numeric)
        }
    } 
    
    if (direction == "R") {
        if (numeric + pos >= 100) zeros += Math.round((pos + numeric) / 100);
        pos = (numeric + pos) % 100
    }
    if (pos == 100) pos = 0
    if (pos == 0) zeros++
  console.log("◘ the dial is rotated", s, "to point at", pos)
  console.log(zeros)
    
  });
}

let othercommands = await readFile('./day_1/test.txt', "utf-8")
detectZeros(commands)