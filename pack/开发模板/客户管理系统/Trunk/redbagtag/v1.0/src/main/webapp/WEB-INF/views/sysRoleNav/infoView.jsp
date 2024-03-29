<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<jsp:include page="/WEB-INF/views/panel/wrapper.prefix.jsp"/>

<link href="${STATIC_URL}/admin/css/permissionassign.css" rel="stylesheet" type="text/css" />
<script src="${STATIC_URL}/js/sysRoleNav/sysRoleNavInfo.js" type="text/javascript"></script>
<script type="text/javascript">
	var webroot = "${STORE_URL}";
</script>
<section class="hbox stretch">
    <aside>
        <section class="vbox">
            <header class="header bg-white b-b clearfix">
                <p>角色权限分配信息</p>
                <p class="h4" style="float: right;"><a href="javascript:;" id="returnPage" class="list" rel="sysRoleNavList_info">&lt&lt角色菜单关系</a></p>
            </header>
			<input type="hidden" id="roleId" value=${id }>
            <section class="scrollable wrapper">
                <section class="panel panel-default">
                    <table class="table table-striped m-b-none datagrid" id="sysRoleNav_listing">
						<thead>
						</thead>
						<tfoot>
							<tr>
								<th class="row">
									<div class="datagrid-footer-left col-sm-6 text-left text-center-xs m-l-n"
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
                </section>
            </section>
        </section>
    </aside>
</section>

<jsp:include page="/WEB-INF/views/panel/wrapper.suffix.jsp"/>