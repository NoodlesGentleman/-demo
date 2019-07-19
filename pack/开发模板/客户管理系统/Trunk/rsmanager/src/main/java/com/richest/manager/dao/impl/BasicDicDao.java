package com.richest.manager.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.richest.manager.dao.IBasicDicDao;
import com.richest.manager.domain.BasicDic;

@Repository
public class BasicDicDao extends BaseDao<BasicDic,Integer> implements IBasicDicDao{
	final String GETDICTIONARYBYTYPE = "getDictionaryByType";
	
	@Override
	public List<BasicDic> getDictionaryByType(String type){
		return sqlSession.selectList(GETDICTIONARYBYTYPE, type);
	}
}
