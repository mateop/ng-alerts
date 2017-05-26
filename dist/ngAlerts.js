(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ngAlerts", [], factory);
	else if(typeof exports === 'object')
		exports["ngAlerts"] = factory();
	else
		root["ngAlerts"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);
__webpack_require__(12);

var MODULE_NAME = 'ui.bootstrap.module.alert';

angular.module(MODULE_NAME, ['ui.bootstrap.alert', 'uib/template/alert/alert.html']);

module.exports = MODULE_NAME;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Shows a simple alert total.
 * @param {Bool=} badge - To show the number as a badge.
 * @param {Bool=} hide-empty - To not display anything if the number is 0.
 */
angular.module('ngAlerts').directive('ngAlertsCount', ['ngAlertsMngr', 'ngAlertsEvent', function (ngAlertsMngr, ngAlertsEvent) {
    'use strict';

    return {
        template: __webpack_require__(14),
        link: function link($scope, $element, $attrs) {
            /**
             * Resets the alert count view.
             */
            function reset() {
                $scope.count = ngAlertsMngr.get().length;
                $scope.badge = $attrs.badge;

                if ($scope.count === 0 && $attrs.hideEmpty) {
                    $scope.count = '';
                }
            }

            reset();

            $scope.$on(ngAlertsEvent.event('change'), reset);
        }
    };
}]);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Lists all alerts.
 * @param {String=} empty-text - The text to display if the list is empty (defaults to global set in provider).
 */
angular.module('ngAlerts').directive('ngAlertsList', ['ngAlertsMngr', 'ngAlertsEvent', 'ngAlerts', function (ngAlertsMngr, ngAlertsEvent, ngAlerts) {
    'use strict';

    return {
        template: __webpack_require__(15),
        link: function link($scope, $element, $attrs) {
            /**
             * Resets the list view.
             */
            function reset() {
                $scope.alerts = ngAlertsMngr.get();
            }

            /**
             * Removes an alert item from the list.
             */
            $scope.remove = function (id, $event) {
                $event.stopImmediatePropagation();
                ngAlertsMngr.remove(id);
            };

            $scope.$on(ngAlertsEvent.event('change'), reset);

            $scope.emptyList = $attrs.emptyText || ngAlerts.options.emptyListText;

            reset();
        }
    };
}]);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Wraps a popover object to the handler (using the angular bootstrap "popover" directive).
 * @param {String=} empty-text - The text to display if the list is empty (defaults to global set in provider).
 * @see https://angular-ui.github.io/bootstrap/#/popover
 */
angular.module('ngAlerts').directive('ngAlertsModal', ['ngAlertsEvent', '$uibModal', '$compile', '$timeout', '$sce', function (ngAlertsEvent, $uibModal, $compile, $timeout, $sce) {
    'use strict';

    return {
        restrict: 'A',
        terminal: true,
        priority: 1000,
        link: function link($scope, $element, $attrs) {

            $element.attr('ng-click', 'openModal()');
            $element.removeAttr('ng-alerts-modal');

            $scope.emptyText = $attrs.emptyText;

            /**
             * Opens a modal with the list of alerts created.
             */
            $scope.openModal = function () {
                $scope.modalInstance = $uibModal.open({
                    animation: true,
                    template: __webpack_require__(17),
                    size: $attrs.size || 'lg'
                });

                $scope.modalInstance.result.then(function () {
                    $scope.modalInstance = null;
                });
            };

            $compile($element)($scope);
        }
    };
}]);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Wraps a popover object to the handler (using the angular bootstrap "popover" directive).
 * @param {String=} empty-text - The text to display if the list is empty (defaults to global set in provider).
 * @see https://angular-ui.github.io/bootstrap/#/popover
 */
angular.module('ngAlerts').directive('ngAlertsPopover', ['ngAlertsEvent', '$compile', function (ngAlertsEvent, $compile) {
    'use strict';

    return {
        restrict: 'A',
        terminal: true,
        priority: 1000,
        link: function link($scope, $element, $attrs) {

            if (!$attrs.uibPopoverTemplate) {
                $element.attr('uib-popover-template', 'templateUrl');
            }

            if (!$attrs.popoverIsOpen) {
                $element.attr('popover-is-open', 'isOpen');
            }

            $element.removeAttr('ng-alerts-popover');

            if (!$attrs.popoverTrigger) {
                $element.attr('popover-trigger', 'outsideClick');
            }

            if (!$attrs.popoverClass) {
                $element.attr('popover-class', 'ng-alerts-popover-list');
            }

            $scope.template = __webpack_require__(18);
            $scope.emptyText = $attrs.emptyText;

            $compile($element)($scope);
        }
    };
}]);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Used internally to show the alert queue.
 */
angular.module('ngAlerts').directive('ngAlertsQueue', ['ngAlertsMngr', 'ngAlertsEvent', '$timeout', 'ngAlerts', function (ngAlertsMngr, ngAlertsEvent, $timeout, ngAlerts) {
    'use strict';

    return {
        template: __webpack_require__(16),
        link: function link($scope) {
            $scope.alerts = [];

            /**
             * Removes a specific alert by id.
             */
            function remove(id) {
                var i = void 0;

                for (i = 0; i < $scope.alerts.length; i += 1) {
                    if ($scope.alerts[i].id === id) {
                        $scope.alerts.splice(i, 1);
                        return;
                    }
                }
            }

            $scope.location = ngAlerts.options.queueLocation;

            /**
             * Public remove script.
             */
            $scope.remove = function (id) {
                ngAlertsMngr.remove(id);
            };

            $scope.$on(ngAlertsEvent.event('remove'), function (e, id) {
                remove(id);
            });

            $scope.$on(ngAlertsEvent.event('add'), function (e, alert) {
                if (ngAlerts.options.queue) {
                    $scope.alerts.push(alert);
                    $timeout(function () {
                        remove(alert.id);
                    }, ngAlerts.options.queueTimeout);
                }
            });
        }
    };
}]);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * An alert model.
 * @member {String} id - The unique id.
 * @member {String} msg - The message of the alert.
 * @member {String} type - The type of alert.
 */
angular.module('ngAlerts').factory('NgAlert', ['ngAlertsId', 'ngAlertsUtils', function (ngAlertsId, ngAlertsUtils) {
    'use strict';

    /**
     * The alert object.
     * @param {Object} args - The argument object.
     * @param {Number} args.id - The unique id.
     * @param {String} args.msg - The message.
     * @param {String} [args.type=default] - The type of alert.
     * @param {Number} [args.time=Date.now()] - The time of the notification (Miliseconds since Jan 1 1970).
     */

    var NgAlert = function NgAlert(args) {
        var params = angular.extend({
            id: ngAlertsId.create(),
            msg: '',
            type: 'default',
            time: Date.now()
        }, args);

        this.id = params.id;
        this.msg = params.msg;
        this.type = params.type;
        this.time = params.time;
    };

    /**
     * Returns the time using the ngAlertsUtils.
     * @returns {String}
     */
    NgAlert.prototype.getTime = function () {
        return ngAlertsUtils.timeSince(this.time);
    };

    return NgAlert;
}]);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Assists with writing unique identifiers.
 */
angular.module('ngAlerts').factory('ngAlertsId', [function () {
    'use strict';

    var factory = {};

    /**
     * Creates a unique identifier.
     * @param {String[]=} existing - An optional list of existing identifiers to verify uniqueness.
     * @returns {String} The unique identifier.
     */
    factory.create = function (existing) {
        var ret = void 0;

        existing = existing || [];

        do {
            ret = Date.now();
        } while (existing.indexOf(ret) !== -1);

        return ret;
    };

    return factory;
}]);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Manages all notification systems.
 */
angular.module('ngAlerts').factory('ngAlertsMngr', ['ngAlertsEvent', 'NgAlert', 'ngAlertsId', function (ngAlertsEvent, NgAlert, ngAlertsId) {
    'use strict';

    var alerts = [],
        mngr = {};

    /**
     * Fires an alert event.
     * @param {String} name - The name of the event.
     * @param {Object=} args - Any optional arguments.
     */
    function fire(name, args) {
        ngAlertsEvent.fire(name, args);
        ngAlertsEvent.fire('change', args);
    }

    /**
     * Gets the alerts.
     * @returns {NgAlert[]} An array of alerts.
     */
    mngr.get = function () {
        return angular.copy(alerts);
    };

    /**
     * Resets the alerts in storage.
     */
    mngr.reset = function () {
        alerts = [];
        fire('reset');
    };

    /**
     * Adds a new alert
     * @param data
     */
    mngr.add = function (data) {
        var i = void 0,
            ids = [];

        if (!data.id) {
            for (i = 0; i < alerts.length; i += 1) {
                ids.push(alerts[i].id);
            }

            data.id = ngAlertsId.create(ids);
        }

        i = alerts.push(new NgAlert(data));
        fire('add', alerts[i - 1]);
    };

    /**
     * Removes a specific alert.
     * @param {String} id - The unique identifier of the alert.
     */
    mngr.remove = function (id) {
        var i = void 0;

        for (i = 0; i < alerts.length; i += 1) {
            if (alerts[i].id === id) {
                alerts.splice(i, 1);
                break;
            }
        }
        fire('remove', id);
    };

    return mngr;
}]);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Manages all notification systems.
 */
angular.module('ngAlerts').factory('ngAlertsUtils', [function () {
    'use strict';

    var utils = {},
        TIME = {};

    /**
     * Checks for plurality.
     * @param {String} word - The singular word.
     * @param {Number} value - The value to test for plurality.
     * @param {String} [plural=@word + s] - Defaults to the word with an appended s.
     * @returns {String} Which word to use.
     */
    utils.plural = function (word, value, plural) {
        plural = plural || word + 's';
        return value === 1 ? word : plural;
    };

    // buil TIME
    TIME.minute = 60;
    TIME.hour = TIME.minute * 60;
    TIME.day = TIME.hour * 24;
    TIME.week = TIME.day * 7;
    TIME.month = TIME.day * 30;
    TIME.year = TIME.day * 365;

    /**
     * An estimated time since the given timestamp.
     * @param {Number} timestamp - Number of miliseconds since Jan 1 1970.
     * @returns {String} estimated value.
     */
    utils.timeSince = function (timestamp) {

        var r = 0,
            field = '',
            seconds = Math.floor((Date.now() - timestamp) / 1000);

        if (seconds < TIME.minute) {
            return seconds + ' ' + utils.plural('second', seconds) + ' ago';
        }

        if (seconds < TIME.hour) {
            r = Math.round(seconds / TIME.minute);
            field = 'minute';
        } else if (seconds < TIME.day) {
            r = Math.round(seconds / TIME.hour);
            field = 'hour';
        } else if (seconds < TIME.week) {
            r = Math.round(seconds / TIME.day);
            field = 'day';
        } else if (seconds < TIME.month) {
            r = Math.round(seconds / TIME.week);
            field = 'week';
        } else if (seconds < TIME.year) {
            r = Math.round(seconds / TIME.month);
            field = 'month';
        } else {
            r = Math.round(seconds / TIME.year);
            field = 'year';
        }
        return 'About ' + r + ' ' + utils.plural(field, r) + ' ago';
    };

    return utils;
}]);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Provides event systems to ngAlerts.
 */
angular.module('ngAlerts').service('ngAlertsEvent', ['$rootScope', function ($rootScope) {
    'use strict';

    /**
     * Creates an event string.
     * @param {String} name - The name of the event.
     * @returns {String} The proper prefixed event string.
     */

    this.event = function (name) {
        return 'ngAlerts.' + name;
    };

    /**
     * Fires an event.
     * @param {String} name - the event name.
     * @param {Object=} args - Any arguments needed.
     */
    this.fire = function (name, args) {
        $rootScope.$broadcast(this.event(name), args);
    };
}]);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports) {

angular.module('ui.bootstrap.alert', [])

.controller('UibAlertController', ['$scope', '$element', '$attrs', '$interpolate', '$timeout', function($scope, $element, $attrs, $interpolate, $timeout) {
  $scope.closeable = !!$attrs.close;
  $element.addClass('alert');
  $attrs.$set('role', 'alert');
  if ($scope.closeable) {
    $element.addClass('alert-dismissible');
  }

  var dismissOnTimeout = angular.isDefined($attrs.dismissOnTimeout) ?
    $interpolate($attrs.dismissOnTimeout)($scope.$parent) : null;

  if (dismissOnTimeout) {
    $timeout(function() {
      $scope.close();
    }, parseInt(dismissOnTimeout, 10));
  }
}])

.directive('uibAlert', function() {
  return {
    controller: 'UibAlertController',
    controllerAs: 'alert',
    restrict: 'A',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/alert/alert.html';
    },
    transclude: true,
    scope: {
      close: '&'
    }
  };
});


/***/ }),
/* 13 */
/***/ (function(module, exports) {

angular.module("uib/template/alert/alert.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("uib/template/alert/alert.html",
    "<button ng-show=\"closeable\" type=\"button\" class=\"close\" ng-click=\"close({$event: $event})\">\n" +
    "  <span aria-hidden=\"true\">&times;</span>\n" +
    "  <span class=\"sr-only\">Close</span>\n" +
    "</button>\n" +
    "<div ng-transclude></div>\n" +
    "");
}]);


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "<span ng-class=\"{'badge': badge}\">{{count}}</span> ";

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ng-alerts-list\"> <div ng-show=\"alerts.length > 0\"> <table class=\"table table-hover table-condensed\"> <tbody> <tr ng-repeat=\"alert in alerts\" ng-class=\"alert.type\"> <td> <small>{{alert.getTime()}}</small> <br/> {{alert.msg}} </td> <td> <button ng-click=\"remove(alert.id, $event)\" type=\"button\" class=\"close\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button> </td> </tr> </tbody> </table> </div> <div class=\"empty-list\" ng-show=\"alerts.length === 0\"> {{emptyList}} </div> </div> ";

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "<div id=\"ng-alerts-queue\" class=\"{{ location }}\"> <div uib-alert ng-repeat=\"alert in alerts\" ng-class=\"'alert-' + (alert.type || 'warning')\" type=\"{{alert.type}}\" close=\"remove(alert.id)\"> {{alert.msg}} </div> </div> ";

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "<div> <div class=\"modal-header\"> <h3 class=\"modal-title\"> Notifications <button type=\"button\" ng-click=\"$dismiss()\" class=\"close\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button> </h3> </div> <div class=\"modal-body\"> <ng-alerts-list empty-text=\"{{emptyText}}\"></ng-alerts-list> </div> <div class=\"modal-footer\"> <button class=\"btn btn-primary\" type=\"button\" ng-click=\"$dismiss()\">Close</button> </div> </div> ";

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "<div> <div class=\"popover-content\"> <ng-alerts-list empty-text=\"{{emptyText}}\"></ng-alerts-list> </div> </div> ";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _alert = __webpack_require__(0);

var _alert2 = _interopRequireDefault(_alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = angular.module('ngAlerts', [_alert2.default])
/**
 * Use this provider to configure defaults.
 * @param {Object} options - The options to configure.
 * @param {String=No messages} options.emptyListText - The default empty list text.
 * @param {Number=3000} options.queueTimeout - The miliseconds till an alert timesout.
 * @param {String=bottom right} options.queueLocation - The location of the queue ("top left" or "bottom right" etc...).
 * @param {Bool=true} options.queue - Whether or not to use the queue or not.
 * @returns {Object} The default options, specifically an object with an "options" parameter.
 */
.provider('ngAlerts', function () {
    this.options = {
        emptyListText: 'No messages',
        queueTimeout: 3000,
        queueLocation: 'bottom right',
        queue: true
    };

    this.$get = function () {
        return this;
    };
}).run(function () {
    angular.element(document).find('body').append('<ng-alerts-queue></ng-alerts-queue>');
});


__webpack_require__(10);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(8);
__webpack_require__(9);
__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(11);
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=ngAlerts.js.map