/*! ng-alerts 2015-12-16 */
'use strict';

var app = angular.module('ngAlerts', ['ui.bootstrap'])

    .run(['$compile', '$rootScope', function ($compile, $rootScope) {
        angular.element(document).find('body').append('<ng-alerts-queue></ng-alerts-queue>');
    }]);

angular.module('ngAlerts').directive('ngAlertsCount', [
    'ngAlertsMngr',
    'ngAlertsEvent',
    function (ngAlertsMngr, ngAlertsEvent) {
        'use strict';
    
        return {
            templateUrl: 'templates/ng-alerts/count.html',
            link: function ($scope, $element, $attrs) {
                function reset() {
                    $scope.count = ngAlertsMngr.get().length;
                    $scope.badge = ($attrs.badge);

                    if ($scope.count === 0 && $attrs.hideEmpty) {
                        $scope.count = '';
                    }
                }

                reset();

                $scope.$on(ngAlertsEvent.event('change'), reset);
            }
        };
    }
]);
angular.module('ngAlerts').directive('ngAlertsList', [
    'ngAlertsMngr',
    'ngAlertsEvent',
    function (ngAlertsMngr, ngAlertsEvent) {
        'use strict';

        return {
            templateUrl: 'templates/ng-alerts/list.html',
            link: function ($scope, $element, $attrs) {
                function reset() {
                    $scope.alerts = ngAlertsMngr.get();
                }

                $scope.remove = function (id) {
                    ngAlertsMngr.remove(id);
                };

                $scope.$on(ngAlertsEvent.event('change'), reset);
                
                $scope.emptyList = $attrs.emptyText || 'No messages. Better get active!';

                reset();
            }
        };
    }
]);

angular.module('ngAlerts').directive('ngAlertsPopover', [
    'ngAlertsEvent',
    '$compile',
    '$timeout',
    '$sce',
    function (ngAlertsEvent, $compile, $timeout, $sce) {
        'use strict';
        
        return {
            restrict: 'A',
            terminal: true,
            priority: 1000,
            link: function ($scope, $element, $attrs) {

                var position = $attrs.position || 'top';
                
                //$element.attr('uib-popover-html', 'trustedAsHtml');
                
                $element.attr('uib-popover-template', 'templates/ng-alerts/sub/popover-list.html');
                $element.attr('popover-placement', position);
                $element.removeAttr('ng-alerts-popover');
                
//                $scope.updateContent = function () {
//                    var $el = $compile('<ng-alerts-list></ng-alerts-list>')($scope);
//                    $timeout(function () {
//                        var content = $el.html();
//                        console.dir($el);
//                        console.dir(content);
//                        $scope.trustedAsHtml = $sce.trustAsHtml(content);
//                    });
//                }
//                
//                $scope.$on(ngAlertsEvent.event('change'), $scope.updateContent);
//                
//                $scope.updateContent();
                
                $compile($element)($scope);
                
                
//                var position = $attrs.position || 'top',
//                    emptyText = ($attrs.emptyText) ? ' empty-text="' + $attrs.emptyText + '"' : '',
//                    $el = $compile('<div class="ng-alerts-popover popover fade ' + position + ' in" role="tooltip" style="display: block;"><div class="arrow" style="left: 50%;"></div><div class="popover-content"><ng-alerts-list' + emptyText + '></ng-alerts-list></div></div>')($scope),
//                    body = angular.element(document).find('body');
//                
//                function hidePopover(e) {
//                    $el.detach();
//                }
//                
//                function positionPopover() {
//                    var rect = $element[0].getBoundingClientRect(),
//                        top,
//                        left;
//                    
//                    if (position === 'top' || position === 'bottom') {
//                        top = (position === 'bottom') ? rect.bottom : rect.top + $element[0].offsetHeight;
//                        left = rect.left + ($element[0].offsetWidth / 2) - ($el[0].offsetWidth / 2);
//                    } else {
//                        top = rect.top + ($element[0].offsetHeight / 2) - ($el[0].offsetHeight / 2);
//                        left = (position === 'left') ? rect.left - $el[0].offsetWidth : rect.right + $el[0].offsetWidth;
//                    }
//
//                    $el.css({
//                        top: top + 'px',
//                        left: left + 'px'
//                    });
//                }
//
//                function interrupt(e) {
//                    e.stopPropagation();
//                    positionPopover();
//                }
//
//                function click(e) {
//                    interrupt(e);
//                    hidePopover(e);
//
//                    body.append($el);
//                    
//                    positionPopover();
//                }
//
//                function destroy() {
//                    $element.off('click', click);
//                    body.off('click', hidePopover);
//                    $el.off('click', interrupt);
//                    
//                    $el.remove();
//                }
//
//                $element.on('click', click);
//                body.on('click', hidePopover);
//                $el.on('click', interrupt);
//
//                $scope.$on('$destroy', destroy);

            }
        };
    }
]);
angular.module('ngAlerts').directive('ngAlertsQueue', [
    'ngAlertsMngr',
    'ngAlertsEvent',
    '$timeout',
    function (ngAlertsMngr, ngAlertsEvent, $timeout) {
        'use strict';

        return {
            templateUrl: 'templates/ng-alerts/queue.html',
            link: function ($scope) {
                $scope.alerts = [];

                function remove(id) {
                    var i;
                    for (i = 0; i < $scope.alerts.length; i += 1) {
                        if ($scope.alerts[i].id === id) {
                            $scope.alerts.splice(i, 1);
                            return;
                        }
                    }
                }

                $scope.$on(ngAlertsEvent.event('remove'), function (e, id) {
                    remove(id);
                });

                $scope.$on(ngAlertsEvent.event('add'), function (e, alert) {
                    $scope.alerts.push(alert);
                    $timeout(function () {
                        remove(alert.id);
                    }, 3000);
                });
            }
        };
    }
]);
angular.module('ngAlerts').factory('NgAlert', [
    'ngAlertsId',
    function (ngAlertsId) {
        'use strict';

        var NgAlert = function (id, msg) {
            this.id = id || ngAlertsId.create();
            this.msg = msg || '';
        };

        return NgAlert;
    }
]);

angular.module('ngAlerts').factory('ngAlertsId', [
    function () {
        'use strict';

        var factory = {};

        factory.create = function (existing) {
            existing = existing || [];

            var ret;

            do {
                ret = Date.now();
            } while (existing.indexOf(ret) !== -1);

            return ret;
        };

        return factory;
    }
]);

angular.module('ngAlerts').factory('ngAlertsMngr', [
    'ngAlertsEvent',
    'NgAlert',
    'ngAlertsId',
    function (ngAlertsEvent, NgAlert, ngAlertsId) {
        'use strict';

        var alerts = [],
            mngr = {};

        function fire(name, args) {
            ngAlertsEvent.fire(name, args);
            ngAlertsEvent.fire('change', args);
        }

        mngr.get = function () {
            return angular.copy(alerts);
        };

        mngr.reset = function () {
            alerts = [];
            fire('reset');
        };

        mngr.add = function (msg) {
            var i, ids = [];
            for (i = 0; i < alerts.length; i += 1) {
                ids.push(alerts[i].id);
            }

            i = alerts.push(new NgAlert(ngAlertsId.create(ids), msg));
            fire('add', alerts[i - 1]);
        };

        mngr.remove = function (id) {
            var i;
            for (i = 0; i < alerts.length; i += 1) {
                if (alerts[i].id === id) {
                    alerts.splice(i, 1);
                    break;
                }
            }
            fire('remove', id);
        };

        return mngr;
    }
]);
angular.module('ngAlerts').service('ngAlertsEvent', [
    '$rootScope',
    function ($rootScope) {
        'use strict';

        this.event = function (name) {
            return 'ngAlerts.' + name;
        };

        this.fire = function (name, args) {
            $rootScope.$broadcast(this.event(name), args);
        };

    }
]);
