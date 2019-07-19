package com.sof.marketing.system.service;

import com.bluemobi.framework.common.dto.ResponseEntity;
import com.sof.marketing.system.domain.SystemRoleFunction;

public interface ISystemRoleFunctionService {
	
	/**
	 * 根据用户编号获取用户功能关联信息
	 * @param role_id 用户编号
	 * @return
	 */
	ResponseEntity getSystemRoleFunction(String role_id);
	
	/**
	 * 保存用户功能关联信息
	 * @param SystemRoleFunction 用户功能关联信息
	 * @return
	 */
	ResponseEntity save(SystemRoleFunction systemRoleFunction);
	
	/**
	 * 删除用户功能关联信息
	 * @param SystemRoleFunction 用户功能关联信息
	 * @return
	 */
	ResponseEntity delete(SystemRoleFunction systemRoleFunction);
}
