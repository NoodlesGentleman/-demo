package com.richest.manager.domain;

import java.util.Date;

public class NaturalVisit {
	private Integer id;
	private Integer buildingId;
	private String mobile;
	private Date protectDate;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getBuildingId() {
		return buildingId;
	}
	public void setBuildingId(Integer buildingId) {
		this.buildingId = buildingId;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public Date getProtectDate() {
		return protectDate;
	}
	public void setProtectDate(Date protectDate) {
		this.protectDate = protectDate;
	}
}
