package com.sof.marketing.system.service;

import com.bluemobi.framework.common.dto.ResponseEntity;
import com.sof.marketing.system.domain.SystemRoleNav;

public interface ISystemRoleNavService {

	/**
	 * 插入关联表
	 * 
	 * @param sysRoleNav
	 * @return
	 */
	ResponseEntity insert(SystemRoleNav sysRoleNav);

	/**
	 * 根据ROLEID获取所有的角色列表
	 * 
	 * @param roleId
	 * @return
	 */
	ResponseEntity getRoleNavList(String roleId);

	/**
	 * 删除关联表
	 * 
	 * @param sysRoleNav
	 * @return
	 */
	ResponseEntity delete(SystemRoleNav sysRoleNav);

	/**
	 * 获取所有的角色表
	 * 
	 * @return
	 */
	ResponseEntity getAllNav(Integer currentPage, Integer pageSize);
	
	/**
	 * 是否需要保存父亲节点
	 * @param navId 节点编号
	 * @param roleId 角色编号
	 */
	void saveParentNode(String navId, String roleId);
}
