(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-47f14e76"],{"355a":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-card",[n("div",{staticClass:"d-flex"},[n("div",{staticClass:"flex-1"},[n("i",{staticClass:"el-icon-document"}),n("span",{staticClass:"title"},[t._v("数据列表")])]),n("div",[n("el-button",{attrs:{size:"small",type:"info"},on:{click:function(e){return t.$router.push("/admin_users/create")}}},[t._v("添加")])],1)])]),n("h1",[t._v("管理员列表")]),n("el-table",{attrs:{data:t.items}},[n("el-table-column",{attrs:{prop:"_id",label:"ID",width:"220"}}),n("el-table-column",{attrs:{prop:"username",label:"管理员名称"}}),n("el-table-column",{attrs:{fixed:"right",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"warning",size:"small"},on:{click:function(n){return t.$router.push("/admin_users/edit/"+e.row._id)}}},[t._v("编辑")]),n("el-button",{attrs:{type:"warning",size:"small"},on:{click:function(n){return t.remove(e.row)}}},[t._v("删除")])]}}])})],1)],1)},a=[],c=n("1da1"),s=(n("b0c0"),n("96cf"),{data:function(){return{items:[]}},methods:{fetch:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("rest/admin_users");case 2:n=e.sent,t.items=n.data;case 4:case"end":return e.stop()}}),e)})))()},remove:function(t){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e.$confirm('是否确定要继续删除"'.concat(t.name,'"'),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(c["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$http.delete("rest/admin_users/".concat(t._id));case 2:n.sent,e.$message({type:"success",message:"删除成功!"}),e.fetch();case 5:case"end":return n.stop()}}),n)}))));case 1:case"end":return n.stop()}}),n)})))()}},created:function(){this.fetch()}}),i=s,u=n("2877"),o=Object(u["a"])(i,r,a,!1,null,null,null);e["default"]=o.exports},b0c0:function(t,e,n){var r=n("83ab"),a=n("9bf2").f,c=Function.prototype,s=c.toString,i=/^\s*function ([^ (]*)/,u="name";r&&!(u in c)&&a(c,u,{configurable:!0,get:function(){try{return s.call(this).match(i)[1]}catch(t){return""}}})}}]);
//# sourceMappingURL=chunk-47f14e76.9fe38617.js.map