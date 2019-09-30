(function () {
	'use strict';

	/**
	 * Special directive for enable infinite scroll in md-select's dropdown
	 *
	 * how to use:
	 *  just add select-infinite-scroll="myLoadNextFunction()" attribute to md-select element
	 *
	 *  $scope.myLoadNextFunction will be called when new data should be loaded
	 *  (this function should returns array, or promise which returns array)
	 */

	var injections = [
		'$q',
	];

	function selectInfiniteScrollDirective($q) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				var container = element.find('md-content');

				container.css('max-height', '300px');
				var visibleHeight = 300;

				var threshold = 100;

				var loading = false;

				container.on('scroll', function (e) {
					if (loading) {
						return;
					}

					var scrollableHeight = container.prop('scrollHeight');

					var hiddenContentHeight = scrollableHeight - visibleHeight;

					if (hiddenContentHeight - container[0].scrollTop <= threshold) {
						loading = true;
						$q.when(scope.$eval(attrs.selectInfiniteScroll)).then(function () {
							loading = false;
						});
					}
				});
			},
		};
	}

	selectInfiniteScrollDirective.$inject = injections;
	apps.directive('selectInfiniteScroll', selectInfiniteScrollDirective);
})();