package com.sof.marketing.system.service;

import com.bluemobi.framework.common.dto.ResponseEntity;
import com.sof.marketing.system.domain.SystemUser;

public interface ISystemUserService {

	/**
	 * 根据不同的参数查询用户
	 * 
	 * @param systemUser
	 * @param pagemap
	 * @return
	 */
	ResponseEntity getSystemUserList(SystemUser systemUser, Integer currentPage, Integer pageSize);

	/**
	 * 根据不同的参数查询唯一用户
	 * 
	 * @param systemUser
	 * @return
	 */
	ResponseEntity getSystemUserOne(SystemUser systemUser);
	
	/**
	 * 删除用户
	 * @param user_id
	 * @return
	 */
	ResponseEntity delete(String user_id);
	
	/**
	 * 更新用户
	 * @param user
	 * @return
	 */
	ResponseEntity update(SystemUser user);
	
	/**
	 * 保存用户
	 * @param user
	 * @return
	 */
	ResponseEntity save(SystemUser user);
}
