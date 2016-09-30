# Modalplate
A Javascript modal component.

## Getting Started
You can either download a copy of the source files or install Modalplate via Bower.

```
bower install modalplate
```

Start by including the necessary files.

```html
<head>
   <link href="css/modalplate.min.css" rel="stylesheet" type="text/css">
</head>
<body>
   <script src="js/modalplate.min.js"></script>
</body>
```

## Basic Example
See a basic example of how to use the component.

```html
<a href id="modal-link-1">Open New Modal</a>
<script>
document.getElementById('modal-link-1').onclick = function(event) {
	modalplate.init({
		heading: 'Example Modal',
		body: 'Here is the body text.',
		parseEvent: event
	});
};
</script>
```

## Javascript Options
See the different options you have available on component call.

Name | Default | Options | Description
---- | ---- | ---- | ----
body | false | | You can make the body whatever you would like to display.
breakpoint | 700 | | Set the breakpoint of the modal (in pixels) to change from a fullscreen modal to a standard content modal.
classAdd | false | | Set a class to the containing modal.
close | close | | Set the text or inner HTML of the close link.
heading | false | | You can make the heading whatever you would like.
overlay | true | true, false | Set whether or not you want the overlay to display on modal open.
onDone | false | | Set a function that will execute once the modal is either created or the link is triggered.
parseEvent | false | true, false | Parse the event of a click to prevent the default link behavior.
reveal | slide-from-top | appear, appear-scale, slide-from-bottom, slide-from-left, slide-from-right, slide-from-top | Set the reveal animation.
revealLarge | false | appear, appear-scale, slide-from-bottom, slide-from-left, slide-from-right, slide-from-top | Set the reveal animation after the breakpoint has been reached. **NOTE** that false means the already existing reveal animation will be used.
targetModal | false | | Instead of creating a new modal, you can open an existing modal with a particular selector.
trigger | always | always, small, large | Set when you want the modal trigger to fire. Small is below the breakpoint, large above the breakpoint and always is always.

## Modal Link
If you want to open a modal that has existing HTML, then link to the modal. **Note** that a predefined HTML structure is required.

```html
<a href id="modal-link-2">Open Linked Modal</a>

<div id="modal-2" class="modalplate">
	<div class="modalplate-heading">
		<h6>The Linked Modal Heading</h6>
	</div>
	<div class="modalplate-body">
		This is the modal body.
	</div>
</div>

<script>
document.getElementById('modal-link-2').onclick = function(event) {
	modalplate.init({
		targetModal: '#modal-2',
		parseEvent: event
	});
};
</script>
```

## Advanced Example
See an advanced example below with options as per the above.

```html
<a href id="example">Open Modal</a>
<script>
document.getElementById('modal-link').onclick = function(event) {
   modalplate.init({
      heading: 'Advanced Modal',
      body: 'Here is the body text.',
      close: '<i class="icon-close"></i>',
      breakpoint: 320,
      reveal: 'slide-from-right',
      revealLarge: 'slide-from-top',
      parseEvent: event
   });
};
</script>
```

## On Done
You can declare a function that will trigger once the modal is created or once the linked modal is set to reveal. The function return the modal element. See an example below.

```javascript
document.getElementById('modal-link').onclick = function (event) {
	modalplate.init({
		heading: 'Text Heading',
		body: 'This is a simple test',
		parseEvent: event,
		onDone: function (thisModal) {
			console.log(thisModal);
		}
	});
};
```

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Copyright and License
Copyright 2016 Webplate Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
