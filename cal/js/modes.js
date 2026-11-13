(() => {
  "use strict";
  const modes=["COMP","CMPLX","STAT","BASE-N","EQN","MATRIX","TABLE","VECTOR"];
  let index=0,current="COMP";
  function render(){window.CalculatorDisplay.showMenu(modes,index);}
  window.CalculatorModes={
    open:()=>{index=0;render();},
    move:d=>{index=(index+d+modes.length)%modes.length;render();},
    select:()=>{current=modes[index];window.CalculatorDisplay.setMode(current);window.CalculatorDisplay.hideMenu();return current;},
    get:()=>current
  };
})();
