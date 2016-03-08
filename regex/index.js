'use strict';

function hasAChars(str) {
    // match any string with a or more 'a' characters.
    return /a+/.test(str);
}

// Start by doing the exercises listed on Eloquent JS:
// http://eloquentjavascript.net/09_regexp.html#h_vDM8PzwQWU

function stringIsCarOrCat(str) {
    // These console.log()s are here so jshint passes.
    // Remove them when you start to work.
    return /ca[rt]/.test(str);    
}

function stringIsPopOrProp(str) {
    return /pr?op/.test(str);
}

function stringIsFerretFerryOrFerrari(str) {
    return /ferr(y|et|ari)/.test(str);
}

function wordEndsInIous(str) {
    return /ious\b/.test(str);
}

function stringIsWhitespaceFollowedByPunctuation(str) {
    return /\s[.,;:]/.test(str);
}

function wordIsLongerThanSixLetters(str) {
    return /\w{7,}/.test(str);
}

function wordLacksLetterE(str) {
    return /\b([a-d]|[f-z])+\b/.test(str);
}

// Now let's do a few more

/**
 * Return true if the string is a phone number, matching the following pattern:
 *
 *      xxx-xxx-xxxx
 *
 * Return false otherwise.
 *
 * @param {string} ostensiblePhoneNumber – string
 * @return true if the string is a phone number, and false otherwise
 */
function isPhoneNumber(ostensiblePhoneNumber) {
    return /^\d{3}-\d{3}-\d{4}$/.test(ostensiblePhoneNumber);
}

/**
 * Return true if the string is a phone number, matching any of the following patterns:
 *
 *      xxx-xxx-xxxx
 *      xxx.xxx.xxxx
 *      (xxx) xxx-xxxx
 *
 * Return false otherwise.
 *
 * @param {string} ostensiblePhoneNumber
 * @return true if the string is a phone number, and false otherwise
 */
function isPhoneNumberLoose(ostensiblePhoneNumber) {
    return /\b(\d{3}(-\d{3}-|\.\d{3}\.)\d{4})|(\(\d{3}\) \d{3}-\d{4})\b/.test(ostensiblePhoneNumber);
}

/**
 * Return true if the string is a netid, matching the following pattern:
 *
 *      <two to four letters><a number with one to four digits>
 *
 * Return false otherwise.
 *
 * @param {string} ostensibleNetid
 */
function isNetid(ostensibleNetid) {
    return /\b[a-z]{2,4}\d{1,4}\b/.test(ostensibleNetid);
}

/**
 * Airbnb does not want people sending urls to each other in messages.
 * Let's write a function that will replace all the urls in a message with
 * the string 'URL_REMOVED'. Assume an extremely simplified version of what
 * a url is:
 *
 *      www.<some combination of letters and numbers>.(com or biz or info or guru or pizza)
 *
 * Hint: see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace.
 *
 * @param {string} message the message to sanitize
 * @return {string} the message with all urls replaced with URL_REMOVED
 */
function replaceAllUrls(message) {
    return message.replace(/\bw{3}\.\w+\.(com|biz|info|guru|pizza)\b/g, "URL_REMOVED");
}

/**
 * Determine how many words that have either a British or American spelling are in the sentence.
 *
 * Check for the following words:
 *
 *      labor / labour
 *      neighbor / neighbour
 *      theater / theatre
 *      center / centre
 *
 * The sentence might look something like:
 *
 *      "I saw a ditty about the labour party at the theatre last night."
 *
 * @param {string} sentence – a sentence to check
 * @return {number} the count of words that have both British and American spellings
 */
function getBritishAmericanPairCount(sentence) {
    let count = 0;
    function isPair(params) {
        count++;
    }
    sentence.replace(/\b(labou?r|neighbou?r|(theater|theatre)|(center|centre))\b/g, isPair);
    return count;
}

/**
 * Return a new string with a different number of spaces after each sentence.
 * Assume that the input string will have at least one space after each period
 * that ends a sentence.
 *
 * Example:
 *
 *      getWithSpacesAfterPeriodCount('I like dogs. I like cats.', 2)
 *      // ==> 'I like dogs.  I like cats.'
 *      // Note: always actually do this, because putting 2 spaces after a sentence is good. ^_^
 *
 * @param {string} paragraph – a collection of sentences
 * @param {number} count – the number of spaces to put after each sentence.
 * @return {string} a collection of sentences separated by `count` spaces
 */
function getWithSpacesAfterPeriodCount(paragraph, count) {
    let newSpaces = ".";
    for (let i = 0; i < count; i++) {
        newSpaces += " ";
    }
    return paragraph.replace(/\. /, newSpaces);
}

// Regular Expressions can also be used to parse out certain parts of a string.
// You can do this with capture groups. See:
//      http://eloquentjavascript.net/09_regexp.html#h_CV5XL/TADP
//      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
//      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_parentheses

function getLastFourDigits(socialSecurityNumber) {
    // We use the parenthesis to group the part of the regex that we care about.
    const match = socialSecurityNumber.match(/^[\d]{3}-[\d]{2}-([\d]{4})$/);

    // The entire match will be present in match[0].
    // The first paren group will be present in match[1].
    // That's what we want, so we'll return it.
    return match && match[1];
}
/**
 * Return the area code for each phone number.
 *
 * @example
 *
 *      getAreaCodes(['425-111-2222', '303-444-5555']) // ==> ['425', '303']
 *
 * @param {string[]} phoneNumbers – an array of strings
 * @return {string[]} an array of area codes
 */
function getAreaCodes(phoneNumbers) {
    // Use map!
    const areaCodes = [];
    const areaCodeData = phoneNumbers.map(number => number.match(/\b(\d{3})-/));
    areaCodeData.forEach(function(areaCode) {
        if (areaCode) {
            areaCodes.push(areaCode[1]);
        }
    });
    return areaCodes;
}
/**
 * Parse an address. Assume a simplified definition of what an address is, as seen
 * in the example.
 *
 * @example
 *
 *      parseAddress('300 S Lamar Blvd, Austin, TX 78704')
 *      // ==> {houseNumber: '300', street: 'S Lamar Blvd', city: 'Austin', state: 'TX', zipCode: '78704'}
 *
 * @param {string} address - the address to parse
 * @return an object representing the address
 */
function parseAddress(address) {
    const addressPieces = address.match(/(\d+) ([\w ]+), ([a-z]+), ([a-z]{2}) (\d{5})/i);
    if (addressPieces) {
        return {houseNumber: addressPieces[1], street: addressPieces[2], city: addressPieces[3], state: addressPieces[4], zipCode: addressPieces[5]};
    }
}

module.exports = {
    hasAChars,
    stringIsCarOrCat,
    stringIsPopOrProp,
    stringIsFerretFerryOrFerrari,
    wordEndsInIous,
    stringIsWhitespaceFollowedByPunctuation,
    wordIsLongerThanSixLetters,
    wordLacksLetterE,
    isPhoneNumber,
    isPhoneNumberLoose,
    isNetid,
    replaceAllUrls,
    getBritishAmericanPairCount,
    getWithSpacesAfterPeriodCount,
    getLastFourDigits,
    getAreaCodes,
    parseAddress
};