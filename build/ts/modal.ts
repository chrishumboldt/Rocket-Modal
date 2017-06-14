/**
@author Chris Humboldt
**/

// Extend Rocket
Rocket.defaults.modal = {
   breakpoint: 700,
   buttons: true,
   buttonFalse: 'Cancel',
   buttonTrue: 'Ok',
   closeText: 'Close',
   errors: true,
   reveal: 'slidefromtop'
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
            modalClose.innerHTML = options.closeText;
            Rocket.event.add(modalClose, 'click', modal.close);
            options.element.modal.appendChild(modalClose);
         }
      },
      element: (type: string, classes: string, content): any => {
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
      },
      modalExisting: (options: ModalOptions) => {
         options.element.modal = Rocket.dom.element(options.target);

         // Catch non existing modals
         if (!Rocket.is.element(options.element.modal)) {
            if (Rocket.defaults.modal.errors) {
               Rocket.error(`Rocket Modal: The ${options.target} does not exist on the DOM.`);
            }
            return;
         }

         // Classes
         let modalClasses = `rocket-modal _existing`;
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

         return options;
      },
      modalNew: (options: ModalOptions) => {
         // Classes
         let modalClasses = `rocket-modal _new`;
         if (options.classAdd.length > 0) {
            modalClasses += ` ${options.classAdd}`;
         }

         // HTML
         let modalHTML = document.createElement('div');
         Rocket.classes.add(modalHTML, modalClasses);
         options.element.modal = modalHTML;

         html.addClose(options);

         if (options.heading.length > 0) {
            let modalHeading = html.element('div', 'rmo-heading', '');
            let modalHeadingInner = html.element('h6', '', options.heading);
            modalHeading.appendChild(modalHeadingInner);
            options.element.modal.appendChild(modalHeading);
         }

         if (options.body.length > 0) {
            let modalBody = html.element('div', 'rmo-body', options.body);
            options.element.modal.appendChild(modalBody);
         }

         html.addButtons(options);

         return options;
      }
   }
   const modal = {
      close: (callback = null) => {
         /*
         Catch and make sure a Rocket message is not open. This is to prevent
         the two modules from conflicting with each other. It can get kinda tricky.
         */
         if (Rocket.has.class(Rocket.dom.html, 'rm-reveal')) {
            return;
         }

         // Continue
         if (Rocket.has.class(Rocket.dom.html, 'rmo-reveal')) {
            Rocket.classes.remove(Rocket.dom.html, 'rmo-reveal');

            let currentModal = Rocket.dom.element('.rocket-modal._reveal');
            if (Rocket.exists(currentModal)) {
               setTimeout(() => {
                  Rocket.classes.remove(currentModal, '_reveal');
                  if (Rocket.has.class(currentModal, '_new')) {
                     Rocket.dom.remove(currentModal);
                  }

                  if (Rocket.is.function(callback)) {
                     return callback();
                  }
               }, 250);

               if (!Rocket.is.function(callback)) {
                  Rocket.overlay.hide();
               }
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
               if (options.new) {
                  Rocket.dom.body.appendChild(options.element.modal);
                  setTimeout(() => {
                     Rocket.classes.add(options.element.modal, '_reveal');

                     if (Rocket.is.function(options.onDone)) { options.onDone(); }
                  }, 10);
               }
               else {
                  Rocket.classes.add(options.element.modal, '_reveal');

                  if (Rocket.is.function(options.onDone)) { options.onDone(); }
               }
            });
         }, 10);
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
         closeText: Rocket.helper.setDefault(uOptions.closeText, _RD.closeText),
         element: {},
         heading: Rocket.helper.setDefault(uOptions.heading, ''),
         onDone: (Rocket.is.function(uOptions.onDone)) ? uOptions.onDone : null,
         onTrue: (Rocket.is.function(uOptions.onTrue)) ? uOptions.onTrue : null,
         parseEvent: (uOptions.parseEvent) ? uOptions.parseEvent : null,
         reveal: Rocket.helper.setDefault(uOptions.reveal, _RD.reveal),
         revealLarge: Rocket.helper.setDefault(uOptions.revealLarge, ''),
         target: Rocket.helper.setDefault(uOptions.target, ''),
         trigger: Rocket.helper.setDefault(uOptions.trigger, '')
      };

      // Check for event parsing
      if (options.parseEvent) { options.parseEvent.preventDefault(); }

      // Check to see if the modal links to an existing element or is a new modal
      if (options.target.length > 0) {
         options = html.modalExisting(options);
      }
      else {
         options = html.modalNew(options);
      }

      // Show right away or trigger from element
      options.new = options.target.length < 1;
      if (options.trigger.length < 1) {
         modal.reveal(options);
      }
      else {
         const triggers = Rocket.dom.select(options.trigger);

         if (triggers.length > 0) {
            for (let trigger of triggers) {
               Rocket.event.add(trigger, 'click', event => {
                  event.preventDefault();
                  modal.reveal(options);
               });
            }
         }
      }

      return {
         close: modal.close,
         modal: options.element.modal,
         show: () => {
            modal.reveal(options);
         }
      }
   }

   setup();
}

// Bind to Rocket
Rocket.modal = RockMod_Modal.init;
