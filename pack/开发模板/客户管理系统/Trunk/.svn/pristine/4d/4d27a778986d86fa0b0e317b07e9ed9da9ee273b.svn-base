package com.richest.manager.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.richest.manager.dao.IBuildingPropertyDao;
import com.richest.manager.domain.BuildingProperty;

@Repository
public class BuildingPropertyDao extends BaseDao<BuildingProperty, Integer> implements IBuildingPropertyDao{
	final String GETBUILDINGPROPERTY = "getBuildingProperty";
	
	@Override
	public List<BuildingProperty> getBuildingProperty(int buildingId){
		return sqlSession.selectList(GETBUILDINGPROPERTY, buildingId);
	}
}
