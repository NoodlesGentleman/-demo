package com.richest.manager.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ManagerConfigurationParameter {
	private String wechat_appid;
	private String wechat_secret;
	private String wechat_oauth2_url;
	private String serviceUrl;
	private String userName;
	private String password;
	private String serviceUrl2;
	private String userName2;
	private String password2;
	
	public String getWechat_appid() {
		return wechat_appid;
	}
	
	@Value("#{settings['wechat.appid']}")
	public void setWechat_appid(String wechat_appid) {
		this.wechat_appid = wechat_appid;
	}
	public String getWechat_secret() {
		return wechat_secret;
	}
	
	@Value("#{settings['wechat.secret']}")
	public void setWechat_secret(String wechat_secret) {
		this.wechat_secret = wechat_secret;
	}
	public String getWechat_oauth2_url() {
		return wechat_oauth2_url;
	}
	
	@Value("#{settings['wechat.oauth2.url']}")
	public void setWechat_oauth2_url(String wechat_oauth2_url) {
		this.wechat_oauth2_url = wechat_oauth2_url;
	}

	public String getServiceUrl() {
		return serviceUrl;
	}
	@Value("#{settings['serviceUrl']}")
	public void setServiceUrl(String serviceUrl) {
		this.serviceUrl = serviceUrl;
	}

	public String getUserName() {
		return userName;
	}
	@Value("#{settings['userName']}")
	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}
	@Value("#{settings['password']}")
	public void setPassword(String password) {
		this.password = password;
	}
	public String getServiceUrl2() {
		return serviceUrl2;
	}
	@Value("#{settings['serviceUrl2']}")
	public void setServiceUrl2(String serviceUrl2) {
		this.serviceUrl2 = serviceUrl2;
	}

	public String getUserName2() {
		return userName2;
	}
	@Value("#{settings['userName2']}")
	public void setUserName2(String userName2) {
		this.userName2 = userName2;
	}

	public String getPassword2() {
		return password2;
	}
	@Value("#{settings['password2']}")
	public void setPassword2(String password2) {
		this.password2 = password2;
	}
}
