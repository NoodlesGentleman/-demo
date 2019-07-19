package com.sof.marketing.system.web;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.bluemobi.framework.common.dto.ResponseEntity;
import com.sof.marketing.system.domain.SystemRole;
import com.sof.marketing.system.domain.SystemUser;
import com.sof.marketing.system.service.ISystemRoleService;
import com.sof.marketing.system.service.ISystemUserService;
import com.sof.marketing.system.util.ShareData;

import springfox.documentation.annotations.ApiIgnore;

@Controller
@RequestMapping("/sysRole")
@ApiIgnore
public class SystemRoleController extends AbstractController {

	@Resource
	private ISystemRoleService roleService;
	@Resource
	private ISystemUserService userService;

	@RequestMapping(value = "/listView", method = RequestMethod.GET)
	public ModelAndView sysParamsList(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		initIndex(request, response, map);
		
		return new ModelAndView("sysRole/listView", map);
	}

	@RequestMapping(value = "/editView", method = RequestMethod.GET)
	public ModelAndView editSysUserRolesView(HttpServletRequest request,
			HttpServletResponse response, String id) {
		Map<String, Object> map = new HashMap<String, Object>();
		SystemRole sysUserRoles = (SystemRole)roleService.findSysRolesById(id).getData();
		
		initIndex(request, response, map);
		
		map.put("sysUserRolesModel", sysUserRoles);
		return new ModelAndView("sysRole/editView", map);
	}

	@RequestMapping(value = "/infoView", method = RequestMethod.GET)
	public ModelAndView viewSysUserRolesView(HttpServletRequest request,
			HttpServletResponse response, String id) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		initIndex(request, response, map);
		
		SystemRole sysRole = (SystemRole)roleService.findSysRolesById(id).getData();
		map.put("sysRolesModel", sysRole);
		
		return new ModelAndView("sysRole/infoView", map);
	}

	@RequestMapping(value = "/newView", method = RequestMethod.GET)
	public ModelAndView newSysUserRolesView(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		initIndex(request, response, map);
		
		return new ModelAndView("sysRole/newView", map);
	}

	/**
	 * 获取展示数据
	 * 
	 * @param sysRoles
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity list(SystemRole sysRoles, Integer currentPage, Integer pageSize) {
		ResponseEntity res = new ResponseEntity();
		try {
			String status = null;
			if (sysRoles.getStatus() == null || "".equals(sysRoles.getStatus())) {
				status = "00";
			} else {
				status = sysRoles.getStatus();
			}
			sysRoles.setStatus(status);

			// 数据集
			res = roleService.getSysRolesList(sysRoles, currentPage, pageSize);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return res;
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity saveSysRoles(HttpServletRequest req, SystemRole sysRoles) {
		ResponseEntity resEntity = new ResponseEntity();
		if (StringUtils.isEmpty(sysRoles.getRole_name())) {
			resEntity.setStatus("0");
			resEntity.setError("参数错误");
			return resEntity;
		}
		try {
			// 设置id
			sysRoles.setRole_id(UUID.randomUUID().toString());
			// 设置状态 00:正常 01:停用
			sysRoles.setStatus("00");
//			sysRoles.setRole_no(roleService.selectMaxNo() + 1);
			// 设置创建日期
			sysRoles.setCreate_time(new Date());
			// 创建人
			ShareData shareData = (ShareData) req.getSession(true).getAttribute("shareData");
			SystemUser genUser = new SystemUser();
			genUser.setUser_id(shareData.getUser_id());
			genUser = (SystemUser)userService.getSystemUserOne(genUser).getData();

			sysRoles.setCreate_person(genUser.getUserName());
			/* 新增暂不需要以下字段 */
			/* start */
			sysRoles.setUpdate_person(null);
			sysRoles.setUpdate_time(null);
			/* end */

			resEntity = roleService.insert(sysRoles);

		} catch (Exception e) {
			e.printStackTrace();
			resEntity.setStatus("0");
			resEntity.setError("后台异常");
		}

		return resEntity;
	}

	@RequestMapping(value = "/modify", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity modifySysUserRoles(HttpServletRequest req, SystemRole sysRoles) {

		ResponseEntity resEntity = new ResponseEntity();
		try {
			// 设置更新时间
			sysRoles.setUpdate_time(new Date());
			// 设置更新人
			// 创建人
			ShareData shareData = (ShareData) req.getSession(true).getAttribute("shareData");
			SystemUser genUser = new SystemUser();
			genUser.setUser_id(shareData.getUser_id());
			genUser = (SystemUser)userService.getSystemUserOne(genUser).getData();
			
			sysRoles.setUpdate_person(genUser.getUserName());

			resEntity = roleService.update(sysRoles);
		} catch (Exception e) {
			e.printStackTrace();
			resEntity.setStatus("0");
			resEntity.setError("后台异常");
		}
		return resEntity;
	}

	@RequestMapping(value = "/remove", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity delSysUserRoles(HttpServletRequest req, SystemRole sysRoles) {

		ResponseEntity resEntity = new ResponseEntity();
		try {
			resEntity = roleService.delete(sysRoles);
		} catch (Exception e) {
			e.printStackTrace();
			resEntity.setStatus("0");
			resEntity.setError("后台异常");
		}
		return resEntity;
	}
}
