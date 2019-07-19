package com.sof.marketing.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sof.marketing.dao.IRedBagLogDao;
import com.sof.marketing.model.RedBagLog;
import com.sof.marketing.service.IRedBagLogService;

@Service
public class RedBagLogServiceImpl implements IRedBagLogService {
	@Resource
	private IRedBagLogDao redBagLogDao;

	@Override
	public List<RedBagLog> getListByCondition(Map<String, Object> pagemap) {
		// TODO Auto-generated method stub
		return redBagLogDao.getListByCondition(pagemap);
	}

	@Override
	public Integer getCountByCondition(RedBagLog redBagLog) {
		// TODO Auto-generated method stub
		return redBagLogDao.getCountByCondition(redBagLog);
	}

}
