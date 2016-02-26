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
                $(square).removeClass("x").removeClass("o");
            });
        }
        // Return those functions
        return {onSquareClick: onSquareClick,
                changePlayerMessage: changePlayerMessage,
                addMark: addMark,
                freezeBoard: freezeBoard,
                setTieMessage: setTieMessage,
                onButtonClick: onButtonClick,
                resetBoard: resetBoard
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
        let board; 
        
        function initBoard() {
            board = [];
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
            } else {
                isWinner = true;
            }
            
            for (let j = 0; j < sideLength; j++) {
                if (board[j][column] !== isPlayerOne) {
                    isWinner = false;
                    break;
                }
            }
                        
            if (row === column) {
                if (isWinner) {
                    return isWinner;
                } else {
                    isWinner = true;
                }                
                for (let k = 0; k < sideLength; k++) {
                    if (board[k][k] !== isPlayerOne) {
                        isWinner = false;
                        break;
                    }
                }
            }
 
            if (sideLength - 1 === row + column) {
                if (isWinner) {
                    return isWinner;
                } else {
                    isWinner = true;
                }                
                for (let i = 0; i < sideLength; i++) {
                    if (board[sideLength - 1 - i][i] !== isPlayerOne) {
                        isWinner = false;
                        break;
                    }
                }
            }
            
            return isWinner;
        }
        
        function checkForNull(array) {
            return array.some(elem => elem === null);
        }
        
        function checkTie() {
            for (let i = 0; i < sideLength; i++) {
                if (checkForNull(board[i])) {
                    return false;
                }
            }
            return true;
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
                        view.setTieMessage();
                    } else {
                        model.changePlayer();
                        view.changePlayerMessage(model.getPlayer());
                    }
                }                
            });
            view.onButtonClick(function() {
                model.initBoard();
                view.resetBoard();
                if (!model.getPlayer) {
                    model.changePlayer();
                }
                view.changePlayerMessage(model.getPlayer(), "Pick a square");               
            });
        }

        // Feel free to declare any other helper functions you may need.

        return {init};
    }

    // Create a view, model, and controller,
    // and wire them up to make the app work.

})(window.$);