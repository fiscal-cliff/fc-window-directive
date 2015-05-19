# fc-window-directive
Angular module, that contains a directive. The directive allows you to make draggable and resizeable any absolutely positioned div on your page. It looks exactly like moveable (draggable) and resizeable dialog window.

#Installation

```
bower install fc-window-directive
```

The actual module resides in fc-window-directive.js. Therefore you have to put the script tag bellow into your index.html

```html
<script type="text/javascript" src="bower_components/fc-window-directive/fc-window-directive.js"></script>
```

Next, application module may looks like

```javascript
var fcWindowDemo = angular.module('fcWindowDemo', ['fcWindow.directive']);
```

and finally, you may writedown few lines to your stylesheet:

```scss
div[fc-window] {
    position: absolute;
    top:100px;
    left:200px;
    width: 300px;
    overflow: hidden;
    border-radius: 10px;
}
```
