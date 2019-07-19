package com.richest.manager.dto;

import java.util.Date;
import java.util.List;
import com.richest.manager.domain.Process;

public class CampaignDto {
	private int id;
	private String code;
	private int userId;
	private String userName;
	private String userMobile;
	private String userCompany;
	private String cardId;
	private String type_code;
	private int customerId;
	private String customerName;
	private String customermobile;
	private int buildingId;
	private String buildingName;
	private String Property_code;
	private String Property_name;
	private int receiveId;
	private String receiveName;
	private int isAccompany;
	private int salerId;
	private String salerName;
	private Date appointmentTime;
	private Date createTime;
	private String status;
	private String status_value;
	private List<Process> processlist;
	private Date protectDate;
	private String checkcode;
	
	public String getUserCompany() {
		return userCompany;
	}
	public void setUserCompany(String userCompany) {
		this.userCompany = userCompany;
	}
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
	public String getCardId() {
		return cardId;
	}
	public void setCardId(String cardId) {
		this.cardId = cardId;
	}
	public String getType_code() {
		return type_code;
	}
	public void setType_code(String type_code) {
		this.type_code = type_code;
	}
	public String getUserMobile() {
		return userMobile;
	}
	public void setUserMobile(String userMobile) {
		this.userMobile = userMobile;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public List<Process> getProcesslist() {
		return processlist;
	}
	public void setProcesslist(List<Process> processlist) {
		this.processlist = processlist;
	}
	public String getBuildingName() {
		return buildingName;
	}
	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}
	public String getProperty_name() {
		return Property_name;
	}
	public void setProperty_name(String property_name) {
		Property_name = property_name;
	}
	public String getReceiveName() {
		return receiveName;
	}
	public void setReceiveName(String receiveName) {
		this.receiveName = receiveName;
	}
	public String getSalerName() {
		return salerName;
	}
	public void setSalerName(String salerName) {
		this.salerName = salerName;
	}
	public String getStatus_value() {
		return status_value;
	}
	public void setStatus_value(String status_value) {
		this.status_value = status_value;
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
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
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
