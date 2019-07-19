package com.richest.manager.dao.impl;

import org.springframework.stereotype.Repository;

import com.richest.manager.dao.IUserDao;
import com.richest.manager.domain.User;

@Repository
public class UserDao extends BaseDao<User,Integer> implements IUserDao{
	final String GETUSERBYID = "getUserById";
	final String GETUSERBYOPENID = "getUserByOpenId";
	final String GETUSERCOUNTBYOPENID = "getUserCountByOpenid";
	
	@Override
	public User addUser(User user) {
		// TODO Auto-generated method stub
		return this.add(user);
	}
	
	@Override
	public User updateUser(User user) {
		// TODO Auto-generated method stub
		return this.update(user);
	}

	@Override
	public User getUserById(int id) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne(GETUSERBYID, id);
	}
	
	@Override
	public User getUserByOpenId(String openid) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne(GETUSERBYOPENID, openid);
	}
	
	@Override
	public Integer getUserCountByOpenid(String openid){
		return sqlSession.selectOne(GETUSERCOUNTBYOPENID, openid);
	}
}
