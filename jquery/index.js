(function() {
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
        
    }
    
    /**
     * Problem 3: Write a function that selects images after the first one.
     * 
     * Hint: Check out the :gt() pseudo-selector
     * Hint: http://learn.jquery.com/using-jquery-core/selecting-elements/#pseudo-selectors
     */
    function selectImagesAfterFirst() {
        
    }
    
    /**
     * Problem 4: Write a function that selects all images with a given alt tag.
     * 
     * Hint: Check out the [attribute=value] selector syntax.
     * Hint: http://learn.jquery.com/using-jquery-core/selecting-elements/#selecting-elements-by-attribute
     */
    function selectImagesWithAltTag(altTag) {
        
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
        
    }
})();