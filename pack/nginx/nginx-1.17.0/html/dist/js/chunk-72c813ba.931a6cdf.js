(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72c813ba","chunk-b26e111a"],{"19d5":function(t,e,r){"use strict";var s=r("9004"),n=r.n(s);n.a},2071:function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"layout"},[r("h2",[t._v("我的收货地址")]),t._l(t.addressList,function(e){return r("address",{key:e._id,staticClass:"addressList"},[r("span",{staticClass:"edit",on:{click:function(r){return t.addressChange(e._id)}}},[r("Icon",{attrs:{type:"md-create"}})],1),r("span",{staticClass:"close",on:{click:function(r){return t.addressRemove(e._id)}}},[r("Icon",{attrs:{type:"md-close"}})],1),r("span",{directives:[{name:"show",rawName:"v-show",value:1==e.isDefault,expression:"item.isDefault == 1"}],staticClass:"default"},[t._v("默认地址")]),r("div",{staticClass:"first-row"},[r("span",[t._v(t._s(e.userName))]),r("span",[t._v(t._s(e.tel))])]),r("div",{staticClass:"street"},[t._v(t._s(e.streetName))])])}),r("Button",{attrs:{icon:"md-add",type:"primary"},on:{click:function(e){t.addressModal=!0}}},[t._v("添加收货人地址")]),r("Modal",{attrs:{title:"Custom width",width:"720"},model:{value:t.addressModal,callback:function(e){t.addressModal=e},expression:"addressModal"}},[r("div",{staticStyle:{"font-weight":"bld","text-align":"center",color:"orange"},attrs:{slot:"header"},slot:"header"},[t._v(" 请填写您的收货地址！")]),r("Form",{attrs:{model:t.formItem,"label-width":120}},[r("FormItem",{attrs:{label:"姓名"}},[r("Input",{attrs:{placeholder:"请输入详细地址"},model:{value:t.formItem.userName,callback:function(e){t.$set(t.formItem,"userName",e)},expression:"formItem.userName"}})],1),r("FormItem",{attrs:{label:"联系电话"}},[r("Input",{attrs:{placeholder:"请输入联系电话"},model:{value:t.formItem.tel,callback:function(e){t.$set(t.formItem,"tel",e)},expression:"formItem.tel"}})],1),r("FormItem",{attrs:{label:"地址"}},[r("Input",{attrs:{placeholder:"请输入详细地址"},model:{value:t.formItem.streetName,callback:function(e){t.$set(t.formItem,"streetName",e)},expression:"formItem.streetName"}})],1),r("FormItem",{attrs:{label:"是否默认地址"}},[r("Select",{staticStyle:{width:"200px"},model:{value:t.formItem.isDefault,callback:function(e){t.$set(t.formItem,"isDefault",e)},expression:"formItem.isDefault"}},t._l(t.commlist,function(e){return r("Option",{key:e.id,attrs:{value:e.code}},[t._v(t._s(e.displayValue))])}),1)],1),r("FormItem",{attrs:{label:"备注"}},[r("Input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"请输入您的备注"},model:{value:t.formItem.memo,callback:function(e){t.$set(t.formItem,"memo",e)},expression:"formItem.memo"}})],1),r("FormItem",[r("Button",{attrs:{type:"primary"},on:{click:t.submitAddress}},[t._v("提交")]),r("Button",{staticStyle:{"margin-left":"8px"},on:{click:t.closeModal}},[t._v("取消")])],1)],1),r("div",{attrs:{slot:"footer"},slot:"footer"})],1)],2)},n=[],a=(r("96cf"),r("3b8d")),o=r("c24f"),i={data:function(){return{commlist:[{code:1,id:1,displayValue:"是"},{code:2,id:2,displayValue:"否"}],addressModal:!1,addressList:[],formItem:{_id:"",userName:"",streetName:"",tel:"",isDefault:"",memo:""}}},mounted:function(){this._getAddressList()},methods:{submitAddress:function(){this.formItem.userName?this.formItem.tel?this.formItem.streetName?this.formItem._id?this._addressUpdate(this.formItem):this._addAddress(this.formItem):this.$Message.warning("请输入收货人详细地址"):this.$Message.warning("请输入收货人手机号"):this.$Message.warning("请输入收货人姓名")},_addAddress:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["a"])(e);case 2:r=t.sent,0==r.status&&(this.$Message.success("地址新增成功"),this.closeModal());case 4:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),_addressUpdate:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["c"])(e);case 2:r=t.sent,0==r.status&&(this.$Message.success("地址更新成功"),this.formItem={_id:"",userName:"",streetName:"",tel:"",isDefault:"",memo:""},this.closeModal());case 4:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),addressChange:function(t){this._getAddressById({_id:t}),this.addressModal=!0},addressRemove:function(t){var e=this;this.$Modal.confirm({title:"警告",content:"正在做删除地址操作，确定要继续吗？",okText:"确定",cancelText:"取消",onOk:function(){e._addressRemove({_id:t})}})},closeModal:function(){this._getAddressList(),this.addressModal=!1},_getAddressById:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["g"])(e);case 2:r=t.sent,0==r.status&&(this.formItem=r.result);case 4:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),_getAddressList:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.$Spin.show(),t.next=3,Object(o["h"])();case 3:e=t.sent,0==e.status&&(this.addressList=e.result,this.$Spin.hide());case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),_addressRemove:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["b"])(e);case 2:r=t.sent,0==r.status&&(this.$Message.success("删除成功"),this._getAddressList());case 4:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()}},c=i,u=(r("19d5"),r("2877")),d=Object(u["a"])(c,s,n,!1,null,"7398c4a6",null);e["default"]=d.exports},"27d3":function(t,e,r){t.exports=r.p+"img/mypayCode.dc77cff3.png"},8742:function(t,e,r){"use strict";var s=r("a3e8"),n=r.n(s);n.a},"881e":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"payment"},[s("myAddress"),s("div",{staticClass:"layout"},t._l(t.orderList,function(e,n){return s("div",{key:n},[s("h2",[t._v("第"+t._s(n+1)+"单 \n        "),s("span",{staticStyle:{margin:"0 15px"}},[t._v("下单时间："+t._s(e.createDate))]),s("em",{staticStyle:{color:"#ff9900"}},[t._v("订单状态："+t._s(t._f("transform")(e.orderStatus,t.orderStatusList)))]),s("em",{staticStyle:{margin:"0 20px"}},[t._v("订单编号："+t._s(e.orderId))])]),s("Table",{attrs:{columns:t.columns,data:e.goodsList}}),s("div",{staticClass:"settlement"},[s("span",{staticClass:"goodsCount"},[t._v(" 共"+t._s(e.goodsList["length"])+"笔订单")]),s("span",{staticClass:"totalPrice"},[t._v("已优惠0.00元， 合计(不含运费)：￥"),s("strong",[t._v(t._s(e.orderTotal)+"元")])]),s("span",{staticClass:"setPrice"},[s("Button",{attrs:{type:"error"},on:{click:function(e){t.payModal=!0}}},[t._v("立即支付")]),s("Button",{staticStyle:{margin:"0 10px"},attrs:{type:"error"},on:{click:function(r){return t.cancelOrder(e.orderId,4)}}},[t._v("取消订单")])],1),s("Modal",{attrs:{align:"center",title:"谢谢！！！",width:560},model:{value:t.payModal,callback:function(e){t.payModal=e},expression:"payModal"}},[s("div",{attrs:{slot:"header"},slot:"header"},[t._v("请扫描上述二维码完成支付，谢谢！")]),s("Card",[s("div",{staticStyle:{"text-align":"center"}},[s("img",{staticStyle:{width:"100%"},attrs:{src:r("27d3")}})])]),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("Button",{attrs:{type:"success"},on:{click:function(r){return t.paySuccess(e.orderId,2)}}},[t._v("支付完成")]),s("Button",{staticStyle:{margin:"0 10px"},attrs:{type:"error"},on:{click:function(e){t.payModal=!1}}},[t._v("关闭")])],1)],1)],1)],1)}),0)],1)},n=[],a=(r("96cf"),r("3b8d")),o=r("2f62"),i=(r("c24f"),r("90fe"),r("f8b7")),c=r("2071"),u={components:{myAddress:c["default"]},data:function(){return{payModal:!1,orderList:[],totalPrice:0,columns:[{title:"订单图",key:"homeUrl",width:200,align:"center",render:function(t,e){return t("img",{attrs:{src:e.row.homeUrl,style:"width: 100px;"}})}},{title:"订单描述",key:"productDesc",align:"center"},{title:"单价（元）",key:"price",align:"center"},{title:"订单数量（件）",key:"productNum",align:"center"},{title:"小计（元）",key:"price",align:"center",render:function(t,e){return t("div",[t("span",e.row.price*e.row.productNum)])}}]}},computed:Object(o["c"])({orderStatusList:function(t){return t.optionItems.orderStatusList}}),mounted:function(){this._getOrderList()},methods:{cancelOrder:function(t,e){var r=this;this.$Modal.error({content:"正在取消订单，确定要继续吗？",onOk:function(){r._orderChangeStatusById({orderId:t,orderStatus:e})}})},paySuccess:function(t,e){this._orderChangeStatusById({orderId:t,orderStatus:e}),this.payModal=!1},_orderChangeStatusById:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["c"])(e);case 2:r=t.sent,0==r.status&&(2==e.orderStatus?(this.$Message.success("支付成功"),this.$router.push({name:"paySuccess"})):4==e.orderStatus&&(this.$Message.success("取消订单成功"),this._getOrderList()));case 4:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),_getOrderList:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["b"])();case 2:e=t.sent,0==e.status&&(this.orderList=e.result.filter(function(t){return 1==t.orderStatus}));case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()}},d=u,l=(r("8742"),r("2877")),m=Object(l["a"])(d,s,n,!1,null,"09b4021b",null);e["default"]=m.exports},9004:function(t,e,r){},a3e8:function(t,e,r){},f8b7:function(t,e,r){"use strict";r.d(e,"a",function(){return a}),r.d(e,"b",function(){return o}),r.d(e,"c",function(){return i}),r.d(e,"d",function(){return c});var s=r("365c"),n="/api",a=function(t){return s["a"].fetchPost("".concat(n,"/orders/generateOrder"),t)},o=function(){return s["a"].fetchPost("".concat(n,"/orders/getOrderList"))},i=function(t){return s["a"].fetchPost("".concat(n,"/orders/orderChangeStatusById"),t)},c=function(t){return s["a"].fetchPost("".concat(n,"/orders/orderRemoveById"),t)}}}]);