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
var RockMod_Modal;
(function (RockMod_Modal) {
    // Variables
    var reveals = [
        'appear',
        'appearscale',
        'slidefromright',
        'slidefromtop',
        'slidefromleft',
        'slidefrombottom'
    ];
    // Functions
    var html = {
        addButtons: function (options) {
            if (options.buttons && !Rocket.exists(options.element.modal.querySelector('.rmo-buttons'))) {
                var buttonContainer = html.element('div', 'rmo-buttons', '');
                // False button
                var buttonFalse = html.element('button', 'btn-false', options.buttonFalse);
                Rocket.event.add(buttonFalse, 'click', modal.close);
                buttonContainer.appendChild(buttonFalse);
                if (Rocket.is.function(options.onTrue)) {
                    var buttonTrue = html.element('button', 'btn-true', options.buttonTrue);
                    Rocket.event.add(buttonTrue, 'click', options.onTrue);
                    buttonContainer.appendChild(buttonTrue);
                }
                options.element.modal.appendChild(buttonContainer);
            }
        },
        addClose: function (options) {
            if (!Rocket.exists(options.element.modal.querySelector('.rmo-close'))) {
                var modalClose = document.createElement('a');
                Rocket.classes.add(modalClose, 'rmo-close');
                modalClose.innerHTML = options.closeText;
                Rocket.event.add(modalClose, 'click', modal.close);
                options.element.modal.appendChild(modalClose);
            }
        },
        element: function (type, classes, content) {
            // Catch
            if (!Rocket.is.string(type)) {
                return false;
            }
            // Continue
            var html = document.createElement(type);
            if (Rocket.is.string(classes)) {
                html.className = classes;
            }
            if (Rocket.is.string(content) && content.length > 0) {
                html.innerHTML = content;
            }
            return html;
        },
        modalExisting: function (options) {
            options.element.modal = Rocket.dom.element(options.target);
            // Catch non existing modals
            if (!Rocket.is.element(options.element.modal)) {
                if (Rocket.defaults.modal.errors) {
                    Rocket.error("Rocket Modal: The " + options.target + " does not exist on the DOM.");
                }
                return;
            }
            // Classes
            var modalClasses = "rocket-modal _existing";
            if (options.classAdd.length > 0) {
                modalClasses += " " + options.classAdd;
            }
            Rocket.classes.add(options.element.modal, modalClasses);
            // Additions
            html.addClose(options);
            html.addButtons(options);
            // Modifications
            var heading = options.element.modal.querySelector('.rmo-heading h6');
            var body = options.element.modal.querySelector('.rmo-body');
            if (options.heading.length > 0 && heading) {
                heading.innerHTML = options.heading;
            }
            ;
            if (options.body.length > 0 && body) {
                body.innerHTML = options.body;
            }
            ;
            return options;
        },
        modalNew: function (options) {
            // Classes
            var modalClasses = "rocket-modal _new";
            if (options.classAdd.length > 0) {
                modalClasses += " " + options.classAdd;
            }
            // HTML
            var modalHTML = document.createElement('div');
            Rocket.classes.add(modalHTML, modalClasses);
            options.element.modal = modalHTML;
            html.addClose(options);
            if (options.heading.length > 0) {
                var modalHeading = html.element('div', 'rmo-heading', '');
                var modalHeadingInner = html.element('h6', '', options.heading);
                modalHeading.appendChild(modalHeadingInner);
                options.element.modal.appendChild(modalHeading);
            }
            if (options.body.length > 0) {
                var modalBody = html.element('div', 'rmo-body', options.body);
                options.element.modal.appendChild(modalBody);
            }
            html.addButtons(options);
            return options;
        }
    };
    var modal = {
        close: function (callback) {
            if (callback === void 0) { callback = null; }
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
                var currentModal_1 = Rocket.dom.element('.rocket-modal._reveal');
                if (Rocket.exists(currentModal_1)) {
                    setTimeout(function () {
                        Rocket.classes.remove(currentModal_1, '_reveal');
                        if (Rocket.has.class(currentModal_1, '_new')) {
                            Rocket.dom.remove(currentModal_1);
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
        reveal: function (options) {
            // Reveals
            if (reveals.indexOf(options.revealLarge) > -1 && (Rocket.dimensions.width(window) > options.breakpoint)) {
                Rocket.classes.add(options.element.modal, " _" + options.revealLarge);
            }
            else {
                Rocket.classes.add(options.element.modal, " _" + options.reveal);
            }
            // Close old modals and show new modal
            setTimeout(function () {
                modal.close(function () {
                    Rocket.overlay.show();
                    Rocket.classes.add(Rocket.dom.html, 'rmo-reveal');
                    if (options.new) {
                        Rocket.dom.body.appendChild(options.element.modal);
                        setTimeout(function () {
                            Rocket.classes.add(options.element.modal, '_reveal');
                            if (Rocket.is.function(options.onDone)) {
                                options.onDone();
                            }
                        }, 10);
                    }
                    else {
                        Rocket.classes.add(options.element.modal, '_reveal');
                        if (Rocket.is.function(options.onDone)) {
                            options.onDone();
                        }
                    }
                });
            }, 10);
        }
    };
    function setup() {
        Rocket.event.add(Rocket.dom.element('#rocket-overlay'), 'click', modal.close);
    }
    // Initialiser
    function init(uOptions) {
        // Catch
        if (!Rocket.is.object(uOptions)) {
            return;
        }
        var _RD = Rocket.defaults.modal;
        var options = {
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
        if (options.parseEvent) {
            options.parseEvent.preventDefault();
        }
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
            var triggers = Rocket.dom.select(options.trigger);
            if (triggers.length > 0) {
                for (var _i = 0, triggers_1 = triggers; _i < triggers_1.length; _i++) {
                    var trigger = triggers_1[_i];
                    Rocket.event.add(trigger, 'click', function (event) {
                        event.preventDefault();
                        modal.reveal(options);
                    });
                }
            }
        }
        return {
            close: modal.close,
            modal: options.element.modal,
            show: function () {
                modal.reveal(options);
            }
        };
    }
    RockMod_Modal.init = init;
    setup();
})(RockMod_Modal || (RockMod_Modal = {}));
// Bind to Rocket
Rocket.modal = RockMod_Modal.init;
