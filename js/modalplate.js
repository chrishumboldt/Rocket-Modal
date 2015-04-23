/**
 * File: modalplate.js
 * Type: Javacript component file
 * Author: Chris Humboldt
 * Last Edited: 23 April 2015
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Functions
// Plugin call
// Component
// Prototype

// Functions
// ---------------------------------------------------------------------------------------
var webAddEvent = function($elem, $type, $eventHandle) {
	if ($elem == null || typeof($elem) == 'undefined') return;
	if ($elem.addEventListener) {
		$elem.addEventListener($type, $eventHandle, false);
	} else if ($elem.attachEvent) {
		$elem.attachEvent("on" + $type, $eventHandle);
	} else {
		$elem["on" + $type] = $eventHandle;
	}
};
var webClassAdd = function($selector, $class) {
	var $crtClass = $selector.className;

	if ($crtClass.indexOf($class) === -1) {
		$selector.setAttribute('class', $crtClass + ' ' + $class);
	}
};
var webClassRemove = function($selector, $class) {
	var $crtClass = $selector.className;

	if ($crtClass.indexOf($class) > -1) {
		$selector.className = $selector.className.split(' ').filter(function($val) {
			return $val != $class;
		}).toString().replace(/,/g, ' ');
	}
};
var webHasClass = function($element, $class) {
	return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
};
var webIdAdd = function($selector, $id) {
	$selector.setAttribute('id', $id);
};

// Plugin call
// ---------------------------------------------------------------------------------------
function Modalplate($selector, $userOptions) {
	var $selectorType = $selector.charAt(0).toString();

	if ($selectorType === '.') {
		var $elements = document.querySelectorAll($selector);
		for (var $i = 0; $i < $elements.length; $i++) {
			new ModalplateComponent($elements[$i], $userOptions);
		};
	} else {
		new ModalplateComponent(document.getElementById($selector.substring(1)));
	}
}

// Component
// ---------------------------------------------------------------------------------------
function ModalplateComponent($this, $userOptions) {

	// Setup
	this.element = $this;
	this.options = {
		reveal: 'slide-from-top',
		revealLarge: false,
		triggerMax: false,
		triggerMin: false
	};

	// User options
	if (typeof $userOptions === 'object') {
		for (var $optionKey in $userOptions) {
			if ($userOptions.hasOwnProperty($optionKey)) {
				this.options[$optionKey] = $userOptions[$optionKey];
			}
		}
	}

	// Initialise
	this.init();
};

// Prototype
// ---------------------------------------------------------------------------------------
ModalplateComponent.prototype = {
	// Initialize
	init: function() {
		// Variables
		var $element = this.element;
		var $options = this.options;

		var $modalTrigger = $element.getAttribute('data-modal-trigger');
		var $modalReveal = $element.getAttribute('data-modal-reveal') || $options.reveal;
		var $modalRevealLarge = $element.getAttribute('data-modal-reveal-large') || $options.revealLarge;
		var $modalTriggerMax = $element.getAttribute('data-modal-trigger-max') || $options.triggerMax;
		var $modalTriggerMin = $element.getAttribute('data-modal-trigger-min') || $options.triggerMin;

		// Setup
		webClassAdd($element, 'modalplate');
		setupOverlay();
		setupReveal();
		webAddEvent(window, 'resize', function() {
			setupReveal();
		});

		// Trigger event
		triggerReveal();

		// Functions
		function modalReveal() {

		};

		function setupOverlay() {
			if (document.getElementById('modalplate-overlay') === null) {
				var $overlay = document.createElement('div');
				webIdAdd($overlay, 'modalplate-overlay');
				document.getElementsByTagName('body')[0].appendChild($overlay);
			};
		}

		function setupReveal($resizeCheck) {
			if ($modalRevealLarge !== false) {
				if (window.innerWidth <= 700) {
					webClassRemove($element, $modalRevealLarge);
					webClassAdd($element, $modalReveal);
				} else {
					webClassRemove($element, $modalReveal);
					webClassAdd($element, $modalRevealLarge);
				}
			} else {
				webClassAdd($element, $modalReveal);
			}
		};

		function triggerReveal() {
			if ($modalTrigger.charAt(0) === '.') {

			} else if ($modalTrigger.charAt(0) === '#') {
				document.getElementById($modalTrigger.substring(1)).onclick = function($ev) {
					if (triggerCheck() === true) {
						$ev.preventDefault();
						modalReveal();
					}
				};
			}
		};

		function triggerCheck() {
			if ($modalTriggerMax !== false && window.innerWidth < $modalTriggerMax) {
				return true;
			} else if ($modalTriggerMin !== false && window.innerWidth >= $modalTriggerMin) {
				return true;
			} else if ($modalTriggerMax === false && $modalTriggerMin === false) {
				return true;
			} else {
				return false;
			};
		}
	}
};






// ;(function($, window, document, undefined)
// {
// 	// Plugin setup & settings
// 	var $plugin_name					= 'modalplate', $defaults =
// 	{
// 		overlay_template 				: '<div class="modalplate-overlay"></div>',
// 		reveal 							: 'slide-from-top',
// 		reveal_large					: false,
// 		trigger_max 					: false,
// 		trigger_min 					: false
// 	};

// 	// The actual plugin constructor
// 	function Plugin($element, $options) 
// 	{
// 		this.element 					= $element;
// 		this.settings 					= $.extend({}, $defaults, $options);
// 		this._defaults 					= $defaults;
// 		this._name 						= $plugin_name;

// 		// Initilize plugin
// 		this.init();
// 	}

// 	// Plugin
// 	// ---------------------------------------------------------------------------------------
// 	Plugin.prototype 						= 
// 	{
// 		init 								: function()
// 		{
// 			// Variables
// 			var $this 						= this;
// 			var $modal_id 					= $(this.element).data('modal-id');
// 			var $this_modal 				= $('[data-modal-id='+ $modal_id +']');
// 			var $this_modal_trigger			= $('[data-modal-trigger='+ $modal_id +']');
// 			var $data_modal_reveal			= $this_modal.data('modal-reveal');
// 			var $data_modal_reveal_large	= $this_modal.data('modal-reveal-large');
// 			var $data_modal_trigger_max		= $this_modal.data('modal-trigger-max');
// 			var $data_modal_trigger_min		= $this_modal.data('modal-trigger-min');
// 			var $window_w 					= $(window).width();

// 			// Setup
// 			$(this.element).addClass('modalplate');
// 			$this.overlay_add();
// 			$this.settings.reveal			= $data_modal_reveal || $this.settings.reveal;
// 			$this.settings.reveal_large		= $data_modal_reveal_large || $this.settings.reveal_large;
// 			$this.settings.trigger_max		= $data_modal_trigger_max || $this.settings.trigger_max;
// 			$this.settings.trigger_min		= $data_modal_trigger_min || $this.settings.trigger_min;

// 			// Reveals
// 			fc_set_modal_reveal();
// 			if($this.settings.reveal_large != false)
// 			{
// 				$(window).resize(function()
// 				{
// 					fc_set_modal_reveal();
// 				});
// 			}

// 			// Execute
// 			$this_modal_trigger.on('click', function($ev)
// 			{
// 				// Check the trigger max / min
// 				if($this.settings.trigger_max != false)
// 				{
// 					$window_w 				= $(window).width();

// 					if($window_w < $this.settings.trigger_max)
// 					{
// 						$ev.preventDefault();
// 						$this.modal_reveal($this_modal);
// 					}
// 				}
// 				else if($this.settings.trigger_min != false)
// 				{
// 					$window_w 				= $(window).width();

// 					if($window_w >= $this.settings.trigger_min)
// 					{
// 						$ev.preventDefault();
// 						$this.modal_reveal($this_modal);
// 					}
// 				}
// 				else
// 				{
// 					$ev.preventDefault();
// 					$this.modal_reveal($this_modal);
// 				}
// 			});

// 			$('.modalplate-overlay, .modalplate .close').on('click', function($ev)
// 			{
// 				$ev.preventDefault();
// 				$this.modal_close($this_modal);
// 			});

// 			// Functions
// 			function fc_set_modal_reveal()
// 			{
// 				if($this.settings.reveal_large != false)
// 				{
// 					$window_w 				= $(window).width();

// 					if($window_w <= 700)
// 					{
// 						$this_modal.removeClass($this.settings.reveal_large);
// 						$this_modal.addClass($this.settings.reveal);
// 					}
// 					else
// 					{
// 						$this_modal.removeClass($this.settings.reveal);
// 						$this_modal.addClass($this.settings.reveal_large);
// 					}
// 				}
// 				else
// 				{
// 					$this_modal.addClass($this.settings.reveal);
// 				}
// 			};
// 		},

// 		// Public functions
// 		// ---------------------------------------------------------------------------------------
// 		// Close the modal
// 		modal_close 					: function($this_modal)
// 		{
// 			$this_modal.removeClass('reveal');
// 			$('html').removeClass('modalplate-reveal');
// 		},
// 		// Reveal the modal
// 		modal_reveal					: function($this_modal)
// 		{
// 			$this_modal.addClass('reveal');
// 			$('html').addClass('modalplate-reveal');
// 		},
// 		// Add an overlay
// 		overlay_add 					: function()
// 		{
// 			if($('.modalplate-overlay').length == false)
// 			{
// 				$('body').append(this.settings.overlay_template);
// 			}
// 		}
// 	};


// 	// Plugin wrapper
// 	// ---------------------------------------------------------------------------------------
// 	$.fn[$plugin_name] 					= function($options)
// 	{
// 		var $plugin;

// 		this.each(function()
// 		{
// 			$plugin 					= $.data(this, 'plugin_' + $plugin_name);

// 			if(!$plugin)
// 			{
// 				$plugin 				= new Plugin(this, $options);
// 				$.data(this, 'plugin_' + $plugin_name, $plugin);
// 			}
// 		});

// 		return $plugin;
// 	};
// })(jQuery, window, document);