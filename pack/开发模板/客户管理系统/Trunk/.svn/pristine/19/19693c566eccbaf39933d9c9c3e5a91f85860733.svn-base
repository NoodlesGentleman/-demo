package com.sof.marketing.system.service;

import com.bluemobi.framework.common.dto.ResponseEntity;
import com.sof.marketing.system.domain.SystemNavigation;

public interface ISystemNavigationService {

	/**
	 * 插入导航菜单
	 * @param nav 导航信息
	 * @return 插入的记录数
	 */
	ResponseEntity insert(SystemNavigation nav);
	
	/**
	 * 更新导航菜单
	 * @param nav 导航信息
	 * @return 更改的记录数
	 */
	ResponseEntity update(SystemNavigation nav);

	/**
	 * 删除导航菜单
	 * @param nav 导航信息
	 * @return 删除的记录数
	 */
	ResponseEntity delete(SystemNavigation nav);
	
	/**
	 * 获取单条导航菜单信息
	 * @param nav 导航信息
	 * @return 导航菜单信息
	 */
	ResponseEntity selectOne(String navId);
	
	/**
	 * 获取导航菜单 （权限用 左侧导航）
	 * @param nav 导航信息
	 * @param currentPage 当前页（从1开始）
	 * @param pageSize 页数
	 * @return 导航信息
	 */
	ResponseEntity getNavigationList(SystemNavigation nav, Integer currentPage, Integer pageSize);

	/**
	 * 获取所有的子集导航菜单
	 * @param parentNavId 父级导航菜单编号
	 * @return 导航信息
	 */
	ResponseEntity selectAllNavByParentNavId(String parentNavId);
	
	/**
	 * 获取所有的二级节点的值
	 * @return
	 */
	ResponseEntity selectSecondNavList();

	/**
	 * 获取父级导航菜单信息
	 * @param nav 导航信息
	 * @return 父级导航菜单信息
	 */
	ResponseEntity selectParentNav(SystemNavigation nav);
}
