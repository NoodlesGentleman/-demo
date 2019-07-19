package com.sof.marketing.service;

import java.util.List;
import java.util.Map;

import com.sof.marketing.model.RedBagLog;

public interface IRedBagLogService {

	public List<RedBagLog> getListByCondition(Map<String, Object> pagemap);
	public Integer getCountByCondition(RedBagLog redBagLog);
}
