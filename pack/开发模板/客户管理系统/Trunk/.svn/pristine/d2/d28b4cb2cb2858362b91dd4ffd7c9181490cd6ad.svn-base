package com.richest.manager.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.richest.manager.dao.IBasicDicDao;
import com.richest.manager.dao.ISendLogDao;
import com.richest.manager.dao.IUserDao;
import com.richest.manager.dao.IWXAccessTokenDao;
import com.richest.manager.domain.BasicDic;
import com.richest.manager.domain.SendLog;
import com.richest.manager.domain.User;
import com.richest.manager.dto.MessageDto;
import com.richest.manager.utils.FinalOpenId;
import com.richest.manager.utils.ManagerConfigurationParameter;
import com.richest.manager.utils.MobileUtil;
import com.richest.manager.utils.WeChatUtil;
import com.richest.manager.utils.TypeConst.Message;

@Controller
@RequestMapping(value="/user")
public class UserController extends BaseController{
	@Autowired
	IBasicDicDao iBasicDicDao;
	
	@Autowired
	IUserDao iUserDao;
	
	@Autowired
	ISendLogDao iSendLogDao;
	
	@Autowired
	IWXAccessTokenDao iWXAccessTokenDao;
	
	@Autowired
	private ManagerConfigurationParameter managerConfigurationParameter;
	
	@ResponseBody
	@RequestMapping(value = "/type/{type_code}",method=RequestMethod.GET)
	protected List<BasicDic> getDictionaryByType(@PathVariable("type_code") String type_code, Model model) throws Exception {
		
		if(StringUtils.hasText(type_code)){
			return iBasicDicDao.getDictionaryByType(type_code);
		}
		return null;
	}
	
	@ResponseBody
	@RequestMapping(value = "/sendcheckcode/{mobile}")
	public MessageDto sendcheckcode(@PathVariable("mobile") String mobile, HttpServletRequest request) throws Exception{
		MessageDto mdto = new MessageDto();
		int code = (int)((Math.random()*9+1)*1000);
		String title = "【品源科技】";
		String message = "验证码是：" + code + "，请不要把验证码泄露给其他人，";
		
		Object obj = request.getSession().getAttribute("userInfo");
		if(null != obj && StringUtils.hasText(((FinalOpenId)obj).getOpenId())){
			WeChatUtil wu = new WeChatUtil();
			wu.sendCheckCode(((FinalOpenId)obj).getOpenId(), String.valueOf(code), iWXAccessTokenDao.getToken().getAccess_token());
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
		SendLog sl = new SendLog();
		sl.setMobile(mobile);
		sl.setFromclass(UserController.class.toString());
		sl.setCheckcode(String.valueOf(code));
		sl.setMethod("sendcheckcode");
		sl.setType("USERREGIST");
		sl.setBuildingId(0);
		sl.setUserId(0);
		iSendLogDao.addSendLog(sl);
		mdto.setCode(Message.M00008.getValue());
		mdto.setMessage(Message.M00008.getName());
		
		return mdto;
	}
	
	@ResponseBody
	@RequestMapping(value = "/add",method=RequestMethod.POST,consumes="application/json")
	protected MessageDto addUser(@RequestBody User user,HttpServletRequest request, HttpServletResponse response) throws Exception {
		MessageDto mdto = new MessageDto();
		String check_code = user.getPassword();
		SendLog sl = new SendLog();
		sl.setMobile(user.getMobile());
		sl.setType("USERREGIST");
		sl.setBuildingId(0);
		sl.setUserId(0);
		sl = iSendLogDao.getLogByMobile(sl);
		if(!StringUtils.hasText(check_code) || null == sl || !sl.getCheckcode().equals(check_code)){
			mdto.setCode(Message.M00009.getValue());
			mdto.setMessage(Message.M00009.getName());
			return mdto;
		}
		Object obj = request.getSession().getAttribute("userInfo");
		if(null != obj && StringUtils.hasText(((FinalOpenId)obj).getOpenId())){
			if(iUserDao.getUserCountByOpenid(((FinalOpenId)obj).getOpenId()) > 0){
				mdto.setCode(Message.M00001.getValue());
				mdto.setMessage(Message.M00001.getName());
				return mdto;
			}else{
				user.setOpenid(((FinalOpenId)obj).getOpenId());
			}
		}else{
			mdto.setCode(Message.M00002.getValue());
			mdto.setMessage(Message.M00002.getName());
			return mdto;
		}
		User new_user = iUserDao.addUser(user);
		if(null != new_user){
			mdto.setCode(Message.M00000.getValue());
			mdto.setMessage(Message.M00000.getName());
			mdto.setObjtype(User.class.toString());
			mdto.setObj(new_user);
			/*FinalOpenId OpenIdInstance = new FinalOpenId(((FinalOpenId)obj).getOpenId(), new_user);
			request.getSession().setAttribute("userInfo", OpenIdInstance);*/
		}
		return mdto;
	}
	

	@RequestMapping(value = "/upd",method=RequestMethod.POST,consumes="application/json")
	@ResponseBody
	protected MessageDto updateUser(@RequestBody User user,HttpServletRequest request, HttpServletResponse response) throws Exception {
		MessageDto mdto = new MessageDto();
		Object obj = request.getSession().getAttribute("userInfo");
		if(null != obj && StringUtils.hasText(((FinalOpenId)obj).getOpenId())){
			user.setId(((FinalOpenId)obj).getUser().getId());
		}else{
			mdto.setCode(Message.M00002.getValue());
			mdto.setMessage(Message.M00002.getName());
			return mdto;
		}
		User new_user = iUserDao.updateUser(user);
		if(null != new_user){
			mdto.setCode(Message.M00003.getValue());
			mdto.setMessage(Message.M00003.getName());
			mdto.setObjtype(User.class.toString());
			mdto.setObj(new_user);
			FinalOpenId OpenIdInstance = new FinalOpenId(((FinalOpenId)obj).getOpenId(), new_user);
			request.getSession().setAttribute("userInfo", OpenIdInstance);
		}else{
			mdto.setCode(Message.M00004.getValue());
			mdto.setMessage(Message.M00004.getName());
		}
		return mdto;
	}
	
	@ResponseBody
	@RequestMapping(value = "/get/{uid}",method=RequestMethod.GET)
	protected User getUserById(@PathVariable("uid") int id) throws Exception {
		
		return iUserDao.getUserById(id);
	}
}
