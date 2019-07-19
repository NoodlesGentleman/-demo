package com.richest.manager.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.richest.manager.dao.ICompanyDao;
import com.richest.manager.domain.Company;
 
@Repository
public class CompanyDao extends BaseDao<Company, Integer> implements ICompanyDao{
	final String GETCOMPANYBYBUILDINGID = "getCompanyBybuildingId";
	final String GETUSERCOMPANYBYUSERID = "getUserCompanyByUserId";
	
	@Override
	public List<Company> getCompanyBybuildingId(Integer buildingId){
		return sqlSession.selectList(GETCOMPANYBYBUILDINGID, buildingId);
	}
	
	@Override
	public Company getUserCompanyByUserId(Integer id){
		return sqlSession.selectOne(GETUSERCOMPANYBYUSERID, id);
	}
}
