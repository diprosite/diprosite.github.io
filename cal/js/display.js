(() => {
  "use strict";
  const canvas=document.getElementById("lcd-canvas");
  const ctx=canvas.getContext("2d");
  const W=canvas.width,H=canvas.height;
  const off=document.createElement("canvas"); off.width=W; off.height=H;
  const ox=off.getContext("2d");
  const el=id=>document.getElementById(id);
  let expression="0", result="", menuVisible=false;
  function pixelText(text,x,y,size,maxWidth) {
    ox.font=`bold ${size}px monospace`; ox.textBaseline="top"; ox.fillStyle="#173c34";
    let s=String(text);
    while(ox.measureText(s).width>maxWidth && s.length>1) s="…"+s.slice(1);
    ox.fillText(s,x,y,maxWidth);
  }
  function draw() {
    ox.clearRect(0,0,W,H);
    pixelText(expression,3,5,18,W-6);
    if(result!=="") pixelText(result,3,65,24,W-6);
    const data=ox.getImageData(0,0,W,H).data;
    ctx.clearRect(0,0,W,H); ctx.fillStyle="#193d35";
    for(let y=0;y<H;y+=3) for(let x=0;x<W;x+=3) {
      if(data[(y*W+x)*4+3]>80) { ctx.beginPath();ctx.arc(x,y,.9,0,Math.PI*2);ctx.fill(); }
    }
  }
  function setExpression(v){expression=String(v||"0");draw();}
  function setResult(v){result=String(v);draw();}
  function render(a,b){expression=String(a||"0");result=String(b??"");draw();}
  function setStatus(id,v){el(id).textContent=v;}
  function showMenu(items,selected=0) {
    const menu=el("lcd-menu"); menu.hidden=false; menu.replaceChildren();
    items.forEach((item,i)=>{const d=document.createElement("div");d.textContent=`${i+1}  ${item}`;if(i===selected)d.className="selected";menu.append(d);});
  }
  function hideMenu(){const m=el("lcd-menu");m.hidden=true;m.replaceChildren();}
  window.CalculatorDisplay={
    setExpression,setResult,render,
    setAngle:v=>setStatus("status-angle",v==="DEG"?"D":v==="RAD"?"R":"G"),
    setMode:v=>setStatus("status-mode",v),
    setShift:v=>setStatus("status-shift",v?"S":""),
    setAlpha:v=>setStatus("status-alpha",v?"A":""),
    setMemory:v=>setStatus("status-memory",v?"M":""),
    showMenu,hideMenu,redraw:draw
  };
  draw();
})();
