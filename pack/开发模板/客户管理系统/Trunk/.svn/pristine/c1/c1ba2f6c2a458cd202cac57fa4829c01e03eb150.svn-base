package com.richest.manager.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.richest.manager.dao.ISalerDao;
import com.richest.manager.domain.Saler;

@Repository
public class SalerDao extends BaseDao<Saler,Integer> implements ISalerDao{
	final String GETSALERS = "getSalers";
	final String GETSALEROPENIDSBYBUILDINGID = "getSalerOpenidsByBuilidngId";

	@Override
	public List<Saler> getSalers(){
		return sqlSession.selectList(GETSALERS);
	}
	
	@Override
	public List<Saler> getSalerOpenidsByBuilidngId(Integer buildingId){
		return sqlSession.selectList(GETSALEROPENIDSBYBUILDINGID, buildingId);
	}
}
