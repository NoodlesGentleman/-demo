package com.sof.marketing.system.service;

import com.bluemobi.framework.common.dto.ResponseEntity;

public interface ISystemFunctionService {

	/**
	 * 根据导航编号获取系统功能点
	 * @param navigationId 导航编号
	 * @return
	 */
	ResponseEntity getSystemFunctionByNavigationId(String navigationId);
}
