angular.module('TicTacFunApp', []);
angular.module('TicTacFunApp')
    .controller('TicTacFunCtrl', function () {
        var emptyCell = '';
        var that = this;
        this.completed = false;
        this.board = [
            [{ value: emptyCell }, { value: emptyCell }, { value: emptyCell }],
            [{ value: emptyCell }, { value: emptyCell }, { value: emptyCell }],
            [{ value: emptyCell }, { value: emptyCell }, { value: emptyCell }]
        ];
        this.reset = function () {
            this.board.forEach(function (row) {
                row.forEach(function (cell) {
                    cell.value = emptyCell;
                });
            });
            this.currentPlayer = 'X';
            this.winner = false;
            this.draw = false;
            this.completed = false;
        };
        this.reset();
        this.isTaken = function (cell) {
            return cell.value !== emptyCell;
        };
        var checkForMatch = function (cell1, cell2, cell3) {
            return cell1.value === cell2.value &&
                cell1.value === cell3.value &&
                cell1.value !== emptyCell;
        };
        this.isBoardFull = function () {
            for (var row = 0; row <= 2; row++) {
                for (var col = 0; col <= 2; col++) {
                    if (this.board[row][col].value === emptyCell) {
                        return false;
                    }
                }
            }
            return true;
        }
        this.checkForEndOfGame = function () {
            //Check Coulumns macthing 
            var rowMatch = checkForMatch(this.board[0][0], this.board[0][1], this.board[0][2]) ||
                checkForMatch(this.board[1][0], this.board[1][1], this.board[1][2]) ||
                checkForMatch(this.board[2][0], this.board[2][1], this.board[2][2]);

            //Check Rows macthing
            var columnMatch = checkForMatch(this.board[0][0], this.board[1][0], this.board[2][0]) ||
                checkForMatch(this.board[0][1], this.board[1][1], this.board[2][1]) ||
                checkForMatch(this.board[0][2], this.board[1][2], this.board[2][2]);

            //Check Diagonal row macthing
            var diagonalMatch = checkForMatch(this.board[0][0], this.board[1][1], this.board[2][2]) ||
                checkForMatch(this.board[2][0], this.board[1][1], this.board[0][2]);

            this.winner = rowMatch || columnMatch || diagonalMatch;

            if (this.winner === false && this.isBoardFull()) {
                //No winners, Result will be draw.
                this.draw = true;
            }
            return this.winner || this.draw;
        };

        this.move = function (cell) {
            if (cell.value != null && cell.value != '') {
                return;
            }
            if (!this.completed) {
                cell.value = this.currentPlayer.trim();
            }
            if (this.checkForEndOfGame() === false) {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            }
            else {
                //Game completed
                this.completed = true;
            }
        };
    });
