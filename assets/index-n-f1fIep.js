const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./SmoothChart-Bzq9txO8.js","./vendor-react-FHh92Bil.js","./vendor-styled-D-ltm6R4.js","./vendor-recharts-DcuaQFcX.js","./vendor-motion-wE3iTBmK.js"])))=>i.map(i=>d[i]);
import{j as e,r as n,c as kt,R as wt}from"./vendor-react-FHh92Bil.js";import{S as Ct,g as x,E as Mt}from"./vendor-styled-D-ltm6R4.js";import{m as K}from"./vendor-motion-wE3iTBmK.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const h of l.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&c(h)}).observe(document,{childList:!0,subtree:!0});function r(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function c(o){if(o.ep)return;o.ep=!0;const l=r(o);fetch(o.href,l)}})();const Dt="modulepreload",Wt=function(s,a){return new URL(s,a).href},Je={},St=function(a,r,c){let o=Promise.resolve();if(r&&r.length>0){const h=document.getElementsByTagName("link"),m=document.querySelector("meta[property=csp-nonce]"),k=(m==null?void 0:m.nonce)||(m==null?void 0:m.getAttribute("nonce"));o=Promise.allSettled(r.map(f=>{if(f=Wt(f,c),f in Je)return;Je[f]=!0;const j=f.endsWith(".css"),L=j?'[rel="stylesheet"]':"";if(!!c)for(let w=h.length-1;w>=0;w--){const $=h[w];if($.href===f&&(!j||$.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${L}`))return;const N=document.createElement("link");if(N.rel=j?"stylesheet":Dt,j||(N.as="script"),N.crossOrigin="",N.href=f,k&&N.setAttribute("nonce",k),document.head.appendChild(N),j)return new Promise((w,$)=>{N.addEventListener("load",w),N.addEventListener("error",()=>$(new Error(`Unable to preload CSS for ${f}`)))})}))}function l(h){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=h,window.dispatchEvent(m),!m.defaultPrevented)throw h}return o.then(h=>{for(const m of h||[])m.status==="rejected"&&l(m.reason);return a().catch(l)})},Tt=Ct`
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
`,Lt=x(K.div)`
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
`,$t=x.header`
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
`,Ft=x(K.div)`
  position: relative;
  z-index: 1;
`,At={hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.08,delayChildren:.08}}};function Rt({children:s,title:a,subtitle:r,theme:c}){return e.jsxs(e.Fragment,{children:[e.jsx(Tt,{}),e.jsxs(Lt,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},"data-theme":c,children:[e.jsxs($t,{children:[e.jsx("p",{children:r}),e.jsx("h2",{children:a})]}),e.jsx(Ft,{variants:At,initial:"hidden",animate:"show",children:s})]})]})}const Ze=Mt`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;x.div`
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  position: relative;
  border-radius: 1.25rem;
  isolation: isolate;
`;x.div`
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
  animation: ${Ze} 5.5s linear infinite;
`;x.div`
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
    animation: ${Ze} 4.2s linear infinite;
  }
`;x.div`
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
`;x.p`
  margin: 0;
  color: #7dd3fc;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.66rem;
`;x.h3`
  margin: 0.45rem 0 0;
  font-size: clamp(1.05rem, 3.2vw, 1.35rem);
`;x.div`
  margin-top: 0.8rem;
`;function U({children:s,compact:a=!1,className:r=""}){const c=["card-wrapper",r].filter(Boolean).join(" ");return e.jsx(K.div,{className:c,initial:{opacity:0,y:20},animate:{opacity:1,y:0},whileHover:{scale:1.015,y:-3},transition:{duration:.45,ease:"easeOut"},children:e.jsx("article",{className:"card",children:e.jsx("div",{className:"card-content",style:{padding:a?"14px":"18px"},children:s})})})}const Et=x.ul`
  margin: 0.9rem 0 0;
  padding-left: 1rem;
  display: grid;
  gap: 0.55rem;

  li {
    color: var(--muted-text);
    line-height: 1.45;
  }
`;function Pt({insights:s}){return e.jsxs(U,{children:[e.jsx("h3",{children:"Insights"}),e.jsx(Et,{children:s.map((a,r)=>e.jsx("li",{children:a},`${a}-${r}`))})]})}const It=x(K.button)`
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
`;function H({children:s,type:a="button",...r}){return e.jsx(It,{type:a,whileHover:{scale:1.04},whileTap:{scale:.98},animate:{boxShadow:["0 10px 24px rgba(79, 70, 229, 0.4), 0 0 20px rgba(34, 211, 238, 0.28)","0 14px 30px rgba(79, 70, 229, 0.52), 0 0 26px rgba(52, 211, 153, 0.35)","0 10px 24px rgba(79, 70, 229, 0.4), 0 0 20px rgba(34, 211, 238, 0.28)"]},transition:{duration:2.2,repeat:1/0,ease:"easeInOut"},...r,children:s})}const Bt=x.nav`
  display: flex;
  gap: 0.65rem;
  overflow-x: auto;
  align-items: center;
  padding: 0.85rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: var(--glass-bg-strong);
  backdrop-filter: blur(16px);
`,Ot=x.button`
  border: 1px solid ${s=>s.active?"rgba(34, 211, 238, 0.42)":"rgba(255, 255, 255, 0.12)"};
  background: ${s=>s.active?"linear-gradient(120deg, rgba(79, 70, 229, 0.55), rgba(34, 211, 238, 0.42))":"rgba(255, 255, 255, 0.03)"};
  color: var(--tab-text, #eef2ff);
  text-transform: capitalize;
  border-radius: 999px;
  padding: 0.52rem 0.95rem;
  white-space: nowrap;
  cursor: pointer;
`,Gt=x.div`
  margin-left: auto;
`;function zt({pages:s,page:a,onNavigate:r,isLight:c,onToggleTheme:o}){return e.jsxs(Bt,{children:[s.map(l=>e.jsx(Ot,{active:l===a,onClick:()=>r(l),children:l},l)),e.jsx(Gt,{}),e.jsx(H,{onClick:o,children:c?"Dark Mode":"Light Mode"})]})}const Ht=x(K.div)`
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
`,Ut=x.span`
  color: rgba(239, 244, 255, 0.86);
  font-size: 0.84rem;
`;function Kt({calories:s,trend:a}){return e.jsxs(Ht,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{delay:.2,duration:.4},children:[e.jsx("strong",{children:"Now Tracking"}),e.jsxs(Ut,{children:[Math.round(Number(s)||0)," kcal net · ",a]})]})}const _t=x.div`
  width: 132px;
  height: 132px;
  display: grid;
  place-items: center;
  position: relative;
`,Yt=x.div`
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
`;function Jt({value:s}){const a=Math.max(0,Math.min(100,Number(s)||0)),r=52,c=10,o=r-c/2,l=o*2*Math.PI,h=l-a/100*l,m=n.useId();return e.jsxs(_t,{children:[e.jsxs("svg",{width:r*2,height:r*2,children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:m,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#22D3EE"}),e.jsx("stop",{offset:"52%",stopColor:"#A78BFA"}),e.jsx("stop",{offset:"100%",stopColor:"#34D399"})]})}),e.jsx("circle",{stroke:"rgba(255,255,255,0.16)",fill:"transparent",strokeWidth:c,r:o,cx:r,cy:r}),e.jsx(K.circle,{stroke:`url(#${m})`,fill:"transparent",strokeWidth:c,strokeLinecap:"round",r:o,cx:r,cy:r,style:{transform:"rotate(-90deg)",transformOrigin:"50% 50%"},strokeDasharray:`${l} ${l}`,initial:{strokeDashoffset:l},animate:{strokeDashoffset:h},transition:{duration:1.1,ease:"easeOut"}})]}),e.jsxs(Yt,{children:[e.jsxs("strong",{children:[a.toFixed(0),"%"]}),e.jsx("span",{children:"On Track"})]})]})}const ve=x.form`
  margin-top: 1rem;
  display: grid;
  gap: 0.65rem;

  h4 {
    margin: 0;
    font-size: 0.95rem;
  }
`,Ne=x.div`
  display: grid;
  gap: 0.55rem;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
`,I=x.input`
  width: 100%;
`,qt=x.select`
  width: 100%;
`,Vt=x.p`
  margin: 0;
  color: var(--muted-text);
  font-size: 0.79rem;
`,ke=x.div`
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
`;function Qt({workoutForm:s,foodForm:a,weightForm:r,setWorkoutForm:c,setFoodForm:o,setWeightForm:l,handleAddWorkout:h,handleAddFood:m,handleAddWeight:k,workoutEstimatedCals:f,currentWorkoutMeta:j,workoutLibrary:L,editingWorkoutId:F,editingFoodId:N,editingWeightId:w,resetWorkoutForm:$,resetFoodForm:E,resetWeightForm:_}){return e.jsxs(U,{children:[e.jsx("h3",{children:"Quick Log"}),e.jsxs(ve,{onSubmit:h,children:[e.jsx("h4",{children:F?"Edit Workout":"Add Workout"}),e.jsxs(Ne,{children:[e.jsx(I,{type:"date",value:s.date,onChange:d=>c(u=>({...u,date:d.target.value}))}),e.jsx(qt,{value:s.type,onChange:d=>c(u=>({...u,type:d.target.value})),children:L.map(d=>e.jsxs("option",{value:d.name,children:[d.icon," ",d.name]},d.name))}),e.jsx(I,{type:"number",placeholder:`Amount (${j.unit})`,value:s.amount,onChange:d=>c(u=>({...u,amount:d.target.value}))}),e.jsx(I,{type:"number",min:"1",placeholder:"Sets",value:s.sets,onChange:d=>c(u=>({...u,sets:d.target.value}))}),e.jsx(I,{type:"text",value:`${f} kcal (auto)`,readOnly:!0})]}),e.jsx(Vt,{children:"Formula uses MET x body weight x duration. Daily predictions are based on net calorie balance."}),e.jsxs(ke,{children:[e.jsx(H,{type:"submit",children:F?"Update Workout":"Save Workout"}),F?e.jsx(H,{type:"button",onClick:$,children:"Cancel"}):null]})]}),e.jsxs(ve,{onSubmit:m,children:[e.jsx("h4",{children:N?"Edit Food":"Add Food"}),e.jsxs(Ne,{children:[e.jsx(I,{type:"date",value:a.date,onChange:d=>o(u=>({...u,date:d.target.value}))}),e.jsx(I,{type:"text",placeholder:"Meal",value:a.meal,onChange:d=>o(u=>({...u,meal:d.target.value}))}),e.jsx(I,{type:"number",placeholder:"Calories consumed",value:a.caloriesConsumed,onChange:d=>o(u=>({...u,caloriesConsumed:d.target.value}))})]}),e.jsxs(ke,{children:[e.jsx(H,{type:"submit",children:N?"Update Food":"Save Food"}),N?e.jsx(H,{type:"button",onClick:E,children:"Cancel"}):null]})]}),e.jsxs(ve,{onSubmit:k,children:[e.jsx("h4",{children:w?"Edit Weight":"Add Weight"}),e.jsxs(Ne,{children:[e.jsx(I,{type:"date",value:r.date,onChange:d=>l(u=>({...u,date:d.target.value}))}),e.jsx(I,{type:"number",step:"0.1",placeholder:"Weight kg",value:r.weight,onChange:d=>l(u=>({...u,weight:d.target.value}))})]}),e.jsxs(ke,{children:[e.jsx(H,{type:"submit",children:w?"Update Weight":"Save Weight"}),w?e.jsx(H,{type:"button",onClick:_,children:"Cancel"}):null]})]})]})}const Xt=x.h3`
  margin: 0.4rem 0;
  font-size: 1.35rem;
  color: #f8fbff;
`,Zt=x.p`
  margin: 0;
  color: var(--muted-text);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`,es=x.p`
  margin: 0;
  color: var(--muted-text);
  font-size: 0.8rem;
`;function ts({label:s,value:a,hint:r}){return e.jsxs(U,{compact:!0,children:[e.jsx(Zt,{children:s}),e.jsx(Xt,{children:a}),e.jsx(es,{children:r})]})}const ss=x.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`,as=x.article`
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
`,qe=x.p`
  margin: 0.25rem 0 0;
  color: var(--muted-text);
  font-size: 0.82rem;
`;function rs({workouts:s}){return e.jsxs(U,{children:[e.jsx(ss,{children:e.jsx("h3",{children:"Workout Feed"})}),s.length?null:e.jsx(qe,{children:"No workouts logged yet."}),s.map(a=>e.jsxs(as,{children:[e.jsxs("div",{children:[e.jsx("strong",{children:a.type}),e.jsxs(qe,{children:[a.date," · ",Math.round(Number(a.durationMin)||0)," min"]})]}),e.jsxs("strong",{children:[Math.round(Number(a.caloriesBurned)||0)," kcal"]})]},a.id))]})}const Ce="fittrack-premium-v1",v={profile:{name:"Athlete",age:28,heightCm:172,currentWeight:78,gender:"male"},goals:{goalWeight:70,weeklyWorkoutTarget:5},settings:{remind:!0,achieve:!0,imperial:!1,bmr:!0,useNormalizedCalories:!0,avgWindowDays:7,projectionDays:30},workouts:[],foodLogs:[],weightHistory:[]};function ns(){return{profile:{...v.profile},goals:{...v.goals},settings:{...v.settings},workouts:[],foodLogs:[],weightHistory:[]}}const et=n.createContext(null);function os(){try{const s=localStorage.getItem(Ce);if(!s)return v;const a=JSON.parse(s);return{...v,...a,profile:{...v.profile,...a.profile||{}},goals:{...v.goals,...a.goals||{}},settings:{...v.settings,...a.settings||{}},workouts:Array.isArray(a.workouts)?a.workouts:v.workouts,foodLogs:Array.isArray(a.foodLogs)?a.foodLogs:v.foodLogs,weightHistory:Array.isArray(a.weightHistory)?a.weightHistory:v.weightHistory}}catch{return v}}function is(s){return!s||typeof s!="object"?v:{...v,...s,profile:{...v.profile,...s.profile||{}},goals:{...v.goals,...s.goals||{}},settings:{...v.settings,...s.settings||{}},workouts:Array.isArray(s.workouts)?s.workouts:v.workouts,foodLogs:Array.isArray(s.foodLogs)?s.foodLogs:v.foodLogs,weightHistory:Array.isArray(s.weightHistory)?s.weightHistory:v.weightHistory}}function ls({children:s}){const[a,r]=n.useState(os);n.useEffect(()=>{localStorage.setItem(Ce,JSON.stringify(a))},[a]);const c=n.useCallback(d=>{r(u=>({...u,profile:{...u.profile,...d}}))},[]),o=n.useCallback(d=>{r(u=>({...u,goals:{...u.goals,...d}}))},[]),l=n.useCallback(d=>{r(u=>({...u,settings:{...u.settings,...d}}))},[]),h=n.useCallback(d=>{r(u=>({...u,workouts:[{id:crypto.randomUUID(),...d},...u.workouts]}))},[]),m=n.useCallback((d,u)=>{r(y=>({...y,workouts:y.workouts.map(S=>S.id===d?{...S,...u}:S)}))},[]),k=n.useCallback(d=>{r(u=>({...u,workouts:u.workouts.filter(y=>y.id!==d)}))},[]),f=n.useCallback(d=>{r(u=>({...u,foodLogs:[{id:crypto.randomUUID(),...d},...u.foodLogs]}))},[]),j=n.useCallback((d,u)=>{r(y=>({...y,foodLogs:y.foodLogs.map(S=>S.id===d?{...S,...u}:S)}))},[]),L=n.useCallback(d=>{r(u=>({...u,foodLogs:u.foodLogs.filter(y=>y.id!==d)}))},[]),F=n.useCallback(d=>{r(u=>({...u,weightHistory:[{id:crypto.randomUUID(),...d},...u.weightHistory]}))},[]),N=n.useCallback((d,u)=>{r(y=>({...y,weightHistory:y.weightHistory.map(S=>S.id===d?{...S,...u}:S)}))},[]),w=n.useCallback(d=>{r(u=>({...u,weightHistory:u.weightHistory.filter(y=>y.id!==d)}))},[]),$=n.useCallback(()=>{localStorage.removeItem(Ce),r(ns())},[]),E=n.useCallback(d=>{r(is(d))},[]),_=n.useMemo(()=>({state:a,actions:{updateProfile:c,updateGoals:o,updateSettings:l,addWorkout:h,updateWorkout:m,deleteWorkout:k,addFoodLog:f,updateFoodLog:j,deleteFoodLog:L,addWeightLog:F,updateWeightLog:N,deleteWeightLog:w,clearAllData:$,importAllData:E}}),[a,c,o,l,h,m,k,f,j,L,F,N,w,$,E]);return e.jsx(et.Provider,{value:_,children:s})}function cs(){const s=n.useContext(et);if(!s)throw new Error("useAppState must be used within AppStateProvider");return s}const tt=7700;function ds(s){const a=Number(s==null?void 0:s.age)||0,r=Number(s==null?void 0:s.heightCm)||0,c=Number(s==null?void 0:s.currentWeight)||0,l=((s==null?void 0:s.gender)||"male").toLowerCase()==="female"?-161:5,h=10*c+6.25*r-5*a+l;return Math.max(1200,h)}function us(s,a,r){const c=Number(s)||0,o=Number(a)||0,l=Math.max(0,Number(r)||0);return Math.max(0,Math.round(c*o*l/60))}function R(s){const a=new Date(s),r=a.getFullYear(),c=String(a.getMonth()+1).padStart(2,"0"),o=String(a.getDate()).padStart(2,"0");return`${r}-${c}-${o}`}function ms(s,a,r=7){const c=new Date,o=[],l=[],h=[];for(let m=r-1;m>=0;m-=1){const k=new Date(c);k.setDate(c.getDate()-m);const f=R(k);o.push(f),l.push(s.filter(j=>j.date===f).reduce((j,L)=>j+(Number(L.caloriesBurned)||0),0)),h.push(a.filter(j=>j.date===f).reduce((j,L)=>j+(Number(L.caloriesConsumed)||0),0))}return{labels:o,burned:l,consumed:h}}function hs({currentWeight:s,goalWeight:a,avgBurned:r,avgConsumed:c}){const o=r-c,l=o/tt,h=Math.max(0,s-a);let m=1/0;return h<=0?m=0:l>0&&(m=Math.ceil(h/l)),{dailyDeficit:o,dailyWeightLoss:l,daysToGoal:m,remainingKg:h}}function Ve(s,a,r){if(s<=0)return 0;const c=a+r;if(c<=0)return 1/0;const o=c/tt;return Math.ceil(s/o)}function gs({startDate:s,currentWeight:a,dailyWeightLoss:r,days:c=30}){const o=new Date(`${s}T00:00:00`),l=[];let h=a;for(let m=1;m<=c;m+=1){const k=new Date(o);k.setDate(o.getDate()+m),h=Math.max(0,h-r),l.push({date:R(k),weight:Number(h.toFixed(2))})}return l}const ps=["dashboard","log","workouts","nutrition","progress","calendar","timer","search","notifications","settings"],xs=n.lazy(()=>St(()=>import("./SmoothChart-Bzq9txO8.js"),__vite__mapDeps([0,1,2,3,4]),import.meta.url)),ue=[{name:"Running",icon:"🏃",unit:"min",mode:"time",met:9.8,color:"violet"},{name:"Walking",icon:"🚶",unit:"steps",mode:"count",met:3.5,secPerRep:.5,color:"cyan"},{name:"Cycling",icon:"🚴",unit:"min",mode:"time",met:7.5,color:"teal"},{name:"Swimming",icon:"🏊",unit:"min",mode:"time",met:7,color:"blue"},{name:"HIIT",icon:"⚡",unit:"min",mode:"time",met:10,color:"orange"},{name:"Strength",icon:"🏋️",unit:"min",mode:"time",met:5,color:"amber"},{name:"Yoga",icon:"🧘",unit:"min",mode:"time",met:2.5,color:"green"},{name:"Jump Rope",icon:"🪢",unit:"jumps",mode:"count",met:12.3,secPerRep:.5,color:"pink"},{name:"Push-ups",icon:"💪",unit:"reps",mode:"count",met:3.8,secPerRep:2,color:"red"},{name:"Plank",icon:"🧱",unit:"sec",mode:"time-sec",met:4,color:"indigo"},{name:"Squats",icon:"🦵",unit:"reps",mode:"count",met:5,secPerRep:3,color:"emerald"}],bs=[{text:"Great job. You hit your calorie burn goal yesterday.",time:"2h ago",read:!1},{text:"Your 7-day streak is going strong. Keep it up.",time:"1d ago",read:!1},{text:"New workout recommendation available.",time:"2d ago",read:!0},{text:"Increase active minutes to accelerate goal timeline.",time:"4d ago",read:!0}];function ce(s){const a=new Date(`${s}T00:00:00`);return`${a.getMonth()+1}/${a.getDate()}`}function Qe(s){const a=Math.floor(s/3600),r=Math.floor(s%3600/60),c=s%60;return[a,r,c].map(o=>String(o).padStart(2,"0")).join(":")}function X(s){return ue.find(a=>a.name===s)||ue[0]}function de(s,a,r,c=1){const o=X(s),l=Number(a)||0,h=Math.max(1,Number(c)||1);let m=0;return o.mode==="time"?m=l:o.mode==="time-sec"?m=l/60:m=l*(Number(o.secPerRep)||2)/60,m*=h,us(o.met,r,m)}function Xe(s,a,r=1){const c=X(s),o=Number(a)||0,l=Math.max(1,Number(r)||1);return c.mode==="time"?o*l:c.mode==="time-sec"?o/60*l:o*(Number(c.secPerRep)||2)/60*l}function we({values:s,labels:a,colorClass:r="bar-purple"}){const c=Math.max(1,...s);return e.jsx("div",{className:"mini-bars",children:s.map((o,l)=>e.jsxs("div",{className:"mini-col-wrap",title:`${a[l]}: ${o}`,children:[e.jsx("div",{className:`mini-col ${r}`,style:{height:`${Math.max(8,o/c*100)}%`}}),e.jsx("span",{children:a[l]})]},`${a[l]}-${l}`))})}function fs(){var Ue,Ke,_e,Ye;const{state:s,actions:a}=cs(),[r,c]=n.useState("dashboard"),[o,l]=n.useState({date:R(new Date),type:"Running",amount:40,sets:1}),[h,m]=n.useState({date:R(new Date),meal:"Meal",caloriesConsumed:650}),[k,f]=n.useState({date:R(new Date),weight:s.profile.currentWeight}),[j,L]=n.useState(null),[F,N]=n.useState(null),[w,$]=n.useState(null),[E,_]=n.useState(""),[d,u]=n.useState("Running"),[y,S]=n.useState(0),[me,Me]=n.useState(!1),[De,We]=n.useState([]),[Se,Te]=n.useState(!1),[Y,st]=n.useState("dark"),Le=n.useRef(null),[B,J]=n.useState({name:s.profile.name,age:s.profile.age,heightCm:s.profile.heightCm,gender:s.profile.gender||"male"}),[Z,he]=n.useState({goalWeight:s.goals.goalWeight,weeklyWorkoutTarget:s.goals.weeklyWorkoutTarget}),[ee,O]=n.useState(""),ge=((Ue=s.settings)==null?void 0:Ue.useNormalizedCalories)!==!1,A=Math.min(30,Math.max(3,Number((Ke=s.settings)==null?void 0:Ke.avgWindowDays)||7)),q=Math.min(120,Math.max(7,Number((_e=s.settings)==null?void 0:_e.projectionDays)||30));n.useEffect(()=>{if(!me)return;const t=setInterval(()=>S(i=>i+1),1e3);return()=>clearInterval(t)},[me]),n.useEffect(()=>{J({name:s.profile.name,age:s.profile.age,heightCm:s.profile.heightCm,gender:s.profile.gender||"male"}),he({goalWeight:s.goals.goalWeight,weeklyWorkoutTarget:s.goals.weeklyWorkoutTarget})},[s.profile,s.goals]),n.useEffect(()=>{document.body.setAttribute("data-theme",Y)},[Y]);const C=n.useMemo(()=>[...s.weightHistory].sort((t,i)=>new Date(`${t.date}T00:00:00`)-new Date(`${i.date}T00:00:00`)),[s.weightHistory]),M=n.useMemo(()=>{const t=C.length?Number(C[C.length-1].weight):Number(s.profile.currentWeight);return Number.isFinite(t)?t:0},[C,s.profile.currentWeight]),te=n.useMemo(()=>{const t=C.length?Number(C[0].weight):Number(s.profile.currentWeight);return Number.isFinite(t)?t:M},[C,s.profile.currentWeight,M]),$e=n.useMemo(()=>{const t=Number(s.profile.currentWeight)||70;return s.workouts.map(i=>{const g=X(i.type),p=Math.max(1,Number(i.sets)||1);let W=Number(i.amount);if(!Number.isFinite(W)||W<=0){const P=Math.max(0,Number(i.durationMin)||0);g.mode==="time"?W=P/p:g.mode==="time-sec"?W=P*60/p:W=P*60/(Number(g.secPerRep)||2)/p}const le=de(i.type,W,t,p),z=Xe(i.type,W,p);return{...i,amount:W,sets:p,durationMin:z,caloriesBurned:le}})},[s.workouts,s.profile.currentWeight]),T=n.useMemo(()=>ge?$e:s.workouts,[ge,$e,s.workouts]),D=n.useMemo(()=>ms(T,s.foodLogs,A),[T,s.foodLogs,A]),Fe=n.useMemo(()=>D.burned.reduce((t,i)=>t+i,0)/D.burned.length,[D]),se=n.useMemo(()=>D.consumed.reduce((t,i)=>t+i,0)/D.consumed.length,[D]),G=n.useMemo(()=>ds(s.profile),[s.profile]),ae=n.useMemo(()=>{const t=Math.max(1,D.burned.length);return D.burned.reduce((g,p)=>g+G+p,0)/t},[D,G]),b=n.useMemo(()=>hs({currentWeight:M,goalWeight:Number(s.goals.goalWeight),avgBurned:ae,avgConsumed:se}),[M,s.goals.goalWeight,ae,se]),at=n.useMemo(()=>{const t=Number(s.goals.goalWeight);if(!Number.isFinite(t))return 0;const i=t-te;if(Math.abs(i)>=.001){const g=M-te,p=g/i*100;if(Number.isFinite(p)&&Math.abs(g)>=.001)return Math.min(100,Math.max(0,p))}if(t>0&&M>0){const g=t<M?t/M*100:M/t*100;if(Number.isFinite(g))return Math.min(100,Math.max(0,g))}return Math.abs(i)<.001?100:0},[te,M,s.goals.goalWeight]),Ae=n.useMemo(()=>{const t=C.length?C[C.length-1].date:R(new Date);return gs({startDate:t,currentWeight:M,dailyWeightLoss:b.dailyWeightLoss,days:q})},[C,M,b.dailyWeightLoss,q]),rt=n.useMemo(()=>{const t=C.map(g=>({date:ce(g.date),actual:Number(g.weight),predicted:null})),i=Ae.map(g=>({date:ce(g.date),actual:null,predicted:g.weight}));return[...t,...i]},[C,Ae]),nt=n.useMemo(()=>T.slice(0,6),[T]),Re=n.useMemo(()=>T,[T]),ot=n.useMemo(()=>s.foodLogs,[s.foodLogs]),pe=n.useMemo(()=>{const t=new Set(D.labels);return T.filter(i=>t.has(i.date)).length},[T,D.labels]),re=R(new Date),ne=n.useMemo(()=>s.foodLogs.filter(t=>t.date===re),[s.foodLogs,re]),xe=n.useMemo(()=>ne.reduce((t,i)=>t+(Number(i.caloriesConsumed)||0),0),[ne]),oe=n.useMemo(()=>T.filter(t=>t.date===re).reduce((t,i)=>t+(Number(i.caloriesBurned)||0),0),[T,re]),Ee=n.useMemo(()=>G+oe,[G,oe]),be=n.useMemo(()=>Ee-xe,[Ee,xe]),it=n.useMemo(()=>{const t=[];return b.daysToGoal===0?t.push("Goal achieved. Maintain this trend with a balanced routine."):b.dailyDeficit>0?t.push("You are in a calorie deficit. Keep this pace for steady fat loss."):t.push("You are currently in a calorie surplus. Reduce intake or increase burn."),pe>=s.goals.weeklyWorkoutTarget?t.push("Great consistency this week. You have met your workout target."):t.push(`You are ${s.goals.weeklyWorkoutTarget-pe} workouts away from your weekly target.`),b.daysToGoal===0?t.push("Your projected timeline is complete for the current goal."):Number.isFinite(b.daysToGoal)?t.push(`At current pace, you may reach your goal in about ${b.daysToGoal} days.`):t.push("No progress expected at this intake and burn level. Increase burn or reduce calories."),t},[b,pe,s.goals.weeklyWorkoutTarget]),fe=n.useMemo(()=>Ve(b.remainingKg,b.dailyDeficit,200),[b.remainingKg,b.dailyDeficit]),je=n.useMemo(()=>Ve(b.remainingKg,b.dailyDeficit,400),[b.remainingKg,b.dailyDeficit]),lt=n.useMemo(()=>[{label:"Passive Burn (BMR)",value:`${Math.round(G)} kcal`,hint:"Per day from profile and gender"},{label:"Today Active Burn",value:`${Math.round(oe)} kcal`,hint:"Today workouts only"},{label:`Active Burn / Day (${A}D Avg)`,value:`${Math.round(Fe)} kcal`,hint:`Rolling ${A}-day active average`},{label:`Total Burn / Day (${A}D Avg)`,value:`${Math.round(ae)} kcal`,hint:"BMR + active average"},{label:`Avg Intake / Day (${A}D)`,value:`${Math.round(se)} kcal`,hint:`Rolling ${A}-day food average`},{label:`Net Balance / Day (${A}D Avg)`,value:`${Math.round(b.dailyDeficit)} kcal`,hint:"Average total burn minus average intake"},{label:"Today Net Balance",value:`${Math.round(be)} kcal`,hint:"Today total burn minus today intake"}],[G,oe,Fe,ae,se,b.dailyDeficit,be,A]),Pe=n.useMemo(()=>{const t=E.trim().toLowerCase();if(!t)return[];const i=T.filter(p=>p.type.toLowerCase().includes(t)).slice(0,5).map(p=>({kind:"Workout",id:p.id,label:`${p.type} - ${p.caloriesBurned} kcal`})),g=s.foodLogs.filter(p=>p.meal.toLowerCase().includes(t)).slice(0,5).map(p=>({kind:"Food",id:p.id,label:`${p.meal} - ${p.caloriesConsumed} kcal`}));return[...i,...g]},[E,T,s.foodLogs]),ct=n.useMemo(()=>{const t=[],i=new Date;for(let g=11;g>=0;g-=1)for(let p=0;p<7;p+=1){const W=new Date(i);W.setDate(i.getDate()-g*7-p);const le=R(W),z=T.filter(ye=>ye.date===le).reduce((ye,Nt)=>ye+(Number(Nt.caloriesBurned)||0),0);let P="lv0";z>700?P="lv4":z>500?P="lv3":z>300?P="lv2":z>120&&(P="lv1"),t.push({date:le,burn:z,level:P})}return t},[T]),ie=n.useMemo(()=>({labels:D.labels.map(t=>ce(t)),consumed:D.consumed,burned:D.burned}),[D]),Ie=n.useMemo(()=>{const t=C.slice(-10);return{labels:t.map(i=>ce(i.date)),values:t.map(i=>Number(i.weight))}},[C]),dt=n.useMemo(()=>de(d,y/60,Number(s.profile.currentWeight)||70),[d,y,s.profile.currentWeight]),Be=n.useMemo(()=>X(o.type),[o.type]),ut=n.useMemo(()=>de(o.type,o.amount,Number(s.profile.currentWeight)||70,o.sets),[o.type,o.amount,o.sets,s.profile.currentWeight]);function Oe(){l({date:R(new Date),type:"Running",amount:40,sets:1}),L(null)}function Ge(){m({date:R(new Date),meal:"Meal",caloriesConsumed:650}),N(null)}function ze(){f({date:R(new Date),weight:s.profile.currentWeight}),$(null)}function mt(t){t.preventDefault();const i=Number(o.amount)||0,g=Math.max(1,Number(o.sets)||1),p={...o,amount:i,sets:g,unit:Be.unit,durationMin:Xe(o.type,i,g),caloriesBurned:de(o.type,i,Number(s.profile.currentWeight)||70,g)};j?a.updateWorkout(j,p):a.addWorkout(p),Oe()}function ht(t){t.preventDefault();const i={...h,caloriesConsumed:Number(h.caloriesConsumed)};F?a.updateFoodLog(F,i):a.addFoodLog(i),Ge()}function gt(t){t.preventDefault();const i=Number(k.weight),g={...k,weight:i};w?a.updateWeightLog(w,g):a.addWeightLog(g),a.updateProfile({currentWeight:i}),ze()}function pt(t){t.preventDefault(),a.updateProfile({name:B.name,age:Number(B.age)||0,heightCm:Number(B.heightCm)||0,gender:B.gender||"male"}),a.updateGoals({goalWeight:Number(Z.goalWeight)||0,weeklyWorkoutTarget:Number(Z.weeklyWorkoutTarget)||1}),O("Profile and goals saved."),setTimeout(()=>O(""),2200)}function xt(t){c("dashboard"),l({date:t.date,type:t.type,amount:t.amount??(t.unit==="sec"?Math.round((Number(t.durationMin)||0)*60):Math.round(Number(t.durationMin)||0)),sets:t.sets??1}),L(t.id)}function He(t){c("dashboard"),m({date:t.date,meal:t.meal,caloriesConsumed:t.caloriesConsumed}),N(t.id)}function bt(t){c("dashboard"),f({date:t.date,weight:t.weight}),$(t.id)}function V(t){a.updateSettings({[t]:!s.settings[t]})}function ft(){const t=new Blob([JSON.stringify(s,null,2)],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(t),i.download="fittrack-data.json",i.click()}async function jt(t){var g;const i=(g=t.target.files)==null?void 0:g[0];if(i)try{const p=await i.text(),W=JSON.parse(p);if(!W||typeof W!="object")throw new Error("Invalid JSON structure");a.importAllData(W),O("Data imported successfully.")}catch{O("Import failed. Please select a valid FitTrack JSON export.")}finally{t.target.value="",setTimeout(()=>O(""),2600)}}function yt(){window.confirm("Are you sure you want to clear all data? This cannot be undone.")&&(a.clearAllData(),O("All data cleared."),setTimeout(()=>O(""),2200))}function Q(t,i=!0){c(t),i&&Te(!1)}function vt(){st(t=>t==="dark"?"light":"dark")}return e.jsx("div",{className:"app-shell","data-theme":Y,children:e.jsxs(Rt,{title:"FitTrack Predictive Coach",subtitle:"Premium Fitness Intelligence",theme:Y,children:[e.jsx(zt,{pages:ps,page:r,onNavigate:t=>Q(t,!1),isLight:Y==="light",onToggleTheme:vt}),r==="dashboard"&&e.jsxs(e.Fragment,{children:[e.jsxs("section",{className:"premium-hero-grid apple-reveal apple-reveal-1",children:[e.jsx(U,{children:e.jsxs("div",{className:"premium-ring-head",children:[e.jsxs("div",{children:[e.jsx("p",{className:"eyebrow",children:"Goal Progress"}),e.jsxs("h3",{children:[M.toFixed(1)," kg to ",Number(s.goals.goalWeight).toFixed(1)," kg"]}),e.jsxs("p",{className:"muted",style:{marginTop:6},children:["ETA: ",b.daysToGoal===0?"Goal achieved":Number.isFinite(b.daysToGoal)?`${b.daysToGoal} days`:"No progress"]})]}),e.jsx(Jt,{value:at})]})}),e.jsxs(U,{children:[e.jsx("h3",{children:"Prediction Matrix"}),e.jsxs("div",{className:"premium-prediction-grid",children:[e.jsxs("div",{className:"prediction-item",children:[e.jsx("span",{children:"Current pace"}),e.jsx("strong",{children:b.daysToGoal===0?"Goal achieved":Number.isFinite(b.daysToGoal)?`${b.daysToGoal} days`:"No progress"})]}),e.jsxs("div",{className:"prediction-item",children:[e.jsx("span",{children:"+200 kcal/day"}),e.jsx("strong",{children:fe===0?"Goal achieved":Number.isFinite(fe)?`${fe} days`:"No progress"})]}),e.jsxs("div",{className:"prediction-item",children:[e.jsx("span",{children:"+400 kcal/day"}),e.jsx("strong",{children:je===0?"Goal achieved":Number.isFinite(je)?`${je} days`:"No progress"})]})]}),e.jsx("p",{className:"muted",style:{marginTop:10},children:b.dailyDeficit>=0?`Calorie deficit: ${Math.round(b.dailyDeficit)} kcal/day`:`Calorie surplus: ${Math.abs(Math.round(b.dailyDeficit))} kcal/day`})]})]}),e.jsx("section",{className:"premium-stat-grid apple-reveal apple-reveal-2",children:lt.map(t=>e.jsx(ts,{label:t.label,value:t.value,hint:t.hint},t.label))}),e.jsxs("section",{className:"premium-chart-grid apple-reveal apple-reveal-3",children:[e.jsx(n.Suspense,{fallback:e.jsxs(U,{children:[e.jsx("h3",{children:"Loading chart..."}),e.jsx("p",{className:"muted",children:"Preparing trend analysis."})]}),children:e.jsx(xs,{data:rt,goalWeight:Number(s.goals.goalWeight)})}),e.jsx(Pt,{insights:it})]}),e.jsxs("section",{className:"premium-chart-grid apple-reveal apple-reveal-4",children:[e.jsx(rs,{workouts:nt}),e.jsx(Qt,{workoutForm:o,foodForm:h,weightForm:k,setWorkoutForm:l,setFoodForm:m,setWeightForm:f,handleAddWorkout:mt,handleAddFood:ht,handleAddWeight:gt,workoutEstimatedCals:ut,currentWorkoutMeta:Be,workoutLibrary:ue,editingWorkoutId:j,editingFoodId:F,editingWeightId:w,resetWorkoutForm:Oe,resetFoodForm:Ge,resetWeightForm:ze})]}),e.jsx(Kt,{calories:be,trend:b.dailyDeficit>=0?"Deficit mode":"Surplus mode"}),((Ye=s.settings)==null?void 0:Ye.bmr)&&e.jsxs("p",{className:"muted",style:{marginTop:8},children:["BMR (",(s.profile.gender||"male").toLowerCase(),"): ",G," kcal/day"]})]}),r==="log"&&e.jsxs("section",{className:"glass-card profile-section",children:[e.jsx("h3",{children:"Profile and Goals"}),e.jsxs("form",{onSubmit:pt,children:[e.jsxs("div",{className:"field-grid profile-grid",children:[e.jsx("input",{type:"text",placeholder:"Name",value:B.name,onChange:t=>J(i=>({...i,name:t.target.value}))}),e.jsx("input",{type:"number",placeholder:"Age",value:B.age,onChange:t=>J(i=>({...i,age:t.target.value}))}),e.jsxs("select",{value:B.gender,onChange:t=>J(i=>({...i,gender:t.target.value})),children:[e.jsx("option",{value:"male",children:"Male"}),e.jsx("option",{value:"female",children:"Female"})]}),e.jsx("input",{type:"number",placeholder:"Height cm",value:B.heightCm,onChange:t=>J(i=>({...i,heightCm:t.target.value}))}),e.jsx("input",{type:"number",step:"0.1",placeholder:"Goal weight kg",value:Z.goalWeight,onChange:t=>he(i=>({...i,goalWeight:t.target.value}))}),e.jsx("input",{type:"number",placeholder:"Weekly workout target",value:Z.weeklyWorkoutTarget,onChange:t=>he(i=>({...i,weeklyWorkoutTarget:t.target.value}))})]}),e.jsxs("div",{className:"row-actions",style:{marginTop:10},children:[e.jsx("button",{type:"submit",children:"Save Profile and Goals"}),ee&&e.jsx("span",{className:"muted",children:ee})]})]})]}),r==="workouts"&&e.jsxs("section",{className:"glass-card",children:[e.jsx("h3",{children:"All Workouts"}),e.jsxs("div",{className:"list-stack",children:[Re.length===0&&e.jsx("p",{className:"muted",children:"No workouts logged yet."}),Re.map(t=>e.jsxs("article",{className:"workout-row",children:[e.jsxs("div",{children:[e.jsxs("p",{className:"row-title",children:[e.jsx("span",{className:`type-dot ${X(t.type).color}`})," ",t.type]}),e.jsxs("p",{className:"muted",children:[t.date," · ",t.amount??t.durationMin," ",t.unit||"min"," · ",t.sets??1," sets"]})]}),e.jsxs("div",{className:"row-actions compact",children:[e.jsxs("strong",{children:[t.caloriesBurned," kcal"]}),e.jsx("button",{type:"button",className:"btn-muted",onClick:()=>xt(t),children:"Edit"}),e.jsx("button",{type:"button",className:"btn-danger",onClick:()=>a.deleteWorkout(t.id),children:"Delete"})]})]},t.id))]})]}),r==="nutrition"&&e.jsxs("section",{className:"dashboard-grid",children:[e.jsxs("div",{className:"glass-card",children:[e.jsx("h3",{children:"Today Food"}),e.jsxs("div",{className:"list-stack",children:[ne.length===0&&e.jsx("p",{className:"muted",children:"No food logged today."}),ne.map(t=>e.jsxs("article",{className:"workout-row",children:[e.jsxs("div",{children:[e.jsx("p",{className:"row-title",children:t.meal}),e.jsx("p",{className:"muted",children:t.date})]}),e.jsxs("div",{className:"row-actions compact",children:[e.jsxs("strong",{children:[t.caloriesConsumed," kcal"]}),e.jsx("button",{type:"button",className:"btn-muted",onClick:()=>He(t),children:"Edit"}),e.jsx("button",{type:"button",className:"btn-danger",onClick:()=>a.deleteFoodLog(t.id),children:"Delete"})]})]},t.id))]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Total Today"}),e.jsxs("strong",{children:[xe," kcal"]})]}),e.jsx("h4",{className:"subhead",children:"7-Day Intake vs Burn"}),e.jsx(we,{values:ie.consumed,labels:ie.labels,colorClass:"bar-cyan"}),e.jsx(we,{values:ie.burned,labels:ie.labels,colorClass:"bar-green"})]}),e.jsxs("div",{className:"glass-card",children:[e.jsx("h3",{children:"Recent Food Logs"}),e.jsx("div",{className:"list-stack",children:ot.slice(0,10).map(t=>e.jsxs("article",{className:"workout-row",children:[e.jsxs("div",{children:[e.jsx("p",{className:"row-title",children:t.meal}),e.jsx("p",{className:"muted",children:t.date})]}),e.jsxs("div",{className:"row-actions compact",children:[e.jsxs("strong",{children:[t.caloriesConsumed," kcal"]}),e.jsx("button",{type:"button",className:"btn-muted",onClick:()=>He(t),children:"Edit"}),e.jsx("button",{type:"button",className:"btn-danger",onClick:()=>a.deleteFoodLog(t.id),children:"Delete"})]})]},t.id))})]})]}),r==="progress"&&e.jsxs("section",{className:"dashboard-grid",children:[e.jsxs("div",{className:"glass-card",children:[e.jsx("h3",{children:"Weight Progress"}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Current"}),e.jsxs("strong",{children:[M.toFixed(1)," kg"]})]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Goal"}),e.jsxs("strong",{children:[Number(s.goals.goalWeight).toFixed(1)," kg"]})]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Change"}),e.jsxs("strong",{children:[(M-te).toFixed(1)," kg"]})]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Remaining"}),e.jsxs("strong",{children:[b.remainingKg.toFixed(1)," kg"]})]}),e.jsx("h4",{className:"subhead",children:"Weight Trend (recent)"}),e.jsx(we,{values:Ie.values.map(t=>Math.round(t*10)),labels:Ie.labels,colorClass:"bar-purple"})]}),e.jsxs("div",{className:"glass-card",children:[e.jsx("h3",{children:"Weight History"}),e.jsx("div",{className:"list-stack",children:C.map(t=>e.jsxs("article",{className:"workout-row",children:[e.jsx("span",{children:t.date}),e.jsxs("div",{className:"row-actions compact",children:[e.jsxs("strong",{children:[Number(t.weight).toFixed(1)," kg"]}),e.jsx("button",{type:"button",className:"btn-muted",onClick:()=>bt(t),children:"Edit"}),e.jsx("button",{type:"button",className:"btn-danger",onClick:()=>a.deleteWeightLog(t.id),children:"Delete"})]})]},t.id))})]})]}),r==="calendar"&&e.jsxs("section",{className:"glass-card",children:[e.jsx("h3",{children:"Activity Heatmap"}),e.jsx("p",{className:"muted",children:"Last 12 weeks of activity"}),e.jsx("div",{className:"heatmap-grid",children:ct.map(t=>e.jsx("div",{className:`heat-cell ${t.level}`,title:`${t.date}: ${t.burn} kcal`},t.date))}),e.jsxs("div",{className:"legend-row",children:[e.jsx("span",{children:"Less"}),e.jsx("span",{className:"heat-cell lv0"}),e.jsx("span",{className:"heat-cell lv1"}),e.jsx("span",{className:"heat-cell lv2"}),e.jsx("span",{className:"heat-cell lv3"}),e.jsx("span",{className:"heat-cell lv4"}),e.jsx("span",{children:"More"})]})]}),r==="timer"&&e.jsxs("section",{className:"dashboard-grid",children:[e.jsxs("div",{className:"glass-card",children:[e.jsx("h3",{children:"Workout Timer"}),e.jsx("div",{className:"timer-value",children:Qe(y)}),e.jsx("p",{className:"muted",children:d}),e.jsx("div",{className:"field-grid",children:e.jsx("select",{value:d,onChange:t=>u(t.target.value),children:ue.map(t=>e.jsxs("option",{value:t.name,children:[t.icon," ",t.name]},t.name))})}),e.jsxs("div",{className:"timer-controls",children:[e.jsx("button",{type:"button",onClick:()=>Me(t=>!t),children:me?"Pause":"Start"}),e.jsx("button",{type:"button",onClick:()=>{Me(!1),S(0),We([])},children:"Reset"}),e.jsx("button",{type:"button",onClick:()=>{y>0&&We(t=>[...t,Qe(y)])},children:"Lap"})]}),e.jsxs("p",{className:"muted",children:["Estimated burn: ",dt," kcal"]})]}),e.jsxs("div",{className:"glass-card",children:[e.jsx("h3",{children:"Lap Times"}),e.jsxs("div",{className:"list-stack",children:[De.length===0&&e.jsx("p",{className:"muted",children:"No laps recorded."}),De.map((t,i)=>e.jsxs("article",{className:"workout-row",children:[e.jsxs("span",{children:["Lap ",i+1]}),e.jsx("strong",{children:t})]},`${t}-${i}`))]})]})]}),r==="search"&&e.jsxs("section",{className:"glass-card",children:[e.jsx("h3",{children:"Search"}),e.jsx("input",{type:"text",placeholder:"Search workouts and meals",value:E,onChange:t=>_(t.target.value)}),e.jsxs("div",{className:"list-stack",style:{marginTop:12},children:[E.trim()&&Pe.length===0&&e.jsx("p",{className:"muted",children:"No results found."}),Pe.map((t,i)=>e.jsxs("article",{className:"workout-row",children:[e.jsx("span",{children:t.kind}),e.jsx("strong",{children:t.label})]},`${t.kind}-${i}`))]})]}),r==="notifications"&&e.jsxs("section",{className:"glass-card",children:[e.jsx("h3",{children:"Notifications"}),e.jsx("div",{className:"list-stack",style:{marginTop:12},children:bs.map((t,i)=>e.jsxs("article",{className:"notif-row",children:[e.jsx("span",{className:`notif-dot ${t.read?"read":""}`}),e.jsxs("div",{children:[e.jsx("p",{children:t.text}),e.jsx("p",{className:"muted",children:t.time})]})]},`${t.time}-${i}`))})]}),r==="settings"&&e.jsxs("section",{className:"glass-card",children:[e.jsx("h3",{children:"Settings"}),e.jsxs("div",{className:"settings-grid",children:[e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Daily reminders"}),e.jsx("p",{className:"muted",children:"Get prompted to log workouts"})]}),e.jsx("button",{type:"button",onClick:()=>V("remind"),children:s.settings.remind?"ON":"OFF"})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Achievement alerts"}),e.jsx("p",{className:"muted",children:"Celebrate your milestones"})]}),e.jsx("button",{type:"button",onClick:()=>V("achieve"),children:s.settings.achieve?"ON":"OFF"})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Imperial units"}),e.jsx("p",{className:"muted",children:"Switch to lbs"})]}),e.jsx("button",{type:"button",onClick:()=>V("imperial"),children:s.settings.imperial?"ON":"OFF"})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Show BMR in header"}),e.jsx("p",{className:"muted",children:"Display passive burn metric"})]}),e.jsx("button",{type:"button",onClick:()=>V("bmr"),children:s.settings.bmr?"ON":"OFF"})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Optimized calorie engine"}),e.jsx("p",{className:"muted",children:"Recompute legacy workouts for consistent active burn"})]}),e.jsx("button",{type:"button",onClick:()=>V("useNormalizedCalories"),children:ge?"ON":"OFF"})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Averaging window"}),e.jsx("p",{className:"muted",children:"Stabilize trends with 7 or 14 day averages"})]}),e.jsxs("div",{className:"row-actions compact",children:[e.jsx("button",{type:"button",className:A===7?"":"btn-muted",onClick:()=>a.updateSettings({avgWindowDays:7}),children:"7D"}),e.jsx("button",{type:"button",className:A===14?"":"btn-muted",onClick:()=>a.updateSettings({avgWindowDays:14}),children:"14D"})]})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Prediction horizon"}),e.jsx("p",{className:"muted",children:"Future chart projection length"})]}),e.jsxs("div",{className:"row-actions compact",children:[e.jsx("button",{type:"button",className:q===30?"":"btn-muted",onClick:()=>a.updateSettings({projectionDays:30}),children:"30D"}),e.jsx("button",{type:"button",className:q===60?"":"btn-muted",onClick:()=>a.updateSettings({projectionDays:60}),children:"60D"}),e.jsx("button",{type:"button",className:q===90?"":"btn-muted",onClick:()=>a.updateSettings({projectionDays:90}),children:"90D"})]})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Export Data"}),e.jsx("p",{className:"muted",children:"Download JSON backup"})]}),e.jsx("button",{type:"button",onClick:ft,children:"Export"})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Import Data"}),e.jsx("p",{className:"muted",children:"Restore from a FitTrack JSON backup"})]}),e.jsxs(e.Fragment,{children:[e.jsx("input",{ref:Le,type:"file",accept:"application/json,.json",onChange:jt,style:{display:"none"}}),e.jsx("button",{type:"button",onClick:()=>{var t;return(t=Le.current)==null?void 0:t.click()},children:"Import"})]})]}),e.jsxs("article",{className:"setting-row",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Clear All Data"}),e.jsx("p",{className:"muted",children:"Reset app state"})]}),e.jsx("button",{type:"button",className:"btn-danger",onClick:yt,children:"Clear"})]})]}),ee&&e.jsx("p",{className:"muted",style:{marginTop:10},children:ee})]}),e.jsxs("div",{className:`fab-wrap ${Se?"open":""}`,children:[e.jsxs("div",{className:"fab-menu",children:[e.jsx("button",{type:"button",onClick:()=>Q("log"),className:"fab-action",children:"Log Workout"}),e.jsx("button",{type:"button",onClick:()=>Q("nutrition"),className:"fab-action",children:"Log Meal"}),e.jsx("button",{type:"button",onClick:()=>Q("progress"),className:"fab-action",children:"Log Weight"}),e.jsx("button",{type:"button",onClick:()=>Q("timer"),className:"fab-action",children:"Start Timer"})]}),e.jsx("button",{type:"button",className:"fab-main",onClick:()=>Te(t=>!t),children:Se?"x":"+"})]})]})})}kt(document.getElementById("root")).render(e.jsx(wt.StrictMode,{children:e.jsx(ls,{children:e.jsx(fs,{})})}));export{U as G};
