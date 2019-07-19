package com.sof.marketing.system.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bluemobi.framework.common.contant.Const;
import com.bluemobi.framework.common.dto.ResponseEntity;
import com.bluemobi.framework.common.service.impl.BaseService;
import com.sof.marketing.system.dao.ISystemRoleFunctionDao;
import com.sof.marketing.system.domain.SystemRoleFunction;
import com.sof.marketing.system.service.ISystemRoleFunctionService;

@Service
@Transactional
public class SystemRoleFunctionService extends BaseService<SystemRoleFunction> implements ISystemRoleFunctionService {

	@Resource
	private ISystemRoleFunctionDao systemRoleFunctionDao;

	@Override
	public ResponseEntity getSystemRoleFunction(String role_id) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			List<SystemRoleFunction> systemRoleFunctions = systemRoleFunctionDao.getSystemRoleFunction(role_id);
			res = super.selectResultList(systemRoleFunctions);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity save(SystemRoleFunction systemRoleFunction) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			Integer count = systemRoleFunctionDao.save(systemRoleFunction);
			res = super.saveOrUpdateOrDelete(count);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity delete(SystemRoleFunction systemRoleFunction) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			Integer count = systemRoleFunctionDao.delete(systemRoleFunction);
			res = super.saveOrUpdateOrDelete(count);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

}
