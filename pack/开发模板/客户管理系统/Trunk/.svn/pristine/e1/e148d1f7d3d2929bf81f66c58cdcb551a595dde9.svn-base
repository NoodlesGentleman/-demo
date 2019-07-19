package com.sof.marketing.system.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

import com.bluemobi.framework.common.dto.PageEntity;

public class SystemNavigation extends PageEntity implements Serializable {

	public static final long serialVersionUID = 1L;

	private String navigationId;		// 导航栏编号
	private String parentId;			// 父级编号
	private Integer level;				// 层级（从1开始）
	private String title;				// 标题
	private String link;				// 外链地址
	private Byte loadType;				// 加载方式。1：ajax 加载；2：iframe 加载；
	private String description;			// 描述
	private String icon;				// 导航的图标
	private String iconBg;				// 导航的图标背景
	private Integer sortOrder;			// 排序序列
	private Byte status;				// 状态     是否启用。1：是；0：否；
	private Date ctime;					// 创建时间
	private Date mtime;					// 修改时间
	private String user_id;				// 用户编号

	/** 获取 属性 */
	public String getUser_id() {
		return user_id;
	}

	/** 设置 属性 */
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	/** 获取 属性 */
	public String getNavigationId() {
		return navigationId;
	}

	/** 设置 属性 */
	public void setNavigationId(String navigationId) {
		this.navigationId = navigationId;
	}

	/** 获取 parent navigation_id 属性 */
	public String getParentId() {
		return parentId;
	}

	/** 设置 parent navigation_id 属性 */
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	/** 获取 hierarchically category id 属性 */
	public Integer getLevel() {
		return level;
	}

	/** 设置 hierarchically category id 属性 */
	public void setLevel(Integer level) {
		this.level = level;
	}

	/** 获取 category title 属性 */
	public String getTitle() {
		return title;
	}

	/** 设置 category title 属性 */
	public void setTitle(String title) {
		this.title = title;
	}

	/** 获取 属性 */
	public String getLink() {
		return link;
	}

	/** 设置 属性 */
	public void setLink(String link) {
		this.link = link;
	}

	/** 获取 加载方式。1：ajax 加载；2：iframe 加载； 属性 */
	public Byte getLoadType() {
		return loadType;
	}

	/** 设置 加载方式。1：ajax 加载；2：iframe 加载； 属性 */
	public void setLoadType(Byte loadType) {
		this.loadType = loadType;
	}

	/** 获取 属性 */
	public String getDescription() {
		return description;
	}

	/** 设置 属性 */
	public void setDescription(String description) {
		this.description = description;
	}

	/** 获取 导航 icon 属性 */
	public String getIcon() {
		return icon;
	}

	/** 设置 导航 icon 属性 */
	public void setIcon(String icon) {
		this.icon = icon;
	}

	/** 获取 导航 icon 背景 属性 */
	public String getIconBg() {
		return iconBg;
	}

	/** 设置 导航 icon 背景 属性 */
	public void setIconBg(String iconBg) {
		this.iconBg = iconBg;
	}

	/** 获取 序号 属性 */
	public Integer getSortOrder() {
		return sortOrder;
	}

	/** 设置 序号 属性 */
	public void setSortOrder(Integer sortOrder) {
		this.sortOrder = sortOrder;
	}

	/** 获取 是否启用。1：是；0：否； 属性 */
	public Byte getStatus() {
		return status;
	}

	/** 设置 是否启用。1：是；0：否； 属性 */
	public void setStatus(Byte status) {
		this.status = status;
	}

	/** 获取 属性 */
	public Date getCtime() {
		return ctime;
	}

	/** 设置 属性 */
	public void setCtime(Date ctime) {
		this.ctime = ctime;
	}

	/** 获取 属性 */
	public Date getMtime() {
		return mtime;
	}

	/** 设置 属性 */
	public void setMtime(Date mtime) {
		this.mtime = mtime;
	}
	
	/**********************INIT**************************/
	public SystemNavigation() {
		this.navigationId = UUID.randomUUID().toString();
	}
	public SystemNavigation(String navigationId) {
		this.navigationId = navigationId;
	}
	public SystemNavigation(boolean flag) {
		if(flag) {
			this.navigationId = UUID.randomUUID().toString();
		}
	}
}