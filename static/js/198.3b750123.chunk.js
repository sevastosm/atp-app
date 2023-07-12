"use strict";(self.webpackChunkatp_app=self.webpackChunkatp_app||[]).push([[198],{3198:function(n,e,t){t.r(e),t.d(e,{default:function(){return I}});var r=t(8870),a=t(1614),i=t(7621),s=t(6907),c=t(6934),o=t(9141),u=t(8214),l=t(5861),d=t(4942),p=t(1413),h=t(9439),x=t(890),g=t(1889),f=t(8550),m=t(6151),Z=t(6871),b=t(2791),j=t(167),v=t(9478),k=function(n,e){return(0,j.tn)(e),j.be.post(v.h+"/auth/login",n)},w=t(1659),y=t(184);(0,c.ZP)(x.Z)((function(n){var e=n.theme;return"\n    font-size: ".concat(e.typography.pxToRem(50),";\n")})),(0,c.ZP)(x.Z)((function(n){var e=n.theme;return"\n    font-size: ".concat(e.typography.pxToRem(17),";\n")})),(0,c.ZP)(r.Z)((function(n){var e=n.theme;return"\n    background-color: ".concat(e.colors.success.main,";\n    color: ").concat(e.palette.success.contrastText,";\n    font-weight: bold;\n    border-radius: 30px;\n    text-transform: uppercase;\n    display: inline-block;\n    font-size: ").concat(e.typography.pxToRem(11),";\n    padding: ").concat(e.spacing(.5)," ").concat(e.spacing(1.5),";\n    margin-bottom: ").concat(e.spacing(2),";\n")})),(0,c.ZP)(r.Z)((function(n){var e=n.theme;return"\n    width: ".concat(e.spacing(8),";\n    height: ").concat(e.spacing(8),";\n    border-radius: ").concat(e.general.borderRadius,";\n    background-color: #e5f7ff;\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin: 0 auto ").concat(e.spacing(2),";\n\n    img {\n      width: 60%;\n      height: 60%;\n      display: block;\n    }\n")})),(0,c.ZP)(r.Z)((function(n){var e=n.theme;return"\n    width: ".concat(e.spacing(8),";\n    height: ").concat(e.spacing(8),";\n    border-radius: ").concat(e.general.borderRadius,";\n    background-color: #dfebf6;\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin: 0 auto ").concat(e.spacing(2),";\n\n    img {\n      width: 60%;\n      height: 60%;\n      display: block;\n    }\n")}));var P=function(){var n=b.useContext(w.I),e=n.setMessage,t=n.setAuth,r=n.setLogedInUser,i=n.setSelectedRow,s=b.useState({}),c=(0,h.Z)(s,2),o=c[0],j=c[1],v=(0,Z.s0)(),P=function(n){var e=n.target.name,t=n.target.value;j((0,p.Z)((0,p.Z)({},o),{},(0,d.Z)({},e,t)))},C=function(){var n=(0,l.Z)((0,u.Z)().mark((function n(a){return(0,u.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,k(o,e).then(function(){var n=(0,l.Z)((0,u.Z)().mark((function n(e){return(0,u.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log("handleLogin",e),n.next=3,localStorage.setItem("token",e.data.token);case 3:if(t(!0),r(e.data.user.role),i(e.data.user),"admin"!==e.data.user.role){n.next=8;break}return n.abrupt("return",v("/management/accounts",{replace:!1}));case 8:if("user"!==e.data.user.role){n.next=10;break}return n.abrupt("return",v("/profile/nutrition",{replace:!1}));case 10:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}());case 2:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return(0,y.jsx)(a.Z,{maxWidth:"sm",sx:{textAlign:"center"},children:(0,y.jsxs)(g.ZP,{spacing:{xs:3},justifyContent:"center",alignItems:"center",container:!0,children:[(0,y.jsxs)(g.ZP,{item:!0,xs:12,mx:"auto",children:[(0,y.jsx)(x.Z,{sx:{mb:2},variant:"h1"}),(0,y.jsx)(f.Z,{required:!0,id:"email",label:"Email",value:o.email||"",name:"email",onChange:P})]}),(0,y.jsx)(g.ZP,{item:!0,xs:12,children:(0,y.jsx)(f.Z,{id:"outlined-password-input",label:"Password",type:"password",autoComplete:"current-password",value:o.password||"",name:"password",onChange:P})}),(0,y.jsx)(g.ZP,{item:!0,xs:12,children:(0,y.jsx)(m.Z,{onClick:C,size:"large",variant:"contained",children:"Log in"})})]})})},C=(0,c.ZP)(r.Z)((function(){return"\n    overflow: auto;\n    flex: 1;\n    overflow-x: hidden;\n    align-items: center;\n    display:flex;\n    height: 100%;\n"}));var I=function(){return(0,y.jsxs)(C,{sx:{background:"#11192a"},children:[(0,y.jsx)(s.ql,{children:(0,y.jsx)("title",{children:"ATP-app"})}),(0,y.jsxs)(a.Z,{maxWidth:"sm",sx:{alignItems:"center"},children:[(0,y.jsx)(r.Z,{sx:{mb:5},display:"flex",justifyContent:"center",alignItems:"center",children:(0,y.jsx)(o.Z,{})}),(0,y.jsx)(r.Z,{children:(0,y.jsx)(i.Z,{sx:{padding:1,maxWidth:"300px",margin:"0 auto"},children:(0,y.jsx)(P,{})})})]})]})}}}]);
//# sourceMappingURL=198.3b750123.chunk.js.map