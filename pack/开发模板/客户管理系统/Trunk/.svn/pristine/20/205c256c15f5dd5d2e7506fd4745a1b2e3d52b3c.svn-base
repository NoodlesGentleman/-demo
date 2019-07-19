package com.richest.manager.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.richest.manager.dao.IBuildingDao;
import com.richest.manager.dao.ICampaignDao;
import com.richest.manager.dao.ICustomerDao;
import com.richest.manager.dao.ISendLogDao;
import com.richest.manager.dao.IUserDao;
import com.richest.manager.domain.Building;
import com.richest.manager.domain.Campaign;
import com.richest.manager.domain.Process;
import com.richest.manager.domain.Customer;
import com.richest.manager.domain.SendLog;
import com.richest.manager.domain.User;
import com.richest.manager.dto.CampaignDto;
import com.richest.manager.dto.MessageDto;
import com.richest.manager.service.IProcessService;
import com.richest.manager.utils.FinalOpenId;
import com.richest.manager.utils.MobileUtil;
import com.richest.manager.utils.TypeConst.Message;

@Controller
@RequestMapping(value="/customer")
public class CustomerController extends BaseController{
	@Autowired
	ICustomerDao iCustomerDao;
	@Autowired
	IUserDao iUserDao;
	@Autowired
	IBuildingDao iBuildingDao;
	@Autowired
	ISendLogDao iSendLogDao;
	@Autowired
	ICampaignDao iCampaignDao;
	@Autowired
	IProcessService iProcessService;
	
	@ResponseBody
	@RequestMapping(value = "/list",method=RequestMethod.GET)
	protected List<Customer> getCustomerByUserId(HttpServletRequest request) throws Exception {
		Object obj = request.getSession().getAttribute("userInfo");
		return iCustomerDao.getCustomerByUserId(((FinalOpenId)obj).getUser().getId());
	}
	
	@RequestMapping(value = "/regist/{uid}/{bid}",method=RequestMethod.GET)
	protected ModelAndView scanRegist(HttpServletRequest request, Map<String,Object> map, @PathVariable("uid") int uid, @PathVariable("bid") int bid) {
		User user = iUserDao.getUserById(uid);
		Building building = iBuildingDao.getBuildingById(bid);
		map.put("user", user);
		map.put("building", building);
		return new ModelAndView("/WEB-INF/scan-regist");
	}
	
	@RequestMapping(value = "/check/{cid}/{sid}",method=RequestMethod.GET)
	protected ModelAndView scanCheck(HttpServletRequest request, Map<String,Object> map, @PathVariable("cid") int campaignId, @PathVariable("sid") int salerId) {
		map.put("campaign", iCampaignDao.getCampaignById(campaignId));
		map.put("saler", iUserDao.getUserById(salerId));
		return new ModelAndView("/WEB-INF/scan-check");
	}
	
	@ResponseBody
	@RequestMapping(value = "/checkin/{code}/{cid}/{sid}",method=RequestMethod.GET)
	protected MessageDto getCustomerByUserId(HttpServletRequest request, @PathVariable("code") String code, @PathVariable("cid") int campaignId, @PathVariable("sid") int salerId) throws Exception {
		MessageDto mdto = new MessageDto();
		mdto.setCode(Message.M00017.getValue());
		mdto.setMessage(Message.M00017.getName());
		CampaignDto campaignDto = iCampaignDao.getCampaignById(campaignId);
		if(campaignDto.getCheckcode().equals(code)){
			Campaign campaign = new Campaign();
			campaign.setId(campaignDto.getId());
			campaign.setSalerId(salerId);
			
			for(Process item : campaignDto.getProcesslist()){
				if(item.getEvent_code().equals("DFDJ")){
					item.setEventTime(new Date());
					item.setResult("扫码报备");
					if(null != iProcessService.updateProcess(item, campaign)){
						mdto.setCode(Message.M00016.getValue());
						mdto.setMessage(Message.M00016.getName());
					}
					break;
				}
			}
		}else{
			mdto.setCode(Message.M00009.getValue());
			mdto.setMessage(Message.M00009.getName());
		}
		return mdto;
	}
	
	@ResponseBody
	@RequestMapping(value = "/check/{mobile}/{bid}/{uid}", method=RequestMethod.GET)
	protected MessageDto check(HttpServletRequest request, @PathVariable("mobile") String mobile, @PathVariable("bid") Integer bid, @PathVariable("uid") Integer uid) throws Exception {
		MessageDto mdto = new MessageDto();
		int code = (int)((Math.random()*9+1)*1000);
		String title = "【" + iBuildingDao.getBuildingById(bid).getName() + "】";
		String message = "验证码是：" + code + "，请不要把验证码泄露给其他人，";
		
		Integer result = MobileUtil.sendMessage2(managerConfigurationParameter, mobile, message + title);
		
		if (result < 0) {
			result = MobileUtil.sendMessage(managerConfigurationParameter, mobile, title + message);
			if(result < 5){
				mdto.setCode(Message.M00007.getValue());
				mdto.setMessage(Message.M00007.getName());
				return mdto;
			}
		}
		SendLog sl = new SendLog();
		sl.setMobile(mobile);
		sl.setFromclass(CustomerController.class.toString());
		sl.setCheckcode(String.valueOf(code));
		sl.setMethod("check");
		sl.setType("CUSTOMERREGIST");
		sl.setBuildingId(bid);
		sl.setUserId(uid);
		iSendLogDao.addSendLog(sl);
		request.getSession().setAttribute("check_code", code);
		mdto.setCode(Message.M00008.getValue());
		mdto.setMessage(Message.M00008.getName());
		
		return mdto;
	}
}
