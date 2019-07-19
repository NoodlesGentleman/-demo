package com.richest.manager.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.richest.manager.dao.ICampaignDao;
import com.richest.manager.dao.IProcessDao;
import com.richest.manager.domain.Campaign;
import com.richest.manager.domain.Process;
import com.richest.manager.service.ICampaignService;
import com.richest.manager.service.IProcessService;

@Service
@Transactional
public class ProcessService implements IProcessService{
	@Autowired
	IProcessDao iProcessDao;
	
	@Autowired
	ICampaignDao iCampaignDao;
	
	@Autowired
	ICampaignService iCampaignService;
	
	@Override
	public Process addProcess(Process process, Campaign campaign) {
		iCampaignDao.updateCampaign(campaign);
		if(process.getEvent_code().equals("DFDJ")){
			iCampaignDao.setprotectdate(campaign.getId());
		}
		return iProcessDao.addProcess(process);
	}
	
	@Override
	public Process updateProcess(Process process, Campaign campaign) {
		iCampaignService.updateCampaign(campaign);
		if(process.getEvent_code().equals("DFDJ")){
			iCampaignDao.setprotectdate(campaign.getId());
		}
		if(0 < process.getParentId() && 1 == process.getIsrefund()){
			iProcessDao.toEndrgProcesses(process.getParentId());
		}
		return iProcessDao.updateProcess(process);
	}
	
	@Override
	public Integer addRgProcesses(Integer campaignId) {
		Integer result = 0;
		if(0 < iProcessDao.addRgProcesses(campaignId)){
			result = iProcessDao.relationprocess(campaignId);
		}
		return result;
	}
}
