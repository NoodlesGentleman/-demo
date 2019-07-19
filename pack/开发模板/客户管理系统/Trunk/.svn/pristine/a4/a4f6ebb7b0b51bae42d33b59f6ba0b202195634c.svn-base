package com.sof.marketing.dao.imp;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import com.bluemobi.framework.common.dao.impl.BaseDao;
import com.sof.marketing.dao.IRedBagObjDao;
import com.sof.marketing.model.RedBagObj;

@Repository
public class RedBagObjDaoImpl extends BaseDao<RedBagObj> implements IRedBagObjDao {

	private final String CLASSNAME = RedBagObj.class.getName();
	private final String GETLISTBYCONDITION = CLASSNAME + ".getListByCondition";
	private final String GETCOUNTBYCONDITION = CLASSNAME + ".getCountByCondition";
	
	@Override
	public Integer deleteByPrimaryKey(Integer id) {
		return null;
	}

	@Override
	public Integer insert(RedBagObj record) {
		return super.insert(record);
	}

	@Override
	public Integer insertSelective(RedBagObj record) {
		// TODO Auto-generated method stub
		return null;
	}
//
//	@Override
//	public RedBagObj selectByPrimaryKey(Integer id) {
//		// TODO Auto-generated method stub
//		return null;
//	}

	@Override
	public List<RedBagObj> getListByCondition(Map<String, Object> pagemap) {
		try {
			if (pagemap != null) {
				RedBagObj params = (RedBagObj)pagemap.get("redBagObj");	
				if(null == pagemap.get("offset") || null == pagemap.get("limit"))
					return session.selectList(GETLISTBYCONDITION, params);
				RowBounds rb = new RowBounds((int) pagemap.get("offset"),(int) pagemap.get("limit"));	
				return session.selectList(GETLISTBYCONDITION, params, rb);
			} else {
				return session.selectList(GETLISTBYCONDITION);
			}
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer getCountByCondition(RedBagObj record) {
		try {
			return session.selectOne(GETCOUNTBYCONDITION, record);
		} catch (RuntimeException re) {
			throw re;
		}
	}

}
