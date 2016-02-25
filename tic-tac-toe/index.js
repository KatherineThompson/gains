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
            $("#board .row div").one("click", callback);
        }
        
        function changePlayerMessage(player, message) {
            $("#player-num").text(player);
            $("#message").text(message);
        }
        // Return those functions
        return {onSquareClick: onSquareClick,
                changePlayerMessage: changePlayerMessage
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
        let playerNum = 1;
        
        function changePlayer() {
            if (playerNum === 1) {
                playerNum = 2;
            } else {
                playerNum = 1;
            }
            return playerNum;
        }
        // Return those functions
        return {changePlayer: changePlayer

        }
    }

    function createController() {
        // Bootstrap the app.
        function init(view, model) {
            view.onSquareClick(function() {
                view.changePlayerMessage(model.changePlayer());
                
            });
        }

        // Feel free to declare any other helper functions you may need.

        return {init};
    }

    // Create a view, model, and controller,
    // and wire them up to make the app work.

})(window.$);