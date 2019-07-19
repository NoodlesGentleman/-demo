package com.richest.manager.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.alibaba.fastjson.JSON;
import com.richest.manager.dao.IUserDao;
import com.richest.manager.domain.User;
import com.richest.manager.domain.WchatUser;
import com.richest.manager.utils.FinalOpenId;
import com.richest.manager.utils.ManagerConfigurationParameter;
import com.richest.manager.utils.NullUserException;

@Controller
public class BaseController extends HandlerInterceptorAdapter{
	@Autowired
	IUserDao iUserDao;
	@Autowired
	ManagerConfigurationParameter managerConfigurationParameter;

	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		Object obj = request.getSession().getAttribute("userInfo");
		if(obj == null || ((FinalOpenId)obj).getUser() == null){
			throw new NullUserException();
		}
		return true;
	}
		
	public void postHandle(HttpServletRequest request, HttpServletResponse response, 
			Object handler, ModelAndView modelAndView) throws Exception {
		
	}
			 
			 
	public void afterCompletion(HttpServletRequest request,
		HttpServletResponse response, Object handler, Exception ex)
		throws Exception {
	}
	
	protected void getUserOpenId(HttpServletRequest request, HttpServletResponse response) throws IOException{
		String code = request.getParameter("code");
		if(StringUtils.hasText(code)){
			String urlstr = managerConfigurationParameter.getWechat_oauth2_url();
			URL url = new URL(urlstr.replace("{CODE}", code));
			/*URL url = new URL("https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxfe5a8d9b975666a1&secret=08723ab2011b40af5318819d419fc5ad&code="
					+code+"&grant_type=authorization_code");*/
			//返回一个 URLConnection 对象，它表示到 URL 所引用的远程对象的连接。 
	        URLConnection uc = url.openConnection(); 
	        //打开的连接读取的输入流。 
	        InputStreamReader reader = new InputStreamReader(uc.getInputStream()); 
	        BufferedReader br = new BufferedReader(reader);
	        String result = "";
	        String str;
	        while((str = br.readLine()) != null) {
	        	result += str; 
	        }
	        br.close();
	        
	        WchatUser wchatuser = JSON.parseObject(result, WchatUser.class);
	        String openid = wchatuser.getOpenid();
	        User user = null;
			if(StringUtils.hasText(openid)){
				user = iUserDao.getUserByOpenId(openid);
			}
			FinalOpenId OpenIdInstance = new FinalOpenId(openid, user);
			request.getSession().setAttribute("userInfo", OpenIdInstance);
		}else{
			/*User user = iUserDao.getUserByOpenId("oBK68uI3xfMMzJZFrkrBpjOcz9a41");
			FinalOpenId OpenIdInstance = new FinalOpenId("oBK68uI3xfMMzJZFrkrBpjOcz9a41", user);
			request.getSession().setAttribute("userInfo", OpenIdInstance);*/
		}
	}
}
