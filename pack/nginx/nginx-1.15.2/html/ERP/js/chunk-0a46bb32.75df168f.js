(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0a46bb32"],{"1dfc":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Card",{staticClass:"cardHeight"},[a("h2",[t._v("模块列表")]),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[t._v("模块编号：")]),a("Input",{staticClass:"input",attrs:{size:"large",placeholder:"请输入模块编号"},model:{value:t.modularParams.modelCode,callback:function(e){t.$set(t.modularParams,"modelCode",e)},expression:"modularParams.modelCode"}})],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[t._v("模块名称：")]),a("Input",{staticClass:"input",attrs:{size:"large",placeholder:"请输入模块名称"},model:{value:t.modularParams.modelName,callback:function(e){t.$set(t.modularParams,"modelName",e)},expression:"modularParams.modelName"}})],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[t._v("模块类别：")]),a("Select",{staticStyle:{width:"280px"},attrs:{size:"large",placeholder:"请选择模块类别："},model:{value:t.modularParams.type,callback:function(e){t.$set(t.modularParams,"type",e)},expression:"modularParams.type"}},t._l(t.devModelTypeList,function(e){return a("Option",{key:e.id,attrs:{value:e.code}},[t._v(t._s(e.displayValue))])}),1)],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[t._v("规格：")]),a("Input",{staticClass:"input",attrs:{size:"large",placeholder:"请输入模块规格"},model:{value:t.modularParams.specs,callback:function(e){t.$set(t.modularParams,"specs",e)},expression:"modularParams.specs"}})],1),a("div",{staticClass:"inputModel",staticStyle:{"margin-top":"20px"}},[a("span",{staticClass:"inputTitle"},[t._v("创建时间：")]),a("Row",{staticClass:"input"},[a("Col",{staticStyle:{display:"flex","justify-content":"space-arround",width:"100%"},attrs:{span:"12"}},[a("DatePicker",{staticStyle:{width:"140px"},attrs:{type:"date",placeholder:"请输入创建时间"},model:{value:t.modularParams.createTimeBegin,callback:function(e){t.$set(t.modularParams,"createTimeBegin",e)},expression:"modularParams.createTimeBegin"}}),t._v("\n          到\n          "),a("DatePicker",{staticStyle:{width:"140px"},attrs:{type:"date",placeholder:"请输入结束时间"},model:{value:t.modularParams.createTimeEnd,callback:function(e){t.$set(t.modularParams,"createTimeEnd",e)},expression:"modularParams.createTimeEnd"}})],1)],1)],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[t._v("状态：")]),a("Select",{staticStyle:{width:"280px"},attrs:{size:"large",placeholder:"请选择状态："},model:{value:t.modularParams.status,callback:function(e){t.$set(t.modularParams,"status",e)},expression:"modularParams.status"}},t._l(t.statusList,function(e){return a("Option",{key:e.id,attrs:{value:e.code}},[t._v(t._s(e.displayValue))])}),1)],1),a("div",{staticClass:"inputModel"},[a("Button",{attrs:{type:"primary"},on:{click:t.serach}},[t._v("查询")])],1),a("div",{staticClass:"inputModel"},[a("Button",{attrs:{type:"primary"},on:{click:function(e){return t.$router.push({name:"ModularAdd"})}}},[t._v("新建")])],1),a("div",{staticClass:"table"},[a("Table",{attrs:{columns:t.columns,loading:t.loading,data:t.tableData}})],1),a("div",{staticClass:"page"},[a("Page",{attrs:{total:t.totals,"show-total":"","show-elevator":"","show-sizer":""},on:{"on-change":t.handlePage,"on-page-size-change":t.handlePageSize}})],1)])],1)},s=[],i=(a("96cf"),a("3b8d")),r=(a("f3e2"),a("d225")),o=a("b0b4"),l=a("308d"),u=a("6bb5"),d=a("4e2b"),c=a("9ab4"),p=a("d265"),m=a("a542"),f=a("ff1a"),y=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(l["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.devModelTypeList=[],t.loading=!0,t.disabledTitle="",t.totals=0,t.tableData=[],t.statusList=[{code:0,displayValue:"全部",keyWord:"status"},{code:1,displayValue:"正常",keyWord:"status"},{code:2,displayValue:"禁用",keyWord:"status"}],t.modularParams={pageNum:1,pageSize:10,modelCode:"",modelName:"",type:0,specs:"",status:1,createTimeBegin:"",createTimeEnd:""},t.columns=[{title:"模块编号",align:"center",key:"modelCode"},{title:"模块名称",align:"center",key:"modelName"},{title:"模块发行版本",align:"center",key:"currentVersion"},{title:"最后修改时间",align:"center",key:"updateTime"},{title:"模块类别",align:"center",key:"type",render:function(e,a){return e("Tag",{style:{background:"#fff",border:"none"}},t.filter_type(a.row.type))}},{title:"状态",align:"center",key:"status",render:function(e,a){return e("Tag",{style:{background:"#fff",border:"none"}},t.filter_status(a.row.status))}},{title:"操作",align:"center",key:"operat",render:function(e,a){return e("div",[e("Button",{props:{type:"primary",size:"small"},on:{click:function(){t.goModularDetails(a)}}},"查看")])}}],t}return Object(d["a"])(e,t),Object(o["a"])(e,[{key:"mounted",value:function(){var t=Object(f["k"])("devModelTypeList");t&&(this.devModelTypeList=JSON.parse(t),this.devModelTypeList=this.devModelTypeList.concat([{id:0,code:0,displayValue:"全部"}]).reverse()),this._getDevModelListByQuery(this.modularParams)}},{key:"serach",value:function(){this._getDevModelListByQuery(this.modularParams)}},{key:"goModularDetails",value:function(t){this.$router.push({name:"ModularDetails",query:{versionId:t.row.currentVersionId}})}},{key:"handlePage",value:function(t){this.modularParams.pageNum=t,this._getDevModelListByQuery(this.modularParams)}},{key:"handlePageSize",value:function(t){this.modularParams.pageSize=t,this._getDevModelListByQuery(this.modularParams)}},{key:"filter_status",value:function(t){var e="";return this.statusList.forEach(function(a){a.code===t&&(e=a.displayValue)}),e}},{key:"filter_type",value:function(t){var e="";return this.devModelTypeList.forEach(function(a){a.code===t&&(e=a.displayValue)}),e}},{key:"_getDevModelListByQuery",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.loading=!0,t.next=3,Object(m["d"])(e);case 3:a=t.sent,0===a.responseCode?(this.tableData=a.responseData.rows,this.totals=a.responseData.total,this.loading=!1):this.$Message.error(a.responseMessage);case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()}]),e}(p["d"]);y=c["a"]([Object(p["a"])({})],y);var v=y,g=v,h=(a("6ff6"),a("2877")),k=Object(h["a"])(g,n,s,!1,null,"e1a923f4",null);e["default"]=k.exports},"6ff6":function(t,e,a){"use strict";var n=a("8a5e"),s=a.n(n);s.a},"8a5e":function(t,e,a){},a542:function(t,e,a){"use strict";a.d(e,"d",function(){return r}),a.d(e,"k",function(){return o}),a.d(e,"f",function(){return l}),a.d(e,"m",function(){return u}),a.d(e,"c",function(){return d}),a.d(e,"e",function(){return c}),a.d(e,"g",function(){return p}),a.d(e,"h",function(){return m}),a.d(e,"i",function(){return f}),a.d(e,"n",function(){return y}),a.d(e,"o",function(){return v}),a.d(e,"p",function(){return g}),a.d(e,"j",function(){return h}),a.d(e,"a",function(){return k}),a.d(e,"b",function(){return P}),a.d(e,"q",function(){return b}),a.d(e,"l",function(){return M});var n=a("4576"),s=a("4328"),i=a.n(s),r=function(t){return n["a"].post("/api/getDevModelListByQuery",i.a.stringify(t))},o=function(){return n["a"].post("/api/user/getGroupList")},l=function(t){return n["a"].post("/api/getDevModelWithVersion",i.a.stringify(t))},u=function(t){return n["a"].post("/api/newDevModel",i.a.parse(t),{headers:{"Content-Type":"application/json;charset=UTF-8"}})},d=function(t){return n["a"].post("/api//getDevModelDetail",i.a.stringify(t))},c=function(t){return n["a"].post("/api/getDevModelVersionList",i.a.stringify(t))},p=function(t){return n["a"].post("/api/getDevPartListByQuery",i.a.stringify(t))},m=function(t){return n["a"].post("/api/getDevPartVersionList",i.a.stringify(t))},f=function(t){return n["a"].post("/api/getDevPartWithVersion",i.a.stringify(t))},y=function(t){return n["a"].post("/api/newDevPart",i.a.stringify(t))},v=function(t){return n["a"].post("/api/updateDevModel",i.a.parse(t),{headers:{"Content-Type":"application/json;charset=UTF-8"}})},g=function(t){return n["a"].post("/api/updateDevPart",i.a.stringify(t))},h=function(){return n["a"].post("/api/getDevelopOptionGroup")},k=function(t){return n["a"].post("/api/addDevelopOptionItem",i.a.stringify(t))},P=function(t){return n["a"].post("/api/deleteDevelopOptionItem",i.a.stringify(t))},b=function(t){return n["a"].post("/api/updateDevelopOptionItem",i.a.stringify(t))},M=function(t){return n["a"].get("/api/system/getOptionItemById",t)}}}]);