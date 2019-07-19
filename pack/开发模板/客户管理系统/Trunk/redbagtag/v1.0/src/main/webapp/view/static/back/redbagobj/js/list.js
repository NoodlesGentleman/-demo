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
});

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
	        var url = webroot+'/redbagobj/list';
	        var self = this;

	        setTimeout(function () {
	            var data = $.extend(true, [], self._data);
	            var param = {
	                	pageNum: options.pageIndex+1,
	            		numPerPage: options.pageSize,
	            		username : $("#data_username").val(),
	            		phone : $("#data_phone").val(),
	            		openid : $("#data_openid").val()
	                };
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
	            	property: 'username',
	            	label: '姓名',
	            	sortable: false 
	            },
	            {
	            	property: 'phone',
	            	label: '手机号',
	            	sortable: false 
	            },
	            {
	            	property: 'openid',
	            	label: 'openid',
	            	sortable: false 
	            },
	            {
	            	property: 'createTime',
	            	label: '注册时间',
	            	sortable: false 
	            },
	            {
	            	property: 'registerLife',
	            	label: '注册时长（天）',
	            	sortable: false 
	            },
	            {
	            	property: 'count',
	            	label: '操作次数',
	            	sortable: false 
	            }
	        ],
	        formatter: function (items, pageIndex, pageSize) {
	           
	        }
	    }),
	    loadingHTML: '<span><img src="view/static/panel/img/loading.gif"><i class="fa fa-info-sign text-muted" "></i>正在加载……</span>',
	    itemsText: '项',
	    itemText: '项',
	    dataOptions: { pageIndex: 0, pageSize: 15 }
	});
}

