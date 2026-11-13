(() => {
  "use strict";
  let expression="", justEvaluated=false, shift=false, alpha=false, activeMenu="";
  const display=window.CalculatorDisplay, memory=window.CalculatorMemory;
  const variableKeys={"1":"A","2":"B","3":"C","4":"D","5":"E","6":"F","7":"X","8":"Y","9":"M"};
  function update(){display.setExpression(expression||"0");}
  function append(s){if(justEvaluated && /^[0-9.]$/.test(s))expression="";justEvaluated=false;expression+=s;update();}
  function clear(){expression="";justEvaluated=false;display.render("0","");}
  function evaluate(){
    if(!expression)return;
    try{
      const value=window.CalculatorEngine.calculate(expression,memory.getAnswer(),memory.getVariables());
      memory.setAnswer(value);
      const fmt=Number(value.toPrecision(12)).toString();
      display.setResult(fmt); expression=fmt; justEvaluated=true; update();
    }catch(e){display.setResult(e.message==="Math ERROR"?"Math ERROR":"Syntax ERROR");justEvaluated=false;}
  }
  function closeMenu(){if(activeMenu==="setup")window.CalculatorSetup.close();else if(activeMenu==="mode")display.hideMenu();activeMenu="";}
  function handleMenu(key){
    if(!activeMenu)return false;
    if(key==="UP"||key==="LEFT"){activeMenu==="setup"?window.CalculatorSetup.move(-1):window.CalculatorModes.move(-1);return true;}
    if(key==="DOWN"||key==="RIGHT"){activeMenu==="setup"?window.CalculatorSetup.move(1):window.CalculatorModes.move(1);return true;}
    if(key==="EQUALS"||key==="ON"){if(activeMenu==="setup")window.CalculatorSetup.select();else{const m=window.CalculatorModes.select();if(m!=="COMP")display.setResult(m+" MODE");else display.setResult("Ready");}activeMenu="";return true;}
    if(key==="AC"){closeMenu();return true;}
    return true;
  }
  function handle(key){
    if(handleMenu(key))return;
    if(key==="ON"){clear();shift=alpha=false;display.setShift(false);display.setAlpha(false);return;}
    if(key==="SHIFT"){shift=!shift;alpha=false;display.setShift(shift);display.setAlpha(false);return;}
    if(key==="ALPHA"){alpha=!alpha;shift=false;display.setAlpha(alpha);display.setShift(false);return;}
    if(key==="MODE"){activeMenu="mode";window.CalculatorModes.open();return;}
    if(key==="SETUP"){activeMenu="setup";window.CalculatorSetup.open();return;}
    if(key==="AC"){clear();return;}
    if(key==="DEL"){expression=expression.slice(0,-1);justEvaluated=false;update();return;}
    if(key==="UP"||key==="DOWN"||key==="LEFT"||key==="RIGHT")return;
    if(alpha){const name=variableKeys[key];if(name)append(name);alpha=false;display.setAlpha(false);return;}
    if(shift){
      const shifted={SIN:"asin(",COS:"acos(",TAN:"atan(",SQRT:"cbrt(",SQUARE:"^3",POWER:"^",LOG:"10^(",LN:"e^(",MPLUS:"M-"};
      if(shifted[key])append(shifted[key]);
      shift=false;display.setShift(false);return;
    }
    const map={
      PLUS:"+",MINUS:"-",MULTIPLY:"*",DIVIDE:"/",DOT:".",LPAREN:"(",RPAREN:")",
      NEGATIVE:"-",POWER:"^",SQUARE:"^2",SQRT:"sqrt(",SIN:"sin(",COS:"cos(",TAN:"tan(",
      LOG:"log(",LOGBASE:"log(",LN:"ln(",HYP:"sinh(",EXP:"*10^(",FRACTION:"(",ANS:"Ans",
      EQUALS:null
    };
    if(key==="EQUALS"){evaluate();return;}
    if(key==="CALC"){display.setResult("Enter expression then =");return;}
    if(key==="INTEGRAL"){display.setResult("Integral: not implemented");return;}
    if(key==="SUM"){display.setResult("Summation: not implemented");return;}
    if(key==="DMS"){display.setResult("DMS: not implemented");return;}
    if(key==="ENG"){display.setResult("ENG: not implemented");return;}
    if(key==="SDF"){display.setResult("S⇔D: decimal result");return;}
    if(key==="RECALL"){append(String(memory.recall("M")));return;}
    if(key==="MPLUS"){memory.add(Number(memory.getAnswer()));display.setResult("M+");return;}
    if(key==="LOGBASE"){append("log(");return;}
    if(key==="LOG"){append("log(");return;}
    if(key==="POWER"){append("^");return;}
    if(key==="SQUARE"){append("^2");return;}
    if(key==="SQRT"){append("sqrt(");return;}
    if(key==="SIN"||key==="COS"||key==="TAN"||key==="LN"||key==="HYP"){append(map[key]);return;}
    if(key==="EXP"){append("*10^(");return;}
    if(key==="FRACTION"){append("(");return;}
    if(key==="ANS"){append("Ans");return;}
    if(map[key]!==undefined){append(map[key]);return;}
    if(/^\d$/.test(key)){append(key);return;}
    if(["^","!","%"].includes(key)){append(key);return;}
  }
  function type(text){
    if(typeof text!=="string"||text.length!==1)return;
    if(/^[0-9a-zA-Z.+\-*/^!()%π]$/.test(text)){append(text);}
  }
  document.querySelectorAll("[data-key]").forEach(button=>{
    button.addEventListener("click",()=>handle(button.dataset.key));
  });
  window.CalculatorApp={handle,type,calculate:evaluate,clear,append};
  display.render("0","");
  display.setAngle("DEG");
  display.setMode("COMP");
})();
