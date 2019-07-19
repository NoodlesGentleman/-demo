package com.richest.manager.dao.impl;

import org.springframework.stereotype.Repository;

import com.richest.manager.dao.ISendLogDao;
import com.richest.manager.domain.SendLog;

@Repository
public class SendLogDao extends BaseDao<SendLog, Integer> implements ISendLogDao{
	final String GETLOGBYMOBILE = "getLogByMobile";
	
	@Override
	public SendLog addSendLog(SendLog sendLog) {
		// TODO Auto-generated method stub
		return this.add(sendLog);
	}
	
	@Override
	public SendLog getLogByMobile(SendLog sendLog){
		// TODO Auto-generated method stub
		return this.sqlSession.selectOne(GETLOGBYMOBILE, sendLog);
	}
}
