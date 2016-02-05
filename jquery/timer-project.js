'use strict';

(function($) {
    // Fill in the functions to get a working timer!
    
    const view = getView(),
        model = getModel(),
        controller = getController();
        
    controller.init(view, model);
    
    $(view.onTimerStart);
        
    function getView() {
        
        /**
         * Invoke `callback` when the timer is started.
         * Change the "Start" button to say "Stop",
         * and give it an `alert` class.
         */
        function onTimerStart(callback) {
            callback();
            $("button.primary").click(function() {
                $(event.target).text("Stop").addClass("alert");
            })
        }
        
        /**
         * Invoke `callback` when the timer is stopped.
         * Change the "Stop" button to say "Start",
         * and remove the `alert` class.
         */
        function onTimerStop(callback) {
            
        }
        
        /**
         * Invoke `callback` when the timer is reset.
         */
        function onTimerReset(callback) {
            
        }
        
        /**
         * Sets up any necessary event handlers.
         */
        function init() {
            
        }
        
        return {onTimerStart, onTimerStop, onTimerReset, init};
    }
    
    function getModel() {
        function getInitialState() {
            return {
                // true if the timer is currently running,
                // false otherwise.
                isTimerRunning: false,
                
                // The Date at which the timer was started.
                timerStartedAt: null
            };
        }
        
        return {getInitialState};
    }
    
    function getController() {
        function init(view, model) {
            view.init();
            
            const state = model.getInitialState();
            
            view.onTimerStart(function() {
                // TODO: change `state` to represent
                // the fact that the timer has started.    
            });
            
            view.onTimerStop(function() {
               // TODO: change `state` to represent the
               // fact that the timer has ended. 
            });
            
            view.onTimerReset(function() {
                // TODO: change `state` to represent
                // the fact that the timer has been reset.
            });
            
            setInterval(function() {
                const currentTimerValue = getCurrentTimerValue(state);
                view.setTimerValue(currentTimerValue);
            }, 100);
        }
        
        /**
         * Calculate what the timer should currently display.
         */
        function getCurrentTimerValue(state) {
            
        }
        
        return {init};
    }
    
})(window.$);