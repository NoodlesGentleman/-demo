package com.richest.manager.dao;

import java.util.List;

import com.richest.manager.domain.BuildingProperty;

public interface IBuildingPropertyDao {

	List<BuildingProperty> getBuildingProperty(int buildingId);

}
