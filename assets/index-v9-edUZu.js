const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./SmoothChart-B8mpPJeP.js","./vendor-react-FHh92Bil.js","./vendor-styled-D-ltm6R4.js","./vendor-recharts-DcuaQFcX.js","./vendor-motion-wE3iTBmK.js"])))=>i.map(i=>d[i]);
import{j as e,r as o,c as yt,R as vt}from"./vendor-react-FHh92Bil.js";import{S as Nt,g,E as kt}from"./vendor-styled-D-ltm6R4.js";import{m as U}from"./vendor-motion-wE3iTBmK.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))d(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const m of l.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&d(m)}).observe(document,{childList:!0,subtree:!0});function r(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function d(n){if(n.ep)return;n.ep=!0;const l=r(n);fetch(n.href,l)}})();const wt="modulepreload",Ct=function(s,a){return new URL(s,a).href},_e={},Dt=function(a,r,d){let n=Promise.resolve();if(r&&r.length>0){const m=document.getElementsByTagName("link"),u=document.querySelector("meta[property=csp-nonce]"),k=(u==null?void 0:u.nonce)||(u==null?void 0:u.getAttribute("nonce"));n=Promise.allSettled(r.map(j=>{if(j=Ct(j,d),j in _e)return;_e[j]=!0;const y=j.endsWith(".css"),T=y?'[rel="stylesheet"]':"";if(!!d)for(let C=m.length-1;C>=0;C--){const L=m[C];if(L.href===j&&(!y||L.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${j}"]${T}`))return;const N=document.createElement("link");if(N.rel=y?"stylesheet":wt,y||(N.as="script"),N.crossOrigin="",N.href=j,k&&N.setAttribute("nonce",k),document.head.appendChild(N),y)return new Promise((C,L)=>{N.addEventListener("load",C),N.addEventListener("error",()=>L(new Error(`Unable to preload CSS for ${j}`)))})}))}function l(m){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=m,window.dispatchEvent(u),!u.defaultPrevented)throw m}return n.then(m=>{for(const u of m||[])u.status==="rejected"&&l(u.reason);return a().catch(l)})},Mt=Nt`
  .app-shell[data-theme='dark'] {
    --page-bg: #0b0f1a;
    --page-bg-alt: #111a2b;
    --glass-bg: rgba(16, 24, 40, 0.58);
    --glass-bg-strong: rgba(16, 24, 40, 0.74);
    --muted-text: #9aa8c4;
    color: #f5f8ff;
  }

  .app-shell[data-theme='light'] {
    --page-bg: #e7edf8;
    --page-bg-alt: #dbe7fb;
    --glass-bg: rgba(255, 255, 255, 0.58);
    --glass-bg-strong: rgba(255, 255, 255, 0.74);
    --muted-text: #4f5f82;
    color: #162036;
  }
`,Wt=g(U.div)`
  position: relative;
  border-radius: 1.2rem;
  padding: 1.25rem;
  background:
    radial-gradient(900px 520px at 100% 0%, rgba(34, 211, 238, 0.14), transparent 62%),
    radial-gradient(760px 500px at 0% 100%, rgba(79, 70, 229, 0.14), transparent 60%),
    linear-gradient(165deg, var(--page-bg), var(--page-bg-alt));
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
  overflow: hidden;
`,St=g.header`
  position: relative;
  z-index: 1;
  margin-bottom: 1rem;

  p {
    margin: 0;
    color: var(--muted-text);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.72rem;
  }

  h2 {
    margin: 0.4rem 0 0;
    font-size: clamp(1.15rem, 2.7vw, 2rem);
  }
`,Tt=g(U.div)`
  position: relative;
  z-index: 1;
`,Lt={hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.08,delayChildren:.08}}};function $t({children:s,title:a,subtitle:r,theme:d}){return e.jsxs(e.Fragment,{children:[e.jsx(Mt,{}),e.jsxs(Wt,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},"data-theme":d,children:[e.jsxs(St,{children:[e.jsx("p",{children:r}),e.jsx("h2",{children:a})]}),e.jsx(Tt,{variants:Lt,initial:"hidden",animate:"show",children:s})]})]})}const Qe=kt`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;g.div`
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  position: relative;
  border-radius: 1.25rem;
  isolation: isolate;
`;g.div`
  position: absolute;
  inset: -10px;
  border-radius: inherit;
  pointer-events: none;
  z-index: 0;
  opacity: 0.52;
  filter: blur(20px);
  background: conic-gradient(
    from 0deg,
    rgba(34, 211, 238, 0.62),
    rgba(79, 70, 229, 0.62),
    rgba(168, 85, 247, 0.62),
    rgba(236, 72, 153, 0.62),
    rgba(249, 115, 22, 0.62),
    rgba(34, 211, 238, 0.62)
  );
  animation: ${Qe} 5.5s linear infinite;
`;g.div`
  position: relative;
  z-index: 1;
  border-radius: inherit;
  padding: 1.5px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: -45%;
    border-radius: inherit;
    pointer-events: none;
    background: conic-gradient(
      from 0deg,
      #22d3ee,
      #4f46e5,
      #a855f7,
      #ec4899,
      #f97316,
      #22d3ee
    );
    animation: ${Qe} 4.2s linear infinite;
  }
`;g.div`
  position: relative;
  z-index: 2;
  border-radius: calc(1.25rem - 1.5px);
  background: rgba(6, 10, 20, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.15rem;
  backdrop-filter: blur(12px);
  color: #f3f7ff;

  @media (max-width: 640px) {
    padding: 0.95rem;
  }
`;g.p`
  margin: 0;
  color: #7dd3fc;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.66rem;
`;g.h3`
  margin: 0.45rem 0 0;
  font-size: clamp(1.05rem, 3.2vw, 1.35rem);
`;g.div`
  margin-top: 0.8rem;
`;function H({children:s,compact:a=!1,className:r=""}){const d=["card-wrapper",r].filter(Boolean).join(" ");return e.jsx(U.div,{className:d,initial:{opacity:0,y:20},animate:{opacity:1,y:0},whileHover:{scale:1.015,y:-3},transition:{duration:.45,ease:"easeOut"},children:e.jsx("article",{className:"card",children:e.jsx("div",{className:"card-content",style:{padding:a?"14px":"18px"},children:s})})})}const Ft=g.ul`
  margin: 0.9rem 0 0;
  padding-left: 1rem;
  display: grid;
  gap: 0.55rem;

  li {
    color: var(--muted-text);
    line-height: 1.45;
  }
`;function Rt({insights:s}){return e.jsxs(H,{children:[e.jsx("h3",{children:"Insights"}),e.jsx(Ft,{children:s.map((a,r)=>e.jsx("li",{children:a},`${a}-${r}`))})]})}const At=g(U.button)`
  border: none;
  border-radius: 999px;
  padding: 0.65rem 1.2rem;
  font-size: 0.84rem;
  font-weight: 600;
  color: #f8fbff;
  cursor: pointer;
  background: linear-gradient(125deg, #4f46e5, #22d3ee, #34d399);
  box-shadow: 0 10px 24px rgba(79, 70, 229, 0.4), 0 0 20px rgba(34, 211, 238, 0.28);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 16px 36px rgba(79, 70, 229, 0.52), 0 0 28px rgba(34, 211, 238, 0.36);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;function z({children:s,type:a="button",...r}){return e.jsx(At,{type:a,whileHover:{scale:1.04},whileTap:{scale:.98},animate:{boxShadow:["0 10px 24px rgba(79, 70, 229, 0.4), 0 0 20px rgba(34, 211, 238, 0.28)","0 14px 30px rgba(79, 70, 229, 0.52), 0 0 26px rgba(52, 211, 153, 0.35)","0 10px 24px rgba(79, 70, 229, 0.4), 0 0 20px rgba(34, 211, 238, 0.28)"]},transition:{duration:2.2,repeat:1/0,ease:"easeInOut"},...r,children:s})}const Pt=g.nav`
  display: flex;
  gap: 0.65rem;
  overflow-x: auto;
  align-items: center;
  padding: 0.85rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: var(--glass-bg-strong);
  backdrop-filter: blur(16px);
`,Et=g.button`
  border: 1px solid ${s=>s.active?"rgba(34, 211, 238, 0.42)":"rgba(255, 255, 255, 0.12)"};
  background: ${s=>s.active?"linear-gradient(120deg, rgba(79, 70, 229, 0.55), rgba(34, 211, 238, 0.42))":"rgba(255, 255, 255, 0.03)"};
  color: #eef2ff;
  text-transform: capitalize;
  border-radius: 999px;
  padding: 0.52rem 0.95rem;
  white-space: nowrap;
  cursor: pointer;
`,Bt=g.div`
  margin-left: auto;
`;function Ot({pages:s,page:a,onNavigate:r,isLight:d,onToggleTheme:n}){return e.jsxs(Pt,{children:[s.map(l=>e.jsx(Et,{active:l===a,onClick:()=>r(l),children:l},l)),e.jsx(Bt,{}),e.jsx(z,{onClick:n,children:d?"Dark Mode":"Light Mode"})]})}const It=g(U.div)`
  position: sticky;
  bottom: 0.9rem;
  z-index: 4;
  margin-top: 1rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: linear-gradient(120deg, rgba(79, 70, 229, 0.5), rgba(34, 211, 238, 0.32));
  padding: 0.65rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(16px);
`,Gt=g.span`
  color: rgba(239, 244, 255, 0.86);
  font-size: 0.84rem;
`;function zt({calories:s,trend:a}){return e.jsxs(It,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{delay:.2,duration:.4},children:[e.jsx("strong",{children:"Now Tracking"}),e.jsxs(Gt,{children:[Math.round(Number(s)||0)," kcal net · ",a]})]})}const Ht=g.div`
  width: 132px;
  height: 132px;
  display: grid;
  place-items: center;
  position: relative;
`,Ut=g.div`
  position: absolute;
  text-align: center;

  strong {
    font-size: 1.45rem;
    display: block;
  }

  span {
    color: var(--muted-text);
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
`;function Kt({value:s}){const a=Math.max(0,Math.min(100,Number(s)||0)),r=52,d=10,n=r-d/2,l=n*2*Math.PI,m=l-a/100*l,u=o.useId();return e.jsxs(Ht,{children:[e.jsxs("svg",{width:r*2,height:r*2,children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:u,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#22D3EE"}),e.jsx("stop",{offset:"52%",stopColor:"#A78BFA"}),e.jsx("stop",{offset:"100%",stopColor:"#34D399"})]})}),e.jsx("circle",{stroke:"rgba(255,255,255,0.16)",fill:"transparent",strokeWidth:d,r:n,cx:r,cy:r}),e.jsx(U.circle,{stroke:`url(#${u})`,fill:"transparent",strokeWidth:d,strokeLinecap:"round",r:n,cx:r,cy:r,style:{transform:"rotate(-90deg)",transformOrigin:"50% 50%"},strokeDasharray:`${l} ${l}`,initial:{strokeDashoffset:l},animate:{strokeDashoffset:m},transition:{duration:1.1,ease:"easeOut"}})]}),e.jsxs(Ut,{children:[e.jsxs("strong",{children:[a.toFixed(0),"%"]}),e.jsx("span",{children:"On Track"})]})]})}const fe=g.form`
  margin-top: 1rem;
  display: grid;
  gap: 0.65rem;

  h4 {
    margin: 0;
    font-size: 0.95rem;
  }
`,je=g.div`
  display: grid;
  gap: 0.55rem;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
`,E=g.input`
  width: 100%;
`,_t=g.select`
  width: 100%;
`,Yt=g.p`
  margin: 0;
  color: var(--muted-text);
  font-size: 0.79rem;
`,ye=g.div`
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
`;function qt({workoutForm:s,foodForm:a,weightForm:r,setWorkoutForm:d,setFoodForm:n,setWeightForm:l,handleAddWorkout:m,handleAddFood:u,handleAddWeight:k,workoutEstimatedCals:j,currentWorkoutMeta:y,workoutLibrary:T,editingWorkoutId:$,editingFoodId:N,editingWeightId:C,resetWorkoutForm:L,resetFoodForm:B,resetWeightForm:f}){return e.jsxs(H,{children:[e.jsx("h3",{children:"Quick Log"}),e.jsxs(fe,{onSubmit:m,children:[e.jsx("h4",{children:$?"Edit Workout":"Add Workout"}),e.jsxs(je,{children:[e.jsx(E,{type:"date",value:s.date,onChange:c=>d(h=>({...h,date:c.target.value}))}),e.jsx(_t,{value:s.type,onChange:c=>d(h=>({...h,type:c.target.value})),children:T.map(c=>e.jsxs("option",{value:c.name,children:[c.icon," ",c.name]},c.name))}),e.jsx(E,{type:"number",placeholder:`Amount (${y.unit})`,value:s.amount,onChange:c=>d(h=>({...h,amount:c.target.value}))}),e.jsx(E,{type:"number",min:"1",placeholder:"Sets",value:s.sets,onChange:c=>d(h=>({...h,sets:c.target.value}))}),e.jsx(E,{type:"text",value:`${j} kcal (auto)`,readOnly:!0})]}),e.jsx(Yt,{children:"Formula uses MET x body weight x duration. Daily predictions are based on net calorie balance."}),e.jsxs(ye,{children:[e.jsx(z,{type:"submit",children:$?"Update Workout":"Save Workout"}),$?e.jsx(z,{type:"button",onClick:L,children:"Cancel"}):null]})]}),e.jsxs(fe,{onSubmit:u,children:[e.jsx("h4",{children:N?"Edit Food":"Add Food"}),e.jsxs(je,{children:[e.jsx(E,{type:"date",value:a.date,onChange:c=>n(h=>({...h,date:c.target.value}))}),e.jsx(E,{type:"text",placeholder:"Meal",value:a.meal,onChange:c=>n(h=>({...h,meal:c.target.value}))}),e.jsx(E,{type:"number",placeholder:"Calories consumed",value:a.caloriesConsumed,onChange:c=>n(h=>({...h,caloriesConsumed:c.target.value}))})]}),e.jsxs(ye,{children:[e.jsx(z,{type:"submit",children:N?"Update Food":"Save Food"}),N?e.jsx(z,{type:"button",onClick:B,children:"Cancel"}):null]})]}),e.jsxs(fe,{onSubmit:k,children:[e.jsx("h4",{children:C?"Edit Weight":"Add Weight"}),e.jsxs(je,{children:[e.jsx(E,{type:"date",value:r.date,onChange:c=>l(h=>({...h,date:c.target.value}))}),e.jsx(E,{type:"number",step:"0.1",placeholder:"Weight kg",value:r.weight,onChange:c=>l(h=>({...h,weight:c.target.value}))})]}),e.jsxs(ye,{children:[e.jsx(z,{type:"submit",children:C?"Update Weight":"Save Weight"}),C?e.jsx(z,{type:"button",onClick:f,children:"Cancel"}):null]})]})]})}const Jt=g.h3`
  margin: 0.4rem 0;
  font-size: 1.35rem;
  color: #f8fbff;
`,Vt=g.p`
  margin: 0;
  color: var(--muted-text);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`,Qt=g.p`
  margin: 0;
  color: var(--muted-text);
  font-size: 0.8rem;
`;function Xt({label:s,value:a,hint:r}){return e.jsxs(H,{compact:!0,children:[e.jsx(Vt,{children:s}),e.jsx(Jt,{children:a}),e.jsx(Qt,{children:r})]})}const Zt=g.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`,es=g.article`
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 0.85rem 0.9rem;
  border-radius: 0.85rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);

  & + & {
    margin-top: 0.65rem;
  }
`,Ye=g.p`
  margin: 0.25rem 0 0;
  color: var(--muted-text);
  font-size: 0.82rem;
`;function ts({workouts:s}){return e.jsxs(H,{children:[e.jsx(Zt,{children:e.jsx("h3",{children:"Workout Feed"})}),s.length?null:e.jsx(Ye,{children:"No workouts logged yet."}),s.map(a=>e.jsxs(es,{children:[e.jsxs("div",{children:[e.jsx("strong",{children:a.type}),e.jsxs(Ye,{children:[a.date," · ",Math.round(Number(a.durationMin)||0)," min"]})]}),e.jsxs("strong",{children:[Math.round(Number(a.caloriesBurned)||0)," kcal"]})]},a.id))]})}const Xe=7700;function ss(s){const a=Number(s==null?void 0:s.age)||0,r=Number(s==null?void 0:s.heightCm)||0,d=Number(s==null?void 0:s.currentWeight)||0,l=((s==null?void 0:s.gender)||"male").toLowerCase()==="female"?-161:5,m=10*d+6.25*r-5*a+l;return Math.max(1200,m)}function as(s,a,r){const d=Number(s)||0,n=Number(a)||0,l=Math.max(0,Number(r)||0);return Math.max(0,Math.round(d*n*l/60))}function v(s){const a=new Date(s),r=a.getFullYear(),d=String(a.getMonth()+1).padStart(2,"0"),n=String(a.getDate()).padStart(2,"0");return`${r}-${d}-${n}`}function rs(s,a,r=7){const d=new Date,n=[],l=[],m=[];for(let u=r-1;u>=0;u-=1){const k=new Date(d);k.setDate(d.getDate()-u);const j=v(k);n.push(j),l.push(s.filter(y=>y.date===j).reduce((y,T)=>y+(Number(T.caloriesBurned)||0),0)),m.push(a.filter(y=>y.date===j).reduce((y,T)=>y+(Number(T.caloriesConsumed)||0),0))}return{labels:n,burned:l,consumed:m}}function ns({currentWeight:s,goalWeight:a,avgBurned:r,avgConsumed:d}){const n=r-d,l=n/Xe,m=Math.max(0,s-a);let u=1/0;return m<=0?u=0:l>0&&(u=Math.ceil(m/l)),{dailyDeficit:n,dailyWeightLoss:l,daysToGoal:u,remainingKg:m}}function qe(s,a,r){if(s<=0)return 0;const d=a+r;if(d<=0)return 1/0;const n=d/Xe;return Math.ceil(s/n)}function os({startDate:s,currentWeight:a,dailyWeightLoss:r,days:d=30}){const n=new Date(`${s}T00:00:00`),l=[];let m=a;for(let u=1;u<=d;u+=1){const k=new Date(n);k.setDate(n.getDate()+u),m=Math.max(0,m-r),l.push({date:v(k),weight:Number(m.toFixed(2))})}return l}const Ze="fittrack-premium-v1",A={profile:{name:"Athlete",age:28,heightCm:172,currentWeight:78,gender:"male"},goals:{goalWeight:70,weeklyWorkoutTarget:5},settings:{remind:!0,achieve:!0,imperial:!1,bmr:!0,useNormalizedCalories:!0,avgWindowDays:7,projectionDays:30},workouts:[{id:"w1",date:v(new Date),type:"Running",durationMin:40,caloriesBurned:420},{id:"w2",date:v(new Date(Date.now()-864e5)),type:"Strength",durationMin:50,caloriesBurned:360}],foodLogs:[{id:"f1",date:v(new Date),meal:"Lunch Bowl",caloriesConsumed:640},{id:"f2",date:v(new Date(Date.now()-864e5)),meal:"Dinner",caloriesConsumed:820}],weightHistory:[{id:"wh1",date:v(new Date(Date.now()-1e3*60*60*24*7)),weight:79.2},{id:"wh2",date:v(new Date(Date.now()-1e3*60*60*24*4)),weight:78.8},{id:"wh3",date:v(new Date(Date.now()-1e3*60*60*24*2)),weight:78.4},{id:"wh4",date:v(new Date),weight:78}]},et=o.createContext(null);function is(){try{const s=localStorage.getItem(Ze);if(!s)return A;const a=JSON.parse(s);return{...A,...a,profile:{...A.profile,...a.profile||{}},goals:{...A.goals,...a.goals||{}},settings:{...A.settings,...a.settings||{}},workouts:Array.isArray(a.workouts)?a.workouts:A.workouts,foodLogs:Array.isArray(a.foodLogs)?a.foodLogs:A.foodLogs,weightHistory:Array.isArray(a.weightHistory)?a.weightHistory:A.weightHistory}}catch{return A}}function ls({children:s}){const[a,r]=o.useState(is);o.useEffect(()=>{localStorage.setItem(Ze,JSON.stringify(a))},[a]);const d=o.useCallback(f=>{r(c=>({...c,profile:{...c.profile,...f}}))},[]),n=o.useCallback(f=>{r(c=>({...c,goals:{...c.goals,...f}}))},[]),l=o.useCallback(f=>{r(c=>({...c,settings:{...c.settings,...f}}))},[]),m=o.useCallback(f=>{r(c=>({...c,workouts:[{id:crypto.randomUUID(),...f},...c.workouts]}))},[]),u=o.useCallback((f,c)=>{r(h=>({...h,workouts:h.workouts.map(w=>w.id===f?{...w,...c}:w)}))},[]),k=o.useCallback(f=>{r(c=>({...c,workouts:c.workouts.filter(h=>h.id!==f)}))},[]),j=o.useCallback(f=>{r(c=>({...c,foodLogs:[{id:crypto.randomUUID(),...f},...c.foodLogs]}))},[]),y=o.useCallback((f,c)=>{r(h=>({...h,foodLogs:h.foodLogs.map(w=>w.id===f?{...w,...c}:w)}))},[]),T=o.useCallback(f=>{r(c=>({...c,foodLogs:c.foodLogs.filter(h=>h.id!==f)}))},[]),$=o.useCallback(f=>{r(c=>({...c,weightHistory:[{id:crypto.randomUUID(),...f},...c.weightHistory]}))},[]),N=o.useCallback((f,c)=>{r(h=>({...h,weightHistory:h.weightHistory.map(w=>w.id===f?{...w,...c}:w)}))},[]),C=o.useCallback(f=>{r(c=>({...c,weightHistory:c.weightHistory.filter(h=>h.id!==f)}))},[]),L=o.useCallback(()=>{r(A)},[]),B=o.useMemo(()=>({state:a,actions:{updateProfile:d,updateGoals:n,updateSettings:l,addWorkout:m,updateWorkout:u,deleteWorkout:k,addFoodLog:j,updateFoodLog:y,deleteFoodLog:T,addWeightLog:$,updateWeightLog:N,deleteWeightLog:C,clearAllData:L}}),[a,d,n,l,m,u,k,j,y,T,$,N,C,L]);return e.jsx(et.Provider,{value:B,children:s})}function cs(){const s=o.useContext(et);if(!s)throw new Error("useAppState must be used within AppStateProvider");return s}const ds=["dashboard","log","workouts","nutrition","progress","calendar","timer","search","notifications","settings"],us=o.lazy(()=>Dt(()=>import("./SmoothChart-B8mpPJeP.js"),__vite__mapDeps([0,1,2,3,4]),import.meta.url)),ie=[{name:"Running",icon:"🏃",unit:"min",mode:"time",met:9.8,color:"violet"},{name:"Walking",icon:"🚶",unit:"steps",mode:"count",met:3.5,secPerRep:.5,color:"cyan"},{name:"Cycling",icon:"🚴",unit:"min",mode:"time",met:7.5,color:"teal"},{name:"Swimming",icon:"🏊",unit:"min",mode:"time",met:7,color:"blue"},{name:"HIIT",icon:"⚡",unit:"min",mode:"time",met:10,color:"orange"},{name:"Strength",icon:"🏋️",unit:"min",mode:"time",met:5,color:"amber"},{name:"Yoga",icon:"🧘",unit:"min",mode:"time",met:2.5,color:"green"},{name:"Jump Rope",icon:"🪢",unit:"jumps",mode:"count",met:12.3,secPerRep:.5,color:"pink"},{name:"Push-ups",icon:"💪",unit:"reps",mode:"count",met:3.8,secPerRep:2,color:"red"},{name:"Plank",icon:"🧱",unit:"sec",mode:"time-sec",met:4,color:"indigo"},{name:"Squats",icon:"🦵",unit:"reps",mode:"count",met:5,secPerRep:3,color:"emerald"}],ms=[{text:"Great job. You hit your calorie burn goal yesterday.",time:"2h ago",read:!1},{text:"Your 7-day streak is going strong. Keep it up.",time:"1d ago",read:!1},{text:"New workout recommendation available.",time:"2d ago",read:!0},{text:"Increase active minutes to accelerate goal timeline.",time:"4d ago",read:!0}];function ne(s){const a=new Date(`${s}T00:00:00`);return`${a.getMonth()+1}/${a.getDate()}`}function Je(s){const a=Math.floor(s/3600),r=Math.floor(s%3600/60),d=s%60;return[a,r,d].map(n=>String(n).padStart(2,"0")).join(":")}function J(s){return ie.find(a=>a.name===s)||ie[0]}function oe(s,a,r,d=1){const n=J(s),l=Number(a)||0,m=Math.max(1,Number(d)||1);let u=0;return n.mode==="time"?u=l:n.mode==="time-sec"?u=l/60:u=l*(Number(n.secPerRep)||2)/60,u*=m,as(n.met,r,u)}function Ve(s,a,r=1){const d=J(s),n=Number(a)||0,l=Math.max(1,Number(r)||1);return d.mode==="time"?n*l:d.mode==="time-sec"?n/60*l:n*(Number(d.secPerRep)||2)/60*l}function ve({values:s,labels:a,colorClass:r="bar-purple"}){const d=Math.max(1,...s);return e.jsx("div",{className:"mini-bars",children:s.map((n,l)=>e.jsxs("div",{className:"mini-col-wrap",title:`${a[l]}: ${n}`,children:[e.jsx("div",{className:`mini-col ${r}`,style:{height:`${Math.max(8,n/d*100)}%`}}),e.jsx("span",{children:a[l]})]},`${a[l]}-${l}`))})}function hs(){var ze,He,Ue,Ke;const{state:s,actions:a}=cs(),[r,d]=o.useState("dashboard"),[n,l]=o.useState({date:v(new Date),type:"Running",amount:40,sets:1}),[m,u]=o.useState({date:v(new Date),meal:"Meal",caloriesConsumed:650}),[k,j]=o.useState({date:v(new Date),weight:s.profile.currentWeight}),[y,T]=o.useState(null),[$,N]=o.useState(null),[C,L]=o.useState(null),[B,f]=o.useState(""),[c,h]=o.useState("Running"),[w,Ne]=o.useState(0),[le,ke]=o.useState(!1),[we,Ce]=o.useState([]),[De,Me]=o.useState(!1),[ce,tt]=o.useState("dark"),[O,K]=o.useState({name:s.profile.name,age:s.profile.age,heightCm:s.profile.heightCm,gender:s.profile.gender||"male"}),[V,de]=o.useState({goalWeight:s.goals.goalWeight,weeklyWorkoutTarget:s.goals.weeklyWorkoutTarget}),[We,Se]=o.useState(""),ue=((ze=s.settings)==null?void 0:ze.useNormalizedCalories)!==!1,F=Math.min(30,Math.max(3,Number((He=s.settings)==null?void 0:He.avgWindowDays)||7)),_=Math.min(120,Math.max(7,Number((Ue=s.settings)==null?void 0:Ue.projectionDays)||30));o.useEffect(()=>{if(!le)return;const t=setInterval(()=>Ne(i=>i+1),1e3);return()=>clearInterval(t)},[le]),o.useEffect(()=>{K({name:s.profile.name,age:s.profile.age,heightCm:s.profile.heightCm,gender:s.profile.gender||"male"}),de({goalWeight:s.goals.goalWeight,weeklyWorkoutTarget:s.goals.weeklyWorkoutTarget})},[s.profile,s.goals]);const D=o.useMemo(()=>[...s.weightHistory].sort((t,i)=>new Date(`${t.date}T00:00:00`)-new Date(`${i.date}T00:00:00`)),[s.weightHistory]),M=o.useMemo(()=>{const t=D.length?Number(D[D.length-1].weight):Number(s.profile.currentWeight);return Number.isFinite(t)?t:0},[D,s.profile.currentWeight]),Q=o.useMemo(()=>{const t=D.length?Number(D[0].weight):Number(s.profile.currentWeight);return Number.isFinite(t)?t:M},[D,s.profile.currentWeight,M]),Te=o.useMemo(()=>{const t=Number(s.profile.currentWeight)||70;return s.workouts.map(i=>{const p=J(i.type),x=Math.max(1,Number(i.sets)||1);let R=Number(i.amount);if(!Number.isFinite(R)||R<=0){const P=Math.max(0,Number(i.durationMin)||0);p.mode==="time"?R=P/x:p.mode==="time-sec"?R=P*60/x:R=P*60/(Number(p.secPerRep)||2)/x}const re=oe(i.type,R,t,x),G=Ve(i.type,R,x);return{...i,amount:R,sets:x,durationMin:G,caloriesBurned:re}})},[s.workouts,s.profile.currentWeight]),S=o.useMemo(()=>ue?Te:s.workouts,[ue,Te,s.workouts]),W=o.useMemo(()=>rs(S,s.foodLogs,F),[S,s.foodLogs,F]),Le=o.useMemo(()=>W.burned.reduce((t,i)=>t+i,0)/W.burned.length,[W]),X=o.useMemo(()=>W.consumed.reduce((t,i)=>t+i,0)/W.consumed.length,[W]),I=o.useMemo(()=>ss(s.profile),[s.profile]),Z=o.useMemo(()=>{const t=Math.max(1,W.burned.length);return W.burned.reduce((p,x)=>p+I+x,0)/t},[W,I]),b=o.useMemo(()=>ns({currentWeight:M,goalWeight:Number(s.goals.goalWeight),avgBurned:Z,avgConsumed:X}),[M,s.goals.goalWeight,Z,X]),st=o.useMemo(()=>{const t=Number(s.goals.goalWeight);if(!Number.isFinite(t))return 0;const i=t-Q;if(Math.abs(i)>=.001){const p=M-Q,x=p/i*100;if(Number.isFinite(x)&&Math.abs(p)>=.001)return Math.min(100,Math.max(0,x))}if(t>0&&M>0){const p=t<M?t/M*100:M/t*100;if(Number.isFinite(p))return Math.min(100,Math.max(0,p))}return Math.abs(i)<.001?100:0},[Q,M,s.goals.goalWeight]),$e=o.useMemo(()=>{const t=D.length?D[D.length-1].date:v(new Date);return os({startDate:t,currentWeight:M,dailyWeightLoss:b.dailyWeightLoss,days:_})},[D,M,b.dailyWeightLoss,_]),at=o.useMemo(()=>{const t=D.map(p=>({date:ne(p.date),actual:Number(p.weight),predicted:null})),i=$e.map(p=>({date:ne(p.date),actual:null,predicted:p.weight}));return[...t,...i]},[D,$e]),rt=o.useMemo(()=>S.slice(0,6),[S]),Fe=o.useMemo(()=>S,[S]),nt=o.useMemo(()=>s.foodLogs,[s.foodLogs]),me=o.useMemo(()=>{const t=new Set(W.labels);return S.filter(i=>t.has(i.date)).length},[S,W.labels]),ee=v(new Date),te=o.useMemo(()=>s.foodLogs.filter(t=>t.date===ee),[s.foodLogs,ee]),he=o.useMemo(()=>te.reduce((t,i)=>t+(Number(i.caloriesConsumed)||0),0),[te]),se=o.useMemo(()=>S.filter(t=>t.date===ee).reduce((t,i)=>t+(Number(i.caloriesBurned)||0),0),[S,ee]),Re=o.useMemo(()=>I+se,[I,se]),ge=o.useMemo(()=>Re-he,[Re,he]),ot=o.useMemo(()=>{const t=[];return b.daysToGoal===0?t.push("Goal achieved. Maintain this trend with a balanced routine."):b.dailyDeficit>0?t.push("You are in a calorie deficit. Keep this pace for steady fat loss."):t.push("You are currently in a calorie surplus. Reduce intake or increase burn."),me>=s.goals.weeklyWorkoutTarget?t.push("Great consistency this week. You have met your workout target."):t.push(`You are ${s.goals.weeklyWorkoutTarget-me} workouts away from your weekly target.`),b.daysToGoal===0?t.push("Your projected timeline is complete for the current goal."):Number.isFinite(b.daysToGoal)?t.push(`At current pace, you may reach your goal in about ${b.daysToGoal} days.`):t.push("No progress expected at this intake and burn level. Increase burn or reduce calories."),t},[b,me,s.goals.weeklyWorkoutTarget]),pe=o.useMemo(()=>qe(b.remainingKg,b.dailyDeficit,200),[b.remainingKg,b.dailyDeficit]),xe=o.useMemo(()=>qe(b.remainingKg,b.dailyDeficit,400),[b.remainingKg,b.dailyDeficit]),it=o.useMemo(()=>[{label:"Passive Burn (BMR)",value:`${Math.round(I)} kcal`,hint:"Per day from profile and gender"},{label:"Today Active Burn",value:`${Math.round(se)} kcal`,hint:"Today workouts only"},{label:`Active Burn / Day (${F}D Avg)`,value:`${Math.round(Le)} kcal`,hint:`Rolling ${F}-day active average`},{label:`Total Burn / Day (${F}D Avg)`,value:`${Math.round(Z)} kcal`,hint:"BMR + active average"},{label:`Avg Intake / Day (${F}D)`,value:`${Math.round(X)} kcal`,hint:`Rolling ${F}-day food average`},{label:`Net Balance / Day (${F}D Avg)`,value:`${Math.round(b.dailyDeficit)} kcal`,hint:"Average total burn minus average intake"},{label:"Today Net Balance",value:`${Math.round(ge)} kcal`,hint:"Today total burn minus today intake"}],[I,se,Le,Z,X,b.dailyDeficit,ge,F]),Ae=o.useMemo(()=>{const t=B.trim().toLowerCase();if(!t)return[];const i=S.filter(x=>x.type.toLowerCase().includes(t)).slice(0,5).map(x=>({kind:"Workout",id:x.id,label:`${x.type} - ${x.caloriesBurned} kcal`})),p=s.foodLogs.filter(x=>x.meal.toLowerCase().includes(t)).slice(0,5).map(x=>({kind:"Food",id:x.id,label:`${x.meal} - ${x.caloriesConsumed} kcal`}));return[...i,...p]},[B,S,s.foodLogs]),lt=o.useMemo(()=>{const t=[],i=new Date;for(let p=11;p>=0;p-=1)for(let x=0;x<7;x+=1){const R=new Date(i);R.setDate(i.getDate()-p*7-x);const re=v(R),G=S.filter(be=>be.date===re).reduce((be,jt)=>be+(Number(jt.caloriesBurned)||0),0);let P="lv0";G>700?P="lv4":G>500?P="lv3":G>300?P="lv2":G>120&&(P="lv1"),t.push({date:re,burn:G,level:P})}return t},[S]),ae=o.useMemo(()=>({labels:W.labels.map(t=>ne(t)),consumed:W.consumed,burned:W.burned}),[W]),Pe=o.useMemo(()=>{const t=D.slice(-10);return{labels:t.map(i=>ne(i.date)),values:t.map(i=>Number(i.weight))}},[D]),ct=o.useMemo(()=>oe(c,w/60,Number(s.profile.currentWeight)||70),[c,w,s.profile.currentWeight]),Ee=o.useMemo(()=>J(n.type),[n.type]),dt=o.useMemo(()=>oe(n.type,n.amount,Number(s.profile.currentWeight)||70,n.sets),[n.type,n.amount,n.sets,s.profile.currentWeight]);function Be(){l({date:v(new Date),type:"Running",amount:40,sets:1}),T(null)}function Oe(){u({date:v(new Date),meal:"Meal",caloriesConsumed:650}),N(null)}function Ie(){j({date:v(new Date),weight:s.profile.currentWeight}),L(null)}function ut(t){t.preventDefault();const i=Number(n.amount)||0,p=Math.max(1,Number(n.sets)||1),x={...n,amount:i,sets:p,unit:Ee.unit,durationMin:Ve(n.type,i,p),caloriesBurned:oe(n.type,i,Number(s.profile.currentWeight)||70,p)};y?a.updateWorkout(y,x):a.addWorkout(x),Be()}function mt(t){t.preventDefault();const i={...m,caloriesConsumed:Number(m.caloriesConsumed)};$?a.updateFoodLog($,i):a.addFoodLog(i),Oe()}function ht(t){t.preventDefault();const i=Number(k.weight),p={...k,weight:i};C?a.updateWeightLog(C,p):a.addWeightLog(p),a.updateProfile({currentWeight:i}),Ie()}function gt(t){t.preventDefault(),a.updateProfile({name:O.name,age:Number(O.age)||0,heightCm:Number(O.heightCm)||0,gender:O.gender||"male"}),a.updateGoals({goalWeight:Number(V.goalWeight)||0,weeklyWorkoutTarget:Number(V.weeklyWorkoutTarget)||1}),Se("Profile and goals saved."),setTimeout(()=>Se(""),2200)}function pt(t){d("dashboard"),l({date:t.date,type:t.type,amount:t.amount??(t.unit==="sec"?Math.round((Number(t.durationMin)||0)*60):Math.round(Number(t.durationMin)||0)),sets:t.sets??1}),T(t.id)}function Ge(t){d("dashboard"),u({date:t.date,meal:t.meal,caloriesConsumed:t.caloriesConsumed}),N(t.id)}function xt(t){d("dashboard"),j({date:t.date,weight:t.weight}),L(t.id)}function Y(t){a.updateSettings({[t]:!s.settings[t]})}function bt(){const t=new Blob([JSON.stringify(s,null,2)],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(t),i.download="fittrack-data.json",i.click()}function q(t,i=!0){d(t),i&&Me(!1)}function ft(){tt(t=>t==="dark"?"light":"dark")}return e.jsx("div",{className:"app-shell","data-theme":ce,children:e.jsxs($t,{title:"FitTrack Predictive Coach",subtitle:"Premium Fitness Intelligence",theme:ce,children:[e.jsx(Ot,{pages:ds,page:r,onNavigate:t=>q(t,!1),isLight:ce==="light",onToggleTheme:ft}),r==="dashboard"&&e.jsxs(e.Fragment,{children:[e.jsxs("section",{className:"premium-hero-grid apple-reveal apple-reveal-1",children:[e.jsx(H,{children:e.jsxs("div",{className:"premium-ring-head",children:[e.jsxs("div",{children:[e.jsx("p",{className:"eyebrow",children:"Goal Progress"}),e.jsxs("h3",{children:[M.toFixed(1)," kg to ",Number(s.goals.goalWeight).toFixed(1)," kg"]}),e.jsxs("p",{className:"muted",style:{marginTop:6},children:["ETA: ",b.daysToGoal===0?"Goal achieved":Number.isFinite(b.daysToGoal)?`${b.daysToGoal} days`:"No progress"]})]}),e.jsx(Kt,{value:st})]})}),e.jsxs(H,{children:[e.jsx("h3",{children:"Prediction Matrix"}),e.jsxs("div",{className:"premium-prediction-grid",children:[e.jsxs("div",{className:"prediction-item",children:[e.jsx("span",{children:"Current pace"}),e.jsx("strong",{children:b.daysToGoal===0?"Goal achieved":Number.isFinite(b.daysToGoal)?`${b.daysToGoal} days`:"No progress"})]}),e.jsxs("div",{className:"prediction-item",children:[e.jsx("span",{children:"+200 kcal/day"}),e.jsx("strong",{children:pe===0?"Goal achieved":Number.isFinite(pe)?`${pe} days`:"No progress"})]}),e.jsxs("div",{className:"prediction-item",children:[e.jsx("span",{children:"+400 kcal/day"}),e.jsx("strong",{children:xe===0?"Goal achieved":Number.isFinite(xe)?`${xe} days`:"No progress"})]})]}),e.jsx("p",{className:"muted",style:{marginTop:10},children:b.dailyDeficit>=0?`Calorie deficit: ${Math.round(b.dailyDeficit)} kcal/day`:`Calorie surplus: ${Math.abs(Math.round(b.dailyDeficit))} kcal/day`})]})]}),e.jsx("section",{className:"premium-stat-grid apple-reveal apple-reveal-2",children:it.map(t=>e.jsx(Xt,{label:t.label,value:t.value,hint:t.hint},t.label))}),e.jsxs("section",{className:"premium-chart-grid apple-reveal apple-reveal-3",children:[e.jsx(o.Suspense,{fallback:e.jsxs(H,{children:[e.jsx("h3",{children:"Loading chart..."}),e.jsx("p",{className:"muted",children:"Preparing trend analysis."})]}),children:e.jsx(us,{data:at,goalWeight:Number(s.goals.goalWeight)})}),e.jsx(Rt,{insights:ot})]}),e.jsxs("section",{className:"premium-chart-grid apple-reveal apple-reveal-4",children:[e.jsx(ts,{workouts:rt}),e.jsx(qt,{workoutForm:n,foodForm:m,weightForm:k,setWorkoutForm:l,setFoodForm:u,setWeightForm:j,handleAddWorkout:ut,handleAddFood:mt,handleAddWeight:ht,workoutEstimatedCals:dt,currentWorkoutMeta:Ee,workoutLibrary:ie,editingWorkoutId:y,editingFoodId:$,editingWeightId:C,resetWorkoutForm:Be,resetFoodForm:Oe,resetWeightForm:Ie})]}),e.jsx(zt,{calories:ge,trend:b.dailyDeficit>=0?"Deficit mode":"Surplus mode"}),((Ke=s.settings)==null?void 0:Ke.bmr)&&e.jsxs("p",{className:"muted",style:{marginTop:8},children:["BMR (",(s.profile.gender||"male").toLowerCase(),"): ",I," kcal/day"]})]}),r==="log"&&e.jsxs("section",{className:"glass-card profile-section",children:[e.jsx("h3",{children:"Profile and Goals"}),e.jsxs("form",{onSubmit:gt,children:[e.jsxs("div",{className:"field-grid profile-grid",children:[e.jsx("input",{type:"text",placeholder:"Name",value:O.name,onChange:t=>K(i=>({...i,name:t.target.value}))}),e.jsx("input",{type:"number",placeholder:"Age",value:O.age,onChange:t=>K(i=>({...i,age:t.target.value}))}),e.jsxs("select",{value:O.gender,onChange:t=>K(i=>({...i,gender:t.target.value})),children:[e.jsx("option",{value:"male",children:"Male"}),e.jsx("option",{value:"female",children:"Female"})]}),e.jsx("input",{type:"number",placeholder:"Height cm",value:O.heightCm,onChange:t=>K(i=>({...i,heightCm:t.target.value}))}),e.jsx("input",{type:"number",step:"0.1",placeholder:"Goal weight kg",value:V.goalWeight,onChange:t=>de(i=>({...i,goalWeight:t.target.value}))}),e.jsx("input",{type:"number",placeholder:"Weekly workout target",value:V.weeklyWorkoutTarget,onChange:t=>de(i=>({...i,weeklyWorkoutTarget:t.target.value}))})]}),e.jsxs("div",{className:"row-actions",style:{marginTop:10},children:[e.jsx("button",{type:"submit",children:"Save Profile and Goals"}),We&&e.jsx("span",{className:"muted",children:We})]})]})]}),r==="workouts"&&e.jsxs("section",{className:"glass-card",children:[e.jsx("h3",{children:"All Workouts"}),e.jsxs("div",{className:"list-stack",children:[Fe.length===0&&e.jsx("p",{className:"muted",children:"No workouts logged yet."}),Fe.map(t=>e.jsxs("article",{className:"workout-row",children:[e.jsxs("div",{children:[e.jsxs("p",{className:"row-title",children:[e.jsx("span",{className:`type-dot ${J(t.type).color}`})," ",t.type]}),e.jsxs("p",{className:"muted",children:[t.date," · ",t.amount??t.durationMin," ",t.unit||"min"," · ",t.sets??1," sets"]})]}),e.jsxs("div",{className:"row-actions compact",children:[e.jsxs("strong",{children:[t.caloriesBurned," kcal"]}),e.jsx("button",{type:"button",className:"btn-muted",onClick:()=>pt(t),children:"Edit"}),e.jsx("button",{type:"button",className:"btn-danger",onClick:()=>a.deleteWorkout(t.id),children:"Delete"})]})]},t.id))]})]}),r==="nutrition"&&e.jsxs("section",{className:"dashboard-grid",children:[e.jsxs("div",{className:"glass-card",children:[e.jsx("h3",{children:"Today Food"}),e.jsxs("div",{className:"list-stack",children:[te.length===0&&e.jsx("p",{className:"muted",children:"No food logged today."}),te.map(t=>e.jsxs("article",{className:"workout-row",children:[e.jsxs("div",{children:[e.jsx("p",{className:"row-title",children:t.meal}),e.jsx("p",{className:"muted",children:t.date})]}),e.jsxs("div",{className:"row-actions compact",children:[e.jsxs("strong",{children:[t.caloriesConsumed," kcal"]}),e.jsx("button",{type:"button",className:"btn-muted",onClick:()=>Ge(t),children:"Edit"}),e.jsx("button",{type:"button",className:"btn-danger",onClick:()=>a.deleteFoodLog(t.id),children:"Delete"})]})]},t.id))]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Total Today"}),e.jsxs("strong",{children:[he," kcal"]})]}),e.jsx("h4",{className:"subhead",children:"7-Day Intake vs Burn"}),e.jsx(ve,{values:ae.consumed,labels:ae.labels,colorClass:"bar-cyan"}),e.jsx(ve,{values:ae.burned,labels:ae.labels,colorClass:"bar-green"})]}),e.jsxs("div",{className:"glass-card",children:[e.jsx("h3",{children:"Recent Food Logs"}),e.jsx("div",{className:"list-stack",children:nt.slice(0,10).map(t=>e.jsxs("article",{className:"workout-row",children:[e.jsxs("div",{children:[e.jsx("p",{className:"row-title",children:t.meal}),e.jsx("p",{className:"muted",children:t.date})]}),e.jsxs("div",{className:"row-actions compact",children:[e.jsxs("strong",{children:[t.caloriesConsumed," kcal"]}),e.jsx("button",{type:"button",className:"btn-muted",onClick:()=>Ge(t),children:"Edit"}),e.jsx("button",{type:"button",className:"btn-danger",onClick:()=>a.deleteFoodLog(t.id),children:"Delete"})]})]},t.id))})]})]}),r==="progress"&&e.jsxs("section",{className:"dashboard-grid",children:[e.jsxs("div",{className:"glass-card",children:[e.jsx("h3",{children:"Weight Progress"}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Current"}),e.jsxs("strong",{children:[M.toFixed(1)," kg"]})]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Goal"}),e.jsxs("strong",{children:[Number(s.goals.goalWeight).toFixed(1)," kg"]})]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Change"}),e.jsxs("strong",{children:[(M-Q).toFixed(1)," kg"]})]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Remaining"}),e.jsxs("strong",{children:[b.remainingKg.toFixed(1)," kg"]})]}),e.jsx("h4",{className:"subhead",children:"Weight Trend (recent)"}),e.jsx(ve,{values:Pe.values.map(t=>Math.round(t*10)),labels:Pe.labels,colorClass:"bar-purple"})]}),e.jsxs("div",{className:"glass-card",children:[e.jsx("h3",{children:"Weight History"}),e.jsx("div",{className:"list-stack",children:D.map(t=>e.jsxs("article",{className:"workout-row",children:[e.jsx("span",{children:t.date}),e.jsxs("div",{className:"row-actions compact",children:[e.jsxs("strong",{children:[Number(t.weight).toFixed(1)," kg"]}),e.jsx("button",{type:"button",className:"btn-muted",onClick:()=>xt(t),children:"Edit"}),e.jsx("button",{type:"button",className:"btn-danger",onClick:()=>a.deleteWeightLog(t.id),children:"Delete"})]})]},t.id))})]})]}),r==="calendar"&&e.jsxs("section",{className:"glass-card",children:[e.jsx("h3",{children:"Activity Heatmap"}),e.jsx("p",{className:"muted",children:"Last 12 weeks of activity"}),e.jsx("div",{className:"heatmap-grid",children:lt.map(t=>e.jsx("div",{className:`heat-cell ${t.level}`,title:`${t.date}: ${t.burn} kcal`},t.date))}),e.jsxs("div",{className:"legend-row",children:[e.jsx("span",{children:"Less"}),e.jsx("span",{className:"heat-cell lv0"}),e.jsx("span",{className:"heat-cell lv1"}),e.jsx("span",{className:"heat-cell lv2"}),e.jsx("span",{className:"heat-cell lv3"}),e.jsx("span",{className:"heat-cell lv4"}),e.jsx("span",{children:"More"})]})]}),r==="timer"&&e.jsxs("section",{className:"dashboard-grid",children:[e.jsxs("div",{className:"glass-card",children:[e.jsx("h3",{children:"Workout Timer"}),e.jsx("div",{className:"timer-value",children:Je(w)}),e.jsx("p",{className:"muted",children:c}),e.jsx("div",{className:"field-grid",children:e.jsx("select",{value:c,onChange:t=>h(t.target.value),children:ie.map(t=>e.jsxs("option",{value:t.name,children:[t.icon," ",t.name]},t.name))})}),e.jsxs("div",{className:"timer-controls",children:[e.jsx("button",{type:"button",onClick:()=>ke(t=>!t),children:le?"Pause":"Start"}),e.jsx("button",{type:"button",onClick:()=>{ke(!1),Ne(0),Ce([])},children:"Reset"}),e.jsx("button",{type:"button",onClick:()=>{w>0&&Ce(t=>[...t,Je(w)])},children:"Lap"})]}),e.jsxs("p",{className:"muted",children:["Estimated burn: ",ct," kcal"]})]}),e.jsxs("div",{className:"glass-card",children:[e.jsx("h3",{children:"Lap Times"}),e.jsxs("div",{className:"list-stack",children:[we.length===0&&e.jsx("p",{className:"muted",children:"No laps recorded."}),we.map((t,i)=>e.jsxs("article",{className:"workout-row",children:[e.jsxs("span",{children:["Lap ",i+1]}),e.jsx("strong",{children:t})]},`${t}-${i}`))]})]})]}),r==="search"&&e.jsxs("section",{className:"glass-card",children:[e.jsx("h3",{children:"Search"}),e.jsx("input",{type:"text",placeholder:"Search workouts and meals",value:B,onChange:t=>f(t.target.value)}),e.jsxs("div",{className:"list-stack",style:{marginTop:12},children:[B.trim()&&Ae.length===0&&e.jsx("p",{className:"muted",children:"No results found."}),Ae.map((t,i)=>e.jsxs("article",{className:"workout-row",children:[e.jsx("span",{children:t.kind}),e.jsx("strong",{children:t.label})]},`${t.kind}-${i}`))]})]}),r==="notifications"&&e.jsxs("section",{className:"glass-card",children:[e.jsx("h3",{children:"Notifications"}),e.jsx("div",{className:"list-stack",style:{marginTop:12},children:ms.map((t,i)=>e.jsxs("article",{className:"notif-row",children:[e.jsx("span",{className:`notif-dot ${t.read?"read":""}`}),e.jsxs("div",{children:[e.jsx("p",{children:t.text}),e.jsx("p",{className:"muted",children:t.time})]})]},`${t.time}-${i}`))})]}),r==="settings"&&e.jsxs("section",{className:"glass-card",children:[e.jsx("h3",{children:"Settings"}),e.jsxs("div",{className:"settings-grid",children:[e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Daily reminders"}),e.jsx("p",{className:"muted",children:"Get prompted to log workouts"})]}),e.jsx("button",{type:"button",onClick:()=>Y("remind"),children:s.settings.remind?"ON":"OFF"})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Achievement alerts"}),e.jsx("p",{className:"muted",children:"Celebrate your milestones"})]}),e.jsx("button",{type:"button",onClick:()=>Y("achieve"),children:s.settings.achieve?"ON":"OFF"})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Imperial units"}),e.jsx("p",{className:"muted",children:"Switch to lbs"})]}),e.jsx("button",{type:"button",onClick:()=>Y("imperial"),children:s.settings.imperial?"ON":"OFF"})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Show BMR in header"}),e.jsx("p",{className:"muted",children:"Display passive burn metric"})]}),e.jsx("button",{type:"button",onClick:()=>Y("bmr"),children:s.settings.bmr?"ON":"OFF"})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Optimized calorie engine"}),e.jsx("p",{className:"muted",children:"Recompute legacy workouts for consistent active burn"})]}),e.jsx("button",{type:"button",onClick:()=>Y("useNormalizedCalories"),children:ue?"ON":"OFF"})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Averaging window"}),e.jsx("p",{className:"muted",children:"Stabilize trends with 7 or 14 day averages"})]}),e.jsxs("div",{className:"row-actions compact",children:[e.jsx("button",{type:"button",className:F===7?"":"btn-muted",onClick:()=>a.updateSettings({avgWindowDays:7}),children:"7D"}),e.jsx("button",{type:"button",className:F===14?"":"btn-muted",onClick:()=>a.updateSettings({avgWindowDays:14}),children:"14D"})]})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Prediction horizon"}),e.jsx("p",{className:"muted",children:"Future chart projection length"})]}),e.jsxs("div",{className:"row-actions compact",children:[e.jsx("button",{type:"button",className:_===30?"":"btn-muted",onClick:()=>a.updateSettings({projectionDays:30}),children:"30D"}),e.jsx("button",{type:"button",className:_===60?"":"btn-muted",onClick:()=>a.updateSettings({projectionDays:60}),children:"60D"}),e.jsx("button",{type:"button",className:_===90?"":"btn-muted",onClick:()=>a.updateSettings({projectionDays:90}),children:"90D"})]})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Export Data"}),e.jsx("p",{className:"muted",children:"Download JSON backup"})]}),e.jsx("button",{type:"button",onClick:bt,children:"Export"})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Clear All Data"}),e.jsx("p",{className:"muted",children:"Reset app state"})]}),e.jsx("button",{type:"button",className:"btn-danger",onClick:a.clearAllData,children:"Clear"})]})]})]}),e.jsxs("div",{className:`fab-wrap ${De?"open":""}`,children:[e.jsxs("div",{className:"fab-menu",children:[e.jsx("button",{type:"button",onClick:()=>q("log"),className:"fab-action",children:"Log Workout"}),e.jsx("button",{type:"button",onClick:()=>q("nutrition"),className:"fab-action",children:"Log Meal"}),e.jsx("button",{type:"button",onClick:()=>q("progress"),className:"fab-action",children:"Log Weight"}),e.jsx("button",{type:"button",onClick:()=>q("timer"),className:"fab-action",children:"Start Timer"})]}),e.jsx("button",{type:"button",className:"fab-main",onClick:()=>Me(t=>!t),children:De?"x":"+"})]})]})})}yt(document.getElementById("root")).render(e.jsx(vt.StrictMode,{children:e.jsx(ls,{children:e.jsx(hs,{})})}));export{H as G};
