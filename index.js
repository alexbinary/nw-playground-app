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
   * wire buttons
   */

  domButtonInspector.addEventListener('click', function() {
    if (win.isDevToolsOpen()) {
      win.closeDevTools();
      domButtonInspector.innerText = 'Open Inspector';
    } else {
      win.showDevTools();
      domButtonInspector.innerText = 'Close Inspector';
    }
  });

  domButtonReload.addEventListener('click', function() {
    win.reloadDev();
  });

  domButtonClear.addEventListener('click', function() {
    clearCode();
  });

  domButtonRun.addEventListener('click', function() {
    runCode();
  });


  /*
   * setup editor
   */

  // highlight code at startup then on blur
  domCode.addEventListener('blur', function(){
    hljs.highlightBlock(domCode);
  });
  hljs.highlightBlock(domCode);

  // fix tab key
  domCode.addEventListener('keydown', function(e){
    if(e.which === 9) { // tab
      e.preventDefault();
      document.execCommand('insertHTML', false, '\t');
    }
  });

  function clearCode() {
    domCode.innerText = '';
  }

  function runCode() {
    var scriptContent = domCode.innerText;
    scriptContent = '(function(){'+scriptContent+'})();';

    var dom;
    while(dom = document.querySelector('.scriptTag')) {
      document.body.removeChild(dom);
    }

    var scriptTag = document.createElement('script');
    scriptTag.className = 'scriptTag';
    scriptTag.appendChild(document.createTextNode(scriptContent));

    document.body.appendChild(scriptTag);
  }

};
