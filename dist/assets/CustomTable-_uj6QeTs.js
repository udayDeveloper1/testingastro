import{R as w,ac as g,k as C,r as n,j as r,ad as h}from"./vendor-Z3tYsDUR.js";const j=g(({css:s,token:o})=>{const{antCls:e}=o;return{customTable:s`
      ${e}-table {
        ${e}-table-container {
          ${e}-table-body,
          ${e}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `}}),S=w.memo(({columns:s,data:o,scroll:e,loading:b,serverPagination:l,pagination:c=!0,...d})=>{const{styles:m}=j(),{pathname:u}=C(),i=n.useCallback((t,a,x)=>a==="prev"?r.jsx("span",{children:" Previous"}):a==="next"?r.jsx("span",{children:"Next"}):x,[]),p=n.useMemo(()=>{if(!c)return!1;const t={defaultPageSize:5,itemRender:i,showSizeChanger:!0,pageSizeOptions:[5,10,25,50,100,1e3,1e4]};return l?{...l,...t}:t},[c,l,i]),f=n.useCallback((t,a)=>u==="/pending-Requests"&&t?.errorFlag?"table-row error-flag":a%2===0?"table-row even-row":"table-row odd-row",[u]);return r.jsx("div",{className:"custom-table ",children:r.jsx(h,{rowClassName:f,className:m.customTable,columns:s,dataSource:o,bordered:!0,expandable:!0,pagination:p,loading:b,scroll:e,sticky:!0,...d})})});export{S as default};
