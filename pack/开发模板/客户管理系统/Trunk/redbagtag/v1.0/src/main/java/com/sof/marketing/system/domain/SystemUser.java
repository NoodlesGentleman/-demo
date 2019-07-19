package com.sof.marketing.system.domain;

import java.io.Serializable;
import java.util.UUID;

import com.bluemobi.framework.common.dto.PageEntity;

public class SystemUser extends PageEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	private String user_id;			// 用户编号
	private String user_login_name;	// 用户登录名
	private String user_pwd;		// 用户密码
	private String randomStr;		// 密码随机字符串
	private String userName;		// 用户名称
	private String userMobile;		// 用户手机号
	private Integer userSex;		// 用户性别
	private Integer isSuperAdmin;	// 是否超级管理员（1为超级管理员）
	
	// 查询关联字段
	private String role_name;		// 角色组名称
	private String role_id;			// 角色组编号

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_login_name() {
		return user_login_name;
	}

	public void setUser_login_name(String user_login_name) {
		this.user_login_name = user_login_name;
	}

	public String getUser_pwd() {
		return user_pwd;
	}

	public void setUser_pwd(String user_pwd) {
		this.user_pwd = user_pwd;
	}

	public String getRandomStr() {
		return randomStr;
	}

	public void setRandomStr(String randomStr) {
		this.randomStr = randomStr;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserMobile() {
		return userMobile;
	}

	public void setUserMobile(String userMobile) {
		this.userMobile = userMobile;
	}

	public Integer getUserSex() {
		return userSex;
	}

	public void setUserSex(Integer userSex) {
		this.userSex = userSex;
	}
	
	public Integer getIsSuperAdmin() {
		return isSuperAdmin;
	}

	public void setIsSuperAdmin(Integer isSuperAdmin) {
		this.isSuperAdmin = isSuperAdmin;
	}

	public String getRole_name() {
		return role_name;
	}

	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}

	public String getRole_id() {
		return role_id;
	}

	public void setRole_id(String role_id) {
		this.role_id = role_id;
	}

	/******************INIT*******************/
	public SystemUser(){
		this.user_id = UUID.randomUUID().toString();
	}
	public SystemUser(boolean flag){
		if(flag) {
			this.user_id = UUID.randomUUID().toString();
		}
	}
	public SystemUser(String user_id){
		this.user_id = user_id;
	}
}
