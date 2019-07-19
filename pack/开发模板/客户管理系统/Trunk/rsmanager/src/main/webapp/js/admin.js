/**
 * admin js lib
 */

/**
 * 用户消息
 */
$(function() {
	
	$('body').data('page', 0);
	function loadPage(callback) {
		$('.archives').on('scroll', function() {
			if( ($('#loading').offset().top + $('#loading').height()/2 ) < $(document).height() ) {
				callback('default');
				$(this).off();
			}
		});
	}

	
	app.on("show.archives", function() {
		showActionPanel("archives", function() {
			$("#search").off();
			$("#search").on({
				click: searchAction
			});
			
			$("#key").on("keypress", function(event) {
				if(event.which == 13) {
					searchAction();
				}
			});
			
			searchAction("default");
		});
	});
	
	
	function searchAction(_default) {
		var key = $("#key").val();

		if(!key && !(typeof _default === 'string') ) return;
		
		if(!key) {
			key = _default +'/'+ $('body').data('page');
			$('#loading').show();
		}else {
			key = "/" + key;
			$('#loading').show();
			$('.archives').scrollTop(0);
			
		}
		
		$.get($("#baseUrl").prop("content") + "/campaign/search" + key).done(function(data) {
			if(key.indexOf('default') == -1) {
				$(".search-result").empty();
				$('#loading').hide();
			}
			$.each(data, function(i, item) {
				var panel = $("<div class='panel panel-default'><div class='panel-body'><span class='glyphicon glyphicon-chevron-right'></span><span class='text'></span></div></div>");
				panel.find("span.text").text(item.customerName + " " + item.customermobile);
				panel.find("span.text").append('<button class="pull-right btn btn-danger btn-xs">发送验证</button><span class="pull-right badge" style="margin:2px 10px 0 10px;">' +item.status_value+ '</span>');

				panel.find('button').on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					$this = $(this);
					$this.attr("disabled", true);
					var timer = setInterval(function() {
						var text = $this.text();
						var num = text.split(" ");
						if(!!num[1]) {
							if(parseInt(num[1]) > 0) {
								num[1] -= 1;
								$this.text(num.join(" "));
							}else {
								clearInterval(timer);
								$this.text(num[0]);
								$this.attr("disabled", false);
							}
						}else {
							num[1] = 60;
							$this.text(num.join(" "));
						}
					}, 1000);
					
					$.get($("#baseUrl").prop("content") + "/campaign/visitcode/" + item.customermobile + "/" + item.id ).done(function(result) {
						$( "#dialog-message" ).find('p').text(result.message);
						$( "#dialog-message" ).dialog({
						    modal: true,
						    buttons: {
						      Ok: function() {
						        $( this ).dialog( "close" );
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
				});
				panel.find(".panel-body").data("data", item);
				panel.find(".panel-body").on("click", function() {
					createRecord(true, $(this).data('data'));
				});
				$(".search-result").append(panel);
			});
			if(key.indexOf('default') != -1 && data.length>0) {
				$('body').data('page', parseInt($('body').data('page')) + 1 );
				loadPage(searchAction);
			}
		});
	}
	
	window['searchAction'] = searchAction;
	
	/**
	 * 搜索事件
	 */
	function createRecord(edit, itemDate) {

		showRecord(edit, function() { isShowCreate(itemDate) }, itemDate);
			
	}
	
	var isShowCreate = window['isShowCreate'] = function(itemDate) {
		if(itemDate.status === 'DQR'){
			var scancheck = $('<img src="'+$("#baseUrl").prop("content")+'/images/qr.png" style="width:40px;height:40px;float:right;">').on("click",function(){
				$.get($("#baseUrl").prop("content") + "/regqrcode/" + itemDate.userId + "/" + itemDate.buildingId + "/" + itemDate.id).done(function(data) {
					window.location.href = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + data.obj;
				});
			});
			$(".cc-content").find("h4:eq(0) span").after(scancheck);
		}
		if(itemDate.status === 'DQR' || moment(itemDate.protectDate).diff(moment()) < 0) return;
		var editProcess = $('<div class="editPanel"><button type="button" class="btn btn-danger pull-right">添加认购</button></div>');
		editProcess.find("button").off().on("click", function() {
			$.get($("#baseUrl").prop("content") + "/process/addrg/" + itemDate.processlist[0].campaignId ).done(function(data) {
				
				$( "#dialog-message" ).find('p').text( data.message );
				$( "#dialog-message" ).dialog({
				    modal: true,
				    buttons: {
				      Ok: function() {
				        $( this ).dialog( "close" );
				        if( !!data.obj && data.obj.length) {
				        	$('.process-panel').replaceWith(createProcessList(data.obj, true));
				        }
				      }
				    }
				  });
				
			});
			return;
			var panel = CreateOutstanding(),
				element = $('<div class="form-horizontal col-sm-12 col-xs-12 addProcess editForm">'
							+'<div class="form-group">'
							+'<label for="" class="col-sm-3 col-xs-3 control-label">流程节点</label><div class="col-sm-9 col-xs-9"><select class="form-control"></select>'
							+'</div></div><div class="form-group">'
							+'<label for="" class="col-sm-3 col-xs-3 control-label">日期时间</label><div class="col-sm-9 col-xs-9"><input type="text" data-format="MM/dd/yyyy HH:mm:ss PP" placeholder="选择日期时间..">'
							+'</div></div><div class="form-group">'
							+'<label for="" class="col-sm-3 col-xs-3 control-label">备注</label><div class="col-sm-9 col-xs-9"><textarea rows="5" cols="20" placeholder="备注.."></textarea>'
							+'</div></div><div class="form-group">'
							+'<label for="" class="col-sm-3 col-xs-3 control-label"></label><div class="col-sm-9 col-xs-9"><button type="button" class="btn btn-default">取消</button><button type="button" class="btn btn-primary">添加</button>'
						+'</div></div></div>');
			element.data("data", target.data("data"));
			$.get( $("#baseUrl").prop("content") + "/user/type/event_type").done(function(data) {
				if(data && data.length) {
					var option = $('<option value=""></option>');
					$.each(data, function(i, item) {
						
						element.find("select").append(option.clone().prop("value", item.code).text(item.name));
					});
					
					element.appendTo(panel);
					element.find("input").datetimepicker({
						locale: moment.locale("zh-cn"),
						format: "YYYY-MM-DD HH:mm"
					});
					
					element.find("button").eq(0).off().on("click", function() {
						panel.remove();
					});
					
					element.find("button").eq(1).off().on("click", function() {
						var node = element.find("select").val(),
							date = element.find("input").val(),
							remark = element.find("textarea").val();
						if(!node && !date) {
							alert("请完善信息.");
							return;
						}
						$.ajax({
							url: $("#baseUrl").prop("content") + "/process/addrg",
							type: "post",
							data: JSON.stringify({
								campaignId: element.data("data").id,
//								event_code: node,
//								eventTime: moment(date).format('x'),
//								result: remark
							}),
							contentType: "application/json"
						}).done(function(process) {
							if(process.code == "00003") {
								$(".cc-alert").find(".process-panel").empty();
								$(".cc-alert").find(".process-panel").replaceWith(createProcessList(process.obj, true));
								panel.remove();
							}else {
								alert(process.message);
							}
						});
					});
				}
			});
			
		});
		$(".cc-alert").find(".process-panel").before(editProcess);
	}
	
	
	/**
	 * 用户回到首页事件
	 */
	app.on("show.manager", function() {
		$('[target-data]').hide();
		app.removeClass("alert");
	});
	
	/**
	 * 页面加载完执行入口
	 */
	(function() {
		var action = getAction();
		if(action) {
			app.trigger("show."+action);
		}
	})();
});