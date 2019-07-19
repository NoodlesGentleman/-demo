package com.sof.marketing.service;

import java.util.List;
import java.util.Map;

import com.sof.marketing.model.RedBagObj;

public interface IRedBagObjService {


	public List<RedBagObj> getListByCondition(Map<String, Object> pagemap);
	
	public Integer getCountByCondition(RedBagObj record);
}
