package com.sof.marketing.system.domain;

import java.io.Serializable;

import com.bluemobi.framework.common.dto.PageEntity;

public class SystemRoleNav extends PageEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String sysNavId;	// 选项编号
	private String roleId;		// 角色编号
	private String title;		// 标题
	private String description;	// 描述

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSysNavId() {
		return sysNavId;
	}

	public void setSysNavId(String sysNavId) {
		this.sysNavId = sysNavId;
	}

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
}
