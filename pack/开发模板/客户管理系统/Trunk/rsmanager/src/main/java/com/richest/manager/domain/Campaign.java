package com.richest.manager.domain;

import java.util.Date;

public class Campaign {
	private int id;
	private String code;
	private int userId;
	private int customerId;
	private String customermobile;
	private int buildingId;
	private String Property_code;
	private int receiveId;
	private int isAccompany;
	private int salerId;
	private Date appointmentTime;
	private Date createTime;
	private String status;
	private Date protectDate;
	private String checkcode;
	
	public String getCheckcode() {
		return checkcode;
	}
	public void setCheckcode(String checkcode) {
		this.checkcode = checkcode;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public String getCustomermobile() {
		return customermobile;
	}
	public void setCustomermobile(String customermobile) {
		this.customermobile = customermobile;
	}
	public int getBuildingId() {
		return buildingId;
	}
	public void setBuildingId(int buildingId) {
		this.buildingId = buildingId;
	}
	public String getProperty_code() {
		return Property_code;
	}
	public void setProperty_code(String property_code) {
		Property_code = property_code;
	}
	public int getReceiveId() {
		return receiveId;
	}
	public void setReceiveId(int receiveId) {
		this.receiveId = receiveId;
	}
	public int getIsAccompany() {
		return isAccompany;
	}
	public void setIsAccompany(int isAccompany) {
		this.isAccompany = isAccompany;
	}
	public int getSalerId() {
		return salerId;
	}
	public void setSalerId(int salerId) {
		this.salerId = salerId;
	}
	public Date getAppointmentTime() {
		return appointmentTime;
	}
	public void setAppointmentTime(Date appointmentTime) {
		this.appointmentTime = appointmentTime;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getProtectDate() {
		return protectDate;
	}
	public void setProtectDate(Date protectDate) {
		this.protectDate = protectDate;
	}
}
