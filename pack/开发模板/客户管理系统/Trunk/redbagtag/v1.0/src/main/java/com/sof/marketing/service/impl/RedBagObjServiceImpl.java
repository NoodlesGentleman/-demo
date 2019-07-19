package com.sof.marketing.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sof.marketing.dao.IRedBagObjDao;
import com.sof.marketing.model.RedBagObj;
import com.sof.marketing.service.IRedBagObjService;

@Service
@Transactional
public class RedBagObjServiceImpl implements IRedBagObjService {

	@Resource
	private IRedBagObjDao redBagObjDao;
	
	@Override
	public List<RedBagObj> getListByCondition(Map<String, Object> pagemap) {
		return redBagObjDao.getListByCondition(pagemap);
	}

	@Override
	public Integer getCountByCondition(RedBagObj record) {
		return redBagObjDao.getCountByCondition(record);
	}

}
