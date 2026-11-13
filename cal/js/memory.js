(() => {
  "use strict";
  const vars={A:0,B:0,C:0,D:0,E:0,F:0,X:0,Y:0,M:0};
  let answer=0;
  window.CalculatorMemory={
    store:(name,value)=>{if(name in vars)vars[name]=Number(value);},
    recall:name=>vars[name]??0,
    add:value=>{vars.M+=Number(value);window.CalculatorDisplay.setMemory(true);},
    subtract:value=>{vars.M-=Number(value);window.CalculatorDisplay.setMemory(true);},
    setAnswer:value=>{answer=Number(value);},
    getAnswer:()=>answer,
    getVariables:()=>({...vars}),
    clear:()=>{Object.keys(vars).forEach(k=>vars[k]=0);answer=0;window.CalculatorDisplay.setMemory(false);}
  };
})();
