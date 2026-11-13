(() => {
  "use strict";
  const state={angle:"DEG",format:"Norm 2",display:"MathI/MathO"};
  const menus={
    main:["Angle Unit","Number Format","Input/Output"],
    angle:["Degree","Radian","Gradian"],
    format:["Norm 1","Norm 2","Fix","Sci"],
    display:["MathI/MathO","MathI/DecimalO","LineI/LineO","LineI/DecimalO"]
  };
  let page="main",index=0;
  function render(){window.CalculatorDisplay.showMenu(menus[page],index);}
  function open(){page="main";index=0;render();}
  function move(d){index=(index+d+menus[page].length)%menus[page].length;render();}
  function select(){
    const choice=menus[page][index];
    if(page==="main"){page=["angle","format","display"][index];index=0;render();return;}
    if(page==="angle"){state.angle=["DEG","RAD","GRAD"][index];window.CalculatorEngine.setAngle(state.angle);window.CalculatorDisplay.setAngle(state.angle);}
    if(page==="format")state.format=choice;
    if(page==="display")state.display=choice;
    close();
  }
  function close(){page="main";window.CalculatorDisplay.hideMenu();}
  window.CalculatorSetup={open,move,select,close,get:()=>({...state})};
})();
