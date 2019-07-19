package com.sof.marketing.system.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.bluemobi.framework.common.contant.Const;
import com.bluemobi.framework.common.dto.ResponseEntity;
import com.sof.marketing.system.domain.SystemFunction;
import com.sof.marketing.system.domain.SystemNavigation;
import com.sof.marketing.system.domain.SystemRole;
import com.sof.marketing.system.domain.SystemRoleFunction;
import com.sof.marketing.system.domain.SystemRoleNav;
import com.sof.marketing.system.service.ISystemFunctionService;
import com.sof.marketing.system.service.ISystemNavigationService;
import com.sof.marketing.system.service.ISystemRoleFunctionService;
import com.sof.marketing.system.service.ISystemRoleNavService;
import com.sof.marketing.system.service.ISystemRoleService;
import com.sof.marketing.system.util.ShareData;

import springfox.documentation.annotations.ApiIgnore;

@Controller
@RequestMapping("/sysRoleNav")
@ApiIgnore
@SuppressWarnings("unchecked")
public class SystemRoleNavController extends AbstractController {

	@Resource
	private ISystemRoleNavService sysRoleNavService;
	@Resource
	private ISystemRoleService sysRoleService;
	@Resource
	private ISystemNavigationService sysNavService;
	@Resource
	private ISystemNavigationService systemNavigationService;
	@Resource
	private ISystemFunctionService systemFunctionService;
	@Resource
	private ISystemRoleFunctionService systemRoleFunctionService;

	/**
	 * 呈现编辑页面（新）
	 * @param req SERVLET请求
	 * @param response SERVLET响应
	 * @param navigationId 导航编号
	 * @param roleId 角色编号
	 * @return 页面返回
	 */
	@RequestMapping(value = "/editViewNew", method = RequestMethod.GET)
	public ModelAndView editViewNew(HttpServletRequest req,
			HttpServletResponse response, String navigationId, String roleId) {

		Map<String, List<SystemNavigation>> pMaps = new LinkedHashMap<String, List<SystemNavigation>>();
		Map<String, Object> map = new HashMap<String, Object>();
		// 获取所有二级节点
		SystemNavigation nav = new SystemNavigation(false);
		nav.setStatus((byte) 1);
		nav.setLevel(2);
		List<SystemNavigation> navigationParent = (List<SystemNavigation>)systemNavigationService.getNavigationList(nav, null, null).getData();

		// 展示所点节点的子节点
		if (navigationId != null && !navigationId.equals("0")
				&& !navigationId.isEmpty()) {
			for (SystemNavigation parentNav : navigationParent) {
				List<SystemNavigation> sonNavList = new ArrayList<SystemNavigation>();

				SystemNavigation navTmp = new SystemNavigation();
				navTmp.setParentId(parentNav.getNavigationId());
				sonNavList = (List<SystemNavigation>)systemNavigationService.getNavigationList(navTmp, null, null).getData();

				pMaps.put(parentNav.getTitle(), sonNavList);
			}
		}

		// 请求到角色数据
		SystemRole sysRole = (SystemRole)sysRoleService.findSysRolesById(roleId).getData();
		
		// 请求用户数据
		HttpSession session = req.getSession(false);
		ShareData shareData = (ShareData)session.getAttribute("shareData");

		// 重置菜单树
		initIndex(req, response, map);
		map.put("navigations", navigationParent);// 父级菜单数据
		map.put("navigationId", navigationId);// 父级菜单ID
		map.put("permissions", pMaps);// 用户所选权限数据
		map.put("sysRole", sysRole); // 角色信息
		map.put("userId", shareData.getUser_id());// 用户信息

		return new ModelAndView("rights/permissionassign.group.edit", map);
	}

	/**
	 * 呈现展示页面
	 * @param req SERVLET请求
	 * @param response SERVLET响应
	 * @param id 需要查询数据的编号
	 * @return 页面返回
	 */
	@RequestMapping(value = "/infoViewNew", method = RequestMethod.GET)
	public ModelAndView infoViewNew(HttpServletRequest req,
			HttpServletResponse response, String navigationId, String roleId) {
		Map<String, List<SystemNavigation>> pMaps = new LinkedHashMap<String, List<SystemNavigation>>();
		Map<String, Object> map = new HashMap<String, Object>();
		// 获取所有二级节点
		SystemNavigation nav = new SystemNavigation(false);
		nav.setStatus((byte) 1);
		nav.setLevel(2);
		List<SystemNavigation> navigationParent = (List<SystemNavigation>)systemNavigationService.getNavigationList(nav, null, null).getData();
		
		// 展示所点节点的子节点
		if (navigationId != null && !navigationId.equals("0")
				&& !navigationId.isEmpty()) {
			for (SystemNavigation parentNav : navigationParent) {
				List<SystemNavigation> sonNavList = new ArrayList<SystemNavigation>();

				SystemNavigation navTmp = new SystemNavigation();
				navTmp.setParentId(parentNav.getNavigationId());
				sonNavList = (List<SystemNavigation>)systemNavigationService.getNavigationList(navTmp, null, null).getData();

				pMaps.put(parentNav.getTitle(), sonNavList);
			}
		}

		// 请求到角色数据
		SystemRole sysRole = (SystemRole)sysRoleService.findSysRolesById(roleId).getData();

		// 重置菜单树
		initIndex(req, response, map);
		map.put("navigations", navigationParent);// 父级菜单数据
		map.put("navigationId", navigationId);// 父级菜单ID
		map.put("permissions", pMaps);// 用户所选权限数据
		map.put("sysRole", sysRole); // 角色信息

		return new ModelAndView("rights/permissionassign.group.info", map);
	}

	/**
	 * 保存角色选项关联表
	 * @param sysRoleNav 角色选项关联实体
	 * @return 保存后的返回值
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity saveSystemRoleNav(SystemRoleNav sysRoleNav) {
		ResponseEntity resEntity = new ResponseEntity();
		if (StringUtils.isEmpty(sysRoleNav.getRoleId())
				|| StringUtils.isEmpty(sysRoleNav.getSysNavId())) {
			resEntity.setStatus("1");
			resEntity.setError("参数错误！");
			return resEntity;
		}
		Integer count = (Integer)sysRoleNavService.insert(sysRoleNav).getData();
		if (count > 0) {
			// 判断其是否可以加入根节点
			sysRoleNavService.saveParentNode(sysRoleNav.getSysNavId(), sysRoleNav.getRoleId());
			resEntity.setStatus("0");
			resEntity.setMsg("保存成功！");
		} else {
			resEntity.setStatus("1");
			resEntity.setError("保存失败，请重新保存！");
		}
		return resEntity;
	}
	
	/**
	 * 保存用户功能关联表
	 * @param SystemRoleFunction 用户功能关联表
	 * @return 保存后的返回值
	 */
	@RequestMapping(value = "/saveSystemRoleFunction", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity saveSystemRoleFunction(SystemRoleFunction userFunction) {
		ResponseEntity resEntity = new ResponseEntity();
		if (StringUtils.isEmpty(userFunction.getRole_id())
				|| userFunction.getFunction_id() == 0) {
			resEntity.setStatus("1");
			resEntity.setError("参数错误！");
			return resEntity;
		}
		ResponseEntity mapres = systemRoleFunctionService.save(userFunction);
		Integer count = (Integer)mapres.getData();
		if (count > 0) {
			// 判断其是否可以加入根节点
			resEntity.setStatus("0");
			resEntity.setMsg("保存成功！");
		} else {
			resEntity.setStatus("1");
			resEntity.setError("保存失败，请重新保存！");
		}
		return resEntity;
	}

	@RequestMapping(value = "/remove", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity removeSystemRoleNav(SystemRoleNav sysRoleNav) {
		ResponseEntity resEntity = new ResponseEntity();
		if (StringUtils.isEmpty(sysRoleNav.getRoleId())
				|| StringUtils.isEmpty(sysRoleNav.getSysNavId())) {
			resEntity.setStatus("1");
			resEntity.setError("参数错误！");
			return resEntity;
		}
		Integer count = (Integer)sysRoleNavService.delete(sysRoleNav).getData();
		if (count > 0) {
			resEntity.setStatus("0");
			resEntity.setMsg("删除成功！");
		} else {
			resEntity.setStatus("1");
			resEntity.setError("删除失败，请重新删除！");
		}
		return resEntity;
	}
	
	@RequestMapping(value = "/removeSystemRoleFunction", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity removeSystemRoleFunction(SystemRoleFunction systemRoleFunction) {
		ResponseEntity resEntity = new ResponseEntity();
		if (StringUtils.isEmpty(systemRoleFunction.getRole_id())
				|| systemRoleFunction.getFunction_id() == 0) {
			resEntity.setStatus("1");
			resEntity.setError("参数错误！");
			return resEntity;
		}
		ResponseEntity mapres = systemRoleFunctionService.delete(systemRoleFunction);
		Integer count = (Integer)mapres.getData();
		if (count > 0) {
			resEntity.setStatus("0");
			resEntity.setMsg("删除成功！");
		} else {
			resEntity.setStatus("1");
			resEntity.setError("删除失败，请重新删除！");
		}
		return resEntity;
	}

	/**
	 * 查询出列表数据（分页）
	 * 
	 * @param sysRole
	 *            需要查询的查询列表集合
	 * @return MAP集合
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity list(SystemRole sysRole, Integer currentPage, Integer pageSize) {
		ResponseEntity res = new ResponseEntity();
		
		res = sysRoleService.getSysRolesList(sysRole, currentPage, pageSize);
		
		return res;
	}

	@RequestMapping(value = "/checkAllList", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity checkAllList(String id, Integer pageNum, Integer numPerPage) {
		// 设置参数
		Map<String, Object> map = new HashMap<String, Object>();
		ResponseEntity res = new ResponseEntity();
		// 已经拥有的值
		List<SystemRoleNav> List = new ArrayList<SystemRoleNav>();
		// 所有拥有的值
		List<SystemNavigation> AllList = new ArrayList<SystemNavigation>();
		try {
			List = (List<SystemRoleNav>)sysRoleNavService.getRoleNavList(id).getData();
			
			res = sysNavService.getNavigationList(null, pageNum, numPerPage);
			AllList = (List<SystemNavigation>)res.getData();
			Integer count = res.getRecordsTotal();

			map.put("SysRoleNavList", List);
			map.put("SysRoleAll", AllList);
			map.put("recordsTotal", count);
			
			res.setData(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return res;
	}
	
	@RequestMapping(value = "/checkAllListByParameter", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity checkAllListByParameter(String id, String navId,
			HttpServletRequest request, String roleId) {
		// 设置参数
		Map<String, Object> map = new HashMap<String, Object>();
		ResponseEntity res = new ResponseEntity();
		// 已经拥有的值
		List<SystemRoleNav> List = new ArrayList<SystemRoleNav>();
		// 所有拥有的值
		List<SystemNavigation> AllList = new ArrayList<SystemNavigation>();
		
		Map<String, List<SystemFunction>> functionMap = new HashMap<String, List<SystemFunction>>();
		try {
			if (StringUtils.isNotEmpty(id) && StringUtils.isNotBlank(id)) {
				List = (List<SystemRoleNav>)sysRoleNavService.getRoleNavList(id).getData();
			}
			if (StringUtils.isNotEmpty(navId) && StringUtils.isNotBlank(navId)) {
				AllList = (List<SystemNavigation>)sysNavService.selectAllNavByParentNavId(navId).getData();
			}

			map.put("SysRoleNavList", List);
			map.put("SysRoleAll", AllList);
			
			// 根据三级权限获取功能点
			for(SystemNavigation nav : AllList){
				// 获取所有的功能点
				ResponseEntity functionRes = systemFunctionService.getSystemFunctionByNavigationId(nav.getNavigationId());

				List<SystemFunction> sysFunctions = (List<SystemFunction>)functionRes.getData();

				if(sysFunctions != null && sysFunctions.size() > 0) {
					functionMap.put(nav.getNavigationId().toString(), sysFunctions);
				}
			}
			
			map.put("FunctionMap", functionMap);
			
			ResponseEntity remap = systemRoleFunctionService.getSystemRoleFunction(roleId);
			
			map.put("selectFunctionMap", remap.getData());
			
			res.setStatus(Const.SUCCESS);
			res.setMsg(Const.SUCCESS_MSG);
			res.setData(map);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return res;
	}
}
