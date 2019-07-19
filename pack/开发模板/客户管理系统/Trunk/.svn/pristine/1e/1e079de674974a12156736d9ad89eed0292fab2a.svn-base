package com.sof.marketing.system.dao;

import java.util.List;
import java.util.Map;

import com.sof.marketing.system.domain.SystemUserRole;

public interface ISystemUserRoleDao {

	/**
	 * 增加用户角色关联信息
	 * 
	 * @param sysUserRole
	 *            用户角色关联信息
	 * @return 增加的记录数
	 */
	Integer insert(SystemUserRole sysUserRole);

	/**
	 * 删除用户角色关联信息
	 * 
	 * @param sysUserRole
	 *            用户角色关联信息
	 * @return 删除的记录数
	 */
	Integer delete(SystemUserRole sysUserRole);

	/**
	 * 更新用户角色关联信息
	 * 
	 * @param sysUserRole
	 *            用户角色关联信息
	 * @return 更新的记录数
	 */
	Integer update(SystemUserRole sysUserRole);

	/**
	 * 根据条件查询用户角色关联信息
	 * 
	 * @param sysUserRole
	 *            自定义查询条件实体
	 * @return 用户角色关联信息记录
	 */
	List<SystemUserRole> getSystemUserRoleList(SystemUserRole sysUserRole, Map<String, Object> pagemap);

	/**
	 * 根据条件查询用户角色关联信息的总记录数
	 * 
	 * @param sysUserRole
	 *            自定义查询条件实体
	 * @return 所有符合条件的记录的总数
	 */
	Integer getSystemUserRoleListCount(SystemUserRole sysUserRole);

	/**
	 * 根据编号获取唯一的记录
	 * 
	 * @param primeKey
	 *            编号
	 * @return 返回唯一的记录
	 */
	SystemUserRole selectSingle(String primeKey);
	
	/**
	 * 根据用户编号获取其权限
	 * @param userId 用户编号
	 * @return 查询到的记录数
	 */
	Integer selectByUserId(String userId);

}
