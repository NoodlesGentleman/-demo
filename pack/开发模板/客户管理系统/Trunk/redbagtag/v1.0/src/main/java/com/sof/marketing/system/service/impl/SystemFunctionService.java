package com.sof.marketing.system.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bluemobi.framework.common.contant.Const;
import com.bluemobi.framework.common.dto.ResponseEntity;
import com.bluemobi.framework.common.service.impl.BaseService;
import com.sof.marketing.system.dao.ISystemFunctionDao;
import com.sof.marketing.system.domain.SystemFunction;
import com.sof.marketing.system.service.ISystemFunctionService;

@Service
@Transactional
public class SystemFunctionService extends BaseService<SystemFunction> implements ISystemFunctionService {

	@Resource
	private ISystemFunctionDao systemFunctionDao;
	
	@Override
	public ResponseEntity getSystemFunctionByNavigationId(String navigationId) {
		ResponseEntity res = new ResponseEntity();
		try{
			List<SystemFunction> functions = systemFunctionDao.getSystemFunctionByNavigationId(navigationId);
			// 把结果封装
			res = super.selectResultList(functions);
		} catch(Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

}
