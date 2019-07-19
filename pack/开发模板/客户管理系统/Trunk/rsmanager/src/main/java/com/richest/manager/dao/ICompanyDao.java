package com.richest.manager.dao;

import java.util.List;

import com.richest.manager.domain.Company;

public interface ICompanyDao {

	List<Company> getCompanyBybuildingId(Integer buildingId); 

	Company getUserCompanyByUserId(Integer id);

}
