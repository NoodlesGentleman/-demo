package com.sof.marketing.dao.imp;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import com.bluemobi.framework.common.dao.impl.BaseDao;
import com.sof.marketing.dao.IRedpackheadconfigDao;
import com.sof.marketing.model.Redpackheadconfig;

@Repository
public class RedpackheadconfigDaoImpl extends BaseDao<Redpackheadconfig>
		implements IRedpackheadconfigDao {

	private final String CLASSNAME = Redpackheadconfig.class.getName();
	private final String GETLISTBYCONDITION = CLASSNAME + ".getListByCondition";
	private final String GETCOUNTBYCONDITION = CLASSNAME + ".getCountByCondition";
	private final String SELECTBYPRIMARYKEY = CLASSNAME + ".selectByPrimaryKey";
	
	@Override
	public Integer deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer insert(Redpackheadconfig record) {
		return super.insert(record);
	}

	@Override
	public Integer insertSelective(Redpackheadconfig record) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Redpackheadconfig selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return this.session.selectOne(SELECTBYPRIMARYKEY, id);
	}

	@Override
	public Integer updateByPrimaryKeySelective(Redpackheadconfig record) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer updateByPrimaryKeyWithBLOBs(Redpackheadconfig record) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer updateByPrimaryKey(Redpackheadconfig record) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Redpackheadconfig> getListByCondition(Map<String, Object> pagemap) {
		try {
			if (pagemap != null) {
				if(null == pagemap.get("offset") || null == pagemap.get("limit"))
					return session.selectList(GETLISTBYCONDITION, pagemap);
				RowBounds rb = new RowBounds((int) pagemap.get("offset"),(int) pagemap.get("limit"));	
				return session.selectList(GETLISTBYCONDITION, pagemap, rb);
			} else {
				return session.selectList(GETLISTBYCONDITION);
			}
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer getCountByCondition(Map<String, Object> pagemap) {
		try {
			return session.selectOne(GETCOUNTBYCONDITION, pagemap);
		} catch (RuntimeException re) {
			throw re;
		}
	}

}
