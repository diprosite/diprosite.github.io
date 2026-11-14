// [label, shiftLabel, alphaLabel, main, shift, alpha, class]
const SCI=[
['SHIFT','','','@shift','','','sh'],['ALPHA','','','@alpha','','','al'],'PAD',
['MODE','SETUP','','@mode','@setup',''],['ON','','','@on',''],
['Abs','','','abs(','',''],['Ran#','','','Ran#','',''],['x⁻¹','x!','','⁻¹','!',''],['nCr','nPr','','C','P',''],
['a b/c','','','⌟','',''],['√','∛','','sqrt(','cbrt(',''],['x²','x³','','²','³',''],['x▢','ˣ√','','^','ˣ√',''],['log','10ˣ','','log(','ten(',''],['ln','eˣ','','ln(','ex(',''],
['(−)','','A','−','','A'],['° ′ ″','','B','°','','B'],['hyp','','C','@hyp','','C'],['sin','sin⁻¹','D','sin(','asin(','D'],['cos','cos⁻¹','E','cos(','acos(','E'],['tan','tan⁻¹','F','tan(','atan(','F'],
['RCL','STO','','@rcl','@sto',''],['ENG','','','@eng','',''],['(','','','(','',''],[')','','X',')','','X'],['S⇔D','','Y','@sd','','Y'],['M+','M−','M','@mp','@mm','M']];
const NUM=[
['7','','','7','','','n'],['8','','','8','','','n'],['9','','','9','','','n'],['DEL','INS','','@del','','','dl'],['AC','OFF','','@ac','@off','','dl'],
['4','','','4','','','n'],['5','','','5','','','n'],['6','','','6','','','n'],['×','','','×','','','o'],['÷','','','÷','','','o'],
['1','','','1','','','n'],['2','','','2','','','n'],['3','','','3','','','n'],['+','','','+','','','o'],['−','','','−','','','o'],
['0','','','0','','','n'],['.','Ran#','','.','Ran#','','n'],['×10ˣ','π','e','×10^','π','e','o sm'],['Ans','%','','Ans','%','','o sm'],['=','','','@eq','','','eq']];
const mk=r=>({l:r[0],sl:r[1],al:r[2],m:r[3],s:r[4],a:r[5],c:r[6]||''});
const KS=[],PAD=['@up','@down','@left','@right'];
function build(arr,host){arr.forEach(r=>{
 if(r==='PAD'){const p=document.createElement('div');p.className='pad';
  p.innerHTML='<button class="u" data-p="@up">▲</button><button class="d" data-p="@down">▼</button><button class="l" data-p="@left">◀</button><button class="r" data-p="@right">▶</button><i>REPLAY</i>';host.appendChild(p);return}
 const k=mk(r);KS.push(k);const w=document.createElement('div');w.className='kw';
 w.innerHTML='<div class="lab"><span class="s">'+k.sl+'</span><span class="a">'+k.al+'</span></div><button class="'+k.c+'">'+k.l+'</button>';
 k.el=w.querySelector('button');k.el.onclick=()=>press(k);host.appendChild(w)})}
build(SCI,document.getElementById('sci'));build(NUM,document.getElementById('num'));
document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>press({m:b.dataset.p}));

const PI=Math.PI;
let S={t:[],c:0,done:false,res:null,err:null,shift:false,alpha:false,hyp:false,sto:false,rcl:false,off:false,menu:null,frac:false,eng:false,hi:-1};
let ans=0,mode='d',vars={A:0,B:0,C:0,D:0,E:0,F:0,X:0,Y:0,M:0},hist=[];
const tr=x=>mode=='d'?x*PI/180:mode=='r'?x:x*PI/200,fr=x=>mode=='d'?x*180/PI:mode=='r'?x:x*200/PI,cl=v=>Math.abs(v)<1e-12?0:v;
function fact(n){if(n<0||n>170||Math.abs(n-Math.round(n))>1e-9)throw'M';let r=1;for(let i=2;i<=Math.round(n);i++)r*=i;return r}
const FN={'sin(':x=>cl(Math.sin(tr(x))),'cos(':x=>cl(Math.cos(tr(x))),
'tan(':x=>{if(Math.abs(Math.cos(tr(x)))<1e-12)throw'M';return cl(Math.tan(tr(x)))},
'asin(':x=>fr(Math.asin(x)),'acos(':x=>fr(Math.acos(x)),'atan(':x=>fr(Math.atan(x)),
'sinh(':Math.sinh,'cosh(':Math.cosh,'tanh(':Math.tanh,'asinh(':Math.asinh,'acosh(':Math.acosh,'atanh(':Math.atanh,
'log(':Math.log10,'ln(':Math.log,'sqrt(':Math.sqrt,'cbrt(':Math.cbrt,'abs(':Math.abs,'ten(':x=>10**x,'ex(':Math.exp};
const isNum=t=>t!==undefined&&/^[0-9.]$/.test(t);
const isVar=t=>t!==undefined&&/^[ABCDEFXYM]$/.test(t);
function evalT(T){let p=0;const pk=()=>T[p];
 const sp=t=>t!==undefined&&(isNum(t)||t=='('||t in FN||['π','e','Ans','Ran#'].includes(t)||isVar(t));
 function expr(){let v=term();while(pk()=='+'||pk()=='−'){const o=T[p++],r=term();v=o=='+'?v+r:v-r}return v}
 function term(){let v=unary();for(;;){const t=pk();
  if(t=='×'||t=='÷'||t=='⌟'){p++;const r=unary();v=t=='×'?v*r:v/r}
  else if(t=='×10^'){p++;v*=Math.pow(10,unary())}
  else if(sp(t))v*=unary();else break}return v}
 function unary(){if(pk()=='−'){p++;return -unary()}if(pk()=='+'){p++;return unary()}return perm()}
 function perm(){let v=power();while(pk()=='P'||pk()=='C'){const o=T[p++],r=power();v=o=='P'?fact(v)/fact(v-r):fact(v)/(fact(r)*fact(v-r))}return v}
 function power(){const b=post();if(pk()=='^'){p++;return Math.pow(b,unary())}if(pk()=='ˣ√'){p++;return Math.pow(post(),1/b)}return b}
 function post(){let v=prim();for(;;){const t=pk();
  if(t=='!')v=fact(v);else if(t=='²')v*=v;else if(t=='³')v=v**3;else if(t=='⁻¹')v=1/v;else if(t=='%')v/=100;
  else if(t=='°')v*=mode=='d'?1:mode=='r'?PI/180:10/9;else break;p++}return v}
 function prim(){const t=T[p++];if(t===undefined)throw'S';
  if(isNum(t)){let s=t;while(isNum(pk()))s+=T[p++];if(s=='.'||s.split('.').length>2)throw'S';return parseFloat(s)}
  if(t=='('){const v=expr();if(pk()==')')p++;return v}
  if(t in FN){const v=expr();if(pk()==')')p++;return FN[t](v)}
  if(t=='π')return PI;if(t=='e')return Math.E;if(t=='Ans')return ans;if(t=='Ran#')return Math.random();
  if(isVar(t))return vars[t];throw'S'}
 const v=expr();if(p<T.length)throw'S';return v}

const sup=n=>String(n).replace(/[0-9-]/g,c=>'⁰¹²³⁴⁵⁶⁷⁸⁹⁻'['0123456789-'.indexOf(c)]);
function sig(v){const s=Number(v.toPrecision(10));if(s===0)return'0';const a=Math.abs(s);
 if(S.eng){const e=Math.floor(Math.log10(a)/3)*3;return Number((s/10**e).toPrecision(10))+'×10'+sup(e)}
 if(a>=1e10||a<1e-9){const[m,e]=s.toExponential().split('e');return m+'×10'+sup(+e)}
 return s.toLocaleString('en',{maximumFractionDigits:20,useGrouping:false})}
function frac(v){if(Number.isInteger(v))return null;const x=Math.abs(v);let h1=1,h0=0,k1=0,k0=1,b=x;
 for(let i=0;i<25;i++){const a=Math.floor(b);[h1,h0]=[a*h1+h0,h1];[k1,k0]=[a*k1+k0,k1];
  if(Math.abs(x-h1/k1)<1e-11*x)break;b=1/(b-a);if(!isFinite(b))break}
 if(k1>9999||Math.abs(x-h1/k1)>1e-9*x)return null;
 const w=Math.floor(h1/k1),n=h1-w*k1;return(v<0?'−':'')+(w?w+'⌟':'')+n+'⌟'+k1}
const fmt=v=>(S.frac&&frac(v))||sig(v);
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const disp=t=>t=='abs('?'Abs(':t=='ten('?'10^(':t=='ex('?'e^(':t=='sqrt('?'√(':t=='cbrt('?'∛(':(t[0]=='a'&&t.endsWith('(')&&t!='abs(')?t.slice(1,-1)+'⁻¹(':t;
const MENU={mode:['1:COMP  2:CMPLX  3:STAT','4:BASE-N 5:EQN 6:MATRIX'],setup:['1:Deg   2:Rad   3:Gra','Angle unit'],na:['Not available in','this version  [AC]']};

function render(){
 const $=id=>document.getElementById(id),l1=$('l1'),l2=$('l2');
 $('lcd').classList.toggle('off',S.off);
 [['iS',S.shift],['iA',S.alpha],['iH',S.hyp],['iSTO',S.sto],['iRCL',S.rcl],['iM',vars.M!==0],['iE',S.eng]].forEach(([i,o])=>$(i).classList.toggle('on',!!o));
 $('iD').textContent=mode=='d'?'D':mode=='r'?'R':'G';
 if(S.menu){l1.className='l1 sm';l2.className='l2 sm';l1.textContent=MENU[S.menu][0];l2.textContent=MENU[S.menu][1];return}
 l1.className='l1';l2.className='l2';
 if(S.err){l1.textContent=S.err;l2.className='l2 sm';l2.textContent='[AC]:Cancel  [◀][▶]:Goto';return}
 let h='';S.t.forEach((t,i)=>{if(i==S.c&&!S.done)h+='<i class="cur"></i>';h+=esc(disp(t))});
 if(S.c>=S.t.length&&!S.done)h+='<i class="cur"></i>';
 l1.innerHTML=h;const cu=l1.querySelector('.cur');l1.scrollLeft=cu?Math.max(0,cu.offsetLeft-l1.clientWidth+40):0;
 l2.textContent=S.res!==null?fmt(S.res):(S.t.length?'':'0');
}
const BIN=new Set(['+','−','×','÷','⌟','^','×10^','ˣ√','P','C','²','³','⁻¹','!','%']);
function insert(tok){S.err=null;
 if(S.done){S.t=BIN.has(tok)?['Ans']:[];S.c=S.t.length;S.done=false;S.res=null;S.frac=false}
 S.t.splice(S.c,0,tok);S.c++;S.hi=-1}
function load(h){S.t=[...h.t];S.c=S.t.length;S.done=false;S.res=null;S.err=null}
const C={
 eq(){if(S.done||!S.t.length)return;try{const v=evalT(S.t.slice());if(!isFinite(v))throw'M';
   ans=v;S.res=v;S.done=true;S.frac=false;hist.push({t:[...S.t]});S.hi=-1}catch(e){S.err=e=='S'?'Syntax ERROR':'Math ERROR'}},
 ac(){Object.assign(S,{t:[],c:0,done:false,res:null,err:null,menu:null,frac:false,hi:-1})},
 del(){S.err=null;if(S.done){S.done=false;S.res=null;S.c=S.t.length}if(S.c>0){S.t.splice(S.c-1,1);S.c--}},
 left(){if(S.done||S.err){S.done=false;S.err=null;S.c=S.t.length;S.res=null}else S.c=Math.max(0,S.c-1)},
 right(){if(S.done||S.err){S.done=false;S.err=null;S.c=0;S.res=null}else S.c=Math.min(S.t.length,S.c+1)},
 up(){if(!hist.length)return;S.hi=Math.max(0,(S.hi<0?hist.length:S.hi)-1);load(hist[S.hi])},
 down(){if(S.hi>=0&&S.hi<hist.length-1){S.hi++;load(hist[S.hi])}},
 mode(){S.menu='mode'},setup(){S.menu='setup'},
 on(){S.off=false;C.ac()},off(){S.off=true;C.ac()},
 hyp(){S.hyp=!S.hyp},rcl(){S.rcl=true;S.sto=false},sto(){S.sto=true;S.rcl=false},eng(){S.eng=!S.eng},
 sd(){if(S.res!==null)S.frac=!S.frac},
 mp(){if(!S.done)C.eq();if(!S.err)vars.M+=ans},mm(){if(!S.done)C.eq();if(!S.err)vars.M-=ans}};
function act(a,k){
 if(a=='@on'){C.on();return render()}
 if(S.off)return;
 if(S.menu){
  if(a=='@ac'){S.menu=null}
  else if(S.menu=='mode'&&/^[0-9]$/.test(a)){S.menu=a=='1'?null:'na'}
  else if(S.menu=='setup'&&'123'.includes(a)&&a.length==1){mode='dgr'[0]=='d'?['d','r','g'][+a-1]:'d';S.menu=null}
  else if(S.menu=='na'&&a=='@ac')S.menu=null;
  return render()}
 if(S.sto||S.rcl){
  if(k&&k.a&&/^[A-Z]$/.test(k.a)){if(S.sto)vars[k.a]=ans;else insert(k.a);S.sto=S.rcl=false;return render()}
  S.sto=S.rcl=false}
 if(a[0]=='@'){C[a.slice(1)]();return render()}
 if(S.hyp&&/^a?(sin|cos|tan)\($/.test(a))a=a.replace(/(sin|cos|tan)/,'$1h');
 S.hyp=false;insert(a);render()}
function press(k){
 const ws=S.shift,wa=S.alpha;let a=ws?k.s:wa?k.a:k.m;
 S.shift=S.alpha=false;
 if(S.off&&k.m!='@on'){render();return}
 if(a=='@shift'||(!ws&&!wa&&k.m=='@shift')){S.shift=!ws;return render()}
 if(a=='@alpha'||(!ws&&!wa&&k.m=='@alpha')){S.alpha=!wa;return render()}
 if(!a){return render()}
 act(a,k)}
const KB={'.':'.','+':'+','-':'−','*':'×','/':'÷','^':'^','(':'(',')':')','!':'!','%':'%','Enter':'@eq','=':'@eq','Backspace':'@del','Escape':'@ac','Delete':'@ac',
 'ArrowLeft':'@left','ArrowRight':'@right','ArrowUp':'@up','ArrowDown':'@down','Tab':'@shift','`':'@alpha','m':'@mode','h':'@hyp','s':'sin(','c':'cos(','t':'tan(','l':'log(','n':'ln(','r':'sqrt(','p':'π','e':'e','a':'Ans','q':'²','i':'⁻¹','x':'×10^','d':'C','f':'P'};
for(let i=0;i<10;i++)KB[i]=String(i);
document.addEventListener('keydown',e=>{
 if(e.ctrlKey||e.metaKey||e.altKey)return;
 const m=KB[e.key];if(!m)return;e.preventDefault();
 const k=KS.find(x=>x.m==m);
 if(k){press(k);k.el.classList.add('p');setTimeout(()=>k.el.classList.remove('p'),90)}
 else if(m=='@up'||m=='@down'||m=='@left'||m=='@right')act(m,null);
 else act(m,null)});
render();