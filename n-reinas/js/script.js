// js/script.js

// Variables para la navegación de soluciones
let currentSolutionIndex = 0;
let allSolutions = [];

// Evento para el botón "Resolver"
document.getElementById('solve-button').addEventListener('click', () => {
    let nValue = parseInt(document.getElementById('n-value').value);
    if (nValue < 4 || nValue > 12) {
        alert('Por favor, ingresa un valor de N entre 4 y 12.');
        return;
    }
    document.getElementById('loading-message').style.display = 'block';
    setTimeout(() => {
        allSolutions = solveNQueens(nValue);
        document.getElementById('loading-message').style.display = 'none';
        currentSolutionIndex = 0;
        updateSolutionCounter();
        if (allSolutions.length > 0) {
            drawChessboard(allSolutions[currentSolutionIndex]);
        } else {
            alert('No se encontraron soluciones.');
            document.getElementById('chessboard').innerHTML = '';
            document.getElementById('solution-counter').innerText = 'Solución 0 de 0';
        }
    }, 100);
});

// Eventos para los botones de navegación
document.getElementById('prev-solution').addEventListener('click', () => {
    if (currentSolutionIndex > 0) {
        currentSolutionIndex--;
        updateSolutionCounter();
        drawChessboard(allSolutions[currentSolutionIndex]);
    }
});

document.getElementById('next-solution').addEventListener('click', () => {
    if (currentSolutionIndex < allSolutions.length - 1) {
        currentSolutionIndex++;
        updateSolutionCounter();
        drawChessboard(allSolutions[currentSolutionIndex]);
    }
});

// Actualizar el contador de soluciones
function updateSolutionCounter() {
    document.getElementById('solution-counter').innerText = `Solución ${currentSolutionIndex + 1} de ${allSolutions.length}`;
}

// Función para dibujar el tablero de ajedrez
function drawChessboard(solution) {
    const chessboardDiv = document.getElementById('chessboard');
    chessboardDiv.innerHTML = '';
    const N = solution.length;

    for (let row = 0; row < N; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';
        for (let col = 0; col < N; col++) {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            if ((row + col) % 2 === 0) {
                cellDiv.classList.add('white');
            } else {
                cellDiv.classList.add('black');
            }
            if (solution[row] === col) {
                cellDiv.classList.add('queen');
            }
            rowDiv.appendChild(cellDiv);
        }
        chessboardDiv.appendChild(rowDiv);
    }
}

// Implementación del algoritmo de backtracking
function solveNQueens(N) {
    let solutions = [];
    let board = [];
    solve(0);

    function solve(row) {
        if (row === N) {
            solutions.push([...board]);
            return;
        }
        for (let col = 0; col < N; col++) {
            if (isSafe(row, col)) {
                board[row] = col;
                solve(row + 1);
            }
        }
    }

    function isSafe(row, col) {
        for (let i = 0; i < row; i++) {
            if (board[i] === col || Math.abs(board[i] - col) === row - i) {
                return false;
            }
        }
        return true;
    }

    return solutions;
}
