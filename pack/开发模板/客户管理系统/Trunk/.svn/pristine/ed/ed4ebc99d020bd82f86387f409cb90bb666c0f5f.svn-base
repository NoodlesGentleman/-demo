package com.sof.marketing.system.dao;

import java.util.List;
import java.util.Map;

import com.sof.marketing.system.domain.SystemRoleNav;

public interface ISystemRoleNavDao {

	/**
	 * 插入关联表
	 * 
	 * @param sysRoleNav
	 * @return
	 */
	Integer insert(SystemRoleNav sysRoleNav);

	/**
	 * 根据ROLEID获取所有的角色列表
	 * 
	 * @param roleId
	 * @return
	 */
	List<SystemRoleNav> getRoleNavList(String roleId);

	/**
	 * 删除关联表
	 * 
	 * @param sysRoleNav
	 * @return
	 */
	Integer delete(SystemRoleNav sysRoleNav);

	/**
	 * 获取所有的角色表
	 * 
	 * @return
	 */
	List<SystemRoleNav> getAllNav(Map<String, Object> pagemap);
}
