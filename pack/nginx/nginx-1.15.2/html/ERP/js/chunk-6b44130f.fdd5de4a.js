(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b44130f"],{"1fc3":function(e,t,a){"use strict";var i=a("d296"),s=a.n(i);s.a},9865:function(e,t,a){"use strict";var i=a("5ca1"),s=a("6821"),r=a("4588"),n=a("9def"),o=[].lastIndexOf,l=!!o&&1/[1].lastIndexOf(1,-0)<0;i(i.P+i.F*(l||!a("2f21")(o)),"Array",{lastIndexOf:function(e){if(l)return o.apply(this,arguments)||0;var t=s(this),a=n(t.length),i=a-1;for(arguments.length>1&&(i=Math.min(i,r(arguments[1]))),i<0&&(i=a+i);i>=0;i--)if(i in t&&t[i]===e)return i||0;return-1}})},a542:function(e,t,a){"use strict";a.d(t,"d",function(){return n}),a.d(t,"k",function(){return o}),a.d(t,"f",function(){return l}),a.d(t,"m",function(){return u}),a.d(t,"c",function(){return c}),a.d(t,"e",function(){return d}),a.d(t,"g",function(){return p}),a.d(t,"h",function(){return h}),a.d(t,"i",function(){return m}),a.d(t,"n",function(){return y}),a.d(t,"o",function(){return v}),a.d(t,"p",function(){return f}),a.d(t,"j",function(){return g}),a.d(t,"a",function(){return k}),a.d(t,"b",function(){return w}),a.d(t,"q",function(){return M}),a.d(t,"l",function(){return _});var i=a("4576"),s=a("4328"),r=a.n(s),n=function(e){return i["a"].post("/api/getDevModelListByQuery",r.a.stringify(e))},o=function(){return i["a"].post("/api/user/getGroupList")},l=function(e){return i["a"].post("/api/getDevModelWithVersion",r.a.stringify(e))},u=function(e){return i["a"].post("/api/newDevModel",r.a.parse(e),{headers:{"Content-Type":"application/json;charset=UTF-8"}})},c=function(e){return i["a"].post("/api//getDevModelDetail",r.a.stringify(e))},d=function(e){return i["a"].post("/api/getDevModelVersionList",r.a.stringify(e))},p=function(e){return i["a"].post("/api/getDevPartListByQuery",r.a.stringify(e))},h=function(e){return i["a"].post("/api/getDevPartVersionList",r.a.stringify(e))},m=function(e){return i["a"].post("/api/getDevPartWithVersion",r.a.stringify(e))},y=function(e){return i["a"].post("/api/newDevPart",r.a.stringify(e))},v=function(e){return i["a"].post("/api/updateDevModel",r.a.parse(e),{headers:{"Content-Type":"application/json;charset=UTF-8"}})},f=function(e){return i["a"].post("/api/updateDevPart",r.a.stringify(e))},g=function(){return i["a"].post("/api/getDevelopOptionGroup")},k=function(e){return i["a"].post("/api/addDevelopOptionItem",r.a.stringify(e))},w=function(e){return i["a"].post("/api/deleteDevelopOptionItem",r.a.stringify(e))},M=function(e){return i["a"].post("/api/updateDevelopOptionItem",r.a.stringify(e))},_=function(e){return i["a"].get("/api/system/getOptionItemById",e)}},b2ae:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Card",{staticClass:"cardHeight"},[a("h2",[e._v("模块新建")]),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[e._v("选择添加类型：")]),a("Select",{staticStyle:{width:"280px"},attrs:{size:"large",placeholder:"请选择添加类型"},model:{value:e.addType,callback:function(t){e.addType=t},expression:"addType"}},e._l(e.addTypeList,function(t){return a("Option",{key:t.id,attrs:{value:t.code}},[e._v(e._s(t.displayValue))])}),1)],1),a("div",{staticStyle:{margin:"0 10px"}},[2===e.addType?a("Button",{attrs:{type:"primary"},on:{click:function(t){e.moduleModal=!0}}},[e._v("选择模块")]):e._e()],1),a("Modal",{attrs:{"mask-closable":!1,width:1e3,"class-name":"vertical-center-modal"},model:{value:e.moduleModal,callback:function(t){e.moduleModal=t},expression:"moduleModal"}},[a("p",{staticStyle:{"text-align":"center",color:"orange"},attrs:{slot:"header"},slot:"header"},[a("span",[e._v("模块列表，单击一行选中想要的数据")])]),a("div",{staticStyle:{"text-align":"center",overfllow:"auto"}},[a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[e._v("模块编号：")]),a("Input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入模块编号"},model:{value:e.moduleParams.modelCode,callback:function(t){e.$set(e.moduleParams,"modelCode",t)},expression:"moduleParams.modelCode"}})],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[e._v("模块名称：")]),a("Input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入模块名称"},model:{value:e.moduleParams.modelName,callback:function(t){e.$set(e.moduleParams,"modelName",t)},expression:"moduleParams.modelName"}})],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[e._v("模块类别：")]),a("Select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择模块类别："},model:{value:e.moduleParams.type,callback:function(t){e.$set(e.moduleParams,"type",t)},expression:"moduleParams.type"}},e._l(e.devModelTypeList,function(t){return a("Option",{key:t.id,attrs:{value:t.code}},[e._v(e._s(t.displayValue))])}),1)],1),a("Button",{staticStyle:{margin:"0 20px"},attrs:{type:"primary"},on:{click:e.queryModule}},[e._v("查询")]),a("Table",{attrs:{"highlight-row":"",columns:e.moduleColums,data:e.moduleList},on:{"on-current-change":e.onSelectChange_module}}),a("Page",{attrs:{total:e.totals_module,"show-total":"","show-elevator":"","show-sizer":""},on:{"on-change":e.handlePage_module,"on-page-size-change":e.handlePageSize_module}})],1),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"primary"},on:{click:e.add_Modular}},[e._v("确认")]),a("Button",{attrs:{type:"primary"},on:{click:function(t){e.moduleModal=!1}}},[e._v("取消")])],1)]),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[e._v("模块编号：")]),a("Input",{staticClass:"input",attrs:{disabled:2===e.addType,size:"large",placeholder:"请输入模块编号"},model:{value:e.devModelWithNewQuery.modelCode,callback:function(t){e.$set(e.devModelWithNewQuery,"modelCode",t)},expression:"devModelWithNewQuery.modelCode"}})],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[e._v("模块名称：")]),a("Input",{staticClass:"input",attrs:{disabled:2===e.addType,size:"large",placeholder:"请输入模块名称"},model:{value:e.devModelWithNewQuery.modelName,callback:function(t){e.$set(e.devModelWithNewQuery,"modelName",t)},expression:"devModelWithNewQuery.modelName"}})],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[e._v("模块类别：")]),a("Select",{staticStyle:{width:"280px"},attrs:{disabled:2===e.addType,size:"large",placeholder:"请选择模块类别："},model:{value:e.devModelWithNewQuery.type,callback:function(t){e.$set(e.devModelWithNewQuery,"type",t)},expression:"devModelWithNewQuery.type"}},e._l(e.devModelTypeList,function(t){return a("Option",{key:t.id,attrs:{value:t.code}},[e._v(e._s(t.displayValue))])}),1)],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[e._v("规格：")]),a("Input",{staticClass:"input",attrs:{disabled:2===e.addType,size:"large",placeholder:"请输入模块规格："},model:{value:e.devModelWithNewQuery.specs,callback:function(t){e.$set(e.devModelWithNewQuery,"specs",t)},expression:"devModelWithNewQuery.specs"}})],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[e._v("模块版本号：")]),a("Input",{staticClass:"input",attrs:{size:"large",placeholder:"请输入版本号"},model:{value:e.devModelWithNewQuery.version,callback:function(t){e.$set(e.devModelWithNewQuery,"version",t)},expression:"devModelWithNewQuery.version"}})],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[e._v("模块描述：")]),a("Input",{staticStyle:{width:"680px"},attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"请输入模块描述"},model:{value:e.devModelWithNewQuery.discription,callback:function(t){e.$set(e.devModelWithNewQuery,"discription",t)},expression:"devModelWithNewQuery.discription"}})],1),a("uploadFile",{attrs:{UPtitle:"模块图纸上传："},on:{toUpFileList:e.toUpFileList}}),a("div",{staticClass:"newLine"},[a("h3",{staticClass:"inputTitle"},[e._v("零件信息：")]),a("Button",{staticStyle:{margin:"0 10px"},attrs:{type:"primary"},on:{click:function(t){e.partModal=!0}}},[e._v("选择零件")]),a("Button",{attrs:{type:"primary"},on:{click:function(t){return e.$router.push({name:"AccessoryAdd"})}}},[e._v("新建零件")])],1),a("Modal",{attrs:{zIndex:10,"mask-closable":!1,width:960,"class-name":"vertical-center-modal"},model:{value:e.partModal,callback:function(t){e.partModal=t},expression:"partModal"}},[a("p",{staticStyle:{"text-align":"center",color:"orange"},attrs:{slot:"header"},slot:"header"},[a("span",[e._v("零件列表：单击一行选中零件")])]),a("div",[a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[e._v("零件编号：")]),a("Input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入零件编号"},model:{value:e.partListParams.partCode,callback:function(t){e.$set(e.partListParams,"partCode",t)},expression:"partListParams.partCode"}})],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[e._v("零件名称：")]),a("Input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入零件名称"},model:{value:e.partListParams.partName,callback:function(t){e.$set(e.partListParams,"partName",t)},expression:"partListParams.partName"}})],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[e._v("零件类别：")]),a("Select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择零件类别："},model:{value:e.partListParams.type,callback:function(t){e.$set(e.partListParams,"type",t)},expression:"partListParams.type"}},e._l(e.devModelTypeList,function(t){return a("Option",{key:t.id,attrs:{value:t.code}},[e._v(e._s(t.displayValue))])}),1)],1),a("Button",{staticStyle:{margin:"0 20px"},attrs:{type:"primary"},on:{click:e.queryPart}},[e._v("查询")]),a("Table",{attrs:{"highlight-row":"",columns:e.partModalColumns,loading:e.accessoryLoading,data:e.partList},on:{"on-current-change":e.onSelect_part}}),a("div",{staticStyle:{"text-align":"center"}},[a("Page",{attrs:{total:e.totals_part,"show-total":"","show-elevator":"","show-sizer":""},on:{"on-change":e.handlePage_part,"on-page-size-change":e.handlePageSize_part}})],1)],1),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"primary"},on:{click:e.add_Part}},[e._v("确认")]),a("Button",{attrs:{type:"primary"},on:{click:function(t){e.partModal=!1}}},[e._v("取消")])],1)]),a("Modal",{attrs:{zIndex:20,"mask-closable":!1,width:960,"class-name":"vertical-center-modal"},model:{value:e.partVersionModal,callback:function(t){e.partVersionModal=t},expression:"partVersionModal"}},[a("p",{staticStyle:{"text-align":"center",color:"orange"},attrs:{slot:"header"},slot:"header"},[a("span",[e._v("零件版本和数量选择")])]),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[e._v("零件版本选择：")]),a("Select",{staticStyle:{width:"280px"},attrs:{size:"large",placeholder:"请选择零件版本"},model:{value:e.clickRowData.version,callback:function(t){e.$set(e.clickRowData,"version",t)},expression:"clickRowData.version"}},e._l(e.partVersionList,function(t){return a("Option",{key:t.id,attrs:{value:t.version}},[e._v(e._s(t.version))])}),1)],1),a("div",{staticClass:"inputModel"},[a("span",{staticClass:"inputTitle"},[e._v("零件数量选择：")]),a("InputNumber",{attrs:{min:1,placeholder:"请选择零件数量"},model:{value:e.clickRowData.partCount,callback:function(t){e.$set(e.clickRowData,"partCount",t)},expression:"clickRowData.partCount"}})],1),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"primary"},on:{click:e.hiddenModal}},[e._v("确认")]),a("Button",{attrs:{type:"primary"},on:{click:function(t){e.partVersionModal=!1}}},[e._v("取消")])],1)]),a("div",{staticClass:"table"},[a("Table",{attrs:{columns:e.columns_part,data:e.accessoryList}})],1),a("div",{staticClass:"newLine",staticStyle:{"text-align":"center"}},[e.spinShow?a("Spin",{attrs:{size:"large",fix:""}}):e._e(),a("Button",{staticStyle:{margin:"0 10px"},attrs:{type:"primary"},on:{click:e.submitModular}},[e._v("提交")]),a("Button",{staticStyle:{margin:"0 10px"},attrs:{type:"primary"}},[e._v("取消")])],1)],1)],1)},s=[],r=(a("f3e2"),a("96cf"),a("3b8d")),n=a("f499"),o=a.n(n),l=a("d225"),u=a("b0b4"),c=a("308d"),d=a("6bb5"),p=a("4e2b"),h=a("9ab4"),m=a("d265"),y=a("a542"),v=a("fe47"),f=function(e){function t(){var e;return Object(l["a"])(this,t),e=Object(c["a"])(this,Object(d["a"])(t).apply(this,arguments)),e.partModal=!1,e.spinShow=!1,e.moduleModal=!1,e.partVersionModal=!1,e.addType="",e.addTypeList=[{code:1,displayValue:"新建模块"},{code:2,displayValue:"新版本模块"}],e.statusList=[{code:1,displayValue:"正常",keyWord:"status"},{code:2,displayValue:"禁用",keyWord:"status"}],e.moduleParams={pageNum:1,pageSize:10,modelCode:"",modelName:"",type:0,specs:"",status:0,createTimeBegin:"",createTimeEnd:""},e.moduleColums=[{title:"模块编号",align:"center",key:"modelCode"},{title:"模块名称",align:"center",key:"modelName"},{title:"模块发行版本",align:"center",key:"currentVersion"},{title:"最后修改时间",align:"center",key:"updateTime"},{title:"模块类别",align:"center",key:"type",render:function(t,a){return t("Tag",{style:{background:"#fff",border:"none"}},e.filter_type(a.row.type))}},{title:"状态",align:"center",key:"status",render:function(t,a){return t("Tag",{style:{background:"#fff",border:"none"}},e.filter_status(a.row.status))}}],e.partModalColumns=[{title:"零件编号",align:"center",key:"partCode"},{title:"零件名称",align:"center",key:"partName"},{title:"零件版本",align:"center",key:"currentVersion"},{title:"最后修改时间",align:"center",key:"updateTime"}],e.columns_part=[{title:"零件编号",align:"center",key:"partCode"},{title:"零件名称",align:"center",key:"partName"},{title:"零件版本",align:"center",key:"version"},{title:"零件数量",align:"center",key:"partCount",render:function(e,t){return e("div",[e("InputNumber",{props:{value:t.row.partCount,min:0},on:{"on-change":function(e){t.row.patCount=e}}})])}},{title:"最后修改时间",align:"center",key:"updateTime"},{title:"操作",align:"center",key:"operat",render:function(t,a){return t("div",[t("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){e.searchPartDetails(a)}}},"查看"),t("Button",{props:{type:"primary",size:"small"},on:{click:function(){e.delete(a)}}},"删除")])}}],e.moduleList=[],e.totals_module=0,e.devModelWithNewQuery={attachment:"",version:"",specs:"",discription:"",modelCode:"",modelName:"",type:"",id:"",devModelDetails:[{memo:"",partCount:"",id:"",partVersionId:"",modelVersionId:""}]},e.partListParams={pageNum:1,partCode:"",partName:"",type:0,status:0,createTimeBegin:"",createTimeEnd:""},e.accessoryLoading=!1,e.partList=[],e.totals_part=0,e.clickRowData={},e.partVersionList=[],e.accessoryList=[],e.onSelectionList_module=[],e}return Object(p["a"])(t,e),Object(u["a"])(t,[{key:"mounted",value:function(){this._getDevModelListByQuery(this.moduleParams),this._getDevPartListByQuery(this.partListParams)}},{key:"queryModule",value:function(){this._getDevModelListByQuery(this.moduleParams)}},{key:"queryPart",value:function(){this._getDevPartListByQuery(this.partListParams)}},{key:"toUpFileList",value:function(e){this.devModelWithNewQuery.attachment=o()(e)}},{key:"onSelectChange_module",value:function(e){this.onSelectionList_module=e}},{key:"add_Modular",value:function(){this.devModelWithNewQuery=this.onSelectionList_module,this.moduleModal=!1}},{key:"onSelect_part",value:function(e){this.clickRowData=e,this.clickRowData.partCount=1}},{key:"add_Part",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this._getDevPartVersionList(this.clickRowData.id);case 2:this.clickRowData.version=this.clickRowData.currentVersion,this.partVersionModal=!0;case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"_getDevPartVersionList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(y["h"])({partId:t});case 2:a=e.sent,0===a.responseCode&&(this.partVersionList=a.responseData);case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"hiddenModal",value:function(){var e=this;this.partVersionList.forEach(function(t){t.version===e.clickRowData.version&&(e.clickRowData.currentVersionId=t.id)}),this.accessoryList.push(this.clickRowData),this.partModal=!1,this.partVersionModal=!1}},{key:"searchPartDetails",value:function(e){this.$router.push({name:"AccessoryDetails",query:{versionId:e.row.currentVersionId}})}},{key:"delete",value:function(e){var t=this;this.accessoryList.forEach(function(a,i){a.id===e.row.id&&t.accessoryList.splice(i,1)})}},{key:"submitModular",value:function(){this.accessoryList.forEach(function(e){e.partVersionId=e.currentVersionId}),this.devModelWithNewQuery.devModelDetails=this.accessoryList,this._newDevModel(this.devModelWithNewQuery)}},{key:"handlePage_module",value:function(e){this.moduleParams.pageNum=e,this._getDevModelListByQuery(this.moduleParams)}},{key:"handlePageSize_module",value:function(e){this.moduleParams.pageSize=e,this._getDevModelListByQuery(this.moduleParams)}},{key:"handlePage_part",value:function(e){this.partListParams.pageNum=e,this._getDevPartListByQuery(this.partListParams)}},{key:"handlePageSize_part",value:function(e){this.partListParams.pageSize=e,this._getDevPartListByQuery(this.partListParams)}},{key:"_newDevModel",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(""!==this.devModelWithNewQuery.modelCode&&void 0!==this.devModelWithNewQuery.modelCode){e.next=3;break}return this.$Message.warning("请输入模块编号"),e.abrupt("return");case 3:if(""!==this.devModelWithNewQuery.modelName&&void 0!==this.devModelWithNewQuery.modelName){e.next=6;break}return this.$Message.warning("请输入模块名称"),e.abrupt("return");case 6:if(""!==this.devModelWithNewQuery.version&&void 0!==this.devModelWithNewQuery.version){e.next=9;break}return this.$Message.warning("请输入模块版本号"),e.abrupt("return");case 9:return this.spinShow=!0,e.next=12,Object(y["m"])(t);case 12:a=e.sent,0===a.responseCode?(this.spinShow=!1,this.$Message.success("恭喜您，新建成功"),this.$router.push({name:"ModularList"})):(this.spinShow=!1,this.$Message.error(a.responseMessage));case 14:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"_getDevModelListByQuery",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(y["d"])(t);case 2:a=e.sent,0===a.responseCode?(this.moduleList=a.responseData.rows,this.totals_module=a.responseData.total):this.$Message.error(a.responseMessage);case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"_getDevPartListByQuery",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.accessoryLoading=!0,e.next=3,Object(y["g"])(t);case 3:a=e.sent,0===a.responseCode?(this.partList=a.responseData.rows,this.totals_part=a.responseData.total,this.accessoryLoading=!1):this.$Message.error(a.responseMessage);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"filter_status",value:function(e){var t="";return this.statusList.forEach(function(a){a.code===e&&(t=a.displayValue)}),t}},{key:"filter_type",value:function(e){var t="";return this.devModelTypeList.forEach(function(a){a.code===e&&(t=a.displayValue)}),t}},{key:"devModelTypeList",get:function(){return this.$store.state.optionItems.devModelTypeList}}]),t}(m["c"]);f=h["a"]([Object(m["a"])({components:{uploadFile:v["a"]}})],f);var g=f,k=g,w=(a("1fc3"),a("2877")),M=Object(w["a"])(k,i,s,!1,null,"2f084e68",null);t["default"]=M.exports},bf04:function(e,t,a){},d296:function(e,t,a){},e6e8:function(e,t,a){"use strict";var i=a("bf04"),s=a.n(i);s.a},f046:function(e,t,a){"use strict";a.d(t,"b",function(){return n}),a.d(t,"a",function(){return o});var i=a("4576"),s=a("4328"),r=a.n(s),n=function(){return i["a"].post("/api/devUpload/getAliUploadAccess")},o=function(e){return i["a"].post("/api/devUpload/getAliImageUrl",r.a.stringify({imageUrl:e}))}},fe47:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"upload"},[a("span",{staticClass:"star"},[e._v(e._s(e.UPtitle))]),a("Upload",{ref:"commupload",staticStyle:{display:"inline-block",width:"auto"},attrs:{"show-upload-list":!0,"on-remove":e.handleRemove_comm,"on-success":e.handleSuccess_comm,"default-file-list":e.commExistImg,"before-upload":e.handleBeforeUpload_comm,type:"drag",action:e.host,data:e.uploadData}},[a("div",{staticClass:"contain"},[a("Icon",{attrs:{type:"ios-folder",size:"24"}})],1)])],1)},s=[],r=(a("9865"),a("57e7"),a("7f7f"),a("96cf"),a("3b8d")),n=a("d225"),o=a("b0b4"),l=a("308d"),u=a("6bb5"),c=a("4e2b"),d=a("9ab4"),p=a("d265"),h=a("f046"),m=function(e){function t(){var e;return Object(n["a"])(this,t),e=Object(l["a"])(this,Object(u["a"])(t).apply(this,arguments)),e.toUpFileList=[],e.accessid="",e.signature="",e.expire="",e.host="",e.dir="",e.policy="",e.uploadFileName="",e.uploadData={},e}return Object(c["a"])(t,e),Object(o["a"])(t,[{key:"handleSuccess_comm",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,a){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.toUpFileList.push({url:this.uploadFileName}),this.$emit("toUpFileList",this.toUpFileList);case 2:case"end":return e.stop()}},e,this)}));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"handleBeforeUpload_comm",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(h["b"])();case 2:return a=e.sent,this.host=a.responseData.host,this.accessid=a.responseData.accessid,this.expire=a.responseData.expire,this.dir=a.responseData.dir,this.policy=a.responseData.policy,this.signature=a.responseData.signature,e.next=11,this._getFileName(t.name);case 11:this.uploadFileName=e.sent,this.uploadData={key:this.uploadFileName,policy:this.policy,OSSAccessKeyId:this.accessid,success_action_status:"200",signature:this.signature};case 13:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"handleRemove_comm",value:function(e){this.toUpFileList.splice(this.toUpFileList.indexOf(e),1),this.$emit("toUpFileList",this.toUpFileList)}},{key:"_getFileName",value:function(e){return this.dir+this._randomString(10)+"/"+e}},{key:"_getSuffix",value:function(e){var t=e.lastIndexOf("."),a="";return-1!==t&&(a=e.substring(t)),a}},{key:"_randomString",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32,t="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",a=t.length,i="",s=0;s<e;s++)i+=t.charAt(Math.floor(Math.random()*a));return i}}]),t}(p["c"]);d["a"]([Object(p["b"])()],m.prototype,"commExistImg",void 0),d["a"]([Object(p["b"])()],m.prototype,"UPtitle",void 0),m=d["a"]([Object(p["a"])({})],m);var y=m,v=y,f=(a("e6e8"),a("2877")),g=Object(f["a"])(v,i,s,!1,null,"6e461ace",null),k=g.exports;t["a"]=k}}]);