package com.sof.marketing.system.service;

import com.bluemobi.framework.common.dto.ResponseEntity;
import com.sof.marketing.system.domain.SystemVersion;

public interface ISystemVersionService {

	/**
	 * 根据编号获取版本信息
	 * @param version_id 版本编号（系统生成的编号）
	 * @return 返回值
	 */
	ResponseEntity getVersion(String version_id);

	/**
	 * 根据查询条件获取版本信息的集合
	 * @param version 查询条件
	 * @param currentPage 当前页
	 * @param pageSize 显示的条数（一页）
	 * @return 返回值
	 */
	ResponseEntity getVersion(SystemVersion version, Integer currentPage,
			Integer pageSize);

	/**
	 * 获取APP版本信息
	 * @param type 手机类型
	 * @param versionId 本地手机APP版本号
	 * @return 返回值
	 */
	ResponseEntity getAppVersion(String type, String versionId);

	/**
	 * 插入版本信息
	 * @param version 查询条件
	 * @param request 上传文件的请求
	 * @return 返回值
	 */
	ResponseEntity insert(SystemVersion version);

	/**
	 * 更新版本信息
	 * @param version 查询条件
	 * @param request 上传文件的请求
	 * @return 返回值
	 */
	ResponseEntity update(SystemVersion version);

	/**
	 * 删除版本信息
	 * @param version 查询条件
	 * @return 返回值
	 */
	ResponseEntity delete(SystemVersion version);
}
