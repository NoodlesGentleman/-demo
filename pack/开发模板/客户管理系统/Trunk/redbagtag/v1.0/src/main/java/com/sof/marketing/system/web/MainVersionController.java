package com.sof.marketing.system.web;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.bluemobi.framework.common.dto.ResponseEntity;
import com.sof.marketing.system.domain.SystemVersion;
import com.sof.marketing.system.service.ISystemVersionService;
import com.sof.marketing.system.util.ShareData;

import springfox.documentation.annotations.ApiIgnore;

@Controller
@RequestMapping(value = "/mainVersion")
@ApiIgnore
public class MainVersionController extends AbstractController {

	private final Logger logger = LoggerFactory
			.getLogger(MainVersionController.class);

	@Autowired
	private ISystemVersionService systemVersionService;

	/**
	 * @Title: listView
	 * @param @param request
	 * @param @param response
	 * @param @return 设定文件
	 * @return ModelAndView 返回类型
	 * @throws
	 */
	@RequestMapping(value = "/versionListView", method = RequestMethod.GET)
	public ModelAndView listView(HttpServletRequest request,
			HttpServletResponse response) {
		logger.debug("appraise listview in");
		Map<String, Object> map = new HashMap<String, Object>();

		initIndex(request, response, map);

		logger.debug("appraise listview out");
		return new ModelAndView("version/versionList", map);
	}

	/**
	 * @Title: versionEditView
	 * @param @param request
	 * @param @param response
	 * @param @return 设定文件
	 * @return ModelAndView 返回类型
	 * @throws
	 */
	@RequestMapping(value = "/versionEditView", method = RequestMethod.GET)
	public ModelAndView versionEditView(HttpServletRequest request,
			HttpServletResponse response, String version_id) {
		logger.debug("appraise listview in");
		Map<String, Object> map = new HashMap<String, Object>();

		ResponseEntity res = systemVersionService.getVersion(version_id);
		initIndex(request, response, map);

		map.put("data", res.getData());
		
		logger.debug("appraise listview out");
		return new ModelAndView("version/versionEdit", map);
	}

	/**
	 * @Title: versionAddView
	 * @param @param request
	 * @param @param response
	 * @param @return 设定文件
	 * @return ModelAndView 返回类型
	 * @throws
	 */
	@RequestMapping(value = "/versionAddView", method = RequestMethod.GET)
	public ModelAndView versionAddView(HttpServletRequest request,
			HttpServletResponse response) {
		logger.debug("appraise listview in");
		Map<String, Object> map = new HashMap<String, Object>();

		initIndex(request, response, map);

		logger.debug("appraise listview out");
		return new ModelAndView("version/versionAdd", map);
	}

	/**
	 * @Title: list
	 * @param @param params
	 * @param @return 设定文件
	 * @return Map<String,Object> 返回类型
	 * @throws
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity list(Integer pageSize, Integer currentPage) {
		// 参数初始化
		SystemVersion version = new SystemVersion();

		// 获取返回值
		ResponseEntity res = systemVersionService.getVersion(version, currentPage, pageSize);

		return res;
	}

	/**
	 * @Title: update
	 * @param @param tbVersion
	 * @param @return 设定文件
	 * @return Map<String,Object> 返回类型
	 * @throws
	 */
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity update(SystemVersion version) {
		// 参数初始化
		ResponseEntity entity = systemVersionService.update(version);

		return entity;
	}

	/**
	 * @Title: insert
	 * @param @param tbVersion
	 * @param @return 设定文件
	 * @return Map<String,Object> 返回类型
	 * @throws
	 */
	@RequestMapping(value = "/insert", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity insert(SystemVersion version, HttpServletRequest request) {
		ShareData shareData = (ShareData)request.getSession(false).getAttribute("shareData");
		// 参数初始化
		
		version.setVersion_id(UUID.randomUUID().toString());
		version.setCreate_by(shareData.getUser_id());
		version.setCreate_time(Calendar.getInstance().getTime());
		
		ResponseEntity entity = systemVersionService.insert(version);

		return entity;
	}

	/**
	 * @Title: delete
	 * @param @param version_id
	 * @param @return 设定文件
	 * @return Map<String,Object> 返回类型
	 * @throws
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity delete(String version_id) {
		// 参数初始化
		ResponseEntity entity = new ResponseEntity();
		SystemVersion version = new SystemVersion();
		version.setVersion_id(version_id);
		
		entity = systemVersionService.delete(version);

		return entity;
	}
}
