// ==UserScript==
// @name         Expand Facebook Comments
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Expand Facebook comments
// @author       J'Ville Computers
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

// Changelog:
// 0.4 Add debugging to fix missing button.
// 0.3
//   - Added button to expand all comments for selected thread.
// 0.2
//   - Added console logs for script start, button count, total comments, and script completion.
//   - Used GM_info.script.name to access script name from metadata.
// 0.1 (Initial)
//   - Initial release: expanded Facebook comments by simulating clicks on "View more comments" buttons.
(function() {
  'use strict';
  console.log(`Script started: ${GM_info.script.name}`);

  // Function to expand comments for a thread
  function expandThreadComments(thread) {
    var commentButtons = thread.querySelectorAll('.UFICommentLink');
    console.log(`Found ${commentButtons.length} "View more comments" buttons in thread`);

    var totalComments = 0;
    commentButtons.forEach(function(button) {
      button.click();
      totalComments += button.parentNode.querySelector('.UFICommentList').children.length;
    });

    console.log(`Expanded ${totalComments} comments in thread`);
  }

  // Add button to each thread to expand comments
  var threads = document.querySelectorAll('.UFICommentContainer');
  threads.forEach(function(thread) {
    console.log('Found thread. Adding Expand All button.');
    var expandButton = document.createElement('button');
    expandButton.textContent = 'Expand All Comments';
    expandButton.style.margin = '5px'; // Add some margin for readability
    expandButton.onclick = function() {
      expandThreadComments(thread);
    };

    thread.appendChild(expandButton);
  });

  console.log('Script completed: Expand Facebook Comments');
})();