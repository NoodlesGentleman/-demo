package com.sof.marketing.system.dao;

import java.util.List;
import java.util.Map;

import com.sof.marketing.system.domain.SystemRole;

public interface ISystemRoleDao {

	/**
	 * 根据条件查询出权限
	 * 
	 * @param sysUserRoles
	 * @return
	 */
	List<SystemRole> getSysRolesList(SystemRole sysUserRoles, Map<String, Object> pagemap);
	
	/**
	 * 查询出符合条件的权限个数
	 * 
	 * @param sysUserRoles
	 * @return
	 */
	Integer getSysRolesListCount(SystemRole sysUserRoles);

	/**
	 * 根据ID获取权限
	 * 
	 * @param primeKey
	 * @return
	 */
	SystemRole findSysRolesById(String primeKey);

	/**
	 * 插入权限
	 * 
	 * @param sysrole
	 * @return
	 */
	Integer insert(SystemRole sysrole);

	/**
	 * 删除权限
	 * 
	 * @param sysrole
	 * @return
	 */
	Integer delete(SystemRole sysrole);

	/**
	 * 更新权限
	 * 
	 * @param sysrole
	 * @return
	 */
	Integer update(SystemRole sysrole);

	/**
	 * 查找最大编号并返回生成的编号
	 * 
	 * @return Integer 返回生成的编号
	 * @author 
	 * */
	Integer selectMaxNo();
}
