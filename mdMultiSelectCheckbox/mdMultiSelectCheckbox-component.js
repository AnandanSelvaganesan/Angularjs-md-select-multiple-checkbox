(function() {
	'use strict';

	var injections = [
		'$scope',
	];

	function controller(scope) {
		var vm = this;

		vm.selected = [];
		vm.visibleOptions = [];
		vm.label = '';
		vm.isNextDataLoading = false;
		vm.pageNum = 1;

		vm.$onChanges = function(changes) {
			if (changes.arrayList) {
				vm.visibleOptions = [];

				if (angular.isArray(changes.arrayList.currentValue)) {
					vm.visibleOptions = changes.arrayList.currentValue;
					vm.mapSelectedItems();
				}
			}

			if (changes.ngModel) {
				vm.selected = changes.ngModel.currentValue;
			}
			if (changes.label) {
				vm.label = changes.label.currentValue;
			}
			if (changes.selectedData && vm.visibleOptions.length === 0) {
				vm.visibleOptions = changes.selectedData.currentValue;
				vm.preSelectedItems = changes.selectedData.currentValue;
			}

			//vm.isNextDataLoading = false;
		
		};

		vm.isAllSelected = function() {
			return vm.selected.length === vm.visibleOptions.length;
		};

		//Get Search Result Api Call, Filter is not working on this getSearchResult()
		//This function to show Api Call on search result selected item will be retained.
		vm.getSearchResult = function(searchText) {
			vm.pageNum = 1;
			vm.isNextDataLoading = true;
			return vm.loadData(searchText, vm.pageNum).then(function(){
				vm.isNextDataLoading = false;
				vm.pageNum = vm.pageNum + 1;
			});
		};

		vm.toggleSelectAll = function() {
			vm.selected = vm.isAllSelected() ? [] : angular.copy(vm.visibleOptions);
			vm.preSelectedItems = angular.copy(vm.selected);
		};

		vm.onOpen = function() {
			vm.isOnOpenLoading = true;
			return vm.loadData(null, 0).then(function(){
				vm.isOnOpenLoading = false;
			});
		}

		vm.mapSelectedItems = function () {
			vm.selected = [];
			angular.forEach(vm.preSelectedItems, function(item) {
				angular.forEach(vm.visibleOptions, function(value) {
					if (item.name === value.name) {
						vm.selected.push(value);
					}
				});
			});
		};

		vm.toggle = function (item, list) {
			var index = list.map(function(e) { return e.name; }).indexOf(item.name);
			if (index > -1) {
				list.splice(index, 1);
			}
			else {
				list.push(item);
			}
		};

		vm.onScrollEndLoadData = function (value) {
			vm.isNextDataLoading = true;
			return vm.scrollEndLoadData(value).then(function(){
				vm.isNextDataLoading = false;
				vm.pageNum = vm.pageNum + 1;
			});
		}

		vm.onClose = function() {
			var newModelValue = angular.copy(vm.selected);

			if (!angular.equals(vm.ngModel, newModelValue)) {
				vm.ngModelController.$setViewValue(newModelValue);
			}
			scope.searchTerm = '';
			vm.isOnOpenLoading = false;
			vm.pageNum = 1;
		};
	}

	controller.$inject = injections;

	apps
	.controller('mdMultiSelectCheckboxController', controller)
	.component('mdMultiSelectCheckboxComponent', {
		templateUrl: 'mdMultiSelectCheckbox/mdMultiSelectCheckbox.html',
		require: {
			ngModelController: 'ngModel',
		},
		bindings: {
			ngModel: '<',
			arrayList: '<',
			label: '<',
			loadData : '<',
			selectedData: '<',
			scrollEndLoadData: '<',
		},
		controller: 'mdMultiSelectCheckboxController',
	});
})();