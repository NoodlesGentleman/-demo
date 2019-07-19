package com.richest.manager.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.richest.manager.domain.Campaign;
import com.richest.manager.domain.Process;
import com.richest.manager.domain.Saler;
import com.richest.manager.dao.ICampaignDao;
import com.richest.manager.dao.IProcessDao;
import com.richest.manager.dao.ISalerDao;
import com.richest.manager.dao.IWXAccessTokenDao;
import com.richest.manager.dto.CampaignDto;
import com.richest.manager.dto.MessageDto;
import com.richest.manager.service.IProcessService;
import com.richest.manager.utils.FinalOpenId;
import com.richest.manager.utils.WeChatUtil;
import com.richest.manager.utils.TypeConst.Message;

@Controller
@RequestMapping(value="/process")
public class ProcessController {
	
	@Autowired
	IProcessDao iProcessDao;
	
	@Autowired
	IProcessService iProcessService;
	
	@Autowired
	ICampaignDao iCampaignDao;
	
	@Autowired
	IWXAccessTokenDao iWXAccessTokenDao;
	
	@Autowired
	ISalerDao iSalerDao;
	
	@RequestMapping(value = "/add",method=RequestMethod.POST,consumes="application/json")
	@ResponseBody
	protected MessageDto addProcess(@RequestBody Process process, HttpServletRequest request){
		MessageDto mdto = new MessageDto();
		Object obj = request.getSession().getAttribute("userInfo");
		Process new_process = null;
		if(null != obj){
			FinalOpenId finalOpenId = (FinalOpenId)obj;
			if(null != finalOpenId.getUser() && null != finalOpenId.getUser().getType_code() && finalOpenId.getUser().getType_code().equals("SALER")){
				/*CampaignDto campaignDto = iCampaignDao.getCampaignById(process.getCampaignId());
				if(campaignDto.getSalerId() != 0 && campaignDto.getSalerId() != finalOpenId.getUser().getId()){
					mdto.setCode(Message.M00006.getValue());
					mdto.setMessage(Message.M00006.getName());
				}else{*/
					Campaign campaign = new Campaign();
					campaign.setSalerId(finalOpenId.getUser().getId());
					new_process = iProcessService.addProcess(process, campaign);
				//}
			}else if(null != finalOpenId.getUser() && finalOpenId.getUser().getType_code().equals("ADMIN")){
				new_process = iProcessDao.addProcess(process);
			}
		}
		
		if(null != new_process){
			mdto.setCode(Message.M00003.getValue());
			mdto.setMessage(Message.M00003.getName());
			mdto.setObjtype(Process.class.toString());
			mdto.setObj(iProcessDao.getProcessByCampaignId(new_process.getCampaignId()));
		}else{
			mdto.setCode(Message.M00004.getValue());
			mdto.setMessage(Message.M00004.getName());
		}
		return mdto;
	}
	
	@RequestMapping(value = "/addrg/{id}",method=RequestMethod.GET)
	@ResponseBody
	protected MessageDto addProcess(@PathVariable("id") Integer id, HttpServletRequest request){
		MessageDto mdto = new MessageDto();
		Object obj = request.getSession().getAttribute("userInfo");
		Integer result = 0;
		if(null != obj){
			FinalOpenId finalOpenId = (FinalOpenId)obj;
			if(null != finalOpenId.getUser() && null != finalOpenId.getUser().getType_code() && finalOpenId.getUser().getType_code().equals("SALER")){
				result = iProcessService.addRgProcesses(id);
			}
		}
		if(0 < result){
			mdto.setCode(Message.M00014.getValue());
			mdto.setMessage(Message.M00014.getName());
			mdto.setObjtype(Process.class.toString());
			mdto.setObj(iProcessDao.getProcessByCampaignId(id));
		}else{
			mdto.setCode(Message.M00015.getValue());
			mdto.setMessage(Message.M00015.getName());
		}
		return mdto;
	}
	
	@RequestMapping(value = "/update/{status}",method=RequestMethod.POST,consumes="application/json")
	@ResponseBody
	protected MessageDto updateProcess(@RequestBody Process process, @PathVariable("status") String status, HttpServletRequest request){
		MessageDto mdto = new MessageDto();
		if(0 < iCampaignDao.checkInprotect(process.getCampaignId())){
			mdto.setCode(Message.M00011.getValue());
			mdto.setMessage(Message.M00011.getName());
			return mdto;
		}
		Object obj = request.getSession().getAttribute("userInfo");
		Process new_process = null;
		if(null != obj){
			FinalOpenId finalOpenId = (FinalOpenId)obj;
			if(null != finalOpenId.getUser() && null != finalOpenId.getUser().getType_code() && finalOpenId.getUser().getType_code().equals("SALER")){
				CampaignDto campaignDto = iCampaignDao.getCampaignById(process.getCampaignId());
				/*if(campaignDto.getSalerId() != 0 && campaignDto.getSalerId() != finalOpenId.getUser().getId()){
					mdto.setCode(Message.M00006.getValue());
					mdto.setMessage(Message.M00006.getName());
					return mdto;
				}else{*/
					Campaign campaign = new Campaign();
					campaign.setId(campaignDto.getId());
					if(!status.equals("0"))
						campaign.setStatus(status);
					campaign.setSalerId(finalOpenId.getUser().getId());
					new_process = iProcessService.updateProcess(process, campaign);
				//}
			}else if(null != finalOpenId.getUser() && finalOpenId.getUser().getType_code().equals("ADMIN")){
				new_process = iProcessDao.updateProcess(process);
			}
		}
		
		if(null != new_process){
			mdto.setCode(Message.M00003.getValue());
			mdto.setMessage(Message.M00003.getName());
			mdto.setObjtype(CampaignDto.class.toString());
			mdto.setObj(iCampaignDao.getCampaignById(new_process.getCampaignId()));
		}else{
			mdto.setCode(Message.M00004.getValue());
			mdto.setMessage(Message.M00004.getName());
		}
		return mdto;
	}
	
	@RequestMapping(value = "/apply/{campaignId}/{processId}",method=RequestMethod.GET)
	@ResponseBody
	protected MessageDto apply(@PathVariable("campaignId") Integer campaignId, @PathVariable("processId") Integer processId, HttpServletRequest request){
		MessageDto mdto = new MessageDto();
		String token = iWXAccessTokenDao.getToken().getAccess_token();
		CampaignDto campaignDto = iCampaignDao.getCampaignById(campaignId);
		List<Saler> salers = iSalerDao.getSalerOpenidsByBuilidngId(campaignDto.getBuildingId());
		Integer result = 0;
		Process process = null;
		for(Process p : campaignDto.getProcesslist()){
			if(p.getId() == processId){
				result = new WeChatUtil().sendSalerApply(salers, token, campaignDto, p.getEvent_name());
				if(0 < result){
					p.setIsRequest(result);
					process = iProcessDao.updateProcess(p);
				}
				break;
			}
		}
		
		if(null != process){
			mdto.setCode(Message.M00012.getValue());
			mdto.setMessage(Message.M00012.getName());
			mdto.setObjtype(Process.class.toString());
			mdto.setObj(iProcessDao.getProcessByCampaignId(campaignId));
		}else{
			mdto.setCode(Message.M00013.getValue());
			mdto.setMessage(Message.M00013.getName());
		}
		return mdto;
	}
}
