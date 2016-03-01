'use strict';

(function($) {
    
    const view = createView();
    const model = createModel();
    const controller = createController();
    
    $(function() {
        controller.init(view, model);
    })
    
    /**
     * All DOM manipulation happens here.
     * Adding new elements, listening for events,
     * removing elements, etc. No logic that has
     * knowledge of how the DOM is laid out (eg any
     * DOM selectors) should be outside of the view.
     */
    function createView() {
        // Declare some functions
        let isFrozen = false;
        function onSquareClick(callback) {
            $("#board .row div").on("click", function() {
                const $clickedSquare = $(event.target);
                if (isFrozen || $clickedSquare.hasClass("x") || $clickedSquare.hasClass("o")) {
                    return;
                }
                const row = parseInt($clickedSquare.attr("row"));
                const column = parseInt($clickedSquare.attr("column"));
                callback(row, column);
            });
        }
        
        function changePlayerMessage(isPlayerOne, message) {
            if (isPlayerOne) {
                $("#player-num").text("1");
            } else {
                $("#player-num").text("2");
            }
            
            $("#message").text(message);
        }
        
        function setTieMessage() {
            $("#player-num").text("1 & Player 2");
            $("#message").text("It's a tie!");
        }
        
        function addMark(isPlayerOne, row, column) {
            const $square = $("#board div").filter("[row=" + row + "]").filter("[column=" + column +"]");            
            const className = isPlayerOne ? "x" : "o";
            $square.addClass(className);
        }
        
        function freezeBoard() {
            isFrozen = true;
        }
        
        function onButtonClick(callback) {
            $("button").click(callback);
        }
        
        function resetBoard() {
            isFrozen = false;
            $("#board div").filter("[row]").filter("[column]").each(function(index, square) {
                $(square).removeClass("x").removeClass("o").removeClass("winning-square");
            });
            $("#board .row div").removeClass("game-over");
        }
        
        function drawBoard(board) {
            board.forEach(function(rowValue, rowIndex) {
                rowValue.forEach(function(columnValue, columnIndex) {
                    if (columnValue !== null) {
                        addMark(columnValue, rowIndex, columnIndex);
                    }
                })
            })
        }
        
        function addWinEffects(winningSquares) {
            $("#board .row div").addClass("game-over");
            winningSquares.forEach(function(square) {
                const $square = $("#board div").filter("[row=" + square.row + "]").filter("[column=" + square.column +"]");
                $square.addClass("winning-square").animate({
                    "font-size": "125px",
                    "line-height": "150%"
                }, 1000, function() {
                    $square.animate({
                        "font-size": "100px",
                        "line-height": "200%"
                    }, 1000);
                });
            })
            
        }
        
        function updateTallies(currentTallies) {
            $("#player-one-wins").text(currentTallies.playerOne);
            $("#player-two-wins").text(currentTallies.playerTwo);
            $("#tied-games").text(currentTallies.ties);
        }
        // Return those functions
        return {onSquareClick: onSquareClick,
                changePlayerMessage: changePlayerMessage,
                addMark: addMark,
                freezeBoard: freezeBoard,
                setTieMessage: setTieMessage,
                onButtonClick: onButtonClick,
                resetBoard: resetBoard,
                drawBoard: drawBoard,
                addWinEffects: addWinEffects,
                updateTallies: updateTallies
        }
    }

    /**
     * The game state is maintained here.
     * If you need to save or load the game state
     * from some external source, this is the place
     * to do it. The model also defines the initial
     * game state.
     */
    function createModel() {
        // Declare some functions
        
        const sideLength = 3;
        
        let gameState = {
            isPlayerOne: true,
            board: undefined,
            playerOneWins: 0,
            playerTwoWins: 0,
            ties: 0
        } 
        
        function initBoard() {
            gameState.board = [];
            for (let i = 0; i < sideLength; i++) {
                const row = [];
                for (let j = 0; j < sideLength; j++) {
                    row.push(null);
                }
                gameState.board.push(row);
            }
        }
        
        function getBoard() {
            return gameState.board;
        }
        
        function loadGame() {
            if (localStorage.gameState) {
                gameState = JSON.parse(localStorage.gameState);
                return true; 
            } else {
                initBoard();
                saveGame();
                return false;
            }
        }
        
        function saveGame() {
            localStorage.gameState = JSON.stringify(gameState);
        }
        
        function resetGame() {
            initBoard();
            gameState.isPlayerOne = true;
            saveGame();
        }
        
        function getPlayer() {
            return gameState.isPlayerOne;
        }
        
        function changePlayer() {
            gameState.isPlayerOne = !gameState.isPlayerOne;
            saveGame();
        }
        
        function updateBoard(isPlayerOne, row, column) {
            gameState.board[row][column] = isPlayerOne;
            gameState.lastRow = row;
            gameState.lastColumn = column;
            saveGame();
        }
        
        function checkWin(isPlayerOne, row, column, shouldUpdateTallies) {
            const winner = isPlayerOne ? "playerOneWins" : "playerTwoWins";
            
            function save() {
                if (shouldUpdateTallies) {
                    gameState[winner]++;
                    saveGame();
                }
            }
            
            let winningSquares = [];
            for (let i = 0; i < sideLength; i++) {
                if (gameState.board[row][i] !== isPlayerOne) {
                     winningSquares = null;
                    break;
                } else {
                    const square = {row: row, column: i};
                    winningSquares.push(square);
                }
            }
            
            if (winningSquares) {
                save();
                return winningSquares;
            } else {
                winningSquares = [];
            }
            
            for (let j = 0; j < sideLength; j++) {
                if (gameState.board[j][column] !== isPlayerOne) {
                    winningSquares = null;
                    break;
                } else {
                    const square = {row: j, column: column};
                    winningSquares.push(square);
                }
            }
                        
            if (row === column) {
                if (winningSquares) {
                    save();
                    return winningSquares;
                } else {
                    winningSquares = [];
                }                
                for (let k = 0; k < sideLength; k++) {
                    if (gameState.board[k][k] !== isPlayerOne) {
                        winningSquares = null;
                        break;
                    } else {
                        const square = {row: k, column: k};
                        winningSquares.push(square);
                    }
                }
            }
 
            if (sideLength - 1 === row + column) {
                if (winningSquares) {
                    save();
                    return winningSquares;
                } else {
                    winningSquares = [];
                }                
                for (let i = 0; i < sideLength; i++) {
                    if (gameState.board[sideLength - 1 - i][i] !== isPlayerOne) {
                        winningSquares = null;
                        break;
                    } else {
                        const square = {row:sideLength - 1 - i, column: i};
                        winningSquares.push(square);
                    }
                }
            }
            if (winningSquares) {
                save();
            }
            return winningSquares;
        }
        
        function checkForNull(array) {
            return array.some(elem => elem === null);
        }
        
        function checkTie(shouldUpdateTallies) {
            for (let i = 0; i < sideLength; i++) {
                if (checkForNull(gameState.board[i])) {
                    return false;
                }
            }
            
            if (shouldUpdateTallies) {
                gameState.ties++;
                saveGame();
            }
            return true;
        }
        
        function getLastRow() {
            return gameState.lastRow;
        }
        
        function getLastColumn() {
            return gameState.lastColumn;
        }
        
        function getTallies() {
            return {playerOne: gameState.playerOneWins, playerTwo: gameState.playerTwoWins, ties: gameState.ties};
        }


        // Return those functions
        return {changePlayer: changePlayer,
                getPlayer: getPlayer,
                checkWin: checkWin,
                updateBoard: updateBoard,
                checkTie: checkTie,
                resetGame: resetGame,
                loadGame: loadGame,
                getBoard: getBoard,
                getLastRow: getLastRow,
                getLastColumn: getLastColumn,
                getTallies: getTallies
              }
    }
    
    function createController() {
        // Bootstrap the app.
        function init(view, model) {

            const isInProgess = model.loadGame();
            view.drawBoard(model.getBoard());
            if (isInProgess) {
                restoreBoard();
            }

            view.onSquareClick(function(row, column) {
                const currentPlayer = model.getPlayer();
                view.addMark(currentPlayer, row, column);
                model.updateBoard(currentPlayer, row, column);
                if(!updateViewIfGameOver(currentPlayer, row, column, true)) {
                    endTurn();
                }              
            });
               
            view.onButtonClick(function() {
                model.resetGame();
                view.resetBoard();
                view.changePlayerMessage(model.getPlayer(), "Pick a square");               
            });
        }
        
        function restoreBoard() {

            const previousPlayer = model.getPlayer();
            const lastRow = model.getLastRow();
            const lastColumn = model.getLastColumn();
            const hasLastRowAndColumn = lastRow >= 0 && lastColumn >= 0;
            const isEnded = hasLastRowAndColumn && updateViewIfGameOver(previousPlayer, lastRow, lastColumn, false);
            
            if (!isEnded) {
                view.changePlayerMessage(model.getPlayer(), "Pick a square");
            }
        }

        // Feel free to declare any other helper functions you may need.
        function updateViewIfGameOver(player, row, column, shouldUpdateTallies) {
            const winningSquares = model.checkWin(player, row, column, shouldUpdateTallies);
            
            if (winningSquares) {
                view.changePlayerMessage(player, "You've won!");
                view.addWinEffects(winningSquares);
                view.updateTallies(model.getTallies());
                view.freezeBoard();
                return true;
            } else if (model.checkTie(shouldUpdateTallies)){
                view.setTieMessage();
                view.updateTallies(model.getTallies());
                return true;
            }
            view.updateTallies(model.getTallies());
            return false;
        }
        
        function endTurn() {
            model.changePlayer();
            view.changePlayerMessage(model.getPlayer());           
        }
        
        return {init};
    }

    // Create a view, model, and controller,
    // and wire them up to make the app work.

})(window.$);