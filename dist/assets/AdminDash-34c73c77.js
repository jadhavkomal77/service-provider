import{u as t,a as o,e as c,r as e,B as d,j as s,L as a}from"./index-da830129.js";const b=()=>{const l=t();o(i=>i.admin);const[r,{isSuccess:n,isError:g,error:v,isLoading:u}]=c();return e.useEffect(()=>{n&&l("/")},[n]),e.useEffect(()=>{n&&d.error("Admin Logout success")},[n]),s.jsx(s.Fragment,{children:s.jsx("nav",{class:"navbar navbar-expand-lg bg-info",children:s.jsxs("div",{class:"container-fluid",children:[s.jsx(a,{to:"/adminDash",class:"navbar-brand",href:"#",children:"Admin Panal"}),s.jsx("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNavAltMarkup",children:s.jsx("span",{class:"navbar-toggler-icon"})}),s.jsx("div",{class:"collapse navbar-collapse",id:"navbarNavAltMarkup",children:s.jsxs("div",{class:"navbar-nav",children:[s.jsx(a,{class:"nav-link active",to:"#"}),s.jsx(a,{class:"nav-link ",to:"alladminprofessional",children:"Professional"}),s.jsx(a,{class:"nav-link ",to:"allAgencyAdmins",children:"AgencyAdmins"}),s.jsx(a,{class:"nav-link",to:"alladmincoustomer",children:"Coustomer"}),s.jsx(a,{class:"nav-link",to:"profile",children:"Profile"}),s.jsx(a,{class:"nav-link",to:"addagency",children:"AddAgency"}),s.jsx(a,{class:"nav-link",to:"professionalregister",children:"ProfessionalsRegister"}),s.jsx(a,{class:"nav-link",to:"agencyadminregister",children:"AgencyProfRegister"})]})}),s.jsx("button",{onClick:r,type:"button",class:"btn btn-danger mx-3 p-2",children:"Logout"})]})})})};export{b as default};
