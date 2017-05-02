import alert from 'angular-ui-bootstrap/src/alert';

export default angular.module('ngAlerts', [alert])
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
    })
    .run(() => {
        angular.element(document).find('body').append('<ng-alerts-queue></ng-alerts-queue>');
    });

require('./services/ng-alerts-events');
require('./factories/ng-alert');
require('./factories/ng-alerts-id');
require('./factories/ng-alerts-mngr');
require('./factories/ng-alerts-utils');
require('./directives/ng-alerts-count');
require('./directives/ng-alerts-list');
require('./directives/ng-alerts-modal');
require('./directives/ng-alerts-popover');
require('./directives/ng-alerts-queue');
require('./ng-alerts.scss');
