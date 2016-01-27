
(function() {

    $(setUpNamesEvents);
    
    // Set 0: Selectors.
    
    /**
     * Problem 1: Write a function that selects all the images in the .selection-images div.
     * (All following problems refer to the .selection-images div unless otherwise specified.)
     * 
     * Hint: You must complete Problem 0 in index.html first.
     * Hint: Use $('your selector') to select a set of elements.
     * Hint: Use $('some elements').addClass('selected') to verify that you've selected the right elements.
     * Hint: http://learn.jquery.com/using-jquery-core/selecting-elements/
     * Hint: http://api.jquery.com/category/selectors/
     */
    function selectAllImages() {
        $(".selection-images img").addClass("selected");
    }
    
    /**
     * Problem 2: Write a function that selects the first image.
     * 
     * Hint: Check out the :first pseudo-selector
     * Hint: http://learn.jquery.com/using-jquery-core/selecting-elements/#pseudo-selectors
     * Hint: Check out the .eq() method. You can use it to select just one of a set of matched elements:
     *      $('many elements').eq(1) // select the element at index 1
     * Hint: https://api.jquery.com/eq/
     */
    function selectFirstImage() {
        // $(".selection-images img:first").addClass("selected");
        // $(".selection-images img:eq(0)").addClass("selected");
        // $(".selection-images img").eq(0).addClass("selected");
        $(".selection-images img").filter(":eq(0)").addClass("selected");
    }
    
    /**
     * Problem 3: Write a function that selects images after the first one.
     * 
     * Hint: Check out the :gt() pseudo-selector
     * Hint: http://learn.jquery.com/using-jquery-core/selecting-elements/#pseudo-selectors
     */
    function selectImagesAfterFirst() {
        // $(".selection-images img:gt(0)").addClass("selected");
        $(".selection-images img").filter(":gt(0)").addClass("selected");
    }
    
    /**
     * Problem 4: Write a function that selects all images with a given alt tag.
     * 
     * Hint: Check out the [attribute=value] selector syntax.
     * Hint: http://learn.jquery.com/using-jquery-core/selecting-elements/#selecting-elements-by-attribute
     */
    function selectImagesWithAltTag(altTag) {
        $(".selection-images img[alt='" + altTag + "']").addClass("selected");
    }
    
    /**
     * Problem 5: Write a function that shuffles the image `src`s. So after calling this function,
     * the second image will have the `src` that was originally of the first image, the third 
     * image will have the `src` that was originally of the second image, and the first image
     * will have the `src` that was originally of the third image.
     * 
     * Hint: It's ok to hardcode the assumption that there are three images.
     * Hint: Use $('selection').attr('src') to get src attr of the first selected element.
     * Hint: Use $('selection').attr('src', 'new value') to set src attr for every matched element.
     * Hint: Use $('selection').eq(index) to select an element at a specific index.
     * Hint: http://api.jquery.com/attr/
     * Hint: http://learn.jquery.com/using-jquery-core/working-with-selections/
     */
    function shuffleSrcs() {
        const images = $(".selection-images img");
        const srcs = [];
        $.each(images, function(index, image) {
            srcs[index] = $(image).attr("src");
        })
        $.each(images, function(index, image) {
            if (srcs[index - 1]) {
                $(image).attr("src", srcs[index - 1]);
            } else {
                $(image).attr("src", srcs[srcs.length - 1]);
            }
        })
    }
    
    /**
     * Set 1: Events
     * 
     * In browser programming, events are a central part of your application,
     * since you're probably spending most of your time responding to user input.
     * jQuery provides a number of utilities to manage events.
     * 
     * http://learn.jquery.com/events/
     * http://learn.jquery.com/events/introduction-to-events/
     * https://api.jquery.com/category/events/
     */
    
    /**
     * Problem 1: Write a function that adds the .selected class to an image when the image is clicked.
     * 
     * Hint: Use $('selector').click(function() { }) to set up a click handler.
     * Hint: https://api.jquery.com/click/
     * Hint: http://learn.jquery.com/events/event-basics/#setting-up-event-responses-on-dom-elements
     */
    function selectImageOnClick() {
        // $(".selection-images img").click(function(){
        //     $(this).addClass("selected");
        // })
        const images = $(".selection-images img");
        $.each(images, function(index, image) {
            $(image).click(function() {
                $(image).addClass("selected");
            })
        })
    }
    
    /**
     * Problem 1: Write a function that adds the .selected class to an image when the image is clicked,
     * only the first time but not subsequent times the image is clicked.
     *
     * Hint: Use $('selector').off('eventName') to remove event listeners from an event. 
     * Hint: https://api.jquery.com/off/
     * Hint: http://learn.jquery.com/events/event-basics/#tearing-down-event-listeners
     */
    function selectImageOnClickOnce() {
        const images = $(".selection-images img");
        $.each(images, function(index, image) {
            $(image).click(function() {
                $(image).addClass("selected");
                $(image).off("click");
            })
        })
    }
    
    /**
     * Problem 2: In the .events div there is a table. Each row of this table contains an event 
     * name. Write a function that sets up handlers such that the cell in the "Count" column 
     * is the number of times that event has occurred on the table.
     *
     * Hint: Use $('selector').text(newVal) to set the text of all selected elements.
     * Hint: http://api.jquery.com/text/
     * Hint: You may wish to have some variables in this function to keep track of how many times
     *       each event has fired.
     * Hint: If you want to get fancy, you can set up multiple event handlers with a single .on() call
     * Hint: http://learn.jquery.com/events/event-basics/#setting-up-multiple-event-responses 
     */
    function setUpTableEvents() {
        let click = 0;
        let mousemove = 0;
        let mouseout = 0;
        $("table").on({
            click: function() {
                click++;
                $("tbody tr:eq(0) td:eq(1)").text(click);
            },
            mousemove: function() {
                mousemove++;
                $("tbody tr:eq(1) td:eq(1)").text(mousemove);
            },
            mouseleave: function() {
                mouseout++;
                $("tbody tr:eq(2) td:eq(1)").text(mouseout);
            }
        });
    }
    
    /**
     * Problem 3: In the .events-names div there is a list of names. There is also a span with class
     * .most-recently-clicked. Write a function that inserts the most recently clicked name into 
     * that span.
     * 
     * Hint: Use $('selector').text(newVal) to set the text of all selected elements.
     * Hint: Use $('selector').text() to get the text of the first of the selected elements.
     * Hint: In an event handler, use event.target to see the element that triggered the event.
     *       (Just for fun, check out the event object to see what else you get on it!)
     * 
     *       For example:
     *          $('p').click(function(event) {
     *              $(event.target).attr('id') // get the id attribute of the clicked element.
     *          })
     * Hint: https://api.jquery.com/event.target/
     * Hint: http://learn.jquery.com/events/inside-event-handling-function/
     */
    function setUpNamesEvents() {
        const names = $("ul li");
        $.each(names, function(index, name) {
            $(name).click(function() {
                $("span.most-recently-clicked").text($(name).text());
            });
        })
    }
    
    /**
     * Problem 4: In the .events-coordinates div, there is are some spans showing where the most
     * recent mousemove event was. Add a mousemove listener to the entire page that updates
     * these spans with the most recent values.
     * 
     * Hint: I don't know but I think you'll find that 'body' covers pretty much everything.
     * Hint: In an event handler, use event.pageX and event.pageY to get the coordinates of where
     *       the event occurred.
     * Hint: http://learn.jquery.com/events/inside-event-handling-function/
     * Hint: https://api.jquery.com/event.pageX/
     * Hint: https://api.jquery.com/event.pageY/
     */
    function setUpMousemoveEvents() {
        
    }
    
    /**
     * Problem 5: In the .events-triggers div, there are three buttons. Each button contains the name
     * of an event that was referenced in the table in an earlier problem. Wire up event handlers
     * such that clicking a button manually triggers that event on the table.
     * 
     * Hint: Use $('selector').trigger('eventName') to manually execute handlers for the selected elements.
     * Hint: http://learn.jquery.com/events/triggering-event-handlers/
     * Hint: https://api.jquery.com/trigger/
     */
    function setUpTriggers() {
        
    }
})();