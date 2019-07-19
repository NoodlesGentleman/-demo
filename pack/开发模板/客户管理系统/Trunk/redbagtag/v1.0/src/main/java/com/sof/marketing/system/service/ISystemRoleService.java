package com.sof.marketing.system.service;

import com.bluemobi.framework.common.dto.ResponseEntity;
import com.sof.marketing.system.domain.SystemRole;

public interface ISystemRoleService {

	/**
	 * 根据条件查询出权限
	 * 
	 * @param sysUserRoles
	 * @return
	 */
	ResponseEntity getSysRolesList(SystemRole sysUserRoles, Integer currentPage, Integer pageSize);

	/**
	 * 根据ID获取权限
	 * 
	 * @param primeKey
	 * @return
	 */
	ResponseEntity findSysRolesById(String primeKey);

	/**
	 * 插入权限
	 * 
	 * @param sysrole
	 * @return
	 */
	ResponseEntity insert(SystemRole sysrole);

	/**
	 * 删除权限
	 * 
	 * @param sysrole
	 * @return
	 */
	ResponseEntity delete(SystemRole sysrole);

	/**
	 * 更新权限
	 * 
	 * @param sysrole
	 * @return
	 */
	ResponseEntity update(SystemRole sysrole);
}
