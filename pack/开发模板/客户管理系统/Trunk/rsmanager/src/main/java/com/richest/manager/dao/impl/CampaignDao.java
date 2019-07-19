package com.richest.manager.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.richest.manager.dao.ICampaignDao;
import com.richest.manager.domain.Campaign;
import com.richest.manager.dto.CampaignDto;
import com.richest.manager.dto.ProjectStatisticsDto;

@Repository
public class CampaignDao extends BaseDao<Campaign,Integer> implements ICampaignDao{
	final String GETCAMPAIGNSBYCUSTOMERID = "getCampaignsByCustomerId";
	final String SEARCHCAMPAIGN = "searchCampaign";
	final String SEARCHCAMPAIGNBYSALER = "searchCampaignBySaler";
	final String SETCAMPAIGN = "setCampaign";
	final String GETCAMPAIGNBYID = "getCampaignById";
	final String SEARCHDEFAULT = "searchDefault";
	final String SEARCHDEFAULTBYSALER = "searchDefaultBySaler";
	final String SETCHECKCODE = "setcheckcode";
	final String SETPROTECTDATE = "setprotectdate";
	final String CHECKINPROTECT = "checkInprotect";
	final String GETPROJECTSTATISTICSBYID ="getProjectStatisticsById";
	
	@Override
	public Campaign addCampaign(Campaign campaign) {
		// TODO Auto-generated method stub
		return this.add(campaign);
	}
	
	@Override
	public List<CampaignDto> getCampaignsByCustomerId(int customerId){
		return sqlSession.selectList(GETCAMPAIGNSBYCUSTOMERID,customerId);
	}
	
	@Override
	public List<CampaignDto> searchCampaign(String data){
		return sqlSession.selectList(SEARCHCAMPAIGN, data);
	}
	
	@Override
	public List<CampaignDto> searchCampaign(String data, Integer id){
		Map<String, Object> params=new HashMap<String, Object>();
		params.put("data", data);
		params.put("id", id);
		
		return sqlSession.selectList(SEARCHCAMPAIGNBYSALER, params);
	}
	
	@Override
	public Campaign updateCampaign(Campaign campaign){
		return this.update(campaign);
	}
	
	@Override
	public CampaignDto getCampaignById(int id){
		return sqlSession.selectOne(GETCAMPAIGNBYID, id);
	}
	
	@Override
	public List<CampaignDto> searchDefault(){
		return sqlSession.selectList(SEARCHDEFAULT);
	}
	
	@Override
	public List<CampaignDto> searchDefault(Integer id, Integer page){
		Map<String, Object> params=new HashMap<String, Object>();
		params.put("page", page);
		params.put("id", id);
		return sqlSession.selectList(SEARCHDEFAULTBYSALER, params);
	}
	
	@Override
	public Integer setcheckcode(String code, Integer id){
		Map<String, Object> params=new HashMap<String, Object>();
		params.put("checkcode", code);
		params.put("id", id);
		return sqlSession.update(SETCHECKCODE, params);
	}
	
	@Override
	public Integer setprotectdate(Integer id){
		return sqlSession.update(SETPROTECTDATE, id);
	}
	
	@Override
	public Integer checkInprotect(Integer id){
		return sqlSession.selectOne(CHECKINPROTECT, id);
	}
	
	@Override
	public List<ProjectStatisticsDto> getProjectStatisticsById(Integer id){
		return sqlSession.selectList(GETPROJECTSTATISTICSBYID, id);
	}
}
