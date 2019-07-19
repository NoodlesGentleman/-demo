<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page isELIgnored="false"%>

<jsp:include page="/WEB-INF/views/panel/wrapper.prefix.jsp" />

<script type="text/javascript">
	var webroot = "${STORE_URL}";
</script>
<script src="${STATIC_URL}/js/rights/navigation.index.js"></script>

<section class="hbox stretch">
	<aside class="aside-md bg-white b-r" id="subNav">
		<section class="vbox">
			<header class="b-b header">
				<p class="h4">权限组</p>
			</header>
			<section class="scrollable w-f">
				<ul class="nav nav-pills nav-stacked no-radius">
					<c:forEach items="${firstNav}" var="v">
						<li
							class="b-b m-t-none-reset <c:if test="${navigationId == v.navigationId }">active</c:if>">
							<a href="${STORE_URL}/sysNav/listView?navigationId=${v.navigationId}" class="load-content">
							<i class="fa fa-chevron-right pull-right m-t-xs text-xs icon-muted"></i>
                            <i class="fa fa-fw fa-ellipsis-v"></i>
							${v.title} </a>
						</li>
					</c:forEach>
					<input type="hidden" id="navigationId" name="navigationId" value="${navigationId}" >
				</ul>
			</section>
		</section>
	</aside>

	<aside>
		<section class="vbox">
			<header class="header bg-white b-b clearfix">
                <div class="btn-group">
                    <button type="button" id="refresh" class="btn btn-sm btn-default action-refresh" title="Refresh"><i class="fa fa-refresh"></i></button>
                </div>
               	<a href="sysNav/addView?navigationId=${navigationId}" data-toggle="ajaxModal" class="btn btn-sm btn-default" id="modal_new"><i class="fa fa-plus"></i> 添加</a>
               	<a href="sysNav/editView?navigationId=${navigationId}" data-toggle="ajaxModal" class="btn btn-sm btn-default" id="modal_edit"><i class="fa fa-plus"></i> 修改权限组</a>
               	<a href="sysNav/delete?navigationId=${navigationId}" data-toggle="ajaxModal" class="btn btn-sm btn-default" id="modal_delete"><i class="fa fa-plus"></i> 删除权限组</a>
			</header>
			<table>
				<tbody>
					<tr>
						<td width="80"></td>
						<td width="270"></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
			</table>
			<section class="scrollable wrapper" id="navigation_content">
				<span class="edit_notice" id="edit_notice"></span>
				<section class="panel panel-default">
					<table class="table table-striped m-b-none text-sm"
						id="navigation_listing">
						<thead>
						</thead>
					</table>
				</section>
			</section>
		</section>
	</aside>
</section>

<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel">
					<i class="fa fa-exclamation-circle"></i>[Title]
				</h4>
			</div>
			<div class="modal-body">[Message]</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" data-dismiss="modal">[BtnOk]</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">[BtnCancel]</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal -->
</div>
<jsp:include page="/WEB-INF/views/panel/wrapper.suffix.jsp" />