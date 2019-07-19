package com.sof.marketing.system.dao;

import java.util.List;

import com.sof.marketing.system.domain.SystemFunction;

public interface ISystemFunctionDao {

	/**
	 * 根据其所有的功能点
	 * @param navigationId 导航编号
	 * @return
	 */
	List<SystemFunction> getSystemFunctionByNavigationId(String navigationId);
}
