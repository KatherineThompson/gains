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
            $("#board .row div").one("click", function() {
                if (isFrozen) {
                    return;
                }
                const row = $(event.target).attr("row");
                const column = $(event.target).attr("column");
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
        
        function tieMessage() {
            $("#player-num").text("1 & Player 2");
            $("#message").text("It's a tie");
        }
        
        function addMark(isPlayerOne, row, column) {
            const $square = $("div").filter("[row=" + row + "]").filter("[column=" + column +"]");            
            const className = isPlayerOne ? "x" : "o";
            $square.addClass(className);
        }
        
        function freezeBoard() {
            isFrozen = true;
        }
        // Return those functions
        return {onSquareClick: onSquareClick,
                changePlayerMessage: changePlayerMessage,
                addMark: addMark,
                freezeBoard: freezeBoard,
                tieMessage: tieMessage
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
        let isPlayerOne = true;
        
        const sideLength = 3;
        const board = []; 
        
        function initBoard() {
            for (let i = 0; i < sideLength; i++) {
                const row = [];
                for(let j = 0; j < sideLength; j++) {
                    row.push(null);
                }
                board.push(row);
            }
        }
        
        function getPlayer() {
            return isPlayerOne;
        }
        
        function changePlayer() {
            isPlayerOne = !isPlayerOne;
        }
        
        function updateBoard(isPlayerOne, row, column) {
            board[row][column] = isPlayerOne;
            console.log(board);
        }
        
        function checkWin(isPlayerOne, row, column) {
            let isWinner = true;
            for (let i = 0; i < sideLength; i++) {
                if (board[row][i] !== isPlayerOne) {
                    isWinner = false;
                    break;
                }
            }
            
            if (isWinner) {
                return isWinner;
            }
            
            for (let j = 0; j < sideLength; j++) {
                if (board[j][column] !== isPlayerOne) {
                    isWinner = false;
                    break;
                }
            }
            
            if (isWinner) {
                return isWinner;
            }
            
            if (row === column) {
                for (let k = 0; k < sideLength; k++) {
                    if (board[k][k] !== isPlayerOne) {
                        isWinner = false;
                        break;
                    }
                }
            }

            if (isWinner) {
                return isWinner;
            }
            
            if (sideLength - 1 === row + column) {
                for (let l = 0; l < sideLength; l++) {
                    if (board[sideLength - 1 - l][l] !== isPlayerOne) {
                        isWinner = false;
                        break;
                    }
                }
            }
            
            return isWinner;
        }
        
        function checkTie() {
            let isTie = true;
            for (let i = 0; i < sideLength; i++) {
                for(let j = 0; j < sideLength; j++) {
                    if (board[i][j] === null) {
                        isTie = false;
                        break;
                    }
                }
            }
            return isTie;
        }

        // Return those functions
        return {changePlayer: changePlayer,
                getPlayer: getPlayer,
                checkWin: checkWin,
                updateBoard: updateBoard,
                initBoard: initBoard,
                checkTie: checkTie
        }
    }
    
    function createController() {
        // Bootstrap the app.
        function init(view, model) {
            model.initBoard();
            view.onSquareClick(function(row, column) {
                const currentPlayer = model.getPlayer();
                view.addMark(currentPlayer, row, column);
                model.updateBoard(currentPlayer, row, column);              
                if (model.checkWin(currentPlayer, row, column)) {
                    view.changePlayerMessage(currentPlayer, "You've won!");
                    view.freezeBoard();
                } else {
                    if (model.checkTie()) {
                        view.tieMessage();
                    } else {
                        model.changePlayer();
                        view.changePlayerMessage(model.getPlayer());
                    }
                }                
            });
        }

        // Feel free to declare any other helper functions you may need.

        return {init};
    }

    // Create a view, model, and controller,
    // and wire them up to make the app work.

})(window.$);