package com.sof.marketing.system.service;

import com.bluemobi.framework.common.dto.ResponseEntity;
import com.sof.marketing.system.domain.SystemUserRole;

public interface ISystemUserRoleService {
	/**
	 * 增加用户角色关联信息
	 * 
	 * @param sysUserRole
	 *            用户角色关联信息
	 * @return 增加的记录数
	 */
	ResponseEntity insert(SystemUserRole sysUserRole);

	/**
	 * 删除用户角色关联信息
	 * 
	 * @param sysUserRole
	 *            用户角色关联信息
	 * @return 删除的记录数
	 */
	ResponseEntity delete(SystemUserRole sysUserRole);

	/**
	 * 更新用户角色关联信息
	 * 
	 * @param sysUserRole
	 *            用户角色关联信息
	 * @return 更新的记录数
	 */
	ResponseEntity update(SystemUserRole sysUserRole);

	/**
	 * 根据条件查询用户角色关联信息
	 * 
	 * @param sysUserRole
	 *            自定义查询条件实体
	 * @return 用户角色关联信息记录
	 */
	ResponseEntity getSystemUserRoleList(SystemUserRole sysUserRole, Integer currentPage, Integer pageSize);

	/**
	 * 根据编号获取唯一的记录
	 * 
	 * @param primeKey
	 *            编号
	 * @return 返回唯一的记录
	 */
	ResponseEntity getSingle(String primeKey);
	
	/**
	 * 根据用户编号获取其权限
	 * @param userId 用户编号
	 * @return 查询到的记录数
	 */
	ResponseEntity getByUserId(String userId);
}
