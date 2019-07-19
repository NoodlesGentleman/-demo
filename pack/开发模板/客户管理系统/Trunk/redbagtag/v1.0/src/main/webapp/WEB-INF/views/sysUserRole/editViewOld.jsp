<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page isELIgnored="false" %>

<script type="text/javascript">
	var webroot = "${STORE_URL}";
</script>
<jsp:include page="/WEB-INF/views/panel/wrapper.prefix.jsp" />
<script src="${STATIC_URL}/js/sysUserRole/sysUserRoleEdit.js"></script>

<section class="hbox stretch">
	<aside class="aside-md bg-white b-r">
		<section class="vbox">
			<header class="header bg-white b-b clearfix">
				<p>为用户分配角色</p>
				<p class="h4" style="float: right;">
					<a href="javascript:;" id="returnPage" class="list" rel="sysUserRoleList">&lt&lt用户角色管理</a>
				</p>
			</header>
			<%
				String id = request.getParameter("id");
			%>
			<input type="hidden" id="userId" value=<%=id%>>
			<section class="scrollable wrapper">
				<section class="panel panel-default">
					<table class="table table-striped m-b-none text-sm">
						<thead>
							<tr>
								<th>序号</th>
								<th>角色名</th>
								<th>描述</th>
								<th width="15%">授权</th>
								<th width="10"></th>
							</tr>
						</thead>
						<tbody>
							<% int index = 0; %>
							<c:forEach items="${sysUserRolesModel}" var="userRole">
								<tr>
									<% index ++; %>
									<td><%=index %></td>
									<td>${userRole.role_name}</td>
									<td>${userRole.role_desc}</td>
									<td><c:choose>
											<c:when test="${userRole.roleFlag eq '1'}">
												<input type="checkbox" class="permission_assign"
													id="${userRole.role_id}" checked="checked" />
											</c:when>
											<c:otherwise>
												<input type="checkbox" class="permission_assign"
													id="${userRole.role_id}" />
											</c:otherwise>
										</c:choose>
										<c:set value="2" var="result" />
										<span class="edit-notice" id="edit_notice_${userRole.role_id }"></span>
									</td>
									<td>
										<input type="hidden" id="sysRoleId" value="${userRole.role_id }" />
									</td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
				</section>
			</section>
		</section>
	</aside>
</section>

<jsp:include page="/WEB-INF/views/panel/wrapper.suffix.jsp" />