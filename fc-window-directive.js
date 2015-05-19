angular.module('fcWindow.directive', []).directive('fcWindow', ['$document', function ($document) {
    'use strict';
    var HEADER_CLASS = '_header-a8fe';
    var CORNER_CLASS = '_corner-3cf7';
    return {
        scope: {
            'fcWindow': '='
        },
        compile: function (element, attr) {

            appendExtraElements();

            function appendExtraElements() {
                element.append('<div class="' + HEADER_CLASS + '"></div>');
                element.append('<div class="' + CORNER_CLASS + '"></div>');
            }

            return function (scope, element, attr) {
                var header = angular.element(element[0].querySelector('.' + HEADER_CLASS));
                var corner = angular.element(element[0].querySelector('.' + CORNER_CLASS));
                var options = scope.fcWindow;

                applyStyles(options);

                var rect = getOffsetRect(document.body, element[0]);
                var startX = 0,
                    startY = 0,
                    x = rect.left,
                    y = rect.top,
                    startHeight = 0,
                    startWidth = 0,
                    height = element.prop('offsetHeight'),
                    width = element.prop('offsetWidth');

                header[0].addEventListener('mousedown', function (event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.pageX - x;
                    startY = event.pageY - y;
                    $document.on('mousemove', pMousemove);
                    $document.on('mouseup', pMouseup);
                });

                corner[0].addEventListener('mousedown', function (event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startWidth = event.pageX - x - width;
                    startHeight = event.pageY - y - height;
                    $document.on('mousemove', sMousemove);
                    $document.on('mouseup', sMouseup);
                });

                function pMousemove(event) {
                    y = event.pageY - startY;
                    x = event.pageX - startX;
                    element.css({
                        top: y + 'px',
                        left: x + 'px'
                    });
                }

                function pMouseup() {
                    $document.off('mousemove', pMousemove);
                    $document.off('mouseup', pMouseup);
                }

                function sMousemove(event) {
                    height = event.pageY - y - startHeight;
                    width = event.pageX - x - startWidth;
                    element.css({
                        height: height + 'px',
                        width: width + 'px'
                    });
                }

                function sMouseup() {
                    $document.off('mousemove', sMousemove);
                    $document.off('mouseup', sMouseup);
                }

                function getOffsetRect(parent, child) {
                    var parentRect = parent.getBoundingClientRect();
                    var childRect = child.getBoundingClientRect();
                    var result = {};
                    for (var i in parentRect) {
                        result[i] = childRect[i] - parentRect[i];
                    }
                    return result;
                }


                function applyStyles(options) {
                    element.css({
                        padding: options.headerHeight + 'px 0 0',
                        position: 'absolute',
                        border: [options.borderStyle, options.headerColor].join(' ')
                    });

                    header.css({
                        position: 'absolute',
                        top: 0,
                        height: options.headerHeight + 'px',
                        width: '100%',
                        background: options.headerColor,
                        cursor: 'move'
                    });

                    corner.css({
                        position: 'absolute',
                        bottom: -options.cornerSize / 2 + 'px',
                        right: -options.cornerSize / 2 + 'px',
                        width: options.cornerSize + 'px',
                        height: options.cornerSize + 'px',
                        background: options.cornerColor || options.headerColor,
                        transform: 'rotate(45deg)',
                        cursor: 'nwse-resize'
                    });
                }
            };
        }
    };
}]);

