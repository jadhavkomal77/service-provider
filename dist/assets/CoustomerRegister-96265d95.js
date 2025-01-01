import{n,u as t,r as m,j as e}from"./index-da830129.js";import{u as h,c as p,a as i}from"./formik.esm-4518efd1.js";import{c as u}from"./index-e375180f.js";const E=()=>{const[o,{isSuccess:l,isError:x,error:b,isLoading:j}]=n(),d=t(),s=h({initialValues:{name:"",email:"",mobile:"",password:"",password:""},validationSchema:p({name:i().required("Enter Name"),email:i().email("Invalid email address").required("Enter Email"),mobile:i().required("Enter Mobile"),password:i().required("Enter Password")}),onSubmit:(r,{resetForm:c})=>{o(r),console.log(r),c()}}),a=r=>u({"form-control my-2":!0,"is-invalid":s.touched[r]&&s.errors[r],"is-valid":s.touched[r]&&!s.errors[r]});return m.useEffect(()=>{l&&d("/")},[l]),e.jsx(e.Fragment,{children:e.jsx("div",{class:"container mt-lg-5",children:e.jsx("div",{class:"row",children:e.jsx("div",{class:"col-sm-6 offset-sm-3",children:e.jsxs("div",{class:"card",children:[e.jsx("div",{class:"card-header bg-info",children:"Register Coustomer"}),e.jsx("form",{onSubmit:s.handleSubmit,children:e.jsxs("div",{class:"card-body",children:[e.jsxs("div",{children:[e.jsx("label",{for:"name",class:"form-label",children:"First Name"}),e.jsx("input",{type:"text",id:"name",placeholder:"Enter Your Email",className:a("name"),...s.getFieldProps("name")}),e.jsx("span",{className:"invalid-feedback",children:s.errors.name}),e.jsx("div",{class:"valid-feedback",children:"Looks good!"})]}),e.jsxs("div",{children:[e.jsx("label",{for:"email",class:"form-label",children:"First Email"}),e.jsx("input",{type:"text",id:"email",placeholder:"Enter Your Email",className:a("email"),...s.getFieldProps("email")}),e.jsx("span",{className:"invalid-feedback",children:s.errors.email}),e.jsx("div",{class:"valid-feedback",children:"Looks good!"})]}),e.jsxs("div",{class:"mt-2",children:[e.jsx("label",{for:"password",class:"form-label",children:"Password"}),e.jsx("input",{type:"password",id:"password",placeholder:"Enter Your Password",className:a("password"),...s.getFieldProps("password")}),e.jsx("span",{className:"invalid-feedback",children:s.errors.password}),e.jsx("div",{class:"valid-feedback",children:"Looks good!"})]}),e.jsxs("div",{class:"mt-2",children:[e.jsx("label",{for:"mobile",class:"form-label",children:"mobile"}),e.jsx("input",{type:"mobile",id:"mobile",placeholder:"Enter Your mobile",className:a("mobile"),...s.getFieldProps("mobile")}),e.jsx("span",{className:"invalid-feedback",children:s.errors.mobile}),e.jsx("div",{class:"valid-feedback",children:"Looks good!"})]}),e.jsx("button",{type:"submit",class:"btn btn-primary w-100 mt-3",children:"Coustomer Register"}),e.jsxs("p",{class:"text-center mt-3",children:["Dont Have Account? ",e.jsx("a",{href:"/logins",children:"login Account"})]})]})})]})})})})})};export{E as default};
