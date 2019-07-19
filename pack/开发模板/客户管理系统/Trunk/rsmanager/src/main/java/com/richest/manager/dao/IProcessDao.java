package com.richest.manager.dao;

import java.util.List;

import com.richest.manager.domain.Campaign;
import com.richest.manager.domain.Process;

public interface IProcessDao {

	void addProcessByCampaignId(Campaign campaign);

	Process addProcess(Process process);

	List<Process> getProcessByCampaignId(int campaignId);

	Process updateProcess(Process process);

	Integer seteffectivetime(Process process);

	Integer relationprocess(Integer campaignId);

	Integer addRgProcesses(Integer campaignId);

	Integer toEndrgProcesses(Integer parentId);

}
