/**
 * File: build/js/modalplate-new.js
 * Type: Javascript Component File
 * Author:
**/

// Defaults
var $modalplateDefault = {};

// Component
var modalplate = function($userOptions) {
	// Variables
	var $self = this;
	$userOptions = $userOptions || false;
	$self.options = {
		body: $userOptions.body || false,
		bodyHTML: $userOptions.bodyHTML || false,
		classAdd: $userOptions.classAdd || false,
		close: $userOptions.close || 'close',
		breakpoint: $userOptions.breakpoint || 700,
		heading: $userOptions.heading || false,
		onDone: (typof $userOptions.onDone === 'function') ? $userOptions.onDone || false,
		overlay: ($userOptions.overlay === false) ? $userOptions.overlay : true,
		parseEvent: $userOptions.parseEvent || false,
		reveal: $userOptions.reveal || 'slide-from-top',
		revealLarge: $userOptions.revealLarge || false,
		trigger: $userOptions.trigger || 'always'
	};
};
