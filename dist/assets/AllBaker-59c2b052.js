import{v as i,a as c,j as s,L as r}from"./index-da830129.js";const d=()=>{const{data:l}=i(),{customer:a}=c(e=>e.admin);return s.jsx("div",{className:"p-4 bg-light min-vh-100",children:s.jsx("div",{className:"container",children:s.jsx("div",{className:"row",children:l&&l.map(e=>s.jsx("div",{className:"col-12 col-sm-6 col-md-4 col-lg-3 mb-4",children:s.jsxs("div",{className:"card shadow border border-black",children:[s.jsxs("div",{className:"card-body",children:[s.jsxs("p",{children:[s.jsx("strong",{children:"Name:"})," ",e.name]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Email:"})," ",e.email]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Mobile:"})," ",e.mobile]})]}),s.jsx("div",{className:"card-footer text-center",children:a?s.jsx(r,{to:`/professionalprofile/${e._id}`,className:"btn btn-primary w-50",children:"Book"}):s.jsx(r,{to:"/logins",className:"btn btn-primary w-50",children:"LOGIN"})})]})},e.id))})})})};export{d as default};
