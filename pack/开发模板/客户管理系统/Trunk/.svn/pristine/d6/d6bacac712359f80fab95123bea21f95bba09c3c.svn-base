package com.sof.marketing.listener;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.sof.marketing.annotation.RoleAuthority;
import com.sof.marketing.constant.WebConstant.AdminRole;
import com.sof.marketing.system.domain.SystemUser;
import com.sof.marketing.system.service.ISystemUserService;
import com.sof.marketing.system.util.ShareData;

public class SystemInterceptor extends HandlerInterceptorAdapter {

	private final String LOGIN_URL = "tologin";
	private final String IMAGE_URL = "getImage";
	private final String USERLOGIN_URL = "userLogin";
	
	@Resource
	private ISystemUserService userService;

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		// 设置下UTF-8
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		// 出去两个URL，别的文件都需要正常拦截
		String uri = request.getRequestURI().substring(
				request.getRequestURI().lastIndexOf("/") + 1,
				request.getRequestURI().length());
		if ("".equals(uri) || uri.equals(LOGIN_URL) || uri.equals(IMAGE_URL) || uri.equals(USERLOGIN_URL)) {
			// 是不需要拦截的
			return true;
		} else {
			// 需要拦截判断SESSION
			// 获取SESSION文件
			// 如果是APP请求和SWAGGER请求，则放行
			if (request.getRequestURI().toString().trim().contains("/app/")) {
				return true;
			}
			HttpSession session = (HttpSession) request.getSession(false);
			if (request.getRequestURI().toString().trim().contains("/v2/api-docs")
					|| request.getRequestURI().toString().trim().contains("/swagger-resources")) {
				if (session == null) {
					// 有问题跳转首页
					request.getRequestDispatcher("/WEB-INF/index.jsp").forward(
							request, response);
					return false;
				} else {
					if (session.getAttribute("shareData") == null) {
						// 有问题跳转首页
						request.getRequestDispatcher("/WEB-INF/norights.jsp")
								.forward(request, response);
						return false;
					}
					ShareData shareData = (ShareData) session.getAttribute("shareData");
					SystemUser user = new SystemUser(shareData.getUser_id());
					user = (SystemUser)userService.getSystemUserOne(user).getData();
					if (user != null && user.getIsSuperAdmin() == 1) {
						return true;
					} else {
						// 有问题跳转首页
						request.getRequestDispatcher("/WEB-INF/index.jsp")
								.forward(request, response);
						return false;
					}
				}
			}
			if (session == null) {
				// 有问题跳转首页
				request.getRequestDispatcher("/WEB-INF/index.jsp").forward(
						request, response);
				return false;
			} else {
				// 有SESSION可以正常通过，并且已经登录过
				ShareData shareData = (ShareData) session.getAttribute("shareData");
				if(shareData != null) {
					// 某些页面有权限要求
					HandlerMethod handlerMethod = (HandlerMethod) handler;
					RoleAuthority roleAuthority = handlerMethod.getMethodAnnotation(RoleAuthority.class);
					
					if(roleAuthority == null)
						return true;
					
					SystemUser user = new SystemUser(shareData.getUser_id());
					user = (SystemUser)userService.getSystemUserOne(user).getData();
					
					AdminRole role = roleAuthority.value();
					if(role.getName().equals(user.getIsSuperAdmin().toString())) {
						return true;
					} else {
						request.getRequestDispatcher("/norights.jsp").forward(
								request, response);
						return false;
					}
				} else {
					// 有问题跳转首页
					request.getRequestDispatcher("/WEB-INF/index.jsp").forward(
							request, response);
					return false;
				}
			}
		}
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
	}

	@Override
	public void afterConcurrentHandlingStarted(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
	}
}
