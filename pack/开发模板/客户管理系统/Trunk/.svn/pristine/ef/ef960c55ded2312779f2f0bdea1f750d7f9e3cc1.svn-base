<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<script type="text/javascript">
	var webroot = "${STORE_URL}";
</script>
<jsp:include page="/WEB-INF/views/panel/wrapper.prefix.jsp"/>
<!-- 网页内容的js和css样式加载-->
<script src="${STATIC_URL}/back/redpackheadconfig/js/list.js"></script>
<link rel="stylesheet" href="css/commp.css" type="text/css">
<link rel="stylesheet" href="view/static/scripts/bootstrap/3.1.0/css/bootstrap.min.css" type="text/css">
<section class="vbox">
	<header class="b-b header">
		<p class="h4">红包任务列表</p>
	</header>
	<header class="header bg-white b-b clearfix" style="height:100px;">
		<div class="row m-t-sm" style="margin-left:auto;margin-right:auto">
			<div class="three_one">
				<label for="" class="control-label" style="float:left;margin-top: 8px;width:100px;text-align:right;">标题：</label>
	            <div class="col-sm-2 minw200">
	        		<input type="text" class="form-control imput_p" id="data_title" name="" value=""/>
	            </div>
            </div>
            <div class="three_one">
	            <label for="" class="control-label" style="float:left;margin-top: 8px;width:100px;text-align:right;">任务类型：</label>
	            <div class="col-sm-2 minw200">
		            <select class="form-control imput_p" name="data_jobtype">
			                        <option value="">全部</option>
			                        <option value="YC">一次性红包</option>
			                        <option value="DC">定时红包</option>
			                        <option value="CF">触发类红包</option>
	                 </select>
	            </div>
            </div>
            <div class="three_one">
	            <label for="" class="control-label" style="float:left;margin-top: 8px;width:100px;text-align:right;">金额类型：</label>
	            <div class="col-sm-2 minw200">
	        		<select class="form-control imput_p" name="data_pricetype">
			                        <option value="">全部</option>
			                        <option value="0">固定金额</option>
			                        <option value="1">随机金额</option>
	                </select>
	            </div>
	        </div>    
           </div>
           <div class="row m-t-sm" style="margin-left:auto;margin-right:auto">
		         <label for="" class="control-label" style="float:left;margin-top: 8px;width:100px;text-align:right;">发送开始时间：</label>
		         <div class="col-sm-2 minw200">
		     		<input type="text" id="data_startDate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"
				class="form-control imput_p" data-date-format="yyyy-mm-dd" value=""/>
		         </div>
		         <label for="" class="control-label" style="float:left;margin-top: 8px;width:100px;text-align:right;">结束时间：</label>
		         <div class="col-sm-2 minw200">
		     		<input type="text" id="data_endDate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"
				class="form-control imput_p" data-date-format="yyyy-mm-dd" value=""/>
	         	</div>
	         	<button class="btn btn-sm btn-default btn-success action-refresh" style="width:100px;margin-left:200px;" type="button">查询</button>
        	</div>
	</header>
	<section class="scrollable wrapper tableSection"style="margin-top: 110px;padding-top: 0;overflow-x:auto;margin-bottom:;" >
        <section class="panel panel-default">
            <div class="table-responsive">
                    <!-- 这下边是table -->
                    <table id="data_listing" class="table table-striped m-b-none datagrid scrollable" style="white-space: nowrap;background: #fff;display:table;" >
                        <thead>
                        </thead>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th class="row">
                                    <div class="datagrid-footer-left col-sm-6 text-center-xs m-l-n"
                                        style="display: none;">
                                        <div class="grid-controls m-t-sm">
                                            <span> <span class="grid-start"></span> - <span
                                                class="grid-end"></span> （共 <span class="grid-count"></span>）
                                            </span>

                                            <div class="select grid-pagesize dropup" data-resize="auto">
                                                <button data-toggle="dropdown"
                                                    class="btn btn-sm btn-default dropdown-toggle">
                                                    <span class="dropdown-label"></span> <span class="caret"></span>
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li data-value="10" data-selected="true"><a href="#">10</a></li>
                                                </ul>
                                            </div>
                                            <span>/页</span>
                                        </div>
                                    </div>

                                    <div
                                        class="datagrid-footer-right col-sm-6 text-right text-center-xs"
                                        style="display: none;">
                                        <div class="grid-pager m-r-n">
                                            <button type="button"
                                                class="btn btn-sm btn-default grid-prevpage">
                                                <i class="fa fa-chevron-left"></i>
                                            </button>
                                            <!--<span>页</span>-->

                                            <div class="inline">
                                                <div class="input-group dropdown combobox">
                                                    <input class="input-sm form-control" type="text">

                                                    <div class="input-group-btn dropup">
                                                        <button class="btn btn-sm btn-default"
                                                            data-toggle="dropdown">
                                                            <i class="caret"></i>
                                                        </button>
                                                        <ul class="dropdown-menu pull-right"></ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <span>/ <span class="grid-pages"></span></span>
                                            <button type="button"
                                                class="btn btn-sm btn-default grid-nextpage">
                                                <i class="fa fa-chevron-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
        </section>   
  </section>
</section>