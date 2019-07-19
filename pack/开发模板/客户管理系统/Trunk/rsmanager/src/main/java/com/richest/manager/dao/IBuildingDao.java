package com.richest.manager.dao;

import java.util.List;

import com.richest.manager.domain.Building;

public interface IBuildingDao {

	List<Building> getBuildings();

	List<Building> getBuildings(Integer companyId);

	List<Building> getHotBuildings(Integer companyId);

	Building getBuildingById(Integer id);

}
