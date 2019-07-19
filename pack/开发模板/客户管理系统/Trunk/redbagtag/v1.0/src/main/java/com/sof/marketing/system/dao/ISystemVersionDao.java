package com.sof.marketing.system.dao;

import java.util.List;
import java.util.Map;

import com.sof.marketing.system.domain.SystemVersion;

public interface ISystemVersionDao {

	/**
	 * 插入版本信息
	 * 
	 * @param version
	 *            查询条件
	 * @return 是否成功（1为成功，0为失败）
	 */
	Integer insert(SystemVersion version);

	/**
	 * 更新版本信息
	 * 
	 * @param version
	 *            查询条件
	 * @return 是否成功（1为成功，0为失败）
	 */
	Integer update(SystemVersion version);

	/**
	 * 删除版本信息
	 * 
	 * @param version
	 *            查询条件
	 * @return 是否成功（1为成功，0为失败）
	 */
	Integer delete(SystemVersion version);
	
	/**
	 * 根据编号获取版本信息
	 * 
	 * @param version_id
	 *            版本编号（系统生成的编号）
	 * @return 返回特定的版本信息
	 */
	SystemVersion getVersion(String version_id);

	/**
	 * 根据查询条件获取版本信息的集合
	 * 
	 * @param version
	 *            查询条件
	 * @return 返回符合条件的版本信息的集合
	 */
	List<SystemVersion> getVersionList(SystemVersion version, Map<String, Object> pagemap);
	
	/**
	 * 根据查询条件获取版本信息的数量
	 * @param version
	 * @return
	 */
	Integer getVersionListCount(SystemVersion version);

	/**
	 * 根据时间来查找符合条件的版本信息的集合
	 * 
	 * @param startTime
	 *            开始时间
	 * @param endTime
	 *            结束时间
	 * @param type
	 *            手机类型
	 * @param versionId
	 *            本地版本号
	 * @return 返回符合条件的版本信息的集合
	 */
	List<SystemVersion> getVersionByParam(String startTime, String endTime,
			String type, String versionId, Map<String, Object> pagemap);
	
	/**
	 * 根据时间来查找符合条件的版本信息的集合
	 * 
	 * @param startTime
	 *            开始时间
	 * @param endTime
	 *            结束时间
	 * @param type
	 *            手机类型
	 * @param versionId
	 *            本地版本号
	 * @return 返回符合条件的版本信息的集合
	 */
	List<SystemVersion> getVersionByParamCount(String startTime, String endTime,
			String type, String versionId);
}
