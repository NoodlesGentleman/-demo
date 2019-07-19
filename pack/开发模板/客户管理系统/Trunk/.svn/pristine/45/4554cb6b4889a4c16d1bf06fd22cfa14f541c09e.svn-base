package com.sof.marketing.system.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import springfox.documentation.annotations.ApiIgnore;

import com.sof.marketing.annotation.RoleAuthority;
import com.sof.marketing.constant.WebConstant.AdminRole;
import com.sof.marketing.system.domain.SystemUser;
import com.sof.marketing.system.service.ISystemUserService;
import com.sof.marketing.system.util.ShareData;

@Controller
@RequestMapping("/swagger")
@ApiIgnore
public class SwaggerController {
	
	@Resource
	private ISystemUserService userService;

	@RequestMapping(value = "/listView", method = RequestMethod.GET)
	@RoleAuthority(value = AdminRole.ADMIN)
	public ModelAndView listView(HttpServletRequest request){
		HttpSession session = request.getSession(false);
		
		// SWAGGER增加权限管理
		if(session == null){
			return new ModelAndView("../404");
		} else {
			if(session.getAttribute("shareData") == null){
				return new ModelAndView("../404");
			}
			ShareData shareData = (ShareData)session.getAttribute("shareData");
			SystemUser user = new SystemUser(shareData.getUser_id());
			user = (SystemUser)userService.getSystemUserOne(user).getData();
			if(user == null || user.getIsSuperAdmin() == 0){
				return new ModelAndView("../404");
			} else {
				return new ModelAndView("/rediectswagger");
			}
		}
	}
}
