/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../../typings/jquery/jquery.d.ts"/>
(function () {
    'use strict';

    angular
        .module('app.projects')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['$q', 'dataService', 'logger', 'ngTastyService'];
    /* @ngInject */
    function ProjectsController($q, dataService, logger, ngTastyService) {
        var vm = this;
        vm.redProjectsCount = 0;
        vm.yellowProjectsCount = 0;
        vm.greenProjectsCount = 0;
        vm.totalProjectsCount = function () {
            return vm.redProjectsCount + vm.yellowProjectsCount + vm.greenProjectsCount;
        };
        vm.title = 'All Projects';
        vm.searchText = '';
        vm.tableTheme = ngTastyService.tableTheme();
        vm.tableNotSortBy = ngTastyService.tableNotSortBy();
        vm.tableCenteredColumns = ngTastyService.tableCenteredColumns();
        vm.resource = ngTastyService.resource();
        vm.projects = [];

        activate();

        function activate() {
            var promises = [getProjects()];
            return $q.all(promises).then(function () {
                logger.info('Activated All Projects View');
            });
        }

        function getProjects() {
            return dataService.getProjects().then(function (data) {
                vm.redProjectsCount = dataService.getRedProjectsCount();
                vm.yellowProjectsCount = dataService.getYellowProjectsCount();
                vm.greenProjectsCount = dataService.getGreenProjectsCount();
                vm.resource.rows = data;
                return data;
            });
        }

        vm.getProjectsIconClass = function (value) {
            return ngTastyService.projectIconClass()[value];
        };
    }
})();
