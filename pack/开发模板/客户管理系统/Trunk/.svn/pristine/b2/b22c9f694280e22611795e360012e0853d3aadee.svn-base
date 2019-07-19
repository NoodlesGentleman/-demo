package com.richest.manager.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.richest.manager.dao.ICustomerDao;
import com.richest.manager.domain.Customer;

@Repository
public class CustomerDao extends BaseDao<Customer,Integer> implements ICustomerDao{
	final String GETCUSTOMER = "getCustomer";
	final String GETCUSTOMERBYUSERID = "getCustomerByUserId";
	final String CHECKVISITED = "checkVisited";
	final String CHECKPROTECT = "checkProtect";
	
	@Override
	public Customer addCustomer(Customer customer) {
		// TODO Auto-generated method stub
		return this.add(customer);
	}
	
	@Override
	public Customer getCustomer(Customer customer){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("name", customer.getName());
		params.put("mobile", customer.getMobile());
		params.put("userid", customer.getUserid());
	 	return sqlSession.selectOne(GETCUSTOMER, params);
	}
	
	@Override
	public List<Customer> getCustomerByUserId(int userid){
		return sqlSession.selectList(GETCUSTOMERBYUSERID, userid);
	}
	
	@Override
	public Integer checkVisited(String buildingId, String mobile){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("buildingId", buildingId);
		params.put("mobile", mobile);
		return sqlSession.selectOne(CHECKVISITED,params);
	}
	
	@Override
	public Integer checkProtect(String buildingId, String mobile){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("buildingId", buildingId);
		params.put("mobile", mobile);
		return sqlSession.selectOne(CHECKPROTECT,params);
	}
}
