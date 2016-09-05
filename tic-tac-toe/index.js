'use strict';

(function($) {

    /**
     * All DOM manipulation happens here.
     * Adding new elements, listening for events,
     * removing elements, etc. No logic that has
     * knowledge of how the DOM is laid out (eg any
     * DOM selectors) should be outside of the view.
     */
    function createView() {
        // Declare some functions

        // Return those functions
        return {

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

        // Return those functions
        return {

        }
    }

    function createController() {
        // Bootstrap the app.
        function init(view, model) {

        }

        // Feel free to declare any other helper functions you may need.

        return {init};
    }

    // Create a view, model, and controller,
    // and wire them up to make the app work.

})(window.$);