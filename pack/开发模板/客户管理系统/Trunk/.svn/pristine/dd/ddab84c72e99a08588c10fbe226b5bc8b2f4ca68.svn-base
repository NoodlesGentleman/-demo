package com.richest.manager.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.richest.manager.dao.IBuildingDao;
import com.richest.manager.domain.Building;

@Repository
public class BuildingDao extends BaseDao<Building, Integer> implements IBuildingDao{
	final String GETBUILDINGS = "getBuildings";
	final String GETBUILDINGSBYCOMPANYID = "getBuildingsByCompanyId";
	final String GETHOTBUILDINGS = "getHotBuildings";
	final String GETBUILDINGBYID = "getBuildingById";
	
	@Override
	public List<Building> getBuildings(Integer companyId){
		return sqlSession.selectList(GETBUILDINGSBYCOMPANYID, companyId);
	}

	@Override
	public List<Building> getBuildings() {
		// TODO Auto-generated method stub
		return sqlSession.selectList(GETBUILDINGS);
	}
	
	@Override
	public List<Building> getHotBuildings(Integer companyId){
		return sqlSession.selectList(GETHOTBUILDINGS, companyId);
	}
	
	@Override
	public Building getBuildingById(Integer id){
		return sqlSession.selectOne(GETBUILDINGBYID, id);
	}
}
