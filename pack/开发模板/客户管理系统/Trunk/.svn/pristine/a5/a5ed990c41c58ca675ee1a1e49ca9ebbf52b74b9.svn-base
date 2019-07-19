package com.sof.marketing.service.impl;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sof.marketing.dao.IRedpackheadconfigDao;
import com.sof.marketing.dao.IRedpackparamsDao;
import com.sof.marketing.dto.RedPackConfigDto;
import com.sof.marketing.model.Redpackheadconfig;
import com.sof.marketing.quartz.TaskService;
import com.sof.marketing.service.IRedpackheadconfigService;

@Service
@Transactional
public class RedpackheadconfigServiceImpl implements IRedpackheadconfigService {

	@Resource
	private IRedpackheadconfigDao redpackheadconfigDaoImpl;
	@Resource
	private IRedpackparamsDao redpackparamsDao;
	
	@Override
	public List<Redpackheadconfig> getListByCondition(Map<String, Object> pagemap) {
		return redpackheadconfigDaoImpl.getListByCondition(pagemap);
	}

	@Override
	public Integer getCountByCondition(Map<String, Object> pagemap) {
		return redpackheadconfigDaoImpl.getCountByCondition(pagemap);
	}
	
	@Override
	public Integer insert(RedPackConfigDto record) {
		
		record.getHead().setJobname(UUID.randomUUID().toString().replaceAll("-", "").toUpperCase());
		redpackheadconfigDaoImpl.insert(record.getHead());
		record.getProps().forEach(item -> item.setPid(record.getHead().getId()));
		TaskService.addredpackjob(record.getHead());
		
		return redpackparamsDao.batchsave(record.getProps());
	}
}
