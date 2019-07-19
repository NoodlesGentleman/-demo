package com.sof.marketing.system.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Config {

	private static final Logger logger = LoggerFactory.getLogger(Config.class);

	private static String fileName = "config.properties";

	/** 项目名 */
	public static String SITE_NAME;
	/** 项目url */
	public static String STORE_URL;
	/** 项目内部使用的静态资源，js库等 */
	public static String STATIC_URL;
	/** 其他静态资源，图片、视频等，可能会放到CDN */
	public static String STATIC_CDN;
	/** 图片服务器地址 */
	public static String IMG_URL;
	/** 上传文件路径服务器地址 */
	public static String UPLOADFILE_PATH;
	/** WEBSERVICE的地址 */
	public static String WEBSERVICE_URL;
	/** 一卡通WEBSERVICE的地址 */
	public static String CARDWEBSERVICE_URL;
	/** 安卓上传安装包路径 */
	public static String ANDROID_APK_PATH;
	/** 没有找到页面时，所跳转的页面 */
	public static String NOTFIND_URL;
	/** 版权设置 */
	public static String COPY_RIGHT;
	/** 是否正式环境 */
	public static String IS_FORMAL;

	static {

		Config.loadConfig();

	}

	/**
	 * 加载config.properties文件
	 * 
	 * @author haojian Jan 24, 2013 3:16:17 PM
	 */
	private static void loadConfig() {

		Properties p = getProperties(fileName);
		SITE_NAME = p.getProperty("SITE_NAME");
		STORE_URL = p.getProperty("STORE_URL");
		STATIC_URL = p.getProperty("STATIC_URL");
		STATIC_CDN = p.getProperty("STATIC_CDN");
		IMG_URL = p.getProperty("IMG_URL");
		UPLOADFILE_PATH = p.getProperty("UPLOADFILE_PATH");
		WEBSERVICE_URL = p.getProperty("WEBSERVICE_URL");
		CARDWEBSERVICE_URL = p.getProperty("CARDWEBSERVICE_URL");
		ANDROID_APK_PATH = p.getProperty("ANDROID_APK_PATH");
		NOTFIND_URL = p.getProperty("NOTFIND_URL");
		COPY_RIGHT = p.getProperty("COPY_RIGHT");
		IS_FORMAL = p.getProperty("ISFORMAL");

		logger.info("配置信息：【{}】", new Object[] { p.toString() });
	}

	/**
	 * 读取propertity文件的方法
	 * 
	 * @author haojian Apr 27, 2012 3:00:56 PM
	 * @param fileName
	 * @return
	 */
	public static Properties getProperties(String fileName) {
		InputStream is = Config.class.getClassLoader().getResourceAsStream(
				fileName);
		Properties properties = new Properties();
		try {
			properties.load(is);
			if (is != null)
				is.close();
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		return properties;
	}
}
