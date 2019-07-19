package com.richest.manager.utils;

import java.util.ResourceBundle;

public class ResourceHolder {
	private static class ResourceHelper{
        private static ResourceBundle resource = ResourceBundle.getBundle("manager");
   }
	
	private ResourceHolder(){}
	
	public static String getValue(String key){
		return ResourceHelper.resource.getString(key);
	}
}
