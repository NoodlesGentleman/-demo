package com.richest.manager.domain;

public class BuildingProperty {
	private int buildingId;
	private String Property_code;
	private String Property_name;
	
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
	public String getProperty_name() {
		return Property_name;
	}
	public void setProperty_name(String property_name) {
		Property_name = property_name;
	}
}
