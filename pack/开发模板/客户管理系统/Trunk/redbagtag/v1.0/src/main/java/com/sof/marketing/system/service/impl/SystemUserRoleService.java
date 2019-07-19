package com.sof.marketing.system.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bluemobi.framework.common.contant.Const;
import com.bluemobi.framework.common.dto.ResponseEntity;
import com.bluemobi.framework.common.service.impl.BaseService;
import com.sof.marketing.system.dao.ISystemUserRoleDao;
import com.sof.marketing.system.domain.SystemUserRole;
import com.sof.marketing.system.service.ISystemUserRoleService;

@Service
@Transactional
public class SystemUserRoleService extends BaseService<SystemUserRole> implements ISystemUserRoleService {

	@Resource
	private ISystemUserRoleDao sysUserRoleDao;

	@Override
	public ResponseEntity insert(SystemUserRole sysUserRole) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			Integer flag = sysUserRoleDao.insert(sysUserRole);
			res = super.saveOrUpdateOrDelete(flag);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity delete(SystemUserRole sysUserRole) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			Integer flag = sysUserRoleDao.delete(sysUserRole);
			res = super.saveOrUpdateOrDelete(flag);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity update(SystemUserRole sysUserRole) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			Integer flag = sysUserRoleDao.update(sysUserRole);
			res = super.saveOrUpdateOrDelete(flag);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity getSystemUserRoleList(SystemUserRole sysUserRole, Integer currentPage, Integer pageSize) {
		ResponseEntity res = new ResponseEntity();
		Map<String, Object> pagemap = new HashMap<String, Object>();
		pagemap.put("currentPage", currentPage);
		pagemap.put("pageSize", pageSize);
		
		try{
			List<SystemUserRole> list = sysUserRoleDao.getSystemUserRoleList(sysUserRole, pagemap);
			Integer totalCount = sysUserRoleDao.getSystemUserRoleListCount(sysUserRole);
			
			res = super.selectResultList(list, currentPage, pageSize, totalCount);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity getSingle(String primeKey) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			SystemUserRole sysUserRole = sysUserRoleDao.selectSingle(primeKey);
			res = super.selectResultOne(sysUserRole);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity getByUserId(String userId) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			Integer count = sysUserRoleDao.selectByUserId(userId);
			if(count != null) {
				res.setStatus(Const.SUCCESS);
				res.setMsg(Const.SUCCESS_MSG);
				res.setData(count);
			} else {
				res.setStatus(Const.FAIL_GET_DATE);
				res.setMsg(Const.FAIL_GET_DATE_MSG);
			}
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

}
