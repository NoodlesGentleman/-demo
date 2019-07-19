
var app = $("body"), action;

//$('#campany').on('change', function() {
//	$('#store').val($(this).find('option:selected').val());
//	$('#campanyIdHidden').val($(this).find('option:selected').val());
//	$('#campanyHidden').val($(this).find('option:selected').text());
//	$('#storeHidden').val($('#store').find('option:selected').text());
//});
var editCompany = $("#editCompany").select2({
  placeholder: "请选择公司名称",
  language: "zh-CN"
});

var company = $("#company").select2({
	  placeholder: "请选择公司名称",
	  language: "zh-CN"
	});
/*var companyInput = $('#campanyInput').asEventStream('keyup').map(function(event) {
	if(event.keyCode === 8) return false;
	return event.target.value;
}).skipDuplicates();

var suggestions = companyInput.flatMapLatest(function(query) {
	if(query === false) {
		$('#editCampanyInput').val('');
		query = "";
	}
	var result = _.filter(window.__COMPANYLIST__, function(company) {
		return company.name.indexOf(query) != -1;
	});
	return result.length === 0 ? [{id: '', name: '暂无结果'}] : result;
});

suggestions.onValue(function(result) {
	$('#selectFilterList ul').html($.map(result, function(item) {
		var li = _.template('<li data-value="<%- id %>"><%- name %></li>');
		return li(item);
	}));
	var myScroll = new IScroll('#campanyInput');
	$('#selectFilterList').show();
});

$("body").children().on('click', '#selectFilterList ul li', function() {
	if($(this).attr('data-value') === "") {
		return false;
	}
	$('#campanyInput').val($(this).text());
	$('#selectFilterList').hide();
	$('#campanyIdHidden').val($(this).attr('data-value'));
	$('#campanyHidden').val($(this).text());
	$('#campany').val($(this).attr('data-value'));
	$('#store').val($(this).attr('data-value'));
	$('#storeHidden').val($('#store').find('option:selected').text());
});

//----------------------------------

var editCampanyInput = $('#editCampanyInput').asEventStream('keyup').map(function(event) {
	if(event.keyCode === 8) return false;
	return event.target.value;
}).skipDuplicates();

var editSuggestions = editCampanyInput.flatMapLatest(function(query) {
	if(query === false) {
		$('#editCampanyInput').val('');
		query = "";
	}
	
	var result = _.filter(window.__COMPANYLIST__, function(company) {
		return company.name.indexOf(query) != -1;
	});
	return result.length === 0 ? [{id: '', name: '暂无结果'}] : result;
});

editSuggestions.onValue(function(result) {
	$('#editSelectFilterList ul').html($.map(result, function(item) {
		var li = _.template('<li data-value="<%- id %>"><%- name %></li>');
		return li(item);
	}));
	var editScroll = new IScroll('#editSelectFilterList');
	$('#editSelectFilterList').show();
});

$("body").children().on('click', '#editSelectFilterList ul li', function() {
	if($(this).attr('data-value') === "") {
		return false;
	}
	$('#editCampanyInput').val($(this).text());
	$('#editSelectFilterList').hide();
	$('#editCampanyIdHidden').val($(this).attr('data-value'));
});
*/
function regisetFormSubmit() {
	//return false;
	var name = $("#name").val(),
	mobile = $("#mobile").val(),
	//cardId = $("#cardId").val(),
	//cardType = $("#cardType").val();
	//type = $("#isOccupation").val(),
	code = $("#code").val(),
	campany, store;

	if(!name || !mobile) {
		$("#rg_danger").text("请输入完整的表单信息！");
		return false;
	}
	if(!code) {
		$("#rg_danger").text("请输入验证码！");
		return false;
	}
	if(!(/\d{11}/.test(mobile))) {
		$("#rg_danger").text("请输入正确的手机号！");
		return false;
	}

	campany = $("#campany").find('option:selected').text();
	store = $("#store").find('option:selected').text();
	campanyId = $("#campany").find('option:selected').val();
	if(!campany) {
		$("#rg_danger").text("职业经纪人需完善所属公司！");
		return false;
	}
	if(!store) {
		$("#rg_danger").text("职业经纪人需完善所属门店！");
		return false;
	}
}

//MENU菜单的高度自适应
//$(".menu").css({height: $(".menu").width()});

/**
 * 菜单点击事件
 */
$(".menu").on("click", function() {
	app.trigger("show."+$(this).attr("panel-data"));
	window.history.pushState(null, null, "./" + $(this).attr("panel-data"));
});

/**
 * 返回按钮
 */
$(".returnBtn").on("click", function() {
	hiddenActionPanel();
	window.history.pushState(null, null, "./");
});
	
	
/**
 * 获取日期格式
 */
function formatDate(dateStamp, formatString) {
	if(!dateStamp) return "无";
	var date = new Date(dateStamp),
		yyyy = date.getFullYear(),
		MM = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1).toString(),
		dd = date.getDate() > 9 ? date.getDate() : "0" + date.getDate().toString(),
		hh = date.getHours() > 9 ? date.getHours() : "0" + date.getHours().toString(),
		mm = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes().toString(),
		fs = formatString || "yyyy年mm月dd日";
	
	return fs.replace("yyyy", yyyy).replace("MM", MM).replace("dd", dd).replace("hh", hh).replace("mm", mm);
}

/**
 * 获取当前action
 */
function getAction() {
	try{
		
		var pathname = location.pathname.replace(/(^\/)|(\/$)/g, ""),
		action = pathname.split("/");
		return action[action.length - 1];
	}catch(e){
		throw new Error("action error.");
	}
}

/**
 * 用户前进后退操作事件
 */
$(window).on("popstate", function() {
	var action = getAction();
	if(action) {
		app.trigger("show."+action);
	}
});

/**
 * 显示面板
 */
function showActionPanel(panel, callback) {
	window.scrollTo(0, 0);
	if(panel != "project" && panel != "reward") {
		$.get($("#baseUrl").prop("content") + "/islogin").done(function(islogin) {
			app.removeClass("alert").addClass("alert");
			if(islogin) {
				$(".managerPanel .title").text($('[panel-data="'+panel+'"]').attr("title-data"));
				$('[target-data="'+panel+'"]').show();
				if(typeof callback == "function") callback();
			}else {
				$(".managerPanel .title").text($('[panel-data="login"]').attr("title-data"));
				$('[target-data="login"]').show();
				if(typeof loginMethod == "function") loginMethod();
			}
		});
	}else {
		app.removeClass("alert").addClass("alert");
		$(".managerPanel .title").text($('[panel-data="'+panel+'"]').attr("title-data"));
		$('[target-data="'+panel+'"]').show();
		if(typeof callback == "function") callback();
	}
	
}

/**
 * 验证码发送
 */
function sendVaild(mobile) {
	$("#sendCode").prop("disabled", true);
	
	var mobile = $("#mobile").val();
	if(!mobile || !(/\d{11}/.test(mobile))) {
		$("#rg_danger").text("请输入手机号码！").show();
		$("#sendCode").prop("disabled", false);
		return;
	}
	
	var timer = setInterval(function() {
		var text = $("#sendCode").text();
		var num = text.split(" ");
		if(!!num[1]) {
			if(parseInt(num[1]) > 0) {
				num[1] -= 1;
				$("#sendCode").text(num.join(" "));
			}else {
				clearInterval(timer);
				$("#sendCode").text(num[0]);
				$("#sendCode").prop("disabled", false);
			}
		}else {
			num[1] = 60;
			$("#sendCode").text(num.join(" "));
		}
	}, 1000);
	
	$.get($('#baseUrl').prop("content") + "/user/sendcheckcode/" + mobile, function(data) {
		if(data.code == "00008") {
			$( "#dialog-message" ).find('p').text(data.message);
			$( "#dialog-message" ).dialog({
			    modal: true,
			    buttons: {
			      Ok: function() {
			        $( this ).dialog( "close" );
			      }
			    }
			  });
		}else {
			$( "#dialog-message" ).find('p').text(data.message);
			$( "#dialog-message" ).dialog({
			    modal: true,
			    buttons: {
			      Ok: function() {
			        $( this ).dialog( "close" );
			      }
			    }
			  });
		}
	});
}	

/**
 * 登陆方法
 */
function loginMethod() {
	$("#fastChooseBtn").off();
	$("#fastChooseBtn").on("click", function(e) {
		e.preventDefault();
		var panel = new CreateOutstanding();
		panel.show();
		$.get($("#baseUrl").prop("content") + "/user/type/user_type").done(function(data) {
			if(data && data.length) {
				var ul = $("<ul></ul>"),
					li = $("<li></li>");
				$.each(data, function(i, item) {
					var list = li.clone(true);
					list.data("value", item.code);
					list.data("text", item.name);
					list.text(item.name);
					ul.append(list);
				});
				ul.find("li").on("click", function() {
					$("#cardType").val($(this).data("text"));
					$("#cardType").data("value", $(this).data("value"));
					panel.remove();
				});
				panel.append(ul);
			}
		});
	});
	
	$("#register").off();
	$("#register").on("click", function(e) {
		e.preventDefault();
		var name = $("#name").val(),
			mobile = $("#mobile").val(),
			//cardId = $("#cardId").val(),
			//cardType = $("#cardType").val();
			//type = $("#isOccupation").val(),
			code = $("#code").val(),
			campany, store;
		
		if(!name || !mobile) {
			$("#rg_danger").text("请输入完整的表单信息！");
			return;
		}
		if(!code) {
			$("#rg_danger").text("请输入验证码！");
			return;
		}
		if(!(/\d{11}/.test(mobile))) {
			$("#rg_danger").text("请输入正确的手机号！");
			return;
		}
		
//		if(type == 0) {
			campany = $("#campany").find('option:selected').text();
			store = $("#store").find('option:selected').text();
			campanyId = !!company.val() ? _.find(window.__COMPANYLIST__, {text: company.val()}).id : null;
			if(!campanyId) {
				$("#rg_danger").text("职业经纪人需完善所属公司！");
				return;
			}
			/*if(!$("#store").find('option:selected').val()) {
				$("#rg_danger").text("职业经纪人需完善所属门店！");
				return;
			}*/
//		}
		
		
//		if(!(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[0-9xX]$/.test(cardId))) {
//			$("#rg_danger").text("请输入正确的身份证号码！");
//			return;
//		}
		$("#register").prop('disabled', true);
		$.ajax({
			url: $("#baseUrl").prop("content") + "/user/add",
			type: "post",
			data: JSON.stringify({
				name: name,
				mobile: mobile,
				password: code,
				//type_code: cardType,
				//cardId: cardId,
//				isOccupation: type,
				company: company.val(),
				store: store,
				companyId: campanyId
			}),
			contentType: "application/json"
		}).done(function(data) {
				$("#register").prop('disabled', false);
				$( "#dialog-message" ).find('p').text(data.message);
				$( "#dialog-message" ).dialog({
				    modal: true,
				    buttons: {
				      Ok: function() {
				        $( this ).dialog( "close" );
				        if(data.code == "00000") {
					        $('#idHidden').val(data.obj.id);
							$('#regisetForm').submit();
				        }
				      }
				    }
				  });
				
			
		});
	});
}

/**
 * 隐藏面板
 */
function hiddenActionPanel() {
	app.removeClass("alert");
	$('#selectFilterList').hide();
	$('#campanyInput').val('');
	$('#editSelectFilterList').hide();
	$('#editCampanyInput').val('');
	$('#editCampanyIdHidden').val('');
	$('input').val('');
	$('select').val('');
	$("#cBtn").trigger('click');
	$(".editForm").each(function(i, item) {
	    item.reset();
	});
	$(".bg-danger").hide();
	$('[target-data]').hide();
}

/**
 * 展示档案弹窗
 */

function showRecord(edit, callback, data) {
	//var data = $(this).data("data");
	if(typeof edit == "boolean") {
		$.get($("#baseUrl").prop("content") + "/campaign/get/" + data.id, function(campaign) {
			if(campaign) {
				createCampaign(campaign, edit, callback);
			}
		});
	}else {
		createCampaign(data, false);
	}
	
}

function createCampaign(data, edit, callback) {
	
	var mark = $("<div class='cc-mark'></div><div class='cc-alert'><div class='cc-close'><span class='glyphicon glyphicon-remove'></span></div><div class='cc-content'></div></div>"),
	panel = $("<div class='item-panel'><span class='field'></span><span class='value'></span></div>"),
	code = $("<h4><span></span></h4>"), custom = $("<h4><span></span><span class='pull-right'></span></h4>"),
	building  = panel.clone(), isAc  = "", saler  = panel.clone(), appointmentTime  = panel.clone(), company  = panel.clone(), product  = panel.clone(), status  = panel.clone(),
	userName  = panel.clone(), userMobile  = panel.clone(), userCompany  = panel.clone(),
	protectDate = panel.clone(),
	editBtn = $("<button class='btn btn-info pull-right' style='margin: 2px;'>修改</button>");
	
	code.find("span").text("编号：" + data.code);
	custom.find("span").eq(0).text(data.customerName);
	custom.find("span").eq(1).text(data.customermobile);
	//isAc = data.isAccompany ? "陪同上门" : "不陪同上门";
	building.find(".field").text("推荐楼盘");
	building.find(".value").html('<h5>' +data.buildingName + '</h5>');
	saler.find(".field").text("对接销售");
	saler.find(".value").html("<span>" + (data.salerName || "未指定") + "</span>");
	company.find(".field").text("接待公司");
	company.find(".value").text(data.receiveName);
	userName.find(".field").text("经纪人");
	userName.find(".value").text(data.userName);
	userMobile.find(".field").text("经纪人手机");
	userMobile.find(".value").text(data.userMobile);
	userCompany.find(".field").text("经纪公司");
	userCompany.find(".value").text(data.userCompany);
	var booking = $("<button id='booking' class='btn btn-danger btn-xs' style='margin-bottom:  5px;'>立即预约</button>");
	if(edit) {
		appointmentTime.find(".field").text("预约验证");
		booking = $("<span>" + (data.checkcode || "暂无验证") + "</span>")
	}else {
		appointmentTime.find(".field").text("预约到访");
		//appointmentTime.find(".value").html("<span>" + formatDate(data.appointmentTime, "hh:mm") + "</span>");
		
		if( moment().diff(moment(data.appointmentTime)) < 0 ) {
			booking = $("<span>"+moment(data.appointmentTime).format('YYYY-MM-DD HH:mm')+" 即可预约</span>");
		}else {
			//booking.attr('disabled', false);
			booking.on('click', function(e) {
				e.preventDefault();
				booking.attr("disabled", true);
				var timer = setInterval(function() {
					var text = booking.text();
					var num = text.split(" ");
					if(!!num[1]) {
						if(parseInt(num[1]) > 0) {
							num[1] -= 1;
							booking.text(num.join(" "));
						}else {
							clearInterval(timer);
							booking.text(num[0]);
							booking.attr("disabled", false);
						}
					}else {
						num[1] = 60;
						booking.text(num.join(" "));
					}
				}, 1000);
				
				$.get($("#baseUrl").prop("content") + "/campaign/visitcode/" + data.customermobile + "/" + data.id ).done(function(result) {
					$( "#dialog-message" ).find('p').text(result.message);
					$( "#dialog-message" ).dialog({
					    modal: true,
					    buttons: {
					      Ok: function() {
					        $( this ).dialog( "close" );
					        $('.process-panel').replaceWith(createProcessList(result.obj.processlist, edit));
					      }
					    }
					  });
				}).fail(function() {
					$( "#dialog-message" ).find('p').text('系统异常,请稍后再试！');
					$( "#dialog-message" ).dialog({
					    modal: true,
					    buttons: {
					      Ok: function() {
					        $( this ).dialog( "close" );
					      }
					    }
					  });
				});
			})
		}
	}
	
	appointmentTime.find(".value").append(booking);
	product.find(".field").text("推荐产品");
	product.find(".value").text(data.property_name);
	status.find(".field").text("客户状态");
	status.find(".value").html("<span>" +data.status_value+ "</span>");
	protectDate.find(".field").text("保护时间");
	if(data.protectDate != null) {
		protectDate.find(".value").html("<span>" + moment(data.protectDate).format('YYYY-MM-DD HH:mm') + "</span>");
	}else {
		protectDate.find(".value").html("<span>暂无</span>");
	}
	
	if(edit) {
		var salerEdit = editBtn.clone(), appEdit = editBtn.clone(), statusEdit = editBtn.clone();
		salerEdit.data("args", {
			url: $("#baseUrl").prop("content") + "/campaign/update",
			type: "saler",
			data: data
		});
//		appEdit.data("args", {
//			url: $("#baseUrl").prop("content") + "/campaign/update",
//			type: "appointmentTime",
//			data: data
//		});
		/*statusEdit.data("args", {
			url: $("#baseUrl").prop("content") + "/campaign/update",
			type: "status",
			data: data
		});*/
		
		salerEdit.on("click", editInfo);
		//appEdit.on("click", editInfo);
		statusEdit.on("click", editInfo);
		
		//saler.find(".value").append(salerEdit);
		//appointmentTime.find(".value").append(appEdit);
		//status.find(".value").append(statusEdit);
	}
	
	mark.find(".cc-content").append(code).append(custom).append(building).append(userName).append(userMobile).append(userCompany).append(saler).append(appointmentTime).append(status).append(protectDate).append(createProcessList(data.processlist, edit));
	mark.find(".cc-close").on("click", function() {
		mark.remove();
		if(typeof searchAction == 'function') {
			searchAction('default');
		}
	});
	
	mark.appendTo($("body"));
	
	if(edit) {
		if(typeof callback == "function") callback();
	}
	
	function editInfo() {
		var panel = CreateOutstanding(),
		element = $('<div class="form-horizontal col-sm-12 col-xs-12 addProcess editForm">'
					+'<div class="form-group">'
					+'<label for="" class="col-sm-4 col-xs-4 control-label"></label><div class="col-sm-8 col-xs-8"><button type="button" class="btn btn-default">取消</button>&nbsp;<button type="button" class="btn btn-primary">修改</button>'
				+'</div></div></div>'),
		item = $('<div class="form-group"><label for="" class="col-sm-4 col-xs-4 control-label"></label><div class="col-sm-8 col-xs-8"></div></div>'),
		target= $(this),
		args = target.data("args");
		
		switch(args.type) {
			case "saler":
				$.get($("#baseUrl").prop("content") + "/saler/list").done(function(data) {
					if(data && data.length) {
						var tmp = item.clone(), select = $('<select class="form-control editValue"></select>');
						tmp.find("label").text("选择销售");
						$.each(data, function(i, list) {
							var option = $("<option></option>");
							option.prop("value", list.id);
							option.text(list.name);
							select.append(option);
						});
						tmp.find("div").append(select);
						element.find(".form-group:last-child").before(tmp);
						panel.append(element);
					}
				});
				break;
			case "appointmentTime":
				var tmp = item.clone(), time = $('<input class="form-control editValue" />');
				tmp.find("label").text("预约时间");
				tmp.find("div").append(time);
				
				time.datetimepicker({
					locale: moment.locale("zh-cn"),
					format: "HH:mm",
					pickDate: false,
			        pickTime: true,
				});
				time.val(formatDate(args.data.appointmentTime, "yyyy-MM-dd hh:mm"));
				element.find(".form-group:last-child").before(tmp);
				
				panel.append(element);
				break;
			case "status":
				$.get($("#baseUrl").prop("content") + "/user/type/campaign_status").done(function(data) {
					if(data && data.length) {
						var tmp = item.clone(), select = $('<select class="form-control editValue"></select>');
						tmp.find("label").text("客户状态");
						$.each(data, function(i, list) {
							var option = $("<option></option>");
							option.prop("value", list.code);
							option.text(list.name);
							select.append(option);
						});
						tmp.find("div").append(select);
						element.find(".form-group:last-child").before(tmp);
						panel.append(element);
					}
				});
				break;
			default:
				break;
		}
		
		element.find("button").eq(0).on("click", function() {
			panel.remove();
		});
		
		element.find("button").eq(1).on("click", function() {
			var query = {}, valueElement = $("<span></span>");;
			
			switch(args.type) {
				case "saler":
					query = {
						id: args.data.id,
						salerId: element.find(".editValue").val()
					};
					valueElement.text(element.find(".editValue").find("option:checked").text());
					break;
				case "appointmentTime":
					query = {
						id: args.data.id,
						appointmentTime: moment(element.find(".editValue").val()).format('x')
					};
					valueElement.text(element.find(".editValue").val());
					break;
				case "status":
					query = {
						id: args.data.id,
						status: element.find(".editValue").val()
					};
					valueElement.text(element.find(".editValue").find("option:checked").text());
					break;
				default:
					break;
			}
			
			$.ajax({
				url: args.url,
				type: "post",
				data: JSON.stringify(query),
				contentType: "application/json"
			}).done(function(editResult) {
				$( "#dialog-message" ).find('p').text(editResult.message);
				$( "#dialog-message" ).dialog({
				    modal: true,
				    buttons: {
				      Ok: function() {
				        $( this ).dialog( "close" );
				        if(editResult.code == "00003") {
							target.siblings().remove();
							target.before(valueElement);
							panel.remove();
						}
				      }
				    }
				  });
		
			});
			
			
		});
	}
}

/**
 * 流程进度生成
 */
function createProcessList(list, edit) {
	var processPanel = $("<div class='process-panel'></div>"),
	processStartEnd = $("<div class='process-icon start on'>Start</div><div class='process-icon end on'>End</div>"),
	node = $("<div class='process-icon'><span class='glyphicon glyphicon-stop'></span></div>"),
	processNode = $("<div class='process-item'></div>"),
	hasChange = false,
	tmpContainer = $('<div class="pblock"></div>'),
	prePid = [],
	isStatus = false;
	
	$.each(list, function(i, item) {
		
		if(item.event_code == 'DFQR' && item.eventTime == null) {
			isStatus = true;
		}
		if( (item.event_code === 'ETQY' || item.event_code === 'QRJY') && item.isrefund === 1) {
			return;
		}
		
		var tmp = processNode.clone();
		var _node = node.clone();
		if(item.parentId !== 0) {
			prePid.push(item.parentId);
			if(prePid[prePid.length - 1] !== prePid[prePid.length - 2]) {
				hasChange = !hasChange;
				tmpContainer = $('<div class="pblock"></div>').clone();
				_node.addClass('rgBtn');
			}
		}
		
		var content = $("<div class='process-content'></div>");
		
		if(item.eventTime) {
			tmp.addClass('on');
			_node.addClass("on");
		}
		_node.addClass("small");
		content.append("<span>" + item.event_name + ": " +formatDate(item.eventTime, "yyyy-MM-dd hh:mm")+ "</span>");
		//if(item.result) content.append("<div class='result-item'>" + item.result + "</div>");
		var res = "";
		if(!!item.roomNum) {
			res += "<p>房号：" +item.roomNum+ "</p>";
		}
		if(!!item.commission) {
			res += "<p>佣金：" +item.commission+ "</p>";
		}
		if(item.isrefund != 9 && item.event_code == 'ETTK' ) {
			res += "<p>退款：" + (item.isrefund === 1 ? '是' : '否') + "</p>";
		}
		if(!!item.signTime) {
			res += "<p>签约时间：" + moment(item.signTime).format('YYYY-MM-DD HH:mm') + "</p>";
		}
		if(!!item.contractNo) {
			res += "<p>合同编号：" +item.contractNo+ "</p>";
		}
		if(!!item.result) {
			res += "<p>备注：" +item.result+ "</p>";
		}
		
		content.append("<div class='result-item'>" + res + "</div>");
		
		if(edit) {
			_node.data("data", item);
			if(!(item.event_code === 'ETTK' && item.isrefund == 1)) {
				_node.on("click", function() {
					var _data = $(this).data("data"),
						panel = CreateOutstanding(),
						element = $('<div class="form-horizontal col-sm-12 col-xs-12 addProcess editForm">'
								+'<div class="form-group">'
								+'<label for="" class="col-sm-4 col-xs-4 control-label">流程节点</label><div class="col-sm-8 col-xs-8"><span style="line-height: 34px;" class="select"></span>'
								+'</div></div><div class="form-group">'
								+'<label for="" class="col-sm-4 col-xs-4 control-label">日期时间</label><div class="col-sm-8 col-xs-8"><input class="defaultTime" name="eventTime" type="text" data-format="MM/dd/yyyy HH:mm:ss PP" placeholder="选择日期时间..">'
								+'</div></div><div class="form-group">'
								+'<label for="" class="col-sm-4 col-xs-4 control-label">备注</label><div class="col-sm-8 col-xs-8"><textarea rows="5" cols="20" placeholder="备注.."></textarea>'
								+'</div></div><div class="form-group">'
								+'<label for="" class="col-sm-4 col-xs-4 control-label"></label><div class="col-sm-8 col-xs-8"><button type="button" class="btn btn-default">取消</button>&nbsp;<button type="button" class="btn btn-primary">更新</button>'
							+'</div></div></div>');

					if(_data.event_code === 'DFQR') {
						//element.find('.form-group').eq(0).find(".select").text(_data.event_name);
						var status = element.find('.form-group').eq(0).clone();
						element.find('.form-group').eq(1).hide();
						status.find(".control-label").text('客户状态');
						
						$.get($("#baseUrl").prop("content") + "/user/type/campaign_status").done(function(data) {
							if(data && data.length) {
								var select = $('<select class="form-control editValue qryx"></select>');
								$.each(data, function(i, list) {
									if(list.code !== 'DQR') {
										var option = $("<option></option>");
										option.prop("value", list.code);
										option.text(list.name);
										select.append(option);
									}
								});
								status.find("div").html(select)
								element.find('.form-group').eq(0).after(status);
							}
						});
					}else if(_data.event_code === 'ETTK') {
						element.find('.form-group').eq(1).find(".control-label").text('是否退款');
						var select = $('<select class="form-control editValue"></select>');
						var option = $("<option></option>");

						select.append(option.clone().prop("value", '0').text('否')).append(option.clone().prop("value", '1').text('是'));
						if(!!_data.isrefund) {
							select.val(_data.isrefund);
						}
						element.find('.form-group').eq(1).find("input").replaceWith(select);
						
					} else if(_data.event_code === 'ETRG') {
						var inputText = $('<input type="text" />');
						var formGroup = $('<div class="form-group">'
								+'<label for="" class="col-sm-4 col-xs-4 control-label">日期时间</label><div class="col-sm-8 col-xs-8"><input type="text" data-format="MM/dd/yyyy HH:mm:ss PP" placeholder="选择日期时间..">'
								+'</div></div>');
						var roomNum = formGroup.clone();
						var commission = formGroup.eq(0).clone();
						
						roomNum.find('label').text('认购房号');
						commission.find('label').text('佣金金额');
						roomNum.find('>div').html(inputText.clone().attr('placeholder', '请输入房号..').attr('name', 'roomNum').val( _data.roomNum ));
						commission.find('>div').html(inputText.clone().attr('placeholder', '请输入佣金金额..').attr('name', 'commission').val( _data.commission == 0 ? '' : _data.commission ));
						element.find('.form-group').eq(1).after(commission).after(roomNum);
						
					} else if(_data.event_code === 'ETQY') {
						var inputText = $('<input type="text" />');
						var formGroup = $('<div class="form-group">'
								+'<label for="" class="col-sm-4 col-xs-4 control-label">日期时间</label><div class="col-sm-8 col-xs-8"><input type="text" data-format="MM/dd/yyyy HH:mm:ss PP" placeholder="选择日期时间..">'
								+'</div></div>');
						var contractNo = formGroup.clone(),
							signTime = formGroup.clone();
						
						contractNo.find('label').text('合同编号');
						contractNo.find('>div').html(inputText.clone().attr('placeholder', '请输入合同编号..').attr('name', 'contractNo').val( _data.contractNo ));
						
						signTime.find('label').text('签约时间');
						signTime.find('>div').html(inputText.clone().attr('data-format', 'MM/dd/yyyy HH:mm:ss PP').attr('placeholder', '请输入签约时间..').attr('name', 'signTime').attr( 'value', moment(_data.signTime || new Date()).format('YYYY-MM-DD HH:mm')  ));
						element.find('.form-group').eq(1).after(contractNo).after(signTime);
						
					} else {
						
						//element.find("input").val(formatDate(_data.eventTime, "yyyy-MM-dd hh:mm"));
						
						
					}
					element.find("input.defaultTime[data-format]").val(moment(_data.eventTime || new Date()).format('YYYY-MM-DD HH:mm'));
					element.find("input[data-format]").datetimepicker({
						locale: moment.locale("zh-cn"),
						format: "YYYY-MM-DD HH:mm"
					});
					
					
					element.find("textarea").text(_data.result);
					element.find(".select").text(_data.event_name);
					element.find("button").eq(0).off().on("click", function() {
						panel.remove();
					});
					
					element.find("button").eq(1).off().on("click", function() {
						var date = element.find("input").val(),
							remark = element.find("textarea").val();
						console.log();
						if(!date && _data.event_code !== 'DFQR' && _data.event_code !== 'ETTK') {
							//alert("请选择日期时间.");
							$( "#dialog-message" ).find('p').text("请选择日期时间.");
							$( "#dialog-message" ).dialog({
							    modal: true,
							    buttons: {
							      Ok: function() {
							        $( this ).dialog( "close" );
							      }
							    }
							  });
							return;
						}else {
							date = new Date();
						}
						var request = {
								id: _data.id,
								event_code: _data.event_code,
								campaignId: _data.campaignId,
								//eventTime: moment(date).format('x'),
								result: remark
							};
						var iptRes = false;
						//if(_data.event_code === 'ETRG' || _data.event_code === 'ETQY') {
							element.find('input[name]').each(function(idx, ipt) {
								var val = $(ipt).val().replace(/['"<>^]/g, '');
								if(val === '') {
									$(ipt).focus();
									iptRes = true;
									return false;
								}else {
									var obj = {};
									if(typeof($(ipt).attr('data-format')) == 'undefined') {
										obj[$(ipt).attr("name")] = $(ipt).val();
									}else {
										obj[$(ipt).attr("name")] = moment($(ipt).val()).format('x');
									}
									
									_.extend(request, obj);
								}
							});
						//}
						if(_data.event_code === 'ETTK') {
							var tk = element.find('.form-group').eq(1).find('select option:selected').val();
							_.extend(request, {isrefund: tk}, { parentId: _data.parentId });
						}
						if(iptRes) return;
						$.ajax({
							url: $("#baseUrl").prop("content") + "/process/update/" + ( element.find('select.qryx').find("option:selected").val() || "0" ),
							type: "post",
							data: JSON.stringify(request),
							contentType: "application/json"
						}).done(function(process) {
							$( "#dialog-message" ).find('p').text(process.message);
							$( "#dialog-message" ).dialog({
							    modal: true,
							    buttons: {
							      Ok: function() {
							        $( this ).dialog( "close" );
							        if(process.code == "00003") {
										$(".cc-alert").remove();
										$(".cc-mark").remove();
										panel.remove();
										createCampaign(process.obj, edit, function() { isShowCreate(process.obj) })
									}
							      }
							    }
							  });
							
							/*if(process.code == "00003") {
								$(".cc-alert").find(".process-panel").empty();
								$(".cc-alert").find(".process-panel").replaceWith(createProcessList(process.obj, true));
								panel.remove();
							}else {
								alert(process.message);
							}*/
						});
					});
					
					panel.append(element);
					
				});
			}
			
		}else {
			var eventBtn = $('<span class="pull-right"><button class="btn btn-danger btn-xs"></button></span>');
			if(item.event_code === 'ETRG') {
				var btn = eventBtn.clone();
				if(item.isRequest == 1) {
					btn.find('button').text('认购已申请');
					btn.find('button').attr('disabled', true);
				}else {
					btn.find('button').text('认购申请');
					btn.on('click', function() {
						$.get($("#baseUrl").prop("content") + "/process/apply/" + item.campaignId + '/' + item.id).done(function(respone) {
							$( "#dialog-message" ).find('p').text(respone.message);
							$( "#dialog-message" ).dialog({
							    modal: true,
							    buttons: {
							      Ok: function() {
							        $( this ).dialog( "close" );
							        if(respone.code == "00012") {
										$('.process-panel').replaceWith(createProcessList(respone.obj, edit));
									}
							      }
							    }
							  });
							
						})
					});
				}
				
				content.find('>span').append(btn);
			}
			 
			if(item.event_code === 'ETQY') {
				var btn = eventBtn.clone();
				if(item.isRequest == 1) {
					btn.find('button').text('签约已申请');
					btn.find('button').attr('disabled', true);
				}else {
					btn.find('button').text('签约申请');
					btn.on('click', function() {
						$.get($("#baseUrl").prop("content") + "/process/apply/" + item.campaignId + '/' + item.id).done(function(respone) {
							$( "#dialog-message" ).find('p').text(respone.message);
							$( "#dialog-message" ).dialog({
							    modal: true,
							    buttons: {
							      Ok: function() {
							        $( this ).dialog( "close" );
							        if(respone.code == "00012") {
										$('.process-panel').replaceWith(createProcessList(respone.obj, edit));
									}
							      }
							    }
							  });
							
						})
					});
				}
				
				content.find('>span').append(btn);
			}
			
			if(item.event_code === 'QRJY') {
				var btn = eventBtn.clone();
				if(item.isRequest == 1) {
					btn.find('button').text('结佣已申请');
					btn.find('button').attr('disabled', true);
				}else {
					btn.find('button').text('结佣申请');
					btn.on('click', function() {
						$.get($("#baseUrl").prop("content") + "/process/apply/" + item.campaignId + '/' + item.id).done(function(respone) {
							$( "#dialog-message" ).find('p').text(respone.message);
							$( "#dialog-message" ).dialog({
							    modal: true,
							    buttons: {
							      Ok: function() {
							        $( this ).dialog( "close" );
							        if(respone.code == "00012") {
										$('.process-panel').replaceWith(createProcessList(respone.obj, edit));
									}
							      }
							    }
							  });
							
						})
					});
				}
				
				content.find('>span').append(btn);
			}
			
		}
		tmp.append(_node).append(content);
		if(hasChange) {
			tmpContainer.append(tmp);
			tmpContainer.append("<div class='clearfix'></div>");
			processPanel.append(tmpContainer);
		}else {
			processPanel.append(tmp);
		}
		
		
		processPanel.append("<div class='clearfix'></div>");
		
		
	});
	
	processPanel.append(processStartEnd);
	
	if(isStatus) {
		processPanel.find('.process-icon.small:not(".on"):gt(0)').addClass('disabled').off();
	}else{
		processPanel.find('.process-icon.small:not(".on"):not(".rgBtn")').parent().addClass('disabled');
		processPanel.find('.process-item.disabled').find('.process-icon').addClass('disabled');
		processPanel.find('.process-item.on+.clearfix+.process-item.disabled').find('.process-icon').removeClass('disabled');
		processPanel.find('.process-icon.disabled').off();
	}
	//processPanel.find('.process-icon.small:not(".on"):gt(0)').addClass('disabled').off();
	
	return processPanel;
}


$("a[name=scanBtn]").on('click', function() {
	$.get($("#baseUrl").prop("content") + "/showqrcode/" + $(this).attr('bid')).done(function(data) {
		if(!!data.obj) {
			window.location.href=data.obj;
		}
	});
});

/**
 * 生产面板
 */
function CreateOutstanding() {
	var panel = $(".outStanding");
	if( panel.length === 0 ) {
		panel = $("<div class='outStanding'></div>");
		panel.appendTo($("body"));
	}
	panel.empty();
	return panel;
}