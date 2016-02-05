"use strict";

(function() {
    // Set 5: Time
    //
    // "You know I love exploring time and space!"
    //
    // This is not jQuery specific but is still important in JS.
    
    /**
     * Problem 0: In the .delayed-image div, there is a button.
     * When that button is clicked, wait at least one second,
     * and then grab a random image from the page and put
     * it in the .image-target div.
     * 
     * You can use the native JS method setTimeout to take an action
     * in the future:
     * 
     *      setTimeout(function() {
     *          // do something in the future
     *      }, 500);
     */
    
    $(getRandomImageOnClickCustomTimer);
    $(displayManyImagesWithStop);
    $(recordClickAndOffset);
    
    function getRandomImageOnClick() {
        const sources = [];
        $("img").each(function(index, image) {
            sources.push($(image).attr("src"));
        })
        $(".delayed-image button").click(function() {
            setTimeout(function() {
                const index = Math.floor(Math.random() * sources.length);
                const newSource = sources[index];
                if ($(".delayed-image .image-target").children().length > 0) {
                } else {
                    $(".delayed-image .image-target").append("<img />")
                }
                $(".delayed-image .image-target img").attr("src", newSource);
            }, 1000);
        })
    }
    
    /**
     * Problem 1: Take your solution above and add the ability to
     * customize the wait time using the input.
     */
    function getRandomImageOnClickCustomTimer() {
        const sources = [];
        $("img").each(function(index, image) {
            sources.push($(image).attr("src"));
        })
        $(".delayed-image button").click(function() {
            const waitTime = $(".delayed-image input").val()
            setTimeout(function() {
                const index = Math.floor(Math.random() * sources.length);
                const newSource = sources[index];
                if ($(".delayed-image .image-target").children().length > 0) {
                } else {
                    $(".delayed-image .image-target").append("<img />");
                }
                $(".delayed-image .image-target img").attr("src", newSource);
            }, waitTime);
        })
    }
    
    /**
     * Problem 2: In the .many-images div, there is a button.
     * When that button is clicked, put a new image in the .image-target
     * div at an interval defined by the "Milliseconds to wait between images"
     * input field. 
     * 
     * You can use setInterval to take an action repeatedly:
     * 
     *      setInterval(function() {
     *          // ad infinitum
     *      }, 1000);
     */
    function displayManyImages() {
        const sources = [];
        $("img").each(function(index, image) {
            sources.push($(image).attr("src"));
        });
        
        $(".many-images button").click(function() {
            const waitTime = $(".many-images input").val();
            setInterval(function() {
                let index = Math.floor(Math.random() * sources.length);
                let newSource = sources[index];
                $(".many-images .image-target").append("<img />");
                $(".many-images .image-target img").last().attr("src", newSource);
            }, waitTime);
        })
    }
    
    /**
     * Problem 3: When the .many-images button is clicked, change its
     * text to say "stop", and give it the "alert" class. When the 
     * button is clicked again, revert it to its original state.
     * Also, when the button is clicked when it said "stop", 
     * stop the parade of images.
     * 
     * setInterval returns an id that you can use to cancel
     * the repetition. (So does setTimeout, but we do not need
     * that here.)
     * 
     *      const id = setInterval(func, timeMs);
     *      
     * Then you can do something with id to cancel the interval,
     * but tbh I forget what it is.
     */
           
    function displayManyImagesWithStop() {
        const sources = [];
        $("img").each(function(index, image) {
            sources.push($(image).attr("src"));
        });
        
        let intervalID;
                       
        function startImageParade(button) {
            $(button).text("Stop").addClass("alert");
            const waitTime = $(".many-images input").val();
            intervalID = window.setInterval(function() {
                let index = Math.floor(Math.random() * sources.length);
                let newSource = sources[index];
                $(".many-images .image-target").append("<img />");
                $(".many-images .image-target img").last().attr("src", newSource);
            }, waitTime);
            
            $(button).one("click", function() {
                window.clearInterval(intervalID);
                $(button).text("Get me many images").removeClass("alert");
                $(button).one("click", function() {
                    startImageParade(button);
                });
            });
        }
        
        $(".many-images button").one("click", function() {
            startImageParade($(event.target));
        });
    }
    
    /**
     * Problem 4: In the .click-times div, there is a button.
     * When the button is clicked, record the time at
     * which that event occurred by adding a new <li>
     * to the .timings <ul>.
     * 
     * You can use `new Date()` to get an object representing
     * a date and time in JS. It will be initialized to the
     * current time when you called the constructor.
     * 
     * You can use various methods on the date object to format
     * the date as a nicely human readable string. Many of 
     * those methods have a name of the form .to*String(),
     * where * is replaced with a descriptive name. Play around
     * in the console to see what is available.
     * 
     * You can also use the getters to get specific fields, like
     * dateObj.getYear() or .getMonth() or .getMinute(). You can
     * make your own format in this way.
     */
    function recordClickTimes() {
        $(".click-times button").click(function() {
            const date = new Date;
            const time = date.toTimeString();
            $(".timings").append("<li>Time of click: " + time + "</li>");
        });
    }
    
    /**
     * Problem 5: Take the solution above, and expand it to
     * display both the time of the click and the time *since*
     * the previous click.
     * 
     * If you have multiple Date objects, you can compare them
     * to see how much time has passed between them.
     */
    function recordClickAndOffset() {
        let priorDate;
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        
        $(".click-times button").click(function() {
            const date = new Date;
            
            if (date.getUTCFullYear() % 4 === 0) {
                monthLength[1] = 29;
            }
            
            const time = date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
            const day = days[date.getUTCDay()] + ", " + months[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
            
            let yearDiff = 0;
            let monthDiff = 0;
            let dayDiff = 0;
            let hourDiff = 0;
            let minuteDiff = 0;
            let secondDiff = 0;
            if (priorDate !== undefined) {
                yearDiff = date.getUTCFullYear() - priorDate.getUTCFullYear();
                if (yearDiff > 0) {
                    monthDiff = date.getUTCMonth() + 12 - priorDate.getUTCMonth();
                    yearDiff--;
                } else {
                    monthDiff = date.getUTCMonth() - priorDate.getUTCMonth();    
                }
                
                if (monthDiff > 0) {
                    dayDiff = date.getUTCDate() + monthLength[priorDate.getUTCMonth()] - priorDate.getUTCDate();
                    monthDiff--;
                } else {
                    dayDiff = date.getUTCDate() - priorDate.getUTCDate();
                }
                
                if (dayDiff > 0) {
                    hourDiff = date.getUTCHours() + 24 - priorDate.getUTCHours();
                    dayDiff--;
                } else {
                    hourDiff = date.getUTCHours() - priorDate.getUTCHours();
                }
                
                if (hourDiff > 0) {
                    minuteDiff = date.getUTCMinutes() + 60 - priorDate.getUTCMinutes();
                    hourDiff--;
                } else {
                   minuteDiff = date.getUTCMinutes() - priorDate.getUTCMinutes(); 
                }
                
                if (minuteDiff > 0) {
                    secondDiff = date.getUTCSeconds() + 60 - priorDate.getUTCSeconds();
                    minuteDiff--;
                } else {
                    secondDiff = date.getUTCSeconds() - priorDate.getUTCSeconds();
                }
            }
            
            $(".timings").append("<li>Time of click: " + time + " " + day +
            "<br>Time since last click: " + yearDiff + " years " + monthDiff + " months " + dayDiff + " days " 
            + hourDiff + " hours " + minuteDiff + " minutes " + secondDiff + " seconds " + "</li>");
            priorDate = date;
        });
    }
})();