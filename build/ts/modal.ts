/*
Author: Chris Humboldt
*/

// Extend Rocket
Rocket.defaults.modal = {
   breakpoint: 700,
   buttons: true,
   buttonFalse: 'Cancel',
   buttonTrue: 'Ok',
   close: 'Close',
   errors: true,
   reveal: 'slidefromtop',
   show: 'always'
};

// Module
module RockMod_Modal {
   // Variables
   const reveals = [
      'appear',
		'appearscale',
		'slidefromright',
		'slidefromtop',
		'slidefromleft',
		'slidefrombottom'
   ];

   // Functions
   const html = {
      addButtons: options => {
         if (options.buttons && !Rocket.exists(options.element.modal.querySelector('.rmo-buttons'))) {
            let buttonContainer = html.element('div', 'rmo-buttons', '');

            // False button
            let buttonFalse = html.element('button', 'btn-false', options.buttonFalse);
            Rocket.event.add(buttonFalse, 'click', modal.close);
            buttonContainer.appendChild(buttonFalse);

            if (Rocket.is.function(options.onTrue)) {
               let buttonTrue = html.element('button', 'btn-true', options.buttonTrue);
               Rocket.event.add(buttonTrue, 'click', options.onTrue);
               buttonContainer.appendChild(buttonTrue);
            }

            options.element.modal.appendChild(buttonContainer);
         }
      },
      addClose: options => {
         if (!Rocket.exists(options.element.modal.querySelector('.rmo-close'))) {
            let modalClose = document.createElement('a');
            Rocket.classes.add(modalClose, 'rmo-close');
            modalClose.innerHTML = options.close;
            Rocket.event.add(modalClose, 'click', modal.close);
            options.element.modal.appendChild(modalClose);
         }
      },
      element: function (type: string, classes: string, content): any {
         // Catch
         if (!Rocket.is.string(type)) {
            return false;
         }
         // Continue
         let html = document.createElement(type);
         if (Rocket.is.string(classes)) {
            html.className = classes;
         }
         if (Rocket.is.string(content) && content.length > 0) {
            html.innerHTML = content;
         }
         return html;
      }
   }
   const modal = {
      close: (callback = null) => {
         /*
         Catch and make sure a Rocket message is not open. This is to prevent
         the two modules from conflicting with each other. It can get kinda tricky.
         */
         if (Rocket.has.class(Rocket.dom.html, 'rm-reveal')) { return; }

         // Continue
         if (Rocket.has.class(Rocket.dom.html, 'rmo-reveal')) {
            Rocket.classes.remove(Rocket.dom.html, 'rmo-reveal');

            let currentModal = Rocket.dom.element('.rocket-modal._current');
            if (Rocket.exists(currentModal)) {
               setTimeout(() => {
                  if (Rocket.has.class(currentModal, '_new')) {
                     Rocket.dom.remove(currentModal);
                  }
                  else {
                     Rocket.classes.remove(currentModal, '_current');
                  }
                  if (Rocket.is.function(callback)) {
                     return callback();
                  }
                  else {
                     Rocket.overlay.hide();
                  }
               }, 400);
            }
         }
         else {
            if (Rocket.is.function(callback)) {
               return callback();
            }
            else {
               Rocket.overlay.hide();
            }
         }
      },
      new: (options: ModalOptions) => {
         // Classes
         let modalClasses = `rocket-modal _reveal _new`;
         if (options.classAdd.length > 0) {
            modalClasses += ` ${options.classAdd}`;
         }

         // Modal container
         let modalHTML = document.createElement('div');
         Rocket.classes.add(modalHTML, modalClasses);
         options.element.modal = modalHTML;

         // Modal close
         html.addClose(options);

         // Modal heading
         if (options.heading.length > 0) {
            let modalHeading = html.element('div', 'rmo-heading', '');
            let modalHeadingInner = html.element('h6', '', options.heading);
            modalHeading.appendChild(modalHeadingInner);
            options.element.modal.appendChild(modalHeading);
         }

         // Modal body
         if (options.body.length > 0) {
            let modalBody = html.element('div', 'rmo-body', options.body);
            options.element.modal.appendChild(modalBody);
         }

         // Modal Buttons
         html.addButtons(options);

         // Append the new HTML
         Rocket.dom.body.appendChild(options.element.modal);
         modal.reveal(options);

         return {
            close: modal.close,
            modal: options.element.modal
         }
      },
      reveal: (options: ModalOptions) => {
         // Reveals
         if (reveals.indexOf(options.revealLarge) > -1 && (Rocket.dimensions.width(window) > options.breakpoint)) {
            Rocket.classes.add(options.element.modal, ` _${options.revealLarge}`);
         }
         else {
            Rocket.classes.add(options.element.modal, ` _${options.reveal}`);
         }

         // Close old modals and show new modal
         setTimeout(() => {
            modal.close(() => {
               Rocket.overlay.show();
               Rocket.classes.add(Rocket.dom.html, 'rmo-reveal');
               Rocket.classes.add(options.element.modal, '_current');

               if (Rocket.is.function(options.onDone)) {
                  options.onDone(options.element.modal);
               }
            });
         }, 50);
      },
      show: (options: ModalOptions) => {
         // Classes
         let modalClasses = `rocket-modal _reveal _existing`;
         if (options.classAdd.length > 0) {
            modalClasses += ` ${options.classAdd}`;
         }
         Rocket.classes.add(options.element.modal, modalClasses);

         // Additions
         html.addClose(options);
         html.addButtons(options);

         // Modifications
         let heading = options.element.modal.querySelector('.rmo-heading h6');
         let body = options.element.modal.querySelector('.rmo-body');

         if (options.heading.length > 0 && heading) {
            heading.innerHTML = options.heading;
         };
         if (options.body.length > 0 && body) {
            body.innerHTML = options.body;
         };

         modal.reveal(options);
      }
   };

   function setup() {
      Rocket.event.add(Rocket.dom.element('#rocket-overlay'), 'click', modal.close);
   }

   // Initialiser
   export function init(uOptions: ModalOptions) {
      // Catch
      if (!Rocket.is.object(uOptions)) { return; }

      let _RD = Rocket.defaults.modal;
      let options: ModalOptions = {
         body: Rocket.helper.setDefault(uOptions.body, ''),
         breakpoint: Rocket.helper.setDefault(uOptions.breakpoint, _RD.breakpoint),
         buttons: Rocket.helper.setDefault(uOptions.buttons, _RD.buttons),
         buttonFalse: Rocket.helper.setDefault(uOptions.buttonFalse, _RD.buttonFalse),
         buttonTrue: Rocket.helper.setDefault(uOptions.buttonTrue, _RD.buttonTrue),
         classAdd: Rocket.helper.setDefault(uOptions.classAdd, ''),
         close: Rocket.helper.setDefault(uOptions.close, _RD.close),
         element: {},
         heading: Rocket.helper.setDefault(uOptions.heading, ''),
         onDone: (Rocket.is.function(uOptions.onDone)) ? uOptions.onDone : null,
         onTrue: (Rocket.is.function(uOptions.onTrue)) ? uOptions.onTrue : null,
         parseEvent: (uOptions.parseEvent) ? uOptions.parseEvent : null,
         reveal: Rocket.helper.setDefault(uOptions.reveal, _RD.reveal),
         revealLarge: Rocket.helper.setDefault(uOptions.revealLarge, ''),
         show: Rocket.helper.setDefault(uOptions.show, _RD.show),
         target: Rocket.helper.setDefault(uOptions.target, '')
      };

      // Check for event parsing
      if (options.parseEvent) { options.parseEvent.preventDefault(); }

      // Check to see if the modal links to an existing element or is a new modal.
      if (options.target.length > 0) {
         options.element.modal = Rocket.dom.element(options.target);

         if (!Rocket.is.element(options.element.modal)) {
            if (Rocket.defaults.modal.errors) {
               Rocket.error(`Rocket Modal: The ${options.target} does not exist on the DOM.`);
            }
            return;
         }
         else {
            return modal.show(options);
         }
      }
      else {
         return modal.new(options);
      }
   }

   setup();
}

// Bind to Rocket
Rocket.modal = RockMod_Modal.init;
