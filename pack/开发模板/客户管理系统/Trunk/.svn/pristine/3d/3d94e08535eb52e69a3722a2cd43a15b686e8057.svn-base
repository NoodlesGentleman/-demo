package com.sof.marketing.system.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.bluemobi.framework.common.dao.impl.BaseDao;
import com.sof.marketing.system.dao.ISystemFunctionDao;
import com.sof.marketing.system.domain.SystemFunction;

@Repository
public class SystemFunctionDao extends BaseDao<SystemFunction> implements ISystemFunctionDao {

	private final String SF_GETSYSTEMFUNCTIONBYNAVIGATIONID = "getSystemFunctionByNavigationId";
	
	@Override
	public List<SystemFunction> getSystemFunctionByNavigationId(String navigationId) {
		try{
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("navigation_id", navigationId);
			return this.session.selectList(SF_GETSYSTEMFUNCTIONBYNAVIGATIONID, map);
		} catch (RuntimeException re){
			throw re;
		}
	}

}
