package com.sof.marketing.dao.imp;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.bluemobi.framework.common.dao.impl.BaseDao;
import com.sof.marketing.dao.IRedpackparamsDao;
import com.sof.marketing.model.Redpackparams;
@Repository
public class RedpackparamsDao extends BaseDao<Redpackparams> implements IRedpackparamsDao {
	private final String CLASSNAME = Redpackparams.class.getName();
	private final String BATCHSAVE = CLASSNAME + ".batchsave";
	
	@Override
	public Integer batchsave(List<Redpackparams> records) {
		// TODO Auto-generated method stub
		return this.session.insert(BATCHSAVE, records);
	}
	
	@Override
	public Integer deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer insert(Redpackparams record) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer insertSelective(Redpackparams record) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Redpackparams selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer updateByPrimaryKeySelective(Redpackparams record) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer updateByPrimaryKey(Redpackparams record) {
		// TODO Auto-generated method stub
		return null;
	}

}
