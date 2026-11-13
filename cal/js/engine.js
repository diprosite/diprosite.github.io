(() => {
  "use strict";
  let angleMode = "DEG";
  const factorial = n => {
    if (!Number.isInteger(n) || n < 0 || n > 170) throw Error("Math ERROR");
    let r = 1; for (let i=2;i<=n;i++) r*=i; return r;
  };
  const toRad = x => angleMode==="DEG" ? x*Math.PI/180 : angleMode==="GRAD" ? x*Math.PI/200 : x;
  const fromRad = x => angleMode==="DEG" ? x*180/Math.PI : angleMode==="GRAD" ? x*200/Math.PI : x;

  function tokenize(source, variables, answer) {
    let s = String(source).replace(/×/g,"*").replace(/÷/g,"/").replace(/−/g,"-")
      .replace(/π/g,"pi").replace(/\bAns\b/gi,`(${answer})`).replace(/\s+/g,"");
    if (!s || s.length>500) throw Error("Syntax ERROR");
    const raw = s.match(/(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|[A-Za-z]+|[()+\-*/^!,%]/g);
    if (!raw || raw.join("")!==s) throw Error("Syntax ERROR");
    const expanded=[];
    for (let i=0;i<raw.length;i++) {
      let t=raw[i];
      if (/^[A-Za-z]+$/.test(t)) {
        const low=t.toLowerCase();
        if (Object.prototype.hasOwnProperty.call(variables||{},t.toUpperCase())) {
          expanded.push(String(variables[t.toUpperCase()]));
        } else if (["pi","e","rand"].includes(low) || FUNCTIONS.has(low)) expanded.push(low);
        else throw Error("Syntax ERROR");
      } else expanded.push(t);
    }
    // Insert implicit multiplication: 2pi, 2(3), (2)(3), 2sin(30).
    const out=[];
    const ends = t => /^(?:\d|\.)/.test(t) || t===")" || t==="!";
    const starts = t => /^(?:\d|\.)/.test(t) || t==="(" || FUNCTIONS.has(t) || ["pi","e","rand"].includes(t);
    for (let i=0;i<expanded.length;i++) {
      const a=expanded[i], b=expanded[i+1];
      out.push(a);
      if (b && ends(a) && starts(b) && !(FUNCTIONS.has(b) && b!== "pi" && b!=="e" && b!=="rand" && expanded[i+1]==="(")) {
        // Function name is followed by its opening bracket; no multiplication inside name.
        out.push("*");
      }
      if (b==="(" && (a==="pi" || a==="e" || a==="rand")) out.push("*");
    }
    return out;
  }

  const FUNCTIONS = new Set(["sin","cos","tan","asin","acos","atan","sinh","cosh","tanh","sqrt","cbrt","abs","log","ln","exp","floor","ceil","fact","square"]);
  function calculate(source, answer=0, variables={}) {
    const t=tokenize(source,variables,answer); let p=0;
    const peek=()=>t[p], take=()=>t[p++];
    const funcs={
      sin:x=>Math.sin(toRad(x)), cos:x=>Math.cos(toRad(x)), tan:x=>Math.tan(toRad(x)),
      asin:x=>fromRad(Math.asin(x)), acos:x=>fromRad(Math.acos(x)), atan:x=>fromRad(Math.atan(x)),
      sinh:Math.sinh, cosh:Math.cosh, tanh:Math.tanh, sqrt:Math.sqrt, cbrt:Math.cbrt,
      abs:Math.abs, log:Math.log10, ln:Math.log, exp:Math.exp, floor:Math.floor,
      ceil:Math.ceil, fact:factorial, square:x=>x*x
    };
    function primary() {
      const x=take();
      if (x===undefined) throw Error("Syntax ERROR");
      if (x==="(") { const v=expr(); if(take()!==")") throw Error("Syntax ERROR"); return v; }
      if (/^(?:\d|\.)/.test(x)) { const n=Number(x); if(!Number.isFinite(n)) throw Error("Math ERROR"); return n; }
      if(x==="pi") return Math.PI;
      if(x==="e") return Math.E;
      if(x==="rand") return Math.random();
      if(FUNCTIONS.has(x)) {
        if(take()!=="(") throw Error("Syntax ERROR");
        const v=expr(); if(take()!==")") throw Error("Syntax ERROR");
        return funcs[x](v);
      }
      throw Error("Syntax ERROR");
    }
    function postfix() {
      let v=primary();
      while(peek()==="!" || peek()==="%") { const op=take(); v=op==="!"?factorial(v):v/100; }
      return v;
    }
    function unary() {
      if(peek()==="+"){take();return unary();}
      if(peek()==="-"){take();return -unary();}
      return power();
    }
    function power() { let v=postfix(); if(peek()==="^"){take();v=Math.pow(v,unary());} return v; }
    function term() {
      let v=unary();
      while(peek()==="*"||peek()==="/") { const op=take(),r=unary(); if(op==="/"&&r===0) throw Error("Math ERROR"); v=op==="*"?v*r:v/r; }
      return v;
    }
    function expr() {
      let v=term();
      while(peek()==="+"||peek()==="-") { const op=take(),r=term(); v=op==="+"?v+r:v-r; }
      return v;
    }
    const result=expr();
    if(p!==t.length || !Number.isFinite(result)) throw Error("Math ERROR");
    return result;
  }
  window.CalculatorEngine={calculate,setAngle:m=>{if(["DEG","RAD","GRAD"].includes(m))angleMode=m;},getAngle:()=>angleMode,factorial};
})();
