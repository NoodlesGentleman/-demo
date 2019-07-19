package com.sof.marketing.system.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sof.marketing.system.domain.SystemNavigation;
import com.sof.marketing.system.domain.SystemUser;
import com.sof.marketing.system.service.ISystemNavigationService;
import com.sof.marketing.system.service.ISystemUserService;
import com.sof.marketing.system.util.AjaxUtil;
import com.sof.marketing.system.util.Config;
import com.sof.marketing.system.util.ShareData;

@SuppressWarnings("unchecked")
public abstract class AbstractController {

	@Resource
	private ISystemNavigationService systemNavigationService;
	@Resource
	private ISystemUserService userService;

	/**
	 * 初始化界面调用
	 * 
	 * @author HeWeiwen 2015-7-17
	 * @param ModelAndView
	 * @param req
	 */
	public void initIndex(HttpServletRequest req, HttpServletResponse response,
			Map<String, Object> map) {
		// session 超时回登录页
		ShareData shareData = (ShareData) req.getSession(true).getAttribute("shareData");

		if (null == shareData) {
			try {
				response.setContentType("text/html;charset=UTF-8");
				PrintWriter out = response.getWriter();
				out.print("<script>window.location.href='" + Config.STORE_URL
						+ "';alert('账户信息超时,请重新登录！ ');</script>");
				out.flush();
				out.close();
				// response.sendRedirect( Config.STORE_URL );
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		if (AjaxUtil.checkIsAjax(req)) {
			return;
		}
		// String allow_navs =
		// systemNavigationService.getAllowNavigations(user);

		SystemUser user = new SystemUser(shareData.getUser_id());
		user = (SystemUser)userService.getSystemUserOne(user).getData();
		if (user != null) {
			map.put("loggedInUser", user);
		} else {
			// 报错出门
			response.setStatus(500);
			try {
				response.sendRedirect(Config.STORE_URL);
			} catch (IOException e) {
				e.printStackTrace();
			}
			return;
		}

		List<SystemNavigation> sysTop = new ArrayList<SystemNavigation>();
		List<SystemNavigation> sysTwo = new ArrayList<SystemNavigation>();
		List<SystemNavigation> sysThree = new ArrayList<SystemNavigation>();
		// 1:表示显示，0：表示不显示
		SystemNavigation navigation = new SystemNavigation(false);
		navigation.setStatus((byte) 1);

		// 开始筛选对应人所拥有的选项
		if (user.getIsSuperAdmin() == 0) {
			navigation.setUser_id(user.getUser_id());
		}
		
		List<SystemNavigation> systemnavigation = (List<SystemNavigation>)systemNavigationService.getNavigationList(navigation, null, null).getData();
		
		for (SystemNavigation sys : systemnavigation) {
			if (sys.getLevel() == 1) {
				sysTop.add(sys);
			} else if (sys.getLevel() == 2) {
				sysTwo.add(sys);
			} else if (sys.getLevel() == 3) {
				sysThree.add(sys);
			}
		}

		// 树形结构
		map.put("nav_top", sysTop);
		map.put("nav_two", sysTwo);
		map.put("nav_three", sysThree);

	}
}
