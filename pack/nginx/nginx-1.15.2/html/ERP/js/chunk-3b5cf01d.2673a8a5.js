(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b5cf01d"],{"8e71":function(t,e,a){},a542:function(t,e,a){"use strict";a.d(e,"d",function(){return s}),a.d(e,"k",function(){return o}),a.d(e,"f",function(){return u}),a.d(e,"m",function(){return p}),a.d(e,"c",function(){return c}),a.d(e,"e",function(){return l}),a.d(e,"g",function(){return d}),a.d(e,"h",function(){return v}),a.d(e,"i",function(){return f}),a.d(e,"n",function(){return h}),a.d(e,"o",function(){return y}),a.d(e,"p",function(){return m}),a.d(e,"j",function(){return g}),a.d(e,"a",function(){return D}),a.d(e,"b",function(){return P}),a.d(e,"q",function(){return w}),a.d(e,"l",function(){return b});var r=a("4576"),i=a("4328"),n=a.n(i),s=function(t){return r["a"].post("/api/getDevModelListByQuery",n.a.stringify(t))},o=function(){return r["a"].post("/api/user/getGroupList")},u=function(t){return r["a"].post("/api/getDevModelWithVersion",n.a.stringify(t))},p=function(t){return r["a"].post("/api/newDevModel",n.a.parse(t),{headers:{"Content-Type":"application/json;charset=UTF-8"}})},c=function(t){return r["a"].post("/api//getDevModelDetail",n.a.stringify(t))},l=function(t){return r["a"].post("/api/getDevModelVersionList",n.a.stringify(t))},d=function(t){return r["a"].post("/api/getDevPartListByQuery",n.a.stringify(t))},v=function(t){return r["a"].post("/api/getDevPartVersionList",n.a.stringify(t))},f=function(t){return r["a"].post("/api/getDevPartWithVersion",n.a.stringify(t))},h=function(t){return r["a"].post("/api/newDevPart",n.a.stringify(t))},y=function(t){return r["a"].post("/api/updateDevModel",n.a.parse(t),{headers:{"Content-Type":"application/json;charset=UTF-8"}})},m=function(t){return r["a"].post("/api/updateDevPart",n.a.stringify(t))},g=function(){return r["a"].post("/api/getDevelopOptionGroup")},D=function(t){return r["a"].post("/api/addDevelopOptionItem",n.a.stringify(t))},P=function(t){return r["a"].post("/api/deleteDevelopOptionItem",n.a.stringify(t))},w=function(t){return r["a"].post("/api/updateDevelopOptionItem",n.a.stringify(t))},b=function(t){return r["a"].get("/api/system/getOptionItemById",t)}},f046:function(t,e,a){"use strict";a.d(e,"b",function(){return s}),a.d(e,"a",function(){return o});var r=a("4576"),i=a("4328"),n=a.n(i),s=function(){return r["a"].post("/api/devUpload/getAliUploadAccess")},o=function(t){return r["a"].post("/api/devUpload/getAliImageUrl",n.a.stringify({imageUrl:t}))}},f7df:function(t,e,a){"use strict";var r=a("8e71"),i=a.n(r);i.a},f9ac:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Card",{staticClass:"cardHeight"},[a("h2",[t._v("零件明细")]),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[t._v("零件编号：")]),a("Input",{staticClass:"input",attrs:{size:"large",placeholder:"请输入零件编号"},model:{value:t.partDetails.partCode,callback:function(e){t.$set(t.partDetails,"partCode",e)},expression:"partDetails.partCode"}})],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[t._v("零件名称：")]),a("Input",{staticClass:"input",attrs:{size:"large",placeholder:"请输入零件名称"},model:{value:t.partDetails.partName,callback:function(e){t.$set(t.partDetails,"partName",e)},expression:"partDetails.partName"}})],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[t._v("零件类别：")]),a("Select",{staticStyle:{width:"280px"},attrs:{size:"large",placeholder:"请选择零件类别："},model:{value:t.partDetails.type,callback:function(e){t.$set(t.partDetails,"type",e)},expression:"partDetails.type"}},t._l(t.$store.state.optionItems.devModelTypeList,function(e){return a("Option",{key:e.id,attrs:{value:e.code}},[t._v(t._s(e.displayValue))])}),1)],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[t._v("零件规格：")]),a("Input",{staticClass:"input",attrs:{size:"large",placeholder:"请输入零件规格："},model:{value:t.partDetails.specs,callback:function(e){t.$set(t.partDetails,"specs",e)},expression:"partDetails.specs"}})],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[t._v("当前版本号：")]),a("Input",{staticClass:"input",attrs:{size:"large",placeholder:"请输入最新版本号"},model:{value:t.devPartVersion.version,callback:function(e){t.$set(t.devPartVersion,"version",e)},expression:"devPartVersion.version"}})],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[t._v("零件描述：")]),a("Input",{staticStyle:{width:"1000px"},attrs:{type:"textarea",autosize:{minRows:2,maxRows:2},placeholder:"请输入零件描述"},model:{value:t.partDetails.discription,callback:function(e){t.$set(t.partDetails,"discription",e)},expression:"partDetails.discription"}})],1),a("div",[a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[t._v("审核状态")]),a("Button",{staticClass:"input",attrs:{type:"primary"},domProps:{innerHTML:t._s(t.filter_status(t.devPartVersion.reviewStatus))}})],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[t._v("零件图纸下载")]),t._l(t.partfileList,function(e,r){return a("a",{key:r,staticClass:"input",on:{click:function(a){return t.downLoad(e.url)}}},[t._v(t._s(e.url))])})],2)]),a("h2",[t._v("历史版本")]),a("div",{staticClass:"table"},[a("Table",{attrs:{columns:t.historyColumns,loading:t.loadingHistory,data:t.historyVersionList}})],1),a("div",{staticClass:"newLine",staticStyle:{"text-align":"center"}},[1===t.devPartVersion.reviewStatus?a("Button",{staticStyle:{margin:"0 10px"},attrs:{type:"primary"},on:{click:t.clickUpdatePart}},[t._v("确认提交")]):t._e(),a("Button",{staticStyle:{margin:"0 10px"},attrs:{type:"primary"},on:{click:function(e){return t.$router.go(-1)}}},[t._v("取消")])],1)])],1)},i=[],n=(a("f3e2"),a("96cf"),a("3b8d")),s=a("d225"),o=a("b0b4"),u=a("308d"),p=a("6bb5"),c=a("4e2b"),l=a("9ab4"),d=a("d265"),v=a("a542"),f=a("f046"),h=function(t){function e(){var t;return Object(s["a"])(this,e),t=Object(u["a"])(this,Object(p["a"])(e).apply(this,arguments)),t.loading=!1,t.loadingPass=!1,t.loadingHistory=!1,t.partfileList=[],t.partDetails={currentVersion:"",currentVersionId:"",discription:"",id:"",partCode:"",partName:"",specs:"",status:"",type:""},t.devPartVersion={attachment:"",createUser:"",id:"",partId:"",reviewTime:"",reviewStatus:"",reviewUser:"",reviewUserName:"",updateUser:"",versionId:"",version:""},t.addPartParams={id:"",partCode:"",partName:"",currentVersion:"",status:"",type:"",createTime:"",updateTime:"",createUser:"",updateUser:"",currentVersionId:"",version:"",versionId:"",attachment:""},t.historyVersionList=[],t.historyColumns=[{title:"零件版本",align:"center",key:"version"},{title:"最后修改时间",align:"center",key:"updateTime"},{title:"版本审核时间",align:"center",key:"reviewTime"},{title:"版本提交时间",align:"center",key:"updateTime"},{title:"审核状态",align:"center",key:"reviewStatus",render:function(e,a){return e("Tag",{style:{background:"#fff",border:"none"}},t.filter_status(a.row.reviewStatus))}},{title:"备注",align:"center",key:"memo"},{title:"操作",align:"center",key:"operat",render:function(e,a){return e("div",[e("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.goPartDetails(a)}}},"查看")])}}],t}return Object(c["a"])(e,t),Object(o["a"])(e,[{key:"mounted",value:function(){this._getDevPartWithVersion(this.$route.query.versionId)}},{key:"goPartDetails",value:function(t){this.$router.push({name:"AccessoryDetails",query:{versionId:t.row.id}})}},{key:"downLoad",value:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(f["a"])(e);case 2:a=t.sent,window.open(a.responseData);case 4:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"clickUpdatePart",value:function(){this.addPartParams.id=this.partDetails.id,this.addPartParams.partCode=this.partDetails.partCode,this.addPartParams.partName=this.partDetails.partName,this.addPartParams.currentVersionId=this.partDetails.currentVersionId,this.addPartParams.status=this.partDetails.status,this.addPartParams.type=this.partDetails.type,this.addPartParams.updateUser=this.devPartVersion.updateUser,this.addPartParams.attachment=this.devPartVersion.attachment,this.addPartParams.versionId=this.devPartVersion.id,this.addPartParams.version=this.devPartVersion.version}},{key:"_updatePart",value:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(v["p"])(e);case 2:a=t.sent,0===a.responseCode?this.$Message.success("更新成功"):this.$Message.error(a.responseMessage);case 4:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"_getDevPartVersionList",value:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.loadingHistory=!0,t.next=3,Object(v["h"])({partId:e});case 3:a=t.sent,0===a.responseCode&&(this.historyVersionList=a.responseData,this.loadingHistory=!1);case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"_getDevPartWithVersion",value:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(v["i"])({versionId:e});case 2:if(a=t.sent,0!==a.responseCode){t.next=11;break}return this.partDetails=a.responseData.devModel,this.devPartVersion=a.responseData.devModelVersion,void 0!==a.responseData.devModelVersion.attachment&&(this.partfileList=JSON.parse(a.responseData.devModelVersion.attachment)),t.next=9,this._getDevPartVersionList(this.partDetails.id);case 9:t.next=12;break;case 11:this.$Message.error(a.responseMessage);case 12:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"filter_status",value:function(t){var e="";return this.reviewStatusList.forEach(function(a){a.code===t&&(e=a.displayValue)}),e}},{key:"reviewStatusList",get:function(){return this.$store.state.optionItems.reviewStatusList}}]),e}(d["c"]);h=l["a"]([Object(d["a"])({})],h);var y=h,m=y,g=(a("f7df"),a("2877")),D=Object(g["a"])(m,r,i,!1,null,"48e7b71b",null);e["default"]=D.exports}}]);