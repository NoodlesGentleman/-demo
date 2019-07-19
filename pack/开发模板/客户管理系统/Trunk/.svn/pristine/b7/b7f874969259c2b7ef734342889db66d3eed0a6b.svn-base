$(document).ready(function() {
	
	refreshListing();

	$("#returnPage").click(function(){
		return_back();
	});

    /**
	 * 刷新或搜索
	 */
	$('body').delegate('.action-refresh', 'click', function(){
		$('#data_listing').datagrid('reload');
	});
	
	/**
	 * 搜索对回车的支持
	 */
	$("body").on('keypress', function (event) {
	    if (event.which == '13') {
	    	$('#data_listing').datagrid('reload');
	    	return false;
	    }
	});
	
	$("button[name=modify]").click(function(){
		var ids = [];
		$("input[name=selectbox]:checked").each(function(){
			ids.push(parseInt($(this).val()));
		});
		if(ids.length <= 0){
			alert("请选择一条记录！");
			return false;
		}
		if(!confirm($(this).attr("msg")))	
			return false;
		var data = {
			ids : ids
		};
		data[$(this).attr("prop")] = $(this).attr("value");
		updObject(data);
	});
	
	$("#modifyRecord").click(function(){
		if($("input[name=selectbox]:checked").length != 1){
			alert("请选择一条记录！");
			return false;
		}
		location.href = "student/infoView?id=" + $("input[name=selectbox]:checked").eq(0).val();
	});
});

function selectall(checkbox){
	$("input[name=selectbox]").prop("checked", $(checkbox).is(':checked'));
}

/**
 * 更新
 */
function updObject(data) {
	$.ajax({
    	type:'post',
        url:webroot + '/redbagobj/modify',
        data:JSON.stringify(data),
        dataType:'json',
        contentType : 'application/json',
        timeout:60000,
        success:function(data){
    		if (data.status == "1") {
    			$('#data_listing').datagrid('reload');
    		} else {
    			alert(data.error);
    		}
    		return false;
    	}
    });
}

function refreshListing() {
	/* fuelux datagrid */
	var DataGridDataSource = function (options) {
	    this._formatter = options.formatter;
	    this._columns = options.columns;
	    this._delay = options.delay;
	};
	DataGridDataSource.prototype = {
	    columns: function () {
	        return this._columns;
	    },
	    
	    data: function (options, callback) {
	        var url = webroot+'/redbaglog/list';
	        var self = this;

	        setTimeout(function () {
	            var data = $.extend(true, [], self._data);
	            var param = {
	                	pageNum: options.pageIndex+1,
	            		numPerPage: options.pageSize,
	            		totalAmount : $("#total_amount").val(),
	            		mchBillno : $("#mch_billno").val()
	                };
	            if($("#sent_time").val())
	            	param["sentTime"] = new Date($("#sent_time").val());
	            $.ajax(url, {
	                data: param,
	                dataType: 'json',
	                async: true,
	                type: 'POST'
	            }).done(function (response) {
	            	var data = response.data;
                    if (! data) {
                    	return false;
                    }
                    
                    var count = response.recordsTotal;//设置data.total
                    // PAGING
                    var startIndex = options.pageIndex * options.pageSize;
                    var endIndex = startIndex + options.pageSize;
                    var end = (endIndex > count) ? count : endIndex;
                    var pages = Math.ceil(count / options.pageSize);
                    var page = options.pageIndex + 1;
                    var start = startIndex + 1;
                    
                    if (self._formatter) self._formatter(data);
                    
                    callback({ data: data, start: start, end: end, count: count, pages: pages, page: page });
                }).fail(function (e) {
                	alert("false");
                });
	        }, self._delay);
	    }
	};

	$('#data_listing').datagrid({
	    dataSource: new DataGridDataSource({
	        // Column definitions for Datagrid(列定义的数据表格)
	        columns: [
	            {
	            	property: 'openid',
	            	label: '<input type="checkbox" id="selectall" onchange="selectall(this)">',
	            	sortable: false 
	            },
	            {
	            	property: 'totalAmount',
	            	label: '发送金额',
	            	sortable: false 
	            },
	            {
	            	property: 'returnCode',
	            	label: '返回码',
	            	sortable: false 
	            },
	            {
	            	property: 'returnMsg',
	            	label: '返回信息',
	            	sortable: false 
	            },
	            {
	            	property: 'errCode',
	            	label: '返回错误码',
	            	sortable: false 
	            },
	            {
	            	property: 'mchBillno',
	            	label: '红包订单号',
	            	sortable: false 
	            },
	            {
	            	property: 'sentTime',
	            	label: '发送时间',
	            	sortable: false 
	            } 
	            ,
	            {
	            	property: 'receive',
	            	label: '是否接收',
	            	sortable: false 
	            } 
	            ,
	            {
	            	property: 'receiveTime',
	            	label: '接收时间',
	            	sortable: false 
	            } 
	        ],
	        formatter: function (items, pageIndex, pageSize) {
//	            $.each(items, function (index, item) {
//	            	item.oper = "<a href='javascript:void(0)' onclick='updObject({id:" + item.id + ", isdel:true})'>删除</a>";
//	            	item.sign = "<a href='record/listView?l=&t=&s="+item.id+"'>查看</a>";
//	            	item.id = "<input type='checkbox' name='selectbox' value='" + item.id + "'>";		
//	            });
	        }
	    }),
	    loadingHTML: '<span><img src="view/static/panel/img/loading.gif"><i class="fa fa-info-sign text-muted" "></i>正在加载……</span>',
	    itemsText: '项',
	    itemText: '项',
	    dataOptions: { pageIndex: 0, pageSize: 10 }
	});
}

