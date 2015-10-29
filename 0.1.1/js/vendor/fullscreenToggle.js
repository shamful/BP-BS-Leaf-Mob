// Copied from https://xparkmedia.com/blog/enter-fullscreen-mode-javascript
function fullscreenToggle() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard method
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {               // current working methods
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        $('#fullscreenToggle span').removeClass('glyphicon glyphicon-fullscreen').addClass('glyphicon glyphicon-remove');
  } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
        $('#fullscreenToggle span').removeClass('glyphicon glyphicon-remove').addClass('glyphicon glyphicon-fullscreen');
  }
}