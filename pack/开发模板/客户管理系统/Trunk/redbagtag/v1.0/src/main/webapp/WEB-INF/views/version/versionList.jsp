<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false"%>

<!-- 网页头部和公共样式加载-->
<jsp:include page="/WEB-INF/views/panel/wrapper.prefix.jsp"/>
<script type="text/javascript">
	var webroot = "${STORE_URL}";
</script>
<!-- 网页内容的js和css样式加载-->
<script src="${STATIC_URL}/js/version/versionList.js"></script>

<section class="vbox">
    <header class="header bg-white b-b clearfix">
        <div class="row m-t-sm">
        	<div class="col-sm-2 m-b-xs">
				<div class="btn-group">
				    <button type="button" class="btn btn-sm btn-default action-refresh" title="Refresh"><i class="fa fa-refresh"></i></button>
				</div>
				<a href="${STORE_URL}/mainVersion/versionAddView" class="btn btn-sm btn-default load-content"><i class="fa fa-plus"></i>新建</a>
			</div>
			<div class="col-sm-7 m-b-xs text-right p-left-0 p-right-0">
<!-- 				<form class="form-inline"> -->
<!-- 					<div class="form-group"> -->
<!-- 					<label>状态：</label> -->
<!-- 						<select name="questionnaireStatus" id="questionnaireStatus" class="input-sm form-control form-control-reset select-area" > -->
<!-- 							<option value="0">未发布</option> -->
<!-- 		                	<option value="1">收集中</option> -->
<!-- 		                	<option value="2">已结束</option> -->
<!-- 		                </select> -->
<!-- 					</div> -->
<!-- 				</form> -->
			</div>
        </div>
    </header>
    
    <section class="scrollable wrapper" id="wrapper">
        <section class="panel panel-default">
            <div class="table-responsive">
                <table class="table table-striped m-b-none datagrid" id="list">
                    <thead>
                    </thead>
                    <tfoot>
                        <tr>
                            <th class="row">
                                <div class="datagrid-footer-left col-sm-6 text-left text-center-xs m-l-n"
                                     style="display:none;">
                                    <div class="grid-controls m-t-sm">
                                            <span>
                                                <span class="grid-start"></span> -
                                                <span class="grid-end"></span> （共
                                                <span class="grid-count"></span>）
                                            </span>

                                        <div class="select grid-pagesize dropup" data-resize="auto">
                                            <button data-toggle="dropdown"
                                                    class="btn btn-sm btn-default dropdown-toggle">
                                                <span class="dropdown-label"></span>
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li data-value="15" data-selected="true"><a href="#">15</a></li>
                                                <li data-value="20"><a href="#">20</a></li>
                                                <li data-value="50"><a href="#">50</a></li>
                                                <li data-value="100"><a href="#">100</a></li>
                                            </ul>
                                        </div>
                                        <span>/页</span>
                                    </div>
                                </div>

                                <div class="datagrid-footer-right col-sm-6 text-right text-center-xs"
                                     style="display:none;">
                                    <div class="grid-pager m-r-n">
                                        <button type="button" class="btn btn-sm btn-default grid-prevpage"><i
                                                class="fa fa-chevron-left"></i></button>
                                        <!--<span>页</span>-->

                                        <div class="inline">
                                            <div class="input-group dropdown combobox">
                                                <input class="input-sm form-control" type="text">

                                                <div class="input-group-btn dropup">
                                                    <button class="btn btn-sm btn-default" data-toggle="dropdown"><i
                                                            class="caret"></i></button>
                                                    <ul class="dropdown-menu pull-right"></ul>
                                                </div>
                                            </div>
                                        </div>
                                        <span>/ <span class="grid-pages"></span></span>
                                        <button type="button" class="btn btn-sm btn-default grid-nextpage"><i
                                                class="fa fa-chevron-right"></i></button>
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



<!-- 网页尾部加载-->
<jsp:include page="/WEB-INF/views/panel/wrapper.suffix.jsp"/>
