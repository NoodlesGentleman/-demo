$(function() {

	/**
	 * 用户登录窗口show事件
	 */
	app.on("show.login", function() {
		showActionPanel("login");
	});
	
	
	/**
	 * 在售项目
	 */
	app.on("show.project", function() {
		showActionPanel("project");
	});
	
	/**
	 * 奖励
	 */
	app.on("show.reward", function() {
		showActionPanel("reward");
	});
	
	/**
	 * 推荐用户
	 */
	app.on("show.recommend", function(event, id, name) {
		hiddenActionPanel();
		$('#customerSelectList').empty();
		$.get($("#baseUrl").prop("content") + "/customer/list").done(function(result) {
			var list = _.template("<li><a href='javascript:void(0)' mobile-data='<%=mobile%>' name-data='<%=name%>'><%=name%> <%=mobile%></a></li>");
			if(!!result && result.length > 0) {
				_.each(result, function(item) {
					var temp = $(list(item));
					temp.find('a').on('click', function() {
						$('#recordName').val($(this).attr('name-data'));
						$('#recordMobile').val($(this).attr('mobile-data'));
					});
					$('#customerSelectList').append(temp);
				});
			}else {
				var temp = $(list({mobile: null, name: '暂无客户'}));
				$('#customerSelectList').append(temp);
			}
			
		});
		
		$("#recordBuilding").data("value", id);
		$("#recordBuilding").val(name);
		showActionPanel("recommend", function() {
			$("#recordBuilding").off();
			$("#recordBuilding").on("click", function(e) {
				e.preventDefault();
				createPanel($("#baseUrl").prop("content") + "/building/list", $(this), {
					insert: function(item, list) {
						list.data("value", item.id);
						list.data("text", item.name);
						list.text(item.name);
					}
				});
				$(this).trigger("blur");
			});
			
//			$("#recordProduct").off();
//			$("#recordProduct").on("click", function(e) {
//				e.preventDefault();
//				createPanel($("#baseUrl").prop("content") + "/building/property/list", $(this), {
//					getArgs: function(args) {
//						var id = $("#recordBuilding").data("value");
//						if(!id) {
//							$("#rc_danger").text("请选择楼盘！");
//							return false;
//						}
//						return id;
//					},
//					insert: function(item, list) {
//						list.data("value", item.property_code);
//						list.data("text", item.property_name);
//						list.text(item.property_name);
//					}
//				});
//				$(this).trigger("blur");
//			});
			
			$("#recordCompany").off();
			$("#recordCompany").on("click", function(e) {
				e.preventDefault();
				createPanel($("#baseUrl").prop("content") + "/company/list", $(this), {
					getArgs: function(args) {
						var id = $("#recordBuilding").data("value");
						if(!id) {
							$("#rc_danger").text("请选择楼盘！");
							return false;
						}
						return id;
					},
					insert: function(item, list) {
						list.data("value", item.id);
						list.data("text", item.name);
						list.text(item.name);
					}
				});
				$(this).trigger("blur");
			});
			
			$("#custom").off();
			$("#custom").on("click", function(e) {
				e.preventDefault()
				var recordName = $("#recordName").val(),
					recordMobile = $("#recordMobile").val(),
					recordBuilding = $("#recordBuilding").data("value"),
					recordBuildingName = $("#recordBuilding").val(),
					//recordProduct = $("#recordProduct").data("value") ? $("#recordProduct").data("value") : 0,
					//recordBuilding = 1,
					recordProduct = "SP",
					//recordAppointmentTime = $("#appointmentTime").val(),
					recordCompany = $("#recordCompany").data("value") ? $("#recordCompany").data("value") : 1,
					recordAccompany = $("#recordAccompany").is(":checked") ? 1 : 0;
				
				if(!recordName || !recordMobile || !recordBuilding || !recordBuildingName) {
					$("#rc_danger").text("请确认表单的完整信息！").show();
					return;
				}
				
				if(!(/^\d{11}$/.test(recordMobile))) {
					/*$( "#dialog-message" ).find('p').text('请输入正确的手机号码！');
					$( "#dialog-message" ).dialog({
					    modal: true,
					    buttons: {
					      Ok: function() {
					        $( this ).dialog( "close" );
					      }
					    }
					  });*/
					$("#rc_danger").text("请输入正确的手机号码！").show();
					return;
				}
				
				$.ajax({
					url: $("#baseUrl").prop("content") + "/campaign/add",
					type: "post",
					data: JSON.stringify({
						customerName: recordName,
						customermobile: recordMobile,
						buildingId: recordBuilding,
						property_code: recordProduct,
						//receiveId: recordCompany,
						//appointmentTime: moment(moment().format('YYYY-MM-DD') + ' ' +moment($('#appointmentTime').datebox('getTheDate')).format('HH:mm')).format('x'),
						//isAccompany: recordAccompany
					}),
					contentType: "application/json"
				}).done(function(data) {
					$( "#dialog-message" ).find('p').text(data.message);
					$( "#dialog-message" ).dialog({
					    modal: true,
					    buttons: {
					      Ok: function() {
					        $( this ).dialog( "close" );
					        if(data.code == "00003") {
					        	$(".returnBtn").trigger("click");
							}
					      }
					    }
					  });
					
				});
			});
		});
		
		
	});
	
	/**
	 * 我的用户
	 */
	app.on("show.customer", function() {
		showActionPanel("customer", function() {
			$.get($("#baseUrl").prop("content") + "/customer/list", function(data) {
				if(data && data.length) {
					$(".customer").empty();
					$.each(data, function(i, item) {
						var panel = $("<div class='panel panel-default'><div class='panel-body'><span class='glyphicon glyphicon-chevron-right'></span><span class='text'></span></div></div>");
						panel.find("span.text").text(item.name + " " + item.mobile);
						panel.find(".panel-body").data("value", item.id);
						panel.find(".panel-body").on("click", function() {
							$('.panel-body .subpanel').remove();
							var target = $(this);
							if(target.hasClass('current')) {
								target.removeClass('current');
								return false;
							}
							$('.panel-body').removeClass('current');
							
							target.toggleClass("current");
							if(panel.find(".subpanel").length) {
								panel.find(".subpanel").remove();
							}else {
								$.get($("#baseUrl").prop("content") + "/campaign/list/" + $(this).data("value")).done(function(list) {
									if(data && data.length) {
										var subPanel = $("<div class='subpanel'><ul></ul></div>");
										$.each(list, function(index, building) {
											var li = $("<li></li>");
											li.text(building.buildingName + "	" + formatDate(building.createTime, "yyyy-MM-dd hh:mm"));
											li.data("data", building);
											li.on("click", function() {
												showRecord(false,null, building);
											});
											li.append("<span class='pull-right text-danger badge' style='margin:10px 10px 0 0;text-indent: initial;'>" +building.status_value+ "</span>");
											subPanel.find("ul").append(li);
										});
										
										target.after(subPanel);
									}
								});
							}
						});
						$(".customer").append(panel);
					});
				}
			});
		});
	});
	
	/**
	 * 用户消息
	 */
	app.on("show.message", function() {
		showActionPanel("message");
	});
	
	/**
	 * 用户回到首页事件
	 */
	app.on("show.manager", function() {
		$('[target-data]').hide();
		app.removeClass("alert");
	});
	
	//=======================================================================================
	//通用方法
	//=======================================================================================
	/**
	 * 弹出选择通用方法
	 */
	function createPanel(url, target, method) {
		var args = "";
		if(method && method.getArgs instanceof Function) {
			var result = method.getArgs();
			if(result) {
				args += "/" + result;
			}else {
				target.blur();
				return false;
			}
			
		}
		var panel = new CreateOutstanding();
		$.get(url+args, function(data) {
			if(data && data.length) {
				var ul = $("<ul></ul>"),
					li = $("<li></li>");
				$.each(data, function(i, item) {
					var list = li.clone(true);
					method.insert(item, list);
					ul.append(list);
				});
				ul.find("li").on("click", function() {
					target.val($(this).data("text"));
					target.data("value", $(this).data("value"));
					panel.remove();
				});
				panel.append(ul);
			}
		});
	}
	
	/**
	 * 页面加载完执行入口
	 */
	(function() {
		var action = getAction();
		if(action) {
			app.trigger("show."+action);
		}
	})();
	
	
	//下拉框
	$("#isOccupation").on("change", function() {
		if($(this).val() == 0) {
			$(".occupation").show();
		}else {
			$(".occupation").hide();
		}
	});
	
	//$("#appointmentTime").timepicker();
	
	$("#sendCode").on("click", function() {
		sendVaild();
	});
	
	$("body").children().on("click", "#editBtn", function(e) {
		e.preventDefault();
		var row = $(this).parents("table").find("tr"),
			name = row.eq(0).find("td").eq(1),
			mobile = row.eq(1).find("td").eq(1),
			company = row.eq(2).find("td").eq(1);
		name.data("data", name.text());
		mobile.data("data", mobile.text());
		
		name.html("<input type='text' class='form-control' value='" + name.data("data") + "'>");
		mobile.html("<input type='text' class='form-control' value='" + mobile.data("data") + "'>");
		company.find('span').eq(0).hide();
		//$('#editCampanyInput').val(company.find('span').text());
		company.find('#editCampany').show();
		$("#editBtn").hide();
		$("#saveBtn").show();
		$("#cBtn").show();
	});
	$("body").children().on("click", "#cBtn", function(e) {
		e.preventDefault();
		var row = $(this).parents("table").find("tr"),
		name = row.eq(0).find("td").eq(1),
		mobile = row.eq(1).find("td").eq(1),
		company = row.eq(2).find("td").eq(1);
		name.html(name.data("data"));
		mobile.html(mobile.data('data'));
		company.find('span').eq(0).show();
		company.find('#editCampany').hide();
		
		$("#editBtn").show();
		$("#cBtn").hide();
		$("#saveBtn").hide();
	});
	$("body").children().on("click", "#saveBtn", function(e) {
		e.preventDefault();
		var row = $(this).parents("table").find("tr"),
			name = row.eq(0).find("input"),
			mobile = row.eq(1).find("input"),
			company = row.eq(2).find("td").eq(1),
			nameValue = name.val(),
			mobileValue = mobile.val(),
			companyId = _.find(window.__COMPANYLIST__, {text: editCompany.val()}).id;
		if(nameValue == "" || mobileValue == "" || !(/^\d{11}$/.test(mobileValue))) {
			$("#up_danger").text("请输入有效的姓名或手机号码信息！");
			return;
		}
		
		if(!companyId) {
			$("#up_danger").text("请选择所属公司！");
			return;
		}
		
		$.ajax({
			url: $('#baseUrl').prop("content") + "/user/upd",
			type: "post",
			data: JSON.stringify({
				name: nameValue,
				mobile: mobileValue,
				companyId: companyId
			}),
			contentType: "application/json"
		}).done(function(data) {
			if(data.code == "00003") {
				$("#up_danger").text("修改成功！").show();
				name.parent().html(nameValue);
				mobile.parent().html(mobileValue);
				company.find('span').eq(0).text(editCompany.val()).show();
				company.find('#editCampany').hide();
				//$('#editCampanyIdHidden').val('');
				$("#saveBtn").hide();
				$("#editBtn").show();
				$("#cBtn").hide();
			}else {
				$("#up_danger").text(data.message);
			}
		});
	});
	
	/**
	 * 图片轮播
	 *
	 */
	
	var imagesList = [
	                  {src: "http://manager.fangsir007.com:8000/images/1_1.jpg", text: "苏州品源经纪人平台", url: "javascript:void(0)"},
	                  {src: "http://manager.fangsir007.com:8000/images/2_1.jpg", text: "苏州品源经纪人平台", url: "javascript:void(0)"},
	                  {src: "http://manager.fangsir007.com:8000/images/3_1.png", text: "苏州品源经纪人平台", url: "javascript:void(0)"},
	                  {src: "http://manager.fangsir007.com:8000/images/4_1.jpg", text: "苏州品源经纪人平台", url: "javascript:void(0)"} 
	                  ];
	
	function ImagesLoop(ele, array) {
		this.data = array;
		this.ele = $(ele);
		this.w = this.ele.width();
		this.h = this.ele.height();
	}
	
	ImagesLoop.prototype = {
		init: function() {
			this.__empty();
			this.__createPage();
			this.__createImagesPanel();
			this.__Launcher();
		},
		__Launcher: function() {
			var self = this;
			$.each(this.data, function(index, item) {
				var itemPanel = self.__getImagePanel();
				itemPanel.find(".img a").attr("href", item.url);
				itemPanel.find("img").attr("src", item.src);
				itemPanel.find("img").width(self.w);
				itemPanel.find("img").height(self.h);
				itemPanel.find(".text a").text(item.text);
				itemPanel.find(".text a").attr("href", item.url);
				self.ele.find(".imagesPanel").append(itemPanel);
				self.ele.find(".page").prepend(self.__getPageElement());
			});
			
			self.ele.find(".page .element").eq(0).addClass("current");
		},
		__empty: function() {
			this.ele.empty();
		},
		__createPage: function() {
			this.ele.append($('<div class="page"></div>'));
		},
		__createImagesPanel: function() {
			var panel = $('<div class="imagesPanel"></div>');
			//panel.width(this.data.length * this.w);
			this.ele.append(panel);
		},
		__getImagePanel: function() {
			var panel = $('<div class="imageItem"><div class="img"><a href=""><img src="" /></a></div><div class="text"><a href=""></a></div></div>');
			return panel.clone(true);
		},
		__getPageElement: function() {
			var element = $('<div class="element"></div>');
			return element.clone(true);
		}
	};
	
	var il = new ImagesLoop("#imagesShow", imagesList);
	il.init();
	
	$(".irecommend").click(function() {
		app.trigger("show.recommend", [$(this).attr('data-value'), $(this).attr('data-bname')]);
	});
});