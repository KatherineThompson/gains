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
    function getRandomImageOnClick() {
        
    }
    
    /**
     * Problem 1: Take your solution above and add the ability to
     * customize the wait time using the input.
     */
    function getRandomImageOnClickCustomTimer() {
        
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
        
    }
})();