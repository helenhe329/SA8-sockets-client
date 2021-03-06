# Lab 3: React Notes
# Helen He | CS 52 | 4/23/18

## What I did

I created a webpage using React and Firebase that allows you to create and edit notes using Markdown syntax. The notes are able to be dragged, edited, and deleted, and they persist after the browser is refreshed or closed.

## What worked / didn't work

What worked:
* Incorporating the marked and editable textarea packages was a simple step that helped the notes look a lot more aesthetically pleasing.
* Integrating the app with Firebase was straightforward and vey useful.

What didn't work:
* I encountered a few issues related to onClick and onDrag not being picked up when the icons were clicked/dragged. The issue ended up being that the onClick/Drag events wanted to be associated with a div/span.

## Extra credit

* Resizable notes - after you save your edits, the notes resize to fit the length/width of the content.
* Tooltips - I added tooltips to the icons when you hover over them.
