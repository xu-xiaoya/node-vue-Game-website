(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b9da4"],{"355a":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-card",[n("div",{staticClass:"d-flex"},[n("div",{staticClass:"flex-1"},[n("i",{staticClass:"el-icon-document"}),n("span",{staticClass:"title"},[e._v("数据列表")])]),n("div",[n("el-button",{attrs:{size:"small",type:"info"},on:{click:function(t){return e.$router.push("/admin_users/create")}}},[e._v("添加")])],1)])]),n("h1",[e._v("管理员列表")]),n("el-table",{attrs:{data:e.items}},[n("el-table-column",{attrs:{prop:"_id",label:"ID",width:"220"}}),n("el-table-column",{attrs:{prop:"username",label:"管理员名称"}}),n("el-table-column",{attrs:{fixed:"right",label:"操作",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"warning",size:"small"},on:{click:function(n){return e.$router.push("/admin_users/edit/"+t.row._id)}}},[e._v("编辑")]),n("el-button",{attrs:{type:"warning",size:"small"},on:{click:function(n){return e.remove(t.row)}}},[e._v("删除")])]}}])})],1)],1)},a=[],s=n("1da1"),c=(n("96cf"),{data:function(){return{items:[]}},methods:{fetch:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("rest/admin_users");case 2:n=t.sent,e.items=n.data;case 4:case"end":return t.stop()}}),t)})))()},remove:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.$confirm('是否确定要继续删除"'.concat(e.username,'"'),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$http.delete("rest/admin_users/".concat(e._id));case 2:n.sent,t.$message({type:"success",message:"删除成功!"}),t.fetch();case 5:case"end":return n.stop()}}),n)}))));case 1:case"end":return n.stop()}}),n)})))()}},created:function(){this.fetch()}}),i=c,u=n("2877"),o=Object(u["a"])(i,r,a,!1,null,null,null);t["default"]=o.exports}}]);
//# sourceMappingURL=chunk-2d0b9da4.f3a98e78.js.map