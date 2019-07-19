package com.sof.marketing.system.dao;

import java.util.List;
import java.util.Map;

import com.sof.marketing.system.domain.SystemNavigation;

public interface ISystemNavigationDao {
	
	/**
	 * 插入导航菜单
	 * @param nav 导航信息
	 * @return 插入的记录数
	 */
	Integer insert(SystemNavigation nav);
	
	/**
	 * 更新导航菜单
	 * @param nav 导航信息
	 * @return 更改的记录数
	 */
	Integer update(SystemNavigation nav);

	/**
	 * 删除导航菜单
	 * @param nav 导航信息
	 * @return 删除的记录数
	 */
	Integer delete(SystemNavigation nav);
	
	/**
	 * 获取导航菜单 （权限用 左侧导航）
	 * @param nav 导航信息
	 * @param pagemap 分页信息
	 * @return 导航信息
	 */
	List<SystemNavigation> getNavigationList(SystemNavigation nav, Map<String, Object> pagemap);

	/**
	 * 获取当前所有的导航的条数
	 * @param nav 导航信息
	 * @return 导航的条数
	 */
	Integer getNavigationListCount(SystemNavigation nav);

	/**
	 * 获取所有的子集导航菜单
	 * @param parentNavId 父级导航菜单编号
	 * @return 导航信息
	 */
	List<SystemNavigation> selectAllNavByParentNavId(String parentNavId);

	/**
	 * 获取单条导航菜单信息
	 * @param nav 导航信息
	 * @return 导航菜单信息
	 */
	SystemNavigation selectOne(String navId);

	/**
	 * 获取父级导航菜单信息
	 * @param nav 导航信息
	 * @return 父级导航菜单信息
	 */
	SystemNavigation selectParentNav(SystemNavigation nav);
}
