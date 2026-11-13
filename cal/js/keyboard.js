(() => {
  "use strict";
  const keyMap={
    Enter:"EQUALS","=":"EQUALS",Backspace:"DEL",Delete:"AC",Escape:"AC",
    "+":"PLUS","-":"MINUS","*":"MULTIPLY","/":"DIVIDE",".":"DOT",
    "(":"LPAREN",")":"RPAREN","^":"^","!":"!","%":"%"
  };
  document.addEventListener("keydown",event=>{
    if(event.ctrlKey||event.altKey||event.metaKey)return;
    if(event.key==="Tab"||event.key==="F5"||event.key==="F12")return;
    if(event.key.startsWith("Arrow")){
      event.preventDefault();
      window.CalculatorApp.handle(({ArrowUp:"UP",ArrowDown:"DOWN",ArrowLeft:"LEFT",ArrowRight:"RIGHT"})[event.key]);
      return;
    }
    if(/^[0-9]$/.test(event.key)){
      event.preventDefault();window.CalculatorApp.handle(event.key);return;
    }
    if(keyMap[event.key]){
      event.preventDefault();window.CalculatorApp.handle(keyMap[event.key]);return;
    }
    if(/^[a-zA-Zπ]$/.test(event.key)){
      event.preventDefault();window.CalculatorApp.type(event.key);return;
    }
  });
})();
