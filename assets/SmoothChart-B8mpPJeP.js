import{R as s,j as t}from"./vendor-react-FHh92Bil.js";import{g as e}from"./vendor-styled-D-ltm6R4.js";import{G as i}from"./index-v9-edUZu.js";import{R as n,A as l,C as d,X as c,Y as m,T as f,a as h,b as x,L as o}from"./vendor-recharts-DcuaQFcX.js";import"./vendor-motion-wE3iTBmK.js";const p=e.h3`
  margin: 0;
  font-size: 1.1rem;
`,j=e.p`
  margin: 0.45rem 0 0;
  color: var(--muted-text);
  font-size: 0.85rem;
`,g=e.div`
  height: 320px;
  margin-top: 1rem;
`;function u({data:r,goalWeight:a}){return t.jsxs(i,{children:[t.jsx(p,{children:"Weight Trend"}),t.jsx(j,{children:"Curved actual and projected trend with smart goal marker"}),t.jsx(g,{children:t.jsx(n,{width:"100%",height:"100%",children:t.jsxs(l,{data:r,margin:{top:18,right:18,left:-8,bottom:4},children:[t.jsx("defs",{children:t.jsxs("linearGradient",{id:"weightFill",x1:"0",y1:"0",x2:"0",y2:"1",children:[t.jsx("stop",{offset:"5%",stopColor:"#4f46e5",stopOpacity:.45}),t.jsx("stop",{offset:"95%",stopColor:"#22d3ee",stopOpacity:.02})]})}),t.jsx(d,{stroke:"rgba(255,255,255,0.08)",strokeDasharray:"4 4"}),t.jsx(c,{dataKey:"date",tick:{fill:"#B6C0D6",fontSize:11}}),t.jsx(m,{domain:["dataMin - 1","dataMax + 1"],tick:{fill:"#B6C0D6",fontSize:11}}),t.jsx(f,{contentStyle:{background:"rgba(11, 15, 26, 0.95)",border:"1px solid rgba(255,255,255,0.14)",borderRadius:12,color:"#e7ecff"},labelStyle:{color:"#9fb0d8"}}),t.jsx(h,{y:a,stroke:"#34D399",strokeDasharray:"6 5"}),t.jsx(x,{type:"monotone",dataKey:"actual",stroke:"none",fill:"url(#weightFill)",connectNulls:!1}),t.jsx(o,{type:"monotone",dataKey:"actual",stroke:"#A78BFA",strokeWidth:3,dot:{r:2},connectNulls:!1}),t.jsx(o,{type:"monotone",dataKey:"predicted",stroke:"#22D3EE",strokeWidth:2.5,strokeDasharray:"7 5",dot:!1,connectNulls:!1})]})})})]})}const D=s.memo(u);export{D as default};
