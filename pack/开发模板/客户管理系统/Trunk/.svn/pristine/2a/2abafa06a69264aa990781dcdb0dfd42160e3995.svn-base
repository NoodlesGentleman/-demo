package com.richest.manager.utils;

import com.nineorange.service.BusinessService;

public class MobileUtil {
	public static Integer sendMessage(ManagerConfigurationParameter mobileConfigurationParameter,String moblies,String messages) {
		BusinessService bs = new BusinessService();
		bs.setWebService(mobileConfigurationParameter.getServiceUrl());
		int nRet = bs.validateUser(mobileConfigurationParameter.getUserName(), mobileConfigurationParameter.getPassword());
		if(nRet != 1) {
			System.out.println("登录失败！");
			return -2;
		}
		
		System.out.println("登录成功！");
		
		nRet = bs.sendMessage(mobileConfigurationParameter.getUserName(), mobileConfigurationParameter.getPassword(), moblies, messages);
		if(nRet <= 0){
			System.out.println("发送消息失败，返回值："+nRet);
			return nRet;
		}
		
		//System.out.println("发送消息成功，任务ID："+nRet+"，可以根据这个ID查询消息处理情况。");
		return nRet;
	}
	
	public static Integer sendMessage2(ManagerConfigurationParameter mobileConfigurationParameter, String mobiles, String messages) {
		// TODO Auto-generated method stub
		BusinessService bs = new BusinessService();
		bs.setWebService(mobileConfigurationParameter.getServiceUrl2());
		int nRet = bs.validateUser(mobileConfigurationParameter.getUserName2(), mobileConfigurationParameter.getPassword2());
		if(nRet != 1) {
			System.out.println("登录失败！");
			return -2;
		}
		
		System.out.println("登录成功！");
		
		nRet = bs.sendBatchMessage(mobileConfigurationParameter.getUserName2(), mobileConfigurationParameter.getPassword2(), mobiles, messages);
		if(nRet <= 0){
			System.out.println("发送消息失败，返回值："+nRet);
			return nRet;
		}
		
		//System.out.println("发送消息成功，任务ID："+nRet+"，可以根据这个ID查询消息处理情况。");
		return nRet;
	}
}
