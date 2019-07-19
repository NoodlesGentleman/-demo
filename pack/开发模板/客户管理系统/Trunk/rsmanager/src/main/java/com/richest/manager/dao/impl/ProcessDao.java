package com.richest.manager.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.richest.manager.dao.IProcessDao;
import com.richest.manager.domain.Campaign;
import com.richest.manager.domain.Process;

@Repository
public class ProcessDao extends BaseDao<Process,Integer> implements IProcessDao{
	final String ADDPROCESSBYCAMPAIGNID = "addProcessByCampaignId";
	final String GETPROCESSBYCAMPAIGNID = "getProcessByCampaignId";
	final String SETEFFECTIVETIME = "seteffectivetime";
	final String RELATIONPROCESS = "relationprocess";
	final String ADDRGPROCESSES = "addRgProcesses";
	final String TOENDRGPROCESSES = "toEndrgProcesses";
	
	@Override
	public void addProcessByCampaignId(Campaign campaign){
		Map<String, Object> params=new HashMap<String, Object>();
		params.put("campaignId", campaign.getId());
		
		sqlSession.selectOne(ADDPROCESSBYCAMPAIGNID, params);
	}
	
	@Override
	public Process addProcess(Process process) {
		// TODO Auto-generated method stub
		return this.add(process);
	}
	
	@Override
	public Process updateProcess(Process process) {
		// TODO Auto-generated method stub
		return this.update(process);
	}
	
	@Override
	public List<Process> getProcessByCampaignId(int campaignId){
		return sqlSession.selectList(GETPROCESSBYCAMPAIGNID, campaignId);
	}
	
	@Override
	public Integer seteffectivetime(Process process) {
		// TODO Auto-generated method stub
		return sqlSession.update(SETEFFECTIVETIME, process);
	}
	
	@Override
	public Integer relationprocess(Integer campaignId) {
		// TODO Auto-generated method stub
		return sqlSession.update(RELATIONPROCESS, campaignId);
	}
	
	@Override
	public Integer addRgProcesses(Integer campaignId) {
		// TODO Auto-generated method stub
		return sqlSession.insert(ADDRGPROCESSES, campaignId);
	}
	
	@Override
	public Integer toEndrgProcesses(Integer parentId) {
		// TODO Auto-generated method stub
		return sqlSession.update(TOENDRGPROCESSES, parentId);
	}
}
