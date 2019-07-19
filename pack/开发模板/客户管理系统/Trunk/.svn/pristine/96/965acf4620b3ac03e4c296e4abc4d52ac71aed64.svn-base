$(document).ready(function() {
	
	$("#recordPricetype").change(function(){
		if($(this).val() == 0){
			var maxprice = $("#recordMaxprice");
			$(maxprice).parent().hide();
			$(maxprice).parent().prev().hide();
		}else if($(this).val() == 1){
			var maxprice = $("#recordMaxprice");
			$(maxprice).parent().show();
			$(maxprice).parent().prev().show();
		}
	});
    
    $("#btn_save").click(function(){
		var record = {
			title : $("#recordTitle").val(),
			content : $("#recordContent").val(),
			jobtype : $("#recordJobtype").val(),
			pricetype : $("#recordPricetype").val(),
			minprice : $("#recordMinprice").val(),
			maxprice : $("#recordPricetype").val() == 1? $("#recordMaxprice").val() : $("#recordMinprice").val(),
			sendtime : $("#recordSendtime").val() ? new Date($("#recordSendtime").val()) : "",
			total : $("#recordTotal").val(),
			surplus : $("#recordTotal").val()
		};
			
		var props = [];
		
		$.each($("input[name=recordProp]"),function(index, item){
			if($(item).val()){
				props.push({
					pkey : $(item).attr("pkey"),
					pvalue : $(item).val()
				});
			}
		});
		
		var data = {
				head : record,
				props : props
		};
		
		if(!record.title){
			alert("请填写红包名称！");
			return false;
		}
		
		if(!record.content){
			alert("请填写红包内容！");
			return false;
		}
		
		if(!record.minprice){
			alert("请填写金额！");
			return false;
		}
		
		if(!record.maxprice){
			alert("请填写金额！");
			return false;
		}
		
		if(parseFloat(record.minprice) > parseFloat(record.maxprice)){
			alert("金额范围不是有效范围！");
			return false;
		}
		
		if(!record.sendtime){
			alert("请填写发送时间！");
			return false;
		}
		var time = new Date();
		if(record.sendtime <= new Date(time.setMinutes(time.getMinutes() + 1))){
			alert("发送时间必须超过当前时间10分钟！");
			return false;
		}

		if(!record.total){
			alert("请填写红包数量！");
			return false;
		}
		
		if($("#propRegBegin").val() && $("#propRegEnd").val() && parseInt($("#propRegEnd").val()) < parseInt($("#propRegBegin").val())){
			alert("注册天数不是有效范围！");
			return false;
		}
		
		if($("#propOptBegin").val() && $("#propOptEnd").val() && parseInt($("#propOptEnd").val()) < parseInt($("#propOptBegin").val())){
			alert("操作次数不是有效范围！");
			return false;
		}
		
		$.ajax({
	    	type:'post',
	        url:webroot + "/redpackheadconfig/add",
	        data:JSON.stringify(data),
	        dataType:'json',
	        contentType : 'application/json',
	        timeout:60000,
	        success:function(data){
	    		if (data.status == "1") {
	    			alert(data.msg);
	    			window.location.href = "redpackheadconfig/listView";
	    		} else {
	    			alert(data.msg);
	    		}
	    		return false;
	    	}
	    });
	});
});
