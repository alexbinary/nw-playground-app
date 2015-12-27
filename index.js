'use strict';

onload = function(){

  var gui = require('nw.gui');
  var win = gui.Window.get();


  /*
   * create minimal menubar
   */

  var menubar = new gui.Menu({type: 'menubar'});
  if (menubar.createMacBuiltin) menubar.createMacBuiltin('NW.js Playground');
  win.menu = menubar;


  /*
   * create playground
   */

  require('nw-playground')(document, hljs).convertAll(

    function(element, wrapper) {

      var btnRun = wrapper.querySelector('.nw-playground-button-run');

      btnRun.className += ' btn btn-success';

      var i = document.createElement('i');
      i.className = 'glyphicon glyphicon-play';

      btnRun.insertBefore(document.createTextNode(' '), btnRun.firstChild);
      btnRun.insertBefore(i, btnRun.firstChild);
    }
  );

};
