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
import com.sof.marketing.system.dao.ISystemRoleDao;
import com.sof.marketing.system.domain.SystemRole;
import com.sof.marketing.system.service.ISystemRoleService;

@Service
@Transactional
public class SystemRoleService extends BaseService<SystemRole> implements ISystemRoleService {

	@Resource
	private ISystemRoleDao roleDao;

	@Override
	public ResponseEntity getSysRolesList(SystemRole sysUserRoles, Integer currentPage, Integer pageSize) {
		ResponseEntity res = new ResponseEntity();
		
		Map<String, Object> pagemap = new HashMap<String, Object>();
		pagemap.put("currentPage", currentPage);
		pagemap.put("pageSize", pageSize);
		
		try{
			List<SystemRole> list = roleDao.getSysRolesList(sysUserRoles, pagemap);
			Integer totalCount = roleDao.getSysRolesListCount(sysUserRoles);
			
			res = super.selectResultList(list, currentPage, pageSize, totalCount);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity findSysRolesById(String primeKey) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			SystemRole sysRole = roleDao.findSysRolesById(primeKey);
			res = super.selectResultOne(sysRole);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity insert(SystemRole sysrole) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			Integer flag = roleDao.insert(sysrole);
			res = super.saveOrUpdateOrDelete(flag);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity delete(SystemRole sysrole) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			Integer flag = roleDao.delete(sysrole);
			res = super.saveOrUpdateOrDelete(flag);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity update(SystemRole sysrole) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			Integer flag = roleDao.update(sysrole);
			res = super.saveOrUpdateOrDelete(flag);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

}
