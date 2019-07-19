<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page isELIgnored="false"%>

<jsp:include page="/WEB-INF/views/panel/wrapper.prefix.jsp" />
<script type="text/javascript">
	var webroot = "${STORE_URL}";
</script>
<script src="${STATIC_URL}/js/sysUser/sysUserNew.js"></script>

<section class="hbox stretch">
	<aside class="aside-md bg-white b-r">
		<section class="vbox">
			<header class="b-b header">
				<p class="h4">新建用户</p>
			</header>

			<section class="scrollable wrapper w-f">
				<form class="form-horizontal" id="edit_form" action="${STORE_URL}/sysUser/save" method="POST">
					<div class="form-group">
						<label for="role_name" class="col-sm-2 control-label">用户登录名：</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="user_login_name" name="user_login_name" value="" />
						</div>
					</div>
					<div class="line line-dashed line-lg pull-in"></div>

					<div class="form-group">
						<label for="role_no" class="col-sm-2 control-label">用户密码：</label>
						<div class="col-sm-4">
							<input type="password" class="form-control" id="user_pwd" name="user_pwd" value="" />
						</div>
					</div>
					<div class="line line-dashed line-lg pull-in"></div>

					<div class="form-group">
						<label for="role_desc" class="col-sm-2 control-label">用户名字：</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="userName" name="userName" value="" />
						</div>
					</div>
					<div class="line line-dashed line-lg pull-in"></div>
					
					<div class="form-group">
						<label for="role_desc" class="col-sm-2 control-label">电话号码：</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="userMobile" name="userMobile" value="" />
						</div>
					</div>
					<div class="line line-dashed line-lg pull-in"></div>

					<div class="form-group">
						<label class="col-sm-2 control-label">性别：</label>
						<div class="col-sm-3">
							<select name="userSex" style="width: 130px" class="form-control">
								<option value="0" selected="selected">男</option>
								<option value="1">女</option>
							</select>
						</div>
					</div>
					<div class="line line-dashed line-lg pull-in"></div>
					
					<div class="form-group">
						<label class="col-sm-2 control-label">角色：</label>
						<div class="col-sm-3">
							<select name="userRoleId" id="userRoleId" style="width: 130px" class="form-control">
								<option value="" selected="selected">--请选择--</option>
							</select>
						</div>
					</div>
					<div class="line line-dashed line-lg pull-in"></div>
				</form>
			</section>
			<footer class="footer b-t bg-white-only">
				<div class="m-t-sm">
					<span id="edit_notice"></span>
					<button type="button" id="submit_save_back" class="btn btn-s-md btn-primary btn-sm input-submit">提交</button>
					<button type="button" id="submit_cancel" class="btn btn-danger btn-sm input-submit">取消</button>
				</div>
			</footer>
		</section>
	</aside>
</section>

<jsp:include page="/WEB-INF/views/panel/wrapper.suffix.jsp" />