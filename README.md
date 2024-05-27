**NO LONGER SUPPORTED**

# Rocket Modal
A Javascript modal module.

* [Getting Started](#getting-started)
* [Basic Example](#basic-example)
   * [Manual Initialisation](#manual-initialisation)
* [Javascript Options](#javascript-options)
   * [Defaults](#defaults)
* [Modal Target](#modal-target)
* [On Done](#on-done)
* [Modal Methods](#modal-methods)
* [Advanced Example](#advanced-example)
* [Modalplate Deprecated](#modalplate-deprecated)

## Getting Started
Install via NPM.

```
npm install rocket-modal
```

**NOTE** that this module has a dependency [Rocket Tools (21kb)](https://github.com/chrishumboldt/Rocket-Tools) which will automatically be installed as well.

Start by including the necessary files.

```html
<head>
   <link href="node_modules/rocket-modal/css/modal.min.css" rel="stylesheet" type="text/css">
</head>
<body>
   <script src="node_modules/rocket-tools/js/tools.min.js"></script>
   <script src="node_modules/rocket-modal/js/modal.min.js"></script>
</body>
```

## Basic Example
See a basic example of how to use the module.

```html
<a id="modal-link-1" href>Open New Modal</a>

<script>
Rocket.modal({
   trigger: '#modal-link-1',
   heading: 'Example Modal',
   body: 'Here is the body text.'
});
</script>
```

#### Manual Initialisation
It is also possible to manually trigger a modal if you so choose. This is not recommended for [targeted modals](#modal-target) as you will be initialising each time which is redundant. In this case you probably want to parse the `event` to prevent odd click behaviors. For example:

```html
<a id="modal-link-1" href>Open New Modal</a>

<script>
document.getElementById('modal-link-1').addEventListener('click', event => {
   Rocket.modal({
      heading: 'Example Modal',
      body: 'Here is the body text.',
      parseEvent: event
   });
});
</script>
```

## Javascript Options
See the different options you have available on module call.

Name | Default | Options | Description
---- | ---- | ---- | ----
`body` | | | You can make the body whatever you would like to display.
`breakpoint` | `700` | | Set the breakpoint of the modal (in pixels) to change from a fullscreen modal to a standard content modal.
`buttons` | `true` | `true` `false` | Display the modal buttons.<br>**NOTE** that the true button will only display if the `onTrue` argument is set.
`buttonFalse` | `Cancel` | | Set the false button text.
`buttonTrue` | `Ok` | | Set the true button text.
`classAdd` | | | Set a class to the containing modal.
`closeText` | `close` | | Set the text or inner HTML of the close link.
`heading` | | | You can make the heading whatever you would like.
`onDone` | | | Set a function that will execute once the modal is either created or the link is triggered.
`onTrue` | | | Set a function that will execute when the true button is clicked.
`parseEvent` | | | Parse the event of a click to prevent the default link behavior. Only required for manual initialisations.
`reveal` | `slidefromtop` | `appear` `appearscale`<br>`slidefrombottom`<br>`slidefromleft`<br>`slidefromright`<br>`slidefromtop` | Set the reveal animation.
`revealLarge` | | `appear` `appearscale`<br>`slidefrombottom`<br>`slidefromleft`<br>`slidefromright`<br>`slidefromtop` | Set the reveal animation after the breakpoint has been reached.<br>**NOTE** that false means the already existing reveal animation will be used.
`target` | `false` | | Instead of creating a new modal, you can open an existing modal with a particular selector.
`trigger` | | | Set the elements that will trigger the modal event.

#### Defaults
You can also set or overwrite the above options globally by altering the Rocket defaults. To do so reference the defaults object property. For example:

```js
Rocket.defaults.modal.reveal = 'appearscale';
Rocket.defaults.modal.close = 'Exit';
Rocket.defaults.modal.buttonTrue = 'Yup';
```

## Modal Target
If you want to open a modal that has existing HTML, then target that modal. **Note** that a predefined HTML structure is required.

```html
<a id="modal-link-2" href>Open Target Modal</a>

<div id="modal-2" class="rocket-modal">
   <div class="rmo-heading">
      <h6>The Linked Modal Heading</h6>
   </div>
   <div class="rmo-body">
      This is the modal body.
   </div>
</div>

<script>
Rocket.modal({
   trigger: 'modal-link-2',
   target: '#modal-2'
});
</script>
```

## On Done
You can declare a function that will trigger once the modal is created or once the linked modal is set to reveal. See an example below.

```js
Rocket.modal({
   trigger: '#modal-link',
   heading: 'Text Heading',
   body: 'This is a simple test'
   onDone: () => {
      console.log('All done! Here is the modal element:');
   }
});
```

## Modal Methods
Once you have initialised a modal instance, there are some methods and references that you have access to. See below:

```js
// This modal is immediately shown as it has no trigger.
var myModal = Rocket.modal({
   heading: 'Text Heading',
   body: 'This is a simple test'
});

// Manually close the modal
setTimeout(() => {
   myModal.close();
}, 1000);

// Manually show the modal again
setTimeout(() => {
   myModal.show();
}, 2000);
```

## Advanced Example
See an advanced example below with options as per the above.

```html
<a id="example" href>Open Modal</a>

<script>
let myModal = Rocket.modal({
   trigger: '#example',
   heading: 'Advanced Modal',
   body: 'Here is the body text.',
   buttons: true,
   close: '<i class="icon-close"></i>',
   breakpoint: 320,
   reveal: 'slidefromright',
   revealLarge: 'slidefromtop',
   onDone: () => {
      console.log('Modal Loaded!');
   },
   onTrue: () => {
      console.log('The true button was clicked!');
      myModal.close();

   }
});
</script>
```

## Modalplate Deprecated
The original library, Modalplate, has been deprecated. The entire Webplate project is being refactored and rebranded with a new development philosophy. Modalplate will be maintained only with bug fixes under the **modalplate** branch.

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Copyright and License
Copyright 2017 Rocket Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
