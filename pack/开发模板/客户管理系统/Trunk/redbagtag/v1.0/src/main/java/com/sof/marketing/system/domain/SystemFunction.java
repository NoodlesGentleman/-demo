package com.sof.marketing.system.domain;

import java.io.Serializable;
import java.util.Date;

import com.bluemobi.framework.common.dto.PageEntity;

public class SystemFunction extends PageEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer function_id;		// 功能编号
	private String navigation_id;		// 导航编号
	private String function_title;		// 标题
	private String function_remark;		// 备注
	private Integer function_sort;		// 排序
	private Integer function_status;	// 状态
	private Date create_time;			// 创建时间
	private Date update_time;			// 更新时间
	
	public Integer getFunction_id() {
		return function_id;
	}
	public void setFunction_id(Integer function_id) {
		this.function_id = function_id;
	}
	public String getNavigation_id() {
		return navigation_id;
	}
	public void setNavigation_id(String navigation_id) {
		this.navigation_id = navigation_id;
	}
	public String getFunction_title() {
		return function_title;
	}
	public void setFunction_title(String function_title) {
		this.function_title = function_title;
	}
	public String getFunction_remark() {
		return function_remark;
	}
	public void setFunction_remark(String function_remark) {
		this.function_remark = function_remark;
	}
	public Integer getFunction_sort() {
		return function_sort;
	}
	public void setFunction_sort(Integer function_sort) {
		this.function_sort = function_sort;
	}
	public Integer getFunction_status() {
		return function_status;
	}
	public void setFunction_status(Integer function_status) {
		this.function_status = function_status;
	}
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}
	public Date getUpdate_time() {
		return update_time;
	}
	public void setUpdate_time(Date update_time) {
		this.update_time = update_time;
	}
}
