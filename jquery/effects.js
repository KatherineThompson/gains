(function() {
    // Set 3: Effects
    // jQuery provides a number of tools to 
    // do animations. Let's investigate them.
    // 
    // https://api.jquery.com/category/effects/
    // http://learn.jquery.com/effects/
    
    $(animateImageSrcChangeOnClick);
    
    /**
     * Problem 0: Set up an event handler that will
     * hide any paragraph when it is clicked.
     */    
    function hideParagraphsOnClick() {
        $("p").click(function() {
            $(event.target).hide();
        })
    }
    
    /**
     * Problem 1: Set up an event handler that will
     * slowly fade out any paragraph when it is clicked.
     */
    function fadeOutParagraphsOnClick() {
        $("p").click(function() {
            $(event.target).fadeOut("slow");
        })
    }
    
    /**
     * Problem 2: Set up an event handler that will
     * trigger the following events when a paragraph is 
     * clicked:
     *  
     *      1. Slowly fade out the paragraph
     *      2. After it is hidden, change the text to "jimmy whisper"
     *      3. Quickly fade the paragraph back in
     */
    function animateParagraphTextChangeOnClick() {
        $("p").click(function() {
            const paragraph = $(event.target);
            paragraph.fadeOut("slow");
            setTimeout(function() {
                $(paragraph).text("jimmy whisper").fadeIn("fast");
            }, 700);
        })
    }
    
    /**
     * Problem 3: There are many images in the .nice-things div.
     * When one of those images is clicked, hide it with a slideUp 
     * animation. Change its src to be the src of a different 
     * image in that div. Reveal the clicked image using a slideDown
     * animation.
     */
    function animateImageSrcChangeOnClick() {
        const srcs = [];
        
        $(".nice-things img").each(function(index, image) {
            srcs.push($(image).attr("src"));
        })
        
        $(".nice-things img").click(function() {
            const image = $(event.target);
            const newSrc = srcs[Math.floor(Math.random()*6)];
            $(image).slideUp();
            setTimeout(function() {
                $(image).attr("src", newSrc);
                $(image).fadeIn();
            }, 1000);
        })     
    }
    
    /**
     * Problem 4: When an image in the .nice-things div is clicked,
     * hide it with some animation, wait one second, then show it
     * again with another animation.
     */
    function hideAndShowImageOnClick() {
        
    }
    
    /**
     * Problem 5: In the .color-picker div, there is a colored circle
     * and one sliders controlling the opacity of that circle. When the 
     * GO button is clicked, animate the colored circle to have the
     * opacity selected by the slider.
     */
    function animateCircleOpacity() {
        
    }
})();