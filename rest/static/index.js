'use strict';

/* global angular, _ */

angular.module('list-maker', [])
    // This is a fake backend that only uses the browser memory.
    .factory('mockListStore', function($q) {
        var items = [
                {name: 'Item 1', createdAt: new Date() - 500000, id: 0},
                {name: 'Item 2', createdAt: new Date(), id: 1}
            ];

        return {
            getItems: function() {
                var deferred = $q.defer();
                deferred.resolve(_.clone(items));
                return deferred.promise;
            },
            addItem: function(newName) {
                var newItem = {name: newName, id: _.maxBy(items, 'id').id + 1, createdAt: new Date()};
                items.push(newItem);
                return $q.defer().resolve(newItem);
            },
            deleteItem: function(id) {
                _.remove(items, {id: id});
            },
            renameItem: function(id, newName) {
                _.find(items, {id: id}).name = newName;
            }
        };
    })
    .factory('httpListStore', function() {
        // TODO: Implement a list store using the REST API
    })
    .factory('fetchListStore', function() {
        // TODO: use fetch API instead of Angular.
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
        // Normally, you would want to just use $http, but this is for educational purposes. 
    })
    // Use this factory to choose the list store implementation we want.
    .factory('listStore', function(mockListStore) {
        return mockListStore;
    })
    .controller('RootCtrl', function($scope, listStore) {
        function refreshItemsList() {
            listStore.getItems().then(function(items) {
                $scope.items = items;
            });
        }

        refreshItemsList();

        $scope.deleteItem = function(id) {
            listStore.deleteItem(id);
            refreshItemsList();
        };

        $scope.renameItem = function(id, newName) {
            listStore.renameItem(id, newName);
            refreshItemsList();
        };

        $scope.addItem = function(name) {
            listStore.addItem(name);
            refreshItemsList();
        };

        $scope.newItem = {name: ''};
    });
