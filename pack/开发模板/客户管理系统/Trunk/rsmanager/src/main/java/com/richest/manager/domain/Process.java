package com.richest.manager.domain;

import java.math.BigDecimal;
import java.util.Date;

public class Process {
	private int id;
	private int campaignId;
	private String event_code;
	private String event_name;
	private Date eventTime;
	private String result;
	private BigDecimal commission;
	private int sort;
	private String roomNum;
	private int isrefund;
	private String contractNo;
	private Date signTime;
	private int isRequest;
	private int parentId;
	
	public String getRoomNum() {
		return roomNum;
	}
	public void setRoomNum(String roomNum) {
		this.roomNum = roomNum;
	}
	public int getIsrefund() {
		return isrefund;
	}
	public void setIsrefund(int isrefund) {
		this.isrefund = isrefund;
	}
	public String getContractNo() {
		return contractNo;
	}
	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}
	public Date getSignTime() {
		return signTime;
	}
	public void setSignTime(Date signTime) {
		this.signTime = signTime;
	}
	public int getIsRequest() {
		return isRequest;
	}
	public void setIsRequest(int isRequest) {
		this.isRequest = isRequest;
	}
	public int getParentId() {
		return parentId;
	}
	public void setParentId(int parentId) {
		this.parentId = parentId;
	}
	public BigDecimal getCommission() {
		return commission;
	}
	public void setCommission(BigDecimal commission) {
		this.commission = commission;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCampaignId() {
		return campaignId;
	}
	public void setCampaignId(int campaignId) {
		this.campaignId = campaignId;
	}
	public String getEvent_code() {
		return event_code;
	}
	public void setEvent_code(String event_code) {
		this.event_code = event_code;
	}
	public String getEvent_name() {
		return event_name;
	}
	public void setEvent_name(String event_name) {
		this.event_name = event_name;
	}
	public Date getEventTime() {
		return eventTime;
	}
	public void setEventTime(Date eventTime) {
		this.eventTime = eventTime;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public int getSort() {
		return sort;
	}
	public void setSort(int sort) {
		this.sort = sort;
	}
}
