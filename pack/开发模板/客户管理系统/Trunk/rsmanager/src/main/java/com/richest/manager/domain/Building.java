package com.richest.manager.domain;

public class Building {
	private int id;
	private String name;
	private String imgUrl;
	private String imgLink;
	private String thumbnailUrl;
	private String baseInfo;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	public String getImgLink() {
		return imgLink;
	}
	public void setImgLink(String imgLink) {
		this.imgLink = imgLink;
	}
	public String getThumbnailUrl() {
		return thumbnailUrl;
	}
	public void setThumbnailUrl(String thumbnailUrl) {
		this.thumbnailUrl = thumbnailUrl;
	}
	public String getBaseInfo() {
		return baseInfo;
	}
	public void setBaseInfo(String baseInfo) {
		this.baseInfo = baseInfo;
	}
}
