/**
 * 
 */
(function() {
	function sendVaild(mobile) {
		$("#sendCode").prop("disabled", true);
		
		var mobile = $("#mobile").val();
		if(!mobile || !(/\d{11}/.test(mobile))) {
			alertMeg("请输入手机号码！");
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
		
		$.get($('#baseUrl').prop("content") + "/customer/check/" + mobile + '/' + $("#buildingid").prop("content") + '/' + $("#userid").prop("content")
			, function(data) {
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
	$('#sendCode').on('click', function() {
		sendVaild($('#mobile').val());
	});
	$('#regist').on('click', function() {
		$(this).prop("disabled", true);
		var name = $("#name").val(),
		mobile = $("#mobile").val(),
		//cardId = $("#cardId").val(),
		//cardType = $("#cardType").val();
		//type = $("#isOccupation").val(),
		code = $("#code").val();

		if(!name || !mobile) {
			alertMeg("请输入完整的表单信息！");
			return false;
		}
		if(!code) {
			alertMeg("请输入验证码！");
			return false;
		}
		if(!(/\d{11}/.test(mobile))) {
			alertMeg("请输入正确的手机号！");
			return false;
		}
		$.ajax({
			url: $("#baseUrl").prop("content") + "/campaign/regist/"+code,
			type: "post",
			data: JSON.stringify({
				customerName: name,
				customermobile: mobile,
				property_code: 'SP',
				buildingId: $("#buildingid").prop("content"),
				userId: $("#userid").prop("content")
			}),
			contentType: "application/json"
		}).done(function(data) {
			alertMeg(data.message);
			//$(this).prop("disabled", false);
			$('#regist').hide();
		}).fail(function() {
			$('#regist').prop("disabled", false);
			alertMeg('登记失败');
		});
	});
	
	$('#checkin').on('click', function() {
		$(this).prop("disabled", true);
		var cid = $("#campaignid").prop("content"),
		sid = $("#salerid").prop("content"),
		code = $("#code").val();

		if(!code) {
			alertMeg("请输入验证码！");
			return false;
		}
		$.ajax({
			url: $("#baseUrl").prop("content") + "/customer/checkin/"+ code + "/" + cid + "/" + sid,
			type: "get",
			contentType: "application/json"
		}).done(function(data) {
			alertMeg(data.message);
			if(data.code == "00016")
				$('#checkin').hide();
			else
				$('#checkin').prop("disabled", false);
		}).fail(function() {
			$('#checkin').prop("disabled", false);
			alertMeg('登记失败');
		});
	});
	
	function alertMeg(msg, fn) {
		$( "#dialog-message p" ).text(msg);
		$( "#dialog-message" ).dialog({
		    modal: true,
		    buttons: {
		      Ok: function() {
		    	if(typeof fn === 'function') fn();
		        $( this ).dialog( "close" );
		      }
		    }
		  });
	}
})();