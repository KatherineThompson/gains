'use strict';

(function($) {
    // Fill in the functions to get a working timer!
    
    const view = getView(),
        model = getModel(),
        controller = getController();
        
    $(function() {
        controller.init(view, model);
    }) 
           
    function getView() {
         /**
         * Invoke `callback` when the timer is started.
         * Change the "Start" button to say "Stop",
         * and give it an `alert` class.
         */
        let timerStarted = false;
        
        function onTimerStateChange(startCallback, stopCallback) {
            $("button.primary").click(function() {
                if (timerStarted === false) {
                    startCallback();
                    $(event.target).text("Stop").addClass("alert");
                    timerStarted = true;
                } else {
                    stopCallback();
                    $(event.target).text("Start").removeClass("alert");
                    timerStarted = false;
                }
            });
        }
        
        // function onTimerStart(callback) {
        //     debugger;
        //     $("button.primary").click(function() {
        //         if (timerStarted === false) {
        //             debugger;  
        //             callback();
        //             $(event.target).text("Stop").addClass("alert");
        //             timerStarted = true;
        //         }
        //     })
        // }
        
        /**
         * Invoke `callback` when the timer is stopped.
         * Change the "Stop" button to say "Start",
         * and remove the `alert` class.
         */
        // function onTimerStop(callback) {
        //     $("button.primary").click(function() {
        //         if (timerStarted === true) {
        //             callback();
        //             $(event.target).text("Start").removeClass("alert");
        //             timerStarted = false;
        //         }
        //     });
        // }
        
        /**
         * Invoke `callback` when the timer is reset.
         */
        function onTimerReset(callback) {
            $("button.secondary").click(function() {
                callback();
                if (timerStarted) {
                    $("button.primary").text("Start").removeClass("alert");
                    timerStarted = false;
                }
            })
        }
        
        /**
         * Sets up any necessary event handlers.
         */
        function init() {
            
        }
        
        function getMilliseconds(time) {
            let milliseconds = (time - Math.floor(time / 60000)).toString().slice(-3);
            if (milliseconds === "0") {
                milliseconds = "000";
            } else if (milliseconds.length < 2) {
                milliseconds = "00" + milliseconds;
            } else if (milliseconds.length < 3) {
                milliseconds = "0" + milliseconds;
            }
            return milliseconds;
        }
        
        function getSeconds(time) {
            let seconds = (time - Math.floor(time / 60000) * 60000).toString().slice(0, -3);
            if (seconds.length < 1) {
                seconds = "00";
            } else if (seconds.length < 2) {
                seconds = "0" + seconds;
            }
            return seconds;
        }
        
        function getMinutes(time) {
            let minutes = "";
            if (time < 3600000) {
                minutes = Math.floor(time / 60000).toString();
            } else {
                let hours = Math.floor(time / 3600000)
                minutes = Math.floor((time - hours * 3600000) / 60000).toString();
            }
            
            if (minutes.length < 1) {
                minutes = "00"
            } else if (minutes.length < 2) {
                minutes = "0" + minutes;
            }
            return minutes;
        }
        
        function getHours(time) {
            let hours = Math.floor(time / 3600000).toString();
            if (hours === "0") {
                hours = "00";
            } else if (hours.length < 2) {
                hours = "0" + hours;
            }
            return hours;
        }
        
        function setTimerValue(currentTimerValue) {
            $(".milliseconds").text(getMilliseconds(currentTimerValue));
            $(".seconds").text(getSeconds(currentTimerValue));
            $(".minutes").text(getMinutes(currentTimerValue));
            $(".hours").text(getHours(currentTimerValue));           
        }
        
        return {onTimerStateChange, onTimerReset, init, setTimerValue};
    }
    
    function getModel() {
        function getInitialState() {
            return {
                // true if the timer is currently running,
                // false otherwise.
                isTimerRunning: false,
                
                // The Date at which the timer was started.
                timerStartedAt: null,
                
                timerStoppedAt: null,
                
                timerTotal: 0
            };
        }
        
        return {getInitialState};
    }
    
    function getController() {
        function init(view, model) {
            
            const state = model.getInitialState();
            
            view.onTimerStateChange(function() {
                // TODO: change `state` to represent
                // the fact that the timer has started.
                state.isTimerRunning = true;
                const date = new Date;
                state.timerStartedAt = date.getTime();
            }, function() {
               state.isTimerRunning = false;
               const date = new Date; 
               state.timerStoppedAt = date.getTime();
               state.timerTotal += state.timerStoppedAt - state.timerStartedAt;
               state.timerStartedAt = null;              
            });
            
            // view.onTimerStop(function() {
            //    // TODO: change `state` to represent the
            //    // fact that the timer has ended.
            //    state.isTimerRunning = false;
            //    const date = new Date; 
            //    state.timerStoppedAt = date.getTime(); 
            // });
            
            view.onTimerReset(function() {
                // TODO: change `state` to represent
                // the fact that the timer has been reset.
                state.isTimerRunning = false;
                state.timerStartedAt = null;
                state.timerStoppedAt = null;
                state.timerTotal = 0;
                view.setTimerValue(state.timerTotal);
            });
            
            setInterval(function() {
                if (state.timerStartedAt !== null) {
                    const currentTimerValue = getCurrentTimerValue(state);
                    view.setTimerValue(currentTimerValue);
                }
            }, 100);
        }
        
        /**
         * Calculate what the timer should currently display.
         */
        function getCurrentTimerValue(state) {
            let currentTotal = 0;
            const currentTime = new Date;
            
            if (state.timerStoppedAt !== null) {
                currentTotal = currentTime.getTime() - state.timerStartedAt + state.timerTotal;
            } else {
                currentTotal = currentTime.getTime() - state.timerStartedAt;
            }
            
            return currentTotal;
        }
        
        return {init};
    }
    
})(window.$);