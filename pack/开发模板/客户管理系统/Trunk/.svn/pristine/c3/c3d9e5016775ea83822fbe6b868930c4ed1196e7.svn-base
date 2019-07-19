package com.richest.manager.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.richest.manager.dao.ICampaignDao;
import com.richest.manager.dao.ICompanyDao;
import com.richest.manager.dao.IProcessDao;
import com.richest.manager.dao.ISendLogDao;
import com.richest.manager.dao.IUserDao;
import com.richest.manager.domain.Campaign;
import com.richest.manager.domain.Process;
import com.richest.manager.domain.SendLog;
import com.richest.manager.dto.CampaignDto;
import com.richest.manager.dto.MessageDto;
import com.richest.manager.service.ICampaignService;
import com.richest.manager.utils.FinalOpenId;
import com.richest.manager.utils.MobileUtil;
import com.richest.manager.utils.TypeConst.Message;

@Controller
@RequestMapping(value="/campaign")
public class CampaignController extends BaseController{
	@Autowired
	ICampaignService iCampaignService;
	
	@Autowired
	ICampaignDao iCampaignDao;
	
	@Autowired
	ICompanyDao iCompanyDao;
	
	@Autowired
	IProcessDao iProcessDao;
	
	@Autowired
	ISendLogDao iSendLogDao;
	
	@Autowired
	IUserDao iUserDao;
	
	@RequestMapping(value = "/add",method=RequestMethod.POST,consumes="application/json")
	@ResponseBody
	protected MessageDto addCampaign(@RequestBody CampaignDto campaignDto, HttpServletRequest request){
		MessageDto mdto = new MessageDto();
		Object obj = request.getSession().getAttribute("userInfo");
		Integer userId = ((FinalOpenId)obj).getUser().getId();
		campaignDto.setUserId(userId);
		if(1 == iUserDao.getUserById(userId).getIsDel()){
			mdto.setCode(Message.M00018.getValue());
			mdto.setMessage(Message.M00018.getName());
			return mdto;
		}
		Message message = iCampaignService.checkCustomer(String.valueOf(campaignDto.getBuildingId()), campaignDto.getCustomermobile());
		if(null != message){
			mdto.setCode(message.getValue());
			mdto.setMessage(message.getName());
			return mdto;
		}
		int customerId = iCampaignService.addCampaign(campaignDto);
		if(customerId > 0){
			mdto.setCode(Message.M00003.getValue());
			mdto.setMessage(Message.M00003.getName());
			mdto.setObj(customerId);
		}else{
			mdto.setCode(Message.M00004.getValue());
			mdto.setMessage(Message.M00004.getName());
		}
		return mdto;
	}
	
	@RequestMapping(value = "/regist/{code}",method=RequestMethod.POST,consumes="application/json")
	@ResponseBody
	protected MessageDto registCampaign(@RequestBody CampaignDto campaignDto, HttpServletRequest request, @PathVariable("code") String code){
		MessageDto mdto = new MessageDto();
		SendLog sl = new SendLog();
		sl.setMobile(campaignDto.getCustomermobile());
		sl.setType("CUSTOMERREGIST");
		sl.setBuildingId(campaignDto.getBuildingId());
		sl.setUserId(campaignDto.getUserId());
		sl = iSendLogDao.getLogByMobile(sl);
		if(!StringUtils.hasText(code) || null == sl || !sl.getCheckcode().equals(code)){
			mdto.setCode(Message.M00009.getValue());
			mdto.setMessage(Message.M00009.getName());
			return mdto;
		}
		Message message = iCampaignService.checkCustomer(String.valueOf(campaignDto.getBuildingId()), campaignDto.getCustomermobile());
		if(null != message){
			mdto.setCode(message.getValue());
			mdto.setMessage(message.getName());
			return mdto;
		}
		int customerId = iCampaignService.addCampaign(campaignDto);
		if(customerId > 0){
			mdto.setCode(Message.M00016.getValue());
			mdto.setMessage(Message.M00016.getName());
		}else{
			mdto.setCode(Message.M00017.getValue());
			mdto.setMessage(Message.M00017.getName());
		}
		return mdto;
	}
	
	@RequestMapping(value = "/update",method=RequestMethod.POST,consumes="application/json")
	@ResponseBody
	protected MessageDto updateCampaign(@RequestBody Campaign campaign, HttpServletRequest request){
		MessageDto mdto = new MessageDto();
		Object obj = request.getSession().getAttribute("userInfo");
		Campaign new_campaign = null;
		if(null != obj){
			FinalOpenId finalOpenId = (FinalOpenId)obj;
			if(null != finalOpenId.getUser() && finalOpenId.getUser().getType_code().equals("SALER")){
				CampaignDto campaignDto = iCampaignDao.getCampaignById(campaign.getId());
				if(campaignDto.getSalerId() != 0 && campaignDto.getSalerId() != finalOpenId.getUser().getId()){
					mdto.setCode(Message.M00006.getValue());
					mdto.setMessage(Message.M00006.getName());
				}else{
					campaign.setSalerId(finalOpenId.getUser().getId());
					new_campaign = iCampaignService.updateCampaign(campaign);
				}
			}else if(null != finalOpenId.getUser() && finalOpenId.getUser().getType_code().equals("ADMIN")){
				new_campaign = iCampaignService.updateCampaign(campaign);
			}
		}
		
		if(null != new_campaign){
			mdto.setCode(Message.M00003.getValue());
			mdto.setMessage(Message.M00003.getName());
			mdto.setObj(new_campaign);
			mdto.setObjtype(Campaign.class.toString());
		}else{
			mdto.setCode(Message.M00004.getValue());
			mdto.setMessage(Message.M00004.getName());
		}
		return mdto;
	} 
	
	@RequestMapping(value = "/list/{customerId}",method=RequestMethod.GET)
	@ResponseBody
	protected List<CampaignDto> getCampaignsByCustomerId(@PathVariable("customerId") int customerId){
		return iCampaignDao.getCampaignsByCustomerId(customerId);
	}
	
	@RequestMapping(value = "/searchdefault/{page}",method=RequestMethod.GET)
	@ResponseBody
	protected List<CampaignDto> searchDefault(@PathVariable("page") Integer page, HttpServletRequest request) {
		Object obj = request.getSession().getAttribute("userInfo");
		if(null != obj){
			FinalOpenId finalOpenId = (FinalOpenId)obj;
			if(null != finalOpenId.getUser() && null != finalOpenId.getUser().getType_code() && finalOpenId.getUser().getType_code().equals("SALER")){
				return iCampaignDao.searchDefault(finalOpenId.getUser().getId(), page*20);
			}
		}
		return iCampaignDao.searchDefault();
	}
	
	@RequestMapping(value = "/search/{data}",method=RequestMethod.GET)
	@ResponseBody
	protected List<CampaignDto> searchCampaign(@PathVariable("data") String data, HttpServletRequest request) {
		Object obj = request.getSession().getAttribute("userInfo");
		if(null != obj){
			FinalOpenId finalOpenId = (FinalOpenId)obj;
			if(null != finalOpenId.getUser() && null != finalOpenId.getUser().getType_code() && finalOpenId.getUser().getType_code().equals("SALER")){
				return iCampaignDao.searchCampaign(data, finalOpenId.getUser().getId());
			}
		}
		return iCampaignDao.searchCampaign(data);
	}
	
	
	@RequestMapping(value = "/get/{id}",method=RequestMethod.GET)
	@ResponseBody
	protected CampaignDto getCampaignById(@PathVariable("id") int id, HttpServletRequest request) {
		
		CampaignDto campaignDto = iCampaignDao.getCampaignById(id);
		if(campaignDto.getSalerId() == 0){
			Object obj = request.getSession().getAttribute("userInfo");
			if(null != obj){
				FinalOpenId finalOpenId = (FinalOpenId)obj;
				if(null != finalOpenId.getUser() && null != finalOpenId.getUser().getType_code() && finalOpenId.getUser().getType_code().equals("SALER")){
					campaignDto.setSalerId(finalOpenId.getUser().getId());
					campaignDto.setSalerName(finalOpenId.getUser().getName());
				}
			}
		}
		return campaignDto;
	}
	
	@ResponseBody
	@RequestMapping(value = "/visitcode/{mobile}/{id}")
	public MessageDto visitcode(@PathVariable("mobile") String mobile, @PathVariable("id") int id,HttpServletRequest request){
		MessageDto mdto = new MessageDto();
		if(0 < iCampaignDao.checkInprotect(id)){
			mdto.setCode(Message.M00011.getValue());
			mdto.setMessage(Message.M00011.getName());
			return mdto;
		}
		//Calendar Cld = Calendar.getInstance();
		String code = String.valueOf((int)((Math.random()*9 + 1)*1000));// + String.valueOf(Cld.get(Calendar.MILLISECOND));
		CampaignDto campaignDto = iCampaignDao.getCampaignById(id);
		String title = "【" + campaignDto.getBuildingName() + "】";
		String message = "带看的验证码是：" + code +"，推荐人：" + campaignDto.getUserName() + "，联系电话：" + campaignDto.getUserMobile();
		
		if(0 >= iCampaignDao.setcheckcode(code, id)){
			mdto.setCode(Message.M00007.getValue());
			mdto.setMessage(Message.M00007.getName());
			return mdto;
		}else{
			Process p = new Process();
			p.setCampaignId(id);
			p.setEvent_code("YYDF");
			iProcessDao.seteffectivetime(p);
		}
		Integer result = MobileUtil.sendMessage2(managerConfigurationParameter, mobile, message + title);
		if (result < 0) {
			result = MobileUtil.sendMessage(managerConfigurationParameter, mobile, title + message);
			if(result < 5){
				mdto.setCode(Message.M00007.getValue());
				mdto.setMessage(Message.M00007.getName());
				return mdto;
			}
		}
		
		request.getSession().setAttribute("check_code", code);
		mdto.setCode(Message.M00008.getValue());
		mdto.setMessage(Message.M00008.getName());
		mdto.setObjtype(CampaignDto.class.toString());
		mdto.setObj(iCampaignDao.getCampaignById(id));
		return mdto;
	}
}
