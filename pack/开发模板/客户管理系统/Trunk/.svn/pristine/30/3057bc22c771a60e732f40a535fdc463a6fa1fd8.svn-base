package com.richest.manager.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.richest.manager.dao.ICampaignDao;
import com.richest.manager.dao.ICustomerDao;
import com.richest.manager.dao.INaturalVisitDao;
import com.richest.manager.dao.IProcessDao;
import com.richest.manager.domain.Campaign;
import com.richest.manager.domain.Customer;
import com.richest.manager.domain.NaturalVisit;
import com.richest.manager.dto.CampaignDto;
import com.richest.manager.service.ICampaignService;
import com.richest.manager.utils.CommonUtils;
import com.richest.manager.utils.TypeConst.Message;

@Service
@Transactional
public class CampaignService implements ICampaignService{
	
	@Autowired
	ICustomerDao iCustomerDao;
	
	@Autowired
	ICampaignDao iCampaignDao;
	
	@Autowired
	IProcessDao iProcessDao;
	
	@Autowired
	INaturalVisitDao iNaturalVisitDao;
	
	@Override
	public int addCampaign(CampaignDto campaignDto){
		Customer customer = new Customer();
		customer.setName(campaignDto.getCustomerName());
		customer.setMobile(campaignDto.getCustomermobile());
		customer.setUserid(campaignDto.getUserId());
		Customer c = iCustomerDao.getCustomer(customer);
		if(null == c){
			customer = iCustomerDao.addCustomer(customer);
		}else{
			customer.setId(c.getId());
		}
		Campaign campaign = new Campaign();
		campaign.setCode(CommonUtils.getCampaignCode());
		campaign.setUserId(campaignDto.getUserId());
		campaign.setCustomerId(customer.getId());
		campaign.setCustomermobile(customer.getMobile());
		campaign.setBuildingId(campaignDto.getBuildingId());
		campaign.setProperty_code(campaignDto.getProperty_code());
		campaign.setReceiveId(campaignDto.getReceiveId());
		campaign.setIsAccompany(campaignDto.getIsAccompany());
		//campaign.setAppointmentTime(campaignDto.getAppointmentTime());
		
		campaign = iCampaignDao.addCampaign(campaign);
		
		iProcessDao.addProcessByCampaignId(campaign);
		iProcessDao.relationprocess(campaign.getId());
		return campaign.getId();
	}
	
	@Override
	public Campaign updateCampaign(Campaign campaign){
		Campaign c = iCampaignDao.updateCampaign(campaign);
		if(null != campaign.getStatus() && campaign.getStatus().equals("ZF")){
			NaturalVisit naturalVisit = new NaturalVisit();
			naturalVisit.setId(c.getId());
			iNaturalVisitDao.addNaturalVisit(naturalVisit);
		}
		return c;
	}
	
	@Override
	public Message checkCustomer(String buildingId, String mobile){
		if(iCustomerDao.checkVisited(buildingId, mobile) > 0)
			return Message.M00010;
		if(iCustomerDao.checkProtect(buildingId, mobile) > 0)
			return Message.M00011;
		return null;
	}
}
