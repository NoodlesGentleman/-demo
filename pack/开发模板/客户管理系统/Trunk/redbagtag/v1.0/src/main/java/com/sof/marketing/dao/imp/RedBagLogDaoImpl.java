package com.sof.marketing.dao.imp;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.junit.Test;
import org.springframework.stereotype.Repository;

import com.bluemobi.framework.common.dao.impl.BaseDao;
import com.sof.marketing.dao.IRedBagLogDao;
import com.sof.marketing.model.RedBagLog;

@Repository
public class RedBagLogDaoImpl extends BaseDao<RedBagLog> implements IRedBagLogDao {

	private final String CLASSNAME = RedBagLog.class.getName();
	private final String GETLISTBYCONDITION = CLASSNAME + ".getListByCondition";
	private final String GETCOUNTBYCONDITION = CLASSNAME + ".getCountByCondition";
	private final String GETLISTREDBAGLOGBYTASKID = CLASSNAME + ".getListRedBagLogByTaskid";
	

	@Override
	public Integer insert(RedBagLog record) {

		return null;
	}

	@Override
	public Integer insertSelective(RedBagLog record) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<RedBagLog> getListByCondition(Map<String, Object> pagemap) {
		try {
			if (pagemap != null) {
				RedBagLog params = (RedBagLog) pagemap.get("redBagLog");
				if (null == pagemap.get("offset") || null == pagemap.get("limit"))
					return session.selectList(GETLISTBYCONDITION, params);
				RowBounds rb = new RowBounds((int) pagemap.get("offset"), (int) pagemap.get("limit"));
				return session.selectList(GETLISTBYCONDITION, params, rb);
			} else {
				return session.selectList(GETLISTBYCONDITION);
			}
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer getCountByCondition(RedBagLog redBagLog) {
		try {
			return session.selectOne(GETCOUNTBYCONDITION, redBagLog);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public List<Map<String, Object>> getListRedBagLogByTaskid(Integer id) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("id", id);
			return session.selectList(GETLISTREDBAGLOGBYTASKID, params);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Test
	public void testgetlist() {
		List<Map<String, Object>> list = getListRedBagLogByTaskid(1);
		for (Map<String, Object> m : list) {
			for (String k : m.keySet()) {
				System.out.println(k + " : " + m.get(k));
			}
		}
		
	}


	

	
}
