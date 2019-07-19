package com.sof.marketing.system.util;

public class Constant {
	//红包任务类型
	public final static String REDPACK_JOBTYPE_YC = "YC";	//一次性
	public final static String REDPACK_JOBTYPE_DS = "DS";	//定时
	public final static String REDPACK_JOBTYPE_CF = "CF";	//触发
	
	//验证码有效时间
    public static final Integer CHECKCODE_EXPIRES_IN = 30 * 60 * 1000;
	
	public static String STATUS_SUCCESS = "1";
	public static String STATUS_FAIL = "0";
	
	public static String SYSTEM_ERROR = "系统异常";
	
	public static String REGEISTER_MSG01 = "该用户已被注册";
	public static String REGEISTER_MSG02 = "注册成功";
	public static String REGEISTER_MSG03 = "注册失败";
	public static String REGEISTER_MSG04 = "验证码错误";
	public static String REGEISTER_MSG05 = "邀请码无效";
	
	public static String LOGIN_MSG01 = "登录成功";
	public static String LOGIN_MSG02 = "用户不存在"; 
	public static String LOGIN_MSG03 = "用户名或密码错误"; 
	public static String LOGIN_MSG04 = "此账号已被禁用"; 
	
	public static String CHECKCODE_MSG01 = "验证码发送成功";
	public static String CHECKCODE_MSG02 = "验证码发送失败";
	
	public static String RESETPASS_MSG01 = "密码重置成功";
	public static String RESETPASS_MSG02 = "密码重置失败";
	
	public static String SAVE_MSG01 = "保存成功";
	public static String SAVE_MSG02 = "保存失败";
	
	public static String BEGOOD_MSG01 = "点赞成功";
	public static String BEGOOD_MSG02 = "点赞失败";
	
	public static String ACTSIGN_MSG01 = "该手机号码已报名";
	
	public static String WXUSER_MSG01 = "获取openid失败";
	
	public static String MSG_GROUP_PERSONAL = "DGYH";
	public static String MSG_GROUP_USER = "GRYH";
	public static String MSG_GROUP_ENTERPRISE = "QYYH";
	public static String MSG_GROUP_ALL = "SYYH";
	
	public static String MSG_SEND_SUCCESS = "发送成功！";
	public static String MSG_SEND_FAIL = "发送成功！";
	
	public static String COLLECTION_FAIL_MSG1 = "已收藏";
	public static String COLLECT_MSG01 = "收藏成功";
	public static String COLLECT_MSG02 = "收藏失败";
}
