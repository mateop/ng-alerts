/**
 * Lists all alerts.
 * @param {String=} empty-text - The text to display if the list is empty (defaults to global set in provider).
 */
angular.module('ngAlerts').directive('ngAlertsList', [
    'ngAlertsMngr',
    'ngAlertsEvent',
    'ngAlerts',
    function (ngAlertsMngr, ngAlertsEvent, ngAlerts) {
        'use strict';

        return {
            template: require('../tpls/list.html'),
            link: function ($scope, $element, $attrs) {
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
    }
]);
