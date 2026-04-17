import{a as e}from"./rolldown-runtime-COnpUsM8.js";import{n as t,r as n}from"./vendor-motion-C3z5IBOz.js";import{r}from"./vendor-styled-BAW-8dqP.js";import{t as i}from"./GlassCard-CsO1SDii.js";import{a,c as o,i as s,l as c,n as l,o as u,r as d,s as f,t as p}from"./vendor-recharts-9MX4qaGj.js";var m=e(n(),1),h=t(),g=r.h3`
  margin: 0;
  font-size: 1.1rem;
`,_=r.p`
  margin: 0.45rem 0 0;
  color: var(--muted-text);
  font-size: 0.85rem;
`,v=r.div`
  width: 100%;
  height: 320px;
  min-height: 240px;
  min-width: 0;
  margin-top: 1rem;
`;function y({data:e,goalWeight:t}){return(0,h.jsxs)(i,{children:[(0,h.jsx)(g,{children:`Weight Trend`}),(0,h.jsx)(_,{children:`Curved actual and projected trend with smart goal marker`}),(0,h.jsx)(v,{children:(0,h.jsx)(c,{width:`100%`,height:`100%`,minWidth:280,minHeight:220,debounce:120,children:(0,h.jsxs)(p,{data:e,margin:{top:18,right:18,left:-8,bottom:4},children:[(0,h.jsx)(`defs`,{children:(0,h.jsxs)(`linearGradient`,{id:`weightFill`,x1:`0`,y1:`0`,x2:`0`,y2:`1`,children:[(0,h.jsx)(`stop`,{offset:`5%`,stopColor:`#4f46e5`,stopOpacity:.45}),(0,h.jsx)(`stop`,{offset:`95%`,stopColor:`#22d3ee`,stopOpacity:.02})]})}),(0,h.jsx)(u,{stroke:`rgba(255,255,255,0.08)`,strokeDasharray:`4 4`}),(0,h.jsx)(d,{dataKey:`date`,tick:{fill:`#B6C0D6`,fontSize:11}}),(0,h.jsx)(l,{domain:[`dataMin - 1`,`dataMax + 1`],tick:{fill:`#B6C0D6`,fontSize:11}}),(0,h.jsx)(o,{contentStyle:{background:`rgba(11, 15, 26, 0.95)`,border:`1px solid rgba(255,255,255,0.14)`,borderRadius:12,color:`#e7ecff`},labelStyle:{color:`#9fb0d8`}}),(0,h.jsx)(f,{y:t,stroke:`#34D399`,strokeDasharray:`6 5`}),(0,h.jsx)(s,{type:`monotone`,dataKey:`actual`,stroke:`none`,fill:`url(#weightFill)`,connectNulls:!1}),(0,h.jsx)(a,{type:`monotone`,dataKey:`actual`,stroke:`#A78BFA`,strokeWidth:3,dot:{r:2},connectNulls:!1}),(0,h.jsx)(a,{type:`monotone`,dataKey:`predicted`,stroke:`#22D3EE`,strokeWidth:2.5,strokeDasharray:`7 5`,dot:!1,connectNulls:!1})]})})})]})}var b=m.memo(y);export{b as default};