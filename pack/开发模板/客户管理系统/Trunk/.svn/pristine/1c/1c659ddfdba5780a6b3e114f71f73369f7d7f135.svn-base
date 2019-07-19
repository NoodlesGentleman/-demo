package com.richest.manager.quartz.job;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.Date;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import com.richest.manager.dao.IWXAccessTokenDao;
import com.richest.manager.domain.AccessToken;
import com.richest.manager.utils.ManagerConfigurationParameter;



public class WXAccessTokenUtil {

	@Autowired
	private IWXAccessTokenDao iWXAccessTokenDao;
	@Autowired
	ManagerConfigurationParameter managerConfigurationParameter;
	
	public AccessToken getAccessToken(){
		AccessToken at = iWXAccessTokenDao.getToken();
		if(null == at || !StringUtils.hasText(at.getAccess_token())){
			at = getTokenFromWX();
		}
		return at;
	}
	
	public AccessToken getTokenFromWX() {
		AccessToken accessToken = new AccessToken();
		String appid = managerConfigurationParameter.getWechat_appid();
		String secret = managerConfigurationParameter.getWechat_secret();
		try{
			URL url = new URL("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="
					+ appid + "&secret=" + secret);
		
			//返回一个 URLConnection 对象，它表示到 URL 所引用的远程对象的连接。 
	        URLConnection uc = url.openConnection(); 
	        //打开的连接读取的输入流。 
	        InputStreamReader reader = new InputStreamReader(uc.getInputStream(), "UTF-8"); 
	        BufferedReader br = new BufferedReader(reader);
	        String result = "";
	        String str;
	        while((str = br.readLine()) != null) {
	        	result += str; 
	        }
	        br.close();
	        JSONObject jsonobject = JSONObject.fromObject(result);
	        
	        accessToken.setAccess_token(jsonobject.get("access_token") == null ? "" : jsonobject.getString("access_token"));
	        accessToken.setExpires_in(jsonobject.get("expires_in") == null ? 0 : jsonobject.getInt("expires_in"));
	        accessToken.setErrmsg(jsonobject.get("errcode") == null ? "" : jsonobject.getString("errcode"));
	        accessToken.setErrmsg(jsonobject.get("errmsg") == null ? "" : jsonobject.getString("errmsg"));
	        accessToken.setCreateTime(new Date());
	        iWXAccessTokenDao.addAccessToken(accessToken);
			if(StringUtils.hasText(accessToken.getErrcode())){
				throw new Exception();
			}
		}catch(Exception e){
			e.printStackTrace();
			getTokenFromWX();
		}
		return accessToken;
	}
	
	public static AccessToken getTokenFromWX(String appid, String secret) {
		AccessToken accessToken = new AccessToken();
		try{
			URL url = new URL("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="
					+ appid + "&secret=" + secret);
		
			//返回一个 URLConnection 对象，它表示到 URL 所引用的远程对象的连接。 
	        URLConnection uc = url.openConnection(); 
	        //打开的连接读取的输入流。 
	        InputStreamReader reader = new InputStreamReader(uc.getInputStream(), "UTF-8"); 
	        BufferedReader br = new BufferedReader(reader);
	        String result = "";
	        String str;
	        while((str = br.readLine()) != null) {
	        	result += str; 
	        }
	        br.close();
	        JSONObject jsonobject = JSONObject.fromObject(result);
	        
	        accessToken.setAccess_token(jsonobject.get("access_token") == null ? "" : jsonobject.getString("access_token"));
	        accessToken.setExpires_in(jsonobject.get("expires_in") == null ? 0 : jsonobject.getInt("expires_in"));
	        accessToken.setErrmsg(jsonobject.get("errcode") == null ? "" : jsonobject.getString("errcode"));
	        accessToken.setErrmsg(jsonobject.get("errmsg") == null ? "" : jsonobject.getString("errmsg"));
	        accessToken.setCreateTime(new Date());
	        
			if(StringUtils.hasText(accessToken.getErrcode())){
				throw new Exception();
			}
			
		}catch(Exception e){
			e.printStackTrace();
			getTokenFromWX(appid, secret);
		}
		return accessToken;
	}
}
