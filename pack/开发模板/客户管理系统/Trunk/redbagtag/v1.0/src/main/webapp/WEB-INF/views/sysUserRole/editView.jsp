<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page isELIgnored="false"%>

<script type="text/javascript"> var webroot = "${STORE_URL}";
</script>
<jsp:include page="/WEB-INF/views/panel/wrapper.prefix.jsp" />
<script src="${STATIC_URL}/js/sysUserRole/sysUserRoleEdit.js"></script>

<!-- modal - 编辑导航 -->
<div class="modal-dialog" id="modal_edit">
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			<h4 class="modal-title" id="modal_title">
				为用户分配角色
			</h4>
		</div>
		<div class="modal-body">
			<%
				String id = request.getParameter("id");
			%>
			<input type="hidden" id="userId" value=<%=id%>>
			<section class="scrollable wrapper">
				<section class="panel panel-default">
					<table class="table table-striped m-b-none text-sm">
						<thead>
							<tr>
								<th>角色名</th>
								<th>描述</th>
								<th width="25%">授权</th>
								<th width="20%">提示语</th>
							</tr>
						</thead>
						<tbody>
							<c:forEach items="${sysUserRolesModel}" var="userRole">
								<tr>
									<td>${userRole.role_name}</td>
									<td>${userRole.role_desc}</td>
									<td>
										<c:choose>
											<c:when test="${userRole.roleFlag eq '1'}">
												<input type="checkbox" class="permission_assign" id="${userRole.role_id}" checked="checked" />
											</c:when>
											<c:otherwise>
												<input type="checkbox" class="permission_assign" id="${userRole.role_id}" />
											</c:otherwise>
										</c:choose>
										<c:set value="2" var="result" />
									</td>
									<td>
										<input type="hidden" id="sysRoleId" value="${userRole.role_id }" />
										<span class="edit-notice" id="edit_notice_${userRole.role_id }"></span>
									</td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
				</section>
			</section>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">取消</button>
		</div>
	</div>
</div>

<jsp:include page="/WEB-INF/views/panel/wrapper.suffix.jsp" />