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
        function onSquareClick(callback) {
            $("#board .row div").one("click", function() {
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
        
        function addMark(isPlayerOne, row, column) {
            const $square = $("div").filter("[row=" + row + "]").filter("[column=" + column +"]");            
            if (isPlayerOne) {
                $square.text("✖").addClass("x");
            } else {
                $square.text("🌕").addClass("o");
            }
        }
        // Return those functions
        return {onSquareClick: onSquareClick,
                changePlayerMessage: changePlayerMessage,
                addMark: addMark
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
        
        function getPlayer() {
            return isPlayerOne;
        }
        
        function changePlayer() {
            if (isPlayerOne) {
                isPlayerOne = false;
            } else {
                isPlayerOne = true;
            }
        }
        // Return those functions
        return {changePlayer: changePlayer,
                getPlayer: getPlayer
        }
    }

    function createController() {
        // Bootstrap the app.
        function init(view, model) {
            view.onSquareClick(function(row, column) {
                view.addMark(model.getPlayer(), row, column);
                model.changePlayer();
                view.changePlayerMessage(model.getPlayer());                
            });
        }

        // Feel free to declare any other helper functions you may need.

        return {init};
    }

    // Create a view, model, and controller,
    // and wire them up to make the app work.

})(window.$);