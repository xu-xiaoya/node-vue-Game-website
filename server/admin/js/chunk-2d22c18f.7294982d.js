(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22c18f"],{f27d:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"about"},[a("h1",[t._v(t._s(t.id?"编辑":"新建")+"专精")]),a("el-form",{attrs:{"label-width":"120px"},nativeOn:{submit:function(e){return e.preventDefault(),t.save.apply(null,arguments)}}},[a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{staticStyle:{width:"15rem"},attrs:{placeholder:"请输入专精名称"},model:{value:t.model.title,callback:function(e){t.$set(t.model,"title",e)},expression:"model.title"}})],1),a("el-form-item",{attrs:{label:"图标"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.uploadURl,headers:t.getAuthHeaders(),"show-file-list":!1,"on-success":t.afterUpload}},[t.model.icon?a("img",{staticClass:"avatar",attrs:{src:t.model.icon}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),a("el-form-item",[a("el-button",{attrs:{type:"warning","native-type":"el-submit"}},[t._v("保存")])],1)],1)],1)},r=[],n=a("1da1"),i=(a("96cf"),{props:{id:{}},data:function(){return{model:{}}},methods:{afterUpload:function(t){this.$set(this.model,"icon",t.url)},save:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.id){e.next=6;break}return e.next=3,t.$http.put("rest/items/".concat(t.id),t.model);case 3:e.sent,e.next=9;break;case 6:return e.next=8,t.$http.post("rest/items",t.model);case 8:e.sent;case 9:t.$router.push("/items/list"),t.$message({type:"success",message:"保存成功"});case 11:case"end":return e.stop()}}),e)})))()},fetch:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("rest/items/".concat(t.id));case 2:a=e.sent,t.model=a.data;case 4:case"end":return e.stop()}}),e)})))()}},created:function(){this.id&&this.fetch()}}),l=i,c=a("2877"),o=Object(c["a"])(l,s,r,!1,null,null,null);e["default"]=o.exports}}]);
//# sourceMappingURL=chunk-2d22c18f.7294982d.js.map