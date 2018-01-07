'use strict';

const cols = 10;
const rows = 10;
const epochs = [];

function makeNewField() {
    return new Array(rows).fill(new Array(cols).fill(0));
}

// closeness from 0 to 1
function initRandom(field, closeness=0.5) {
    return field.map(
        row => row.map(
            cell => Math.floor(Math.random() + closeness)
        )
    );
}

function countNeighbours(field, i, j) {
    let result = -1 * field[i][j];
    const neighbourIndexes = [-1, 0, 1];
    neighbourIndexes.forEach(
        n_i => neighbourIndexes.forEach(
            n_j => {
                if ((i + n_i) < 0) return 0;
                if ((j + n_j) < 0) return 0;
                if ((i + n_i) >= rows) return 0;
                if ((j + n_j) >= cols) return 0;
                result += field[i+n_i][j+n_j];
            }
        )
    );
    return result;
}

function mutate(field) {
    return field.map(
        (row, i) => row.map(
            (cell, j) => {
                const neighbours = countNeighbours(field, i, j);
                if (cell) {
                    return +(neighbours == 2 || neighbours == 3);
                } else {
                    return +(neighbours == 3);
                }
            }
        )
    )
}

epochs.push(initRandom(makeNewField(), 0.3));
epochs.push(mutate(epochs.slice(-1).pop()));

console.log(epochs[0]);
console.log(epochs.slice(-1).pop());

/*
epochs.push(field);
let stop = false;
do {
    epochs.push(mutate(epochs.slice(-1).pop()));
// TODO: stop if all cells died
// TODO: stop if epoch repeats any other
// TODO: stop if epoch repeats previous
} while (!stop);
*/
