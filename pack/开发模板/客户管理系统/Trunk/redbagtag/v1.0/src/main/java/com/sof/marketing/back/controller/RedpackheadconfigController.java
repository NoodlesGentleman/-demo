package com.sof.marketing.back.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.bluemobi.framework.common.dto.ResponseEntity;
import com.sof.marketing.dto.RedPackConfigDto;
import com.sof.marketing.model.Redpackheadconfig;
import com.sof.marketing.service.IRedpackheadconfigService;
import com.sof.marketing.system.util.Constant;
import com.sof.marketing.system.web.AbstractController;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Controller
@RequestMapping("/redpackheadconfig")
public class RedpackheadconfigController extends AbstractController {
	
	@Resource
	private IRedpackheadconfigService redpackheadconfigServiceImpl;
	
	@RequestMapping(value = "/listView", method = RequestMethod.GET)
	@ApiOperation(value = "列表页面", httpMethod = "GET", response = ModelAndView.class)
	public ModelAndView ParamsList(HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> map = new HashMap<String, Object>();
		initIndex(request, response, map);
		return new ModelAndView("back/redpackheadconfig/list", map);
	}
	
	@RequestMapping(value = "/infoView", method = RequestMethod.GET)
	@ApiOperation(value = "详情页面", httpMethod = "GET", response = ModelAndView.class)
	public ModelAndView view(
			@ApiParam(value = "编号") @RequestParam(required = true) String jt,
			HttpServletRequest request,
			HttpServletResponse response) {
		Map<String, Object> map = new HashMap<String, Object>();
		initIndex(request, response, map);
		return new ModelAndView("back/redpackheadconfig/" + jt + "info", map);
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
	public Map<String, Object> list(@ApiParam(value = "对象查询条件") Redpackheadconfig record,
			@ApiParam(value = "当前页数") @RequestParam(required = false) Integer pageNum,
			@ApiParam(value = "每页个数") @RequestParam(required = false) Integer numPerPage,
			@ApiParam(value = "发送任务开始天数") @RequestParam(required = false) String startDate,
			@ApiParam(value = "发送任务结束天数") @RequestParam(required = false) String endDate) {
		Map<String, Object> mapResult = new HashMap<String, Object>();
		Map<String, Object> pagemap = new HashMap<String, Object>();
		List<Redpackheadconfig> list = new ArrayList<Redpackheadconfig>();
		pagemap.put("startDate", startDate);
		pagemap.put("endDate", endDate);
		try {
			if (pageNum != null && numPerPage != null) {
				// 设置分页信息
				pagemap.put("offset", (pageNum - 1) * numPerPage);
				pagemap.put("limit", numPerPage);
				pagemap.put("redpackheadconfig", record);
			} else {
				pagemap.put("redpackheadconfig", record);
			}
			list = redpackheadconfigServiceImpl.getListByCondition(pagemap);
			// 记录数
			long total = redpackheadconfigServiceImpl.getCountByCondition(pagemap);
			// 数据集
			mapResult.put("data", list);
			mapResult.put("recordsTotal", total);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return mapResult;
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	@ResponseBody
	@ApiOperation(value = "添加", httpMethod = "POST", response = ResponseEntity.class)
	public ResponseEntity add(HttpServletRequest req,
			@ApiParam(name = "添加对象") @RequestBody RedPackConfigDto record) {
		ResponseEntity resEntity = new ResponseEntity();
		try {
			Integer count = redpackheadconfigServiceImpl.insert(record);
			if (count > 0) {
				resEntity.setStatus(Constant.STATUS_SUCCESS);
				resEntity.setMsg(Constant.SAVE_MSG01);
				resEntity.setData(record);
			} else {
				resEntity.setStatus(Constant.STATUS_FAIL);
				resEntity.setMsg(Constant.SAVE_MSG02);
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			resEntity.setStatus(Constant.STATUS_FAIL);
			resEntity.setError(Constant.SYSTEM_ERROR);
		}
		return resEntity;
	}
}
