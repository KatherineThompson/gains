"use strict";

(function() {
    const names = ["Plumper", "bigFootChester", "Stella", "Potato"];
    $(function() {
        insertNames(names);
    });
    // $(duplicateElement);
    // $(toggleButtonSuccess);
    // $(addClickCountToButton);
    $(fillDomPropertiesTable);
    $(swapImagesOnClick);
    $(wrapParagraphsInColumnDiv);
    
    // Set 2: Manipulation.
    // jQuery provides many utilities for mutating the DOM.
    // This is the basis of much of the interactivity it provides.
    //
    // https://api.jquery.com/category/manipulation/
    
    /**
     * Problem 0: Write a function that takes a list of names
     * and inserts an <li> element for each name in the <ul>
     * with class "names".
     * 
     * Hint: you can create a new jQuery element by passing html
     * into the $ function:
     * 
     *      $('<p>hi</p>');
     */
    function insertNames(names) {
        $(names).each(function(index, name) {
            // $(".names ul").after("<li>" + name + "</li>");
            // names end up in reverse order because each new one is put after the ul element
            $(".names ul").append("<li>" + name + "</li>");
        })
    }
    
    /**
     * Problem 1: Write a function that will duplicate any child
     * of the .duplication div that is clicked. For example,
     * if you had:
     * 
     *      <p>hi</p>
     *      <p>click me</p>
     * 
     * and you clicked the second <p>, then with this function,
     * the new HTML structure would be:
     * 
     *      <p>hi</p>
     *      <p>click me</p>
     *      <p>click me</p>
     */
    function duplicateElement() {
        $(".duplication").click(function() {
            $(event.target).clone().insertAfter(event.target);
        })
    }
    
    /**
     * Problem 2: In the .toggle-buttons div, there are three buttons.
     * Some of them have the .success class, and others do not. 
     * When any of the buttons are clicked, invert whether or not 
     * each button has that class. So if a button starts with the .success
     * class, and any button is clicked, then that button should 
     * have that class removed, and vice versa.
     */
    function toggleButtonSuccess() {
        $(".toggle-buttons button").click(function() {
            $(".toggle-buttons button").toggleClass("success");
        })
    }
    
    /**
     * Problem 3: Building on the previous problem -- each time a button
     * is clicked, change its text to include the number of total times
     * it has been clicked. Start the number at 0.
     */
    function addClickCountToButton() {
        $(".toggle-buttons button").each(function(index, button) {
            $(button).text(0);
            $(button).click(function() {
                let numClicks = $(button).text();
                numClicks = parseInt(numClicks, 10);
                $(button).text(numClicks + 1);
            })
        })
    }
    
    /**
     * Problem 4: Fill out the table .dom-properties with the correct
     * values for the table itself.
     */
    function fillDomPropertiesTable() {
        const table = $(".dom-properties");
        const height = table.height();
        const tableBody = $(".dom-properties tbody");
        function setCellText(rowIndex, text) {
            tableBody.find("tr").eq(rowIndex).find("td").filter(":eq(1)").text(text);
        }
        // tableBody.find("tr:eq(0) td").filter(":eq(1)").text(height);
        setCellText(0, height);
        const width = table.width();
        // tableBody.find("tr:eq(1) td").filter(":eq(1)").text(width);
        setCellText(1, width);
        const innerHeight = table.innerHeight();
        // tableBody.find("tr:eq(2) td").filter(":eq(1)").text(innerHeight);
        setCellText(2, innerHeight);
        const innerWidth = table.innerWidth();
        // tableBody.find("tr:eq(3) td").filter(":eq(1)").text(innerWidth);
        setCellText(3, innerWidth);
        const offsetLeft = table.offset().left;
        const offsetTop = table.offset().top;
        tableBody.find("tr:eq(4) td").filter(":eq(1)").text("left: " + offsetLeft + ", top: " + offsetTop);
    }
    
    /**
     * Problem 5: There are images in the .nice-things div. When any
     * two of those images are clicked, swap them.
     */
    function swapImagesOnClick() {
        const $niceThingsImage = $(".nice-things img");
        $niceThingsImage.click(function() {
            if($niceThingsImage.hasClass("clicked")) {
                const first = $(".nice-things img.clicked");
                const firstSrc = first.attr("src");
                const second = $(event.target);
                const secondSrc = second.attr("src");
                
                first.attr("src", secondSrc);
                second.attr("src", firstSrc);
                
                $niceThingsImage.removeClass("clicked");
            } else {
                $(event.target).addClass("clicked");
            }
        })
    }
    
    /**
     * Problem 6: There are three paragraphs in the .wrap div. 
     * Wrap them in a <div class="small-4 columns"> element so 
     * they line up correctly in the grid.
     */
    function wrapParagraphsInColumnDiv() {
        $(".wrap p").wrap("<div class='small-4 columns' />");
    }
})();