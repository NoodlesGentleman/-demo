package com.sof.marketing.system.dao;

import java.util.List;
import java.util.Map;

import com.sof.marketing.system.domain.SystemUser;

public interface ISystemUserDao {

	/**
	 * 根据不同的参数查询用户
	 * 
	 * @param systemUser
	 * @param pagemap
	 *            分页参数
	 * @return
	 */
	List<SystemUser> getSystemUserList(SystemUser systemUser, Map<String, Object> pagemap);

	/**
	 * 根据不同的参数查询唯一用户
	 * 
	 * @param systemUser
	 * @return
	 */
	SystemUser getSystemUserOne(SystemUser systemUser);

	/**
	 * 查询用户的总数
	 * 
	 * @param systemUser
	 * @return
	 */
	Integer getSystemUserListCount(SystemUser systemUser);

	/**
	 * 根据主键获取一个用户信息
	 * @param user_id 主键
	 * @return
	 */
	SystemUser getOne(String user_id);

	/**
	 * 插入用户信息
	 * @param systemUser 用户信息
	 * @return
	 */
	Integer insert(SystemUser systemUser);

	/**
	 * 更新用户信息
	 * @param systemUser 用户信息
	 * @return
	 */
	Integer update(SystemUser systemUser);
	
	/**
	 * 删除用户信息
	 * @param user_id 主键
	 * @return
	 */
	Integer delete(String user_id);

}
