"use strict";(self.webpackChunkatp_app=self.webpackChunkatp_app||[]).push([[150],{4150:(n,e,t)=>{t.r(e),t.d(e,{default:()=>j});var a=t(9464),s=t(622),r=t(2110),i=t(9490),o=t(4535),c=t(4210),l=t(5865),d=t(8903),p=t(7784),g=t(3404),u=t(6971),h=t(5043),x=t(1495),m=t(4558);var f=t(4126),y=t(579);(0,o.Ay)(l.A)((n=>{let{theme:e}=n;return"\n    font-size: ".concat(e.typography.pxToRem(50),";\n")})),(0,o.Ay)(l.A)((n=>{let{theme:e}=n;return"\n    font-size: ".concat(e.typography.pxToRem(17),";\n")})),(0,o.Ay)(a.A)((n=>{let{theme:e}=n;return"\n    background-color: ".concat(e.colors.success.main,";\n    color: ").concat(e.palette.success.contrastText,";\n    font-weight: bold;\n    border-radius: 30px;\n    text-transform: uppercase;\n    display: inline-block;\n    font-size: ").concat(e.typography.pxToRem(11),";\n    padding: ").concat(e.spacing(.5)," ").concat(e.spacing(1.5),";\n    margin-bottom: ").concat(e.spacing(2),";\n")})),(0,o.Ay)(a.A)((n=>{let{theme:e}=n;return"\n    width: ".concat(e.spacing(8),";\n    height: ").concat(e.spacing(8),";\n    border-radius: ").concat(e.general.borderRadius,";\n    background-color: #e5f7ff;\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin: 0 auto ").concat(e.spacing(2),";\n\n    img {\n      width: 60%;\n      height: 60%;\n      display: block;\n    }\n")})),(0,o.Ay)(a.A)((n=>{let{theme:e}=n;return"\n    width: ".concat(e.spacing(8),";\n    height: ").concat(e.spacing(8),";\n    border-radius: ").concat(e.general.borderRadius,";\n    background-color: #dfebf6;\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin: 0 auto ").concat(e.spacing(2),";\n\n    img {\n      width: 60%;\n      height: 60%;\n      display: block;\n    }\n")}));const A=function(){const{setMessage:n,setAuth:e,setLogedInUser:t,setSelectedRow:a}=h.useContext(f.B),[r,i]=h.useState({}),o=(0,u.Zp)(),c=n=>{const e=n.target.name,t=n.target.value;i({...r,[e]:t})};return(0,y.jsx)(s.A,{maxWidth:"sm",sx:{textAlign:"center"},children:(0,y.jsxs)(d.Ay,{spacing:{xs:3},justifyContent:"center",alignItems:"center",container:!0,children:[(0,y.jsxs)(d.Ay,{item:!0,xs:12,mx:"auto",children:[(0,y.jsx)(l.A,{sx:{mb:2},variant:"h1"}),(0,y.jsx)(p.A,{required:!0,id:"email",label:"Email",value:r.email||"",name:"email",onChange:c})]}),(0,y.jsx)(d.Ay,{item:!0,xs:12,children:(0,y.jsx)(p.A,{id:"outlined-password-input",label:"Password",type:"password",autoComplete:"current-password",value:r.password||"",name:"password",onChange:c})}),(0,y.jsx)(d.Ay,{item:!0,xs:12,children:(0,y.jsx)(g.A,{onClick:async s=>{await((n,e)=>((0,x.oH)(e),x.SP.post(m.H+"/auth/login",n)))(r,n).then((n=>(console.log("handleLogin",n),localStorage.setItem("token",n.data.token),e(!0),t(n.data.user.role),a(n.data.user),"admin"===n.data.user.role?o("/management/accounts",{replace:!1}):"user"===n.data.user.role?o("/profile/nutrition",{replace:!1}):void 0)))},size:"large",variant:"contained",children:"Log in"})})]})})},b=(0,o.Ay)(a.A)((()=>"\n    overflow: auto;\n    flex: 1;\n    overflow-x: hidden;\n    align-items: center;\n    display:flex;\n    height: 100%;\n"));const j=function(){return(0,y.jsxs)(b,{sx:{background:"#151613eb"},children:[(0,y.jsx)(i.mg,{children:(0,y.jsx)("title",{children:"ATP-app"})}),(0,y.jsxs)(s.A,{maxWidth:"sm",sx:{alignItems:"center"},children:[(0,y.jsx)(a.A,{sx:{mb:5},display:"flex",justifyContent:"center",alignItems:"center",children:(0,y.jsx)(c.A,{})}),(0,y.jsx)(a.A,{children:(0,y.jsx)(r.A,{sx:{padding:1,maxWidth:"300px",margin:"0 auto"},children:(0,y.jsx)(A,{})})})]})]})}}}]);
//# sourceMappingURL=150.0e310698.chunk.js.map