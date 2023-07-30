// ==UserScript==
// @name         Custom Font Override
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Override font on all websites, including Twitter and code sections
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Define the font you want to use
    const font = "Consolas, monospace";

    // Override font for all elements on the page
    document.body.style.fontFamily = font;

    // Observe DOM mutations to detect dynamically loaded content
    const observer = new MutationObserver(function(mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Override font for new elements as they are added to the page
                overrideFontForElement(mutation.target, font);
            }
        }
    });

    // Start observing the document body
    observer.observe(document.body, { childList: true, subtree: true });

    // Function to override font for a specific element and its children
    function overrideFontForElement(element, font) {
        element.style.fontFamily = font;
        const children = element.children;
        for (let i = 0; i < children.length; i++) {
            overrideFontForElement(children[i], font);
        }
    }
})();
