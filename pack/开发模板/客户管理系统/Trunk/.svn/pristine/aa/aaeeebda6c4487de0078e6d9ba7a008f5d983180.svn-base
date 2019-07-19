package com.sof.marketing.system.util;

import javax.servlet.http.HttpServletRequest;

public class AjaxUtil {

	// 判断是否是AJAX请求
	public static boolean checkIsAjax(HttpServletRequest request) {
		String requestType = request.getHeader("x-requested-with");
		boolean isAjax = false;
		if (requestType != null && requestType.equals("XMLHttpRequest")) {
			isAjax = true;
		}
		request.setAttribute("isAjax", isAjax);
		return isAjax;
	}
}
