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
<script src="${STATIC_URL}/back/redbagobj/js/list.js"></script>
<section class="vbox">
	<header class="b-b header">
		<p class="h4">人群筛选</p>
	</header>
	<header class="header bg-white b-b clearfix" style="height:100px;">
		<div class="row m-t-sm">
			<label for="" class="control-label" style="float:left;margin-top: 8px;">姓名：</label>
            <div class="col-sm-2 minw200">
        		<input type="text" class="form-control" id="data_username" name="" value=""/>
            </div>
        
			<label for="" class="control-label" style="float:left;margin-top: 8px;">手机：</label>
            <div class="col-sm-2 minw200">
        		<input type="text" class="form-control" id="data_phone" name="" value=""/>
            </div>
        
			<label for="" class="control-label" style="float:left;margin-top: 8px;">openId：</label>
            <div class="col-sm-2 minw200">
        		<input type="text" class="form-control" id="data_openid" name="" value=""/>
            </div>
        </div>
		<div class="row m-t-sm">
			<button class="btn btn-sm btn-default btn-success action-refresh" style="width:100px;" type="button">查询</button>
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
                                                    <li data-value="15" data-selected="true"><a href="#">15</a></li>
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