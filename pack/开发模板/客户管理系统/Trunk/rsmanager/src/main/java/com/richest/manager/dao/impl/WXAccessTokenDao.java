package com.richest.manager.dao.impl;


import org.springframework.stereotype.Repository;

import com.richest.manager.dao.IWXAccessTokenDao;
import com.richest.manager.domain.AccessToken;

@Repository
public class WXAccessTokenDao extends BaseDao<AccessToken, Integer> implements IWXAccessTokenDao{
	final String GETTOKEN = "getToken";
	
	@Override
	public AccessToken addAccessToken(AccessToken accessToken){
		return this.add(accessToken);
	}
	
	@Override
	public AccessToken getToken(){
		return this.sqlSession.selectOne(GETTOKEN);
	}
}
