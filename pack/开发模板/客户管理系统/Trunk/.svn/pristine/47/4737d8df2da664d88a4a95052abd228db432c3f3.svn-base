package com.sof.marketing.back.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sof.marketing.model.RedBagObj;
import com.sof.marketing.service.IRedBagObjService;
import com.sof.marketing.system.web.AbstractController;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Controller
@RequestMapping("/redbagobj")
public class RedBagObjController extends AbstractController {

	@Resource
	private IRedBagObjService redBagObjServiceImpl;
	
	@RequestMapping(value = "/listView", method = RequestMethod.GET)
	@ApiOperation(value = "列表页面", httpMethod = "GET", response = ModelAndView.class)
	public ModelAndView ParamsList(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> map = new HashMap<String, Object>();
		initIndex(request, response, map);
		return new ModelAndView("back/redbagobj/list", map);
	}
	
	
	/**
	 * 获取展示数据
	 * 
	 * @param studentRoles
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	@ApiOperation(value = "查询列表数据", httpMethod = "POST", response = Map.class)
	public Map<String, Object> list(@ApiParam(value = "对象查询条件") RedBagObj record,
			@ApiParam(value = "当前页数") @RequestParam(required = false) Integer pageNum,
			@ApiParam(value = "每页个数") @RequestParam(required = false) Integer numPerPage) {
		Map<String, Object> mapResult = new HashMap<String, Object>();
		Map<String, Object> pagemap = new HashMap<String, Object>();
		List<RedBagObj> list = new ArrayList<RedBagObj>();
		try {
			if (pageNum != null && numPerPage != null) {
				// 设置分页信息
				pagemap.put("offset", (pageNum - 1) * numPerPage);
				pagemap.put("limit", numPerPage);
				pagemap.put("redBagObj", record);
			} else {
				pagemap.put("redBagObj", record);
			}
			list = redBagObjServiceImpl.getListByCondition(pagemap);
			// 记录数
			long total = redBagObjServiceImpl.getCountByCondition(record);
			// 数据集
			mapResult.put("data", list);
			mapResult.put("recordsTotal", total);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return mapResult;
	}
}
