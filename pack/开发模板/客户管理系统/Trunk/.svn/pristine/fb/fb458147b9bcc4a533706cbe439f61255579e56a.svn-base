package com.sof.marketing.system.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.bluemobi.framework.common.contant.Const;
import com.bluemobi.framework.common.dto.PageEntity;
import com.bluemobi.framework.common.dto.ResponseEntity;
import com.sof.marketing.annotation.RoleAuthority;
import com.sof.marketing.constant.WebConstant;
import com.sof.marketing.system.domain.SystemNavigation;
import com.sof.marketing.system.service.ISystemNavigationService;
import com.sof.marketing.system.service.ISystemUserService;

import cn.jpush.api.utils.StringUtils;
import springfox.documentation.annotations.ApiIgnore;

@Controller
@RequestMapping("/sysNav")
@ApiIgnore
public class SystemNavigationController extends AbstractController {

	@Resource
	private ISystemNavigationService systemNavigationService;
	@Resource
	private ISystemUserService userService;

	/**
	 * @Title: listView
	 * @Description: 展示页面跳转
	 * @param @return 设定文件
	 * @return String 返回类型
	 * @throws
	 */
	@RoleAuthority(value = WebConstant.AdminRole.ADMIN)
	@RequestMapping(value = "/listView", method = RequestMethod.GET)
	public ModelAndView listView(HttpServletRequest request, HttpServletResponse response, String navigationId) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		// 获取节点下的所有值
		ResponseEntity res = systemNavigationService.selectSecondNavList();

		// 重置菜单树
		initIndex(request, response, map);
		
		map.put("firstNav", res.getData());
		map.put("navigationId", navigationId);

		return new ModelAndView("rights/navigation.index", map);
	}

	/**
	 * 添加权限
	 * @param request
	 * @param response
	 * @param nav
	 * @return
	 */
	@RequestMapping(value = "/addView", method = RequestMethod.GET)
	public ModelAndView getInsertNav(HttpServletRequest request, HttpServletResponse response, SystemNavigation nav) {
		Map<String, Object> map = new HashMap<String, Object>();
		ResponseEntity resList = new ResponseEntity();

		if(StringUtils.isEmpty(nav.getNavigationId())) {
			// 根节点，只有一个
			SystemNavigation sysNav = new SystemNavigation(false);
			sysNav.setLevel(1);
			resList = systemNavigationService.getNavigationList(sysNav, null, null);
		} else {
			resList = systemNavigationService.selectSecondNavList();
		}
		
		initIndex(request, response, map);
		
		map.put("navList", resList.getData());
		
		return new ModelAndView("rights/navigation.add", map);
	}

	/**
	 * @Title: getEditList
	 * @Description: 导航编辑页数据获取
	 * @param @param nav 菜单对象
	 * @param @return 设定文件
	 * @return ModelAndView 返回类型
	 * @throws
	 */
	@RequestMapping(value = "/editView", method = RequestMethod.GET)
	public ModelAndView getEditList(HttpServletRequest request, HttpServletResponse response, SystemNavigation nav) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		initIndex(request, response, map);		
		
		ResponseEntity resOne = systemNavigationService.selectOne(nav.getNavigationId());
		ResponseEntity resList = new ResponseEntity();
		
		SystemNavigation sysNav = (SystemNavigation)resOne.getData();
		
		if(sysNav.getLevel() == 2) {
			// 二级菜单，需要拿到根节点的值
			SystemNavigation sysTmp = new SystemNavigation(false);
			sysTmp.setNavigationId(sysNav.getParentId());
			resList = systemNavigationService.getNavigationList(sysTmp, null, null);
		} else {
			// 三级菜单，获取二级菜单
			resList = systemNavigationService.selectSecondNavList();
		}
		
		map.put("navigation", resOne.getData());
		map.put("navList", resList.getData());
		return new ModelAndView("rights/navigation.edit", map);
	}
	
	/**
	 * @Title: getNavList
	 * @Description: 导航菜单数据获取
	 * @param @param nav 菜单对象
	 * @param @return 设定文件
	 * @return ModelAndView 返回类型
	 * @throws
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity getNavList(Integer pageNum, Integer numPerPage) {		
		ResponseEntity res = systemNavigationService.getNavigationList(null, pageNum, numPerPage);
		return res;
	}

	/**
	 * @Title: updateNav
	 * @Description: 菜单编辑
	 * @param @param nav
	 * @param @return 设定文件
	 * @return ResponseEntity 返回类型
	 * @throws
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity updateNav(SystemNavigation nav) {
		ResponseEntity res = new ResponseEntity();

		res = systemNavigationService.update(nav);
		
		return res;
	}

	@RequestMapping(value = "/updateStatus", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity updateStatus(SystemNavigation nav) {
		PageEntity page = new PageEntity();
		ResponseEntity res = new ResponseEntity(page);

		Integer flag = (Integer)systemNavigationService.update(nav).getData();
		SystemNavigation resultNav = (SystemNavigation)systemNavigationService.selectOne(nav.getNavigationId()).getData();

		if (flag > 0) {
			res.setStatus("1");
			res.setMsg("修改成功");
			res.setData(resultNav);
		} else {
			res.setStatus("0");
			res.setMsg("修改失败");
			res.setData(resultNav);
		}
		return res;
	}

	/**
	 * @Title: deleteNav
	 * @Description: 删除导航菜单
	 * @param @param nav 菜单对象
	 * @param @return 设定文件
	 * @return ResponseEntity 返回类型
	 * @throws
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity deleteNav(SystemNavigation nav) {
		PageEntity page = new PageEntity();
		ResponseEntity res = new ResponseEntity(page);

		res = systemNavigationService.delete(nav);
		return res;
	}

	/**
	 * @Title: insertNav
	 * @Description: 添加导航菜单
	 * @param @param nav 导航菜单信息
	 * @param @return 设定文件
	 * @return ResponseEntity 返回类型
	 * @throws
	 */
	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity insertNav(SystemNavigation nav) {
		PageEntity page = new PageEntity();
		ResponseEntity res = new ResponseEntity(page);

		res = systemNavigationService.insert(nav);
		
		return res;
	}
	
	@RequestMapping(value = "/getNavigationData", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity getNavigationData(String navigationId) {
		ResponseEntity res = new ResponseEntity();
		
		if(StringUtils.isNotEmpty(navigationId)) {
			res = systemNavigationService.selectAllNavByParentNavId(navigationId);
		} else {
			res.setStatus(Const.SUCCESS);
			res.setMsg(Const.SUCCESS_MSG);
			res.setData(new ArrayList<SystemNavigation>());
		}

			
		return res;
	}
}
