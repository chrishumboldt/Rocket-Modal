Rocket.defaults.modal = {
    breakpoint: 700,
    buttons: true,
    buttonFalse: 'Cancel',
    buttonTrue: 'Ok',
    close: 'Close',
    errors: true,
    reveal: 'slide-from-top',
    show: 'always'
};
var RockMod_Modal;
(function (RockMod_Modal) {
    var reveals = [
        '_appear',
        '_appear-scale',
        '_slide-from-right',
        '_slide-from-top',
        '_slide-from-left',
        '_slide-from-bottom'
    ];
    var html = {
        addButtons: function (options) {
            if (options.buttons && !Rocket.exists(options.element.modal.querySelector('.rmo-buttons'))) {
                var buttonContainer = html.element('div', 'rmo-buttons', '');
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
                modalClose.innerHTML = options.close;
                Rocket.event.add(modalClose, 'click', modal.close);
                options.element.modal.appendChild(modalClose);
            }
        },
        element: function (type, classes, content) {
            if (!Rocket.is.string(type)) {
                return false;
            }
            var html = document.createElement(type);
            if (Rocket.is.string(classes)) {
                html.className = classes;
            }
            if (Rocket.is.string(content) && content.length > 0) {
                html.innerHTML = content;
            }
            return html;
        }
    };
    var modal = {
        close: function (callback) {
            if (callback === void 0) { callback = null; }
            if (Rocket.has.class(Rocket.dom.html, 'rmo-reveal')) {
                Rocket.classes.remove(Rocket.dom.html, 'rmo-reveal');
                var currentModal_1 = Rocket.dom.element('.rocket-modal._current');
                if (Rocket.exists(currentModal_1)) {
                    setTimeout(function () {
                        if (Rocket.has.class(currentModal_1, '_new')) {
                            Rocket.dom.remove(currentModal_1);
                        }
                        else {
                            Rocket.classes.remove(currentModal_1, '_current');
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
        new: function (options) {
            var modalClasses = "rocket-modal _reveal _new";
            if (options.classAdd.length > 0) {
                modalClasses += " " + options.classAdd;
            }
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
            Rocket.dom.body.appendChild(options.element.modal);
            modal.reveal(options);
            return {
                close: modal.close,
                modal: options.element.modal
            };
        },
        reveal: function (options) {
            if (reveals.indexOf(options.revealLarge) > -1 && (Rocket.dimensions.width(window) > options.breakpoint)) {
                Rocket.classes.add(options.element.modal, " _" + options.revealLarge);
            }
            else {
                Rocket.classes.add(options.element.modal, " _" + options.reveal);
            }
            setTimeout(function () {
                modal.close(function () {
                    Rocket.overlay.show();
                    Rocket.classes.add(Rocket.dom.html, 'rmo-reveal');
                    Rocket.classes.add(options.element.modal, '_current');
                });
            }, 50);
        },
        show: function (options) {
            var modalClasses = "rocket-modal _reveal _existing";
            if (options.classAdd.length > 0) {
                modalClasses += " " + options.classAdd;
            }
            Rocket.classes.add(options.element.modal, modalClasses);
            html.addClose(options);
            html.addButtons(options);
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
            modal.reveal(options);
        }
    };
    function init(uOptions) {
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
        if (options.parseEvent) {
            options.parseEvent.preventDefault();
        }
        if (options.target.length > 0) {
            options.element.modal = Rocket.dom.element(options.target);
            if (!Rocket.is.element(options.element.modal)) {
                if (Rocket.defaults.modal.errors) {
                    Rocket.error("Rocket Modal: The " + options.target + " does not exist on the DOM.");
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
    RockMod_Modal.init = init;
})(RockMod_Modal || (RockMod_Modal = {}));
Rocket.modal = RockMod_Modal.init;
