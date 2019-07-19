package com.richest.manager.dao;

import java.util.List;

import com.richest.manager.domain.Campaign;
import com.richest.manager.dto.CampaignDto;
import com.richest.manager.dto.ProjectStatisticsDto;

public interface ICampaignDao {

	Campaign addCampaign(Campaign campaign);

	List<CampaignDto> getCampaignsByCustomerId(int customerId);

	List<CampaignDto> searchCampaign(String data);

	Campaign updateCampaign(Campaign campaign);

	CampaignDto getCampaignById(int id);

	List<CampaignDto> searchDefault();

	List<CampaignDto> searchDefault(Integer id, Integer page);

	List<CampaignDto> searchCampaign(String data, Integer id);

	Integer setcheckcode(String code, Integer id);

	Integer setprotectdate(Integer id);

	Integer checkInprotect(Integer id);

	List<ProjectStatisticsDto> getProjectStatisticsById(Integer id);

}
