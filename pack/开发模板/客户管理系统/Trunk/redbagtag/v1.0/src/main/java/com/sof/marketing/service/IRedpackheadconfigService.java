package com.sof.marketing.service;

import java.util.List;
import java.util.Map;

import com.sof.marketing.dto.RedPackConfigDto;
import com.sof.marketing.model.Redpackheadconfig;

public interface IRedpackheadconfigService {
	
	public List<Redpackheadconfig> getListByCondition(Map<String, Object> pagemap);
	
	public Integer getCountByCondition(Map<String, Object> pagemap);

	Integer insert(RedPackConfigDto record);

}
