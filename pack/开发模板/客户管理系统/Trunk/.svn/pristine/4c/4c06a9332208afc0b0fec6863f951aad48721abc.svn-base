package com.sof.marketing.system.web;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import springfox.documentation.annotations.ApiIgnore;

import com.bluemobi.framework.common.dto.ResponseEntity;
import com.sof.marketing.system.service.ISystemVersionService;

/**
 * @ClassName: AppVersionController
 * @Description: TODO(版本信息)
 * @author A18ccms a18ccms_gmail_com
 * @date 2015年11月11日 上午11:50:52
 */
@Controller
@RequestMapping("/app/version")
@ApiIgnore
public class AppVersionController {
	@Resource
	private ISystemVersionService systemVersionService;

	private Logger logger = LoggerFactory.getLogger(AppVersionController.class);

	/**
	 * @Title: getVersion
	 * @Description: TODO(获取最新的版本信息)
	 * @param @return 设定文件
	 * @return Map<String,Object> 返回类型
	 * @throws
	 */
	@RequestMapping(value = "/getVersion", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity getVersion(String type, String versionId) {
		logger.info("/****** path:getVersion method:getVersion start  ******/");
		ResponseEntity entity = new ResponseEntity();

		entity = systemVersionService.getAppVersion(type, versionId);

		return entity;
	}
}
