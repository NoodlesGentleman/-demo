package com.sof.marketing.system.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bluemobi.framework.common.contant.Const;
import com.bluemobi.framework.common.dto.ResponseEntity;
import com.bluemobi.framework.common.service.impl.BaseService;
import com.sof.marketing.system.dao.ISystemVersionDao;
import com.sof.marketing.system.domain.SystemVersion;
import com.sof.marketing.system.service.ISystemVersionService;
@Service
@Transactional
public class SystemVersionService extends BaseService<SystemVersion> implements ISystemVersionService {

	@Resource
	private ISystemVersionDao systemVersionDao;
	private final String MIN_TIME = "1800-01-01 00:00:00";

	@Override
	public ResponseEntity getVersion(String version_id) {
		ResponseEntity res = new ResponseEntity();
		try {
			// 获取数据，拼接并返回
			SystemVersion version = systemVersionDao.getVersion(version_id);
			res = super.selectResultOne(version);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}

		return res;
	}

	@Override
	public ResponseEntity getVersion(SystemVersion version, Integer currentPage, Integer pageSize) {
		ResponseEntity res = new ResponseEntity();
		Map<String, Object> pagemap = new HashMap<String, Object>();
		pagemap.put("currentPage", currentPage);
		pagemap.put("pageSize", pageSize);
		
		try{
			List<SystemVersion> versionList = systemVersionDao.getVersionList(version, pagemap);
			Integer totalCount = systemVersionDao.getVersionListCount(version);
			
			res = super.selectResultList(versionList, currentPage, pageSize, totalCount);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}

		return res;
	}

	@Override
	public ResponseEntity getAppVersion(String type, String versionId) {
		ResponseEntity res = new ResponseEntity();
//		SystemVersion newVersion = new SystemVersion();
//		Map<String, Object> map = new HashMap<String, Object>();

		String endTime = DateFormatUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss");

		// 防止安卓传空
		if (type.isEmpty()) {
			type = "ANDROID";
		}

		// 获取所有的版本信息
		List<SystemVersion> versionList = systemVersionDao.getVersionByParam(MIN_TIME, endTime, type, versionId, null);
		
		try {
			res = super.selectResultList(versionList);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}

//		if (versionList == null || versionList.size() == 0) {
//			map.put("status", 0);
//		} else {
//			Integer flagAndroid = 0;
//			Integer flagIos = 0;
//			newVersion = versionList.get(0);
//			// 循环判断其中多版本是否有强制更新的要求
//			for (SystemVersion version : versionList) {
//				if (type.equals("ANDROID")) {
//					if (version.getAndroid_is_forced() == 1) {
//						// 安卓有需要强制更新
//						newVersion.setAndroid_is_forced(1);
//						map.put("status", 1);
//						map.put("data", newVersion);
//						flagAndroid = 1;
//						break;
//					}
//				}
//				if (type.equals("IOS")) {
//					if (version.getIos_is_forced() == 1) {
//						// 苹果有需要强制更新
//						newVersion.setIos_is_forced(1);
//						map.put("status", 1);
//						map.put("data", newVersion);
//						flagIos = 1;
//						break;
//					}
//				}
//			}
//
//			// 安卓没有强制更新
//			if (flagAndroid == 0) {
//				newVersion.setAndroid_is_forced(0);
//				map.put("status", 1);
//				map.put("data", newVersion);
//			}
//
//			// IOS没有强制更新
//			if (flagIos == 0) {
//				newVersion.setIos_is_forced(0);
//				map.put("status", 1);
//				map.put("data", newVersion);
//			}
//		}

		return res;
	}

	@Override
	public ResponseEntity insert(SystemVersion version) {
		ResponseEntity res = new ResponseEntity();
		try {
			Integer count = systemVersionDao.insert(version);
			res = super.saveOrUpdateOrDelete(count);
		} catch (Exception re) {
			re.getMessage();
			// 报错
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}

		return res;
	}

	@Override
	public ResponseEntity update(SystemVersion version) {
		ResponseEntity res = new ResponseEntity();
		try {
			Integer count = systemVersionDao.update(version);
			res = super.saveOrUpdateOrDelete(count);
		} catch (Exception re) {
			re.getMessage();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		return res;
	}

	@Override
	public ResponseEntity delete(SystemVersion version) {
		ResponseEntity res = new ResponseEntity();
		try{
			Integer count = systemVersionDao.delete(version);
			res = super.saveOrUpdateOrDelete(count);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}

		return res;
	}
}
