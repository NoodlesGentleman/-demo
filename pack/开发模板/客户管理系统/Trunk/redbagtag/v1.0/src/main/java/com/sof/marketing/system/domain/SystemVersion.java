package com.sof.marketing.system.domain;

import java.io.Serializable;
import java.util.Date;

import com.bluemobi.framework.common.dto.PageEntity;

/**
 * tbl_version表
 * 
 * @author
 */
public class SystemVersion extends PageEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String version_id;			// 版本Id
	private String android_version;		// 安卓版本号
	private String ios_version;			// IOS版本号
	private String android_url;			// 安卓下载地址
	private String ios_url;				// IOS下载地址
	private String android_content;		// 安卓内容
	private String ios_content;			// IOS更新内容
	private Date create_time;			// 创建时间
	private String create_by;			// 创建人
	private Integer android_is_forced;	// 安卓是否强制更新
	private Integer ios_is_forced;		// IOS是否强制更新
	private Integer ios_flag;			// IOS是否可以更新

	public String getVersion_id() {
		return version_id;
	}

	public void setVersion_id(String version_id) {
		this.version_id = version_id;
	}

	public String getAndroid_version() {
		return android_version;
	}

	public void setAndroid_version(String android_version) {
		this.android_version = android_version;
	}

	public String getIos_version() {
		return ios_version;
	}

	public void setIos_version(String ios_version) {
		this.ios_version = ios_version;
	}

	public String getAndroid_url() {
		return android_url;
	}

	public void setAndroid_url(String android_url) {
		this.android_url = android_url;
	}

	public String getIos_url() {
		return ios_url;
	}

	public void setIos_url(String ios_url) {
		this.ios_url = ios_url;
	}

	public String getAndroid_content() {
		return android_content;
	}

	public void setAndroid_content(String android_content) {
		this.android_content = android_content;
	}

	public String getIos_content() {
		return ios_content;
	}

	public void setIos_content(String ios_content) {
		this.ios_content = ios_content;
	}

	public Date getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public String getCreate_by() {
		return create_by;
	}

	public void setCreate_by(String create_by) {
		this.create_by = create_by;
	}

	public Integer getAndroid_is_forced() {
		return android_is_forced;
	}

	public void setAndroid_is_forced(Integer android_is_forced) {
		this.android_is_forced = android_is_forced;
	}

	public Integer getIos_is_forced() {
		return ios_is_forced;
	}

	public void setIos_is_forced(Integer ios_is_forced) {
		this.ios_is_forced = ios_is_forced;
	}

	public Integer getIos_flag() {
		return ios_flag;
	}

	public void setIos_flag(Integer ios_flag) {
		this.ios_flag = ios_flag;
	}
}