package com.sof.marketing.listener;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.sof.marketing.system.util.Config;

public class InitListener implements ServletContextListener {
	private static WebApplicationContext webApplicationContext;
	private static ApplicationContextHelper helper = new ApplicationContextHelper(); 

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		ServletContext context = arg0.getServletContext();
		context.setAttribute("STORE_URL", Config.STORE_URL);
		context.setAttribute("STATIC_URL", Config.STATIC_URL);
		context.setAttribute("STATIC_CDN", Config.STATIC_CDN);
		context.setAttribute("SITE_NAME", Config.SITE_NAME);
		context.setAttribute("COPY_RIGHT", Config.COPY_RIGHT);
		
		webApplicationContext = WebApplicationContextUtils.getRequiredWebApplicationContext(arg0.getServletContext());
		helper.setApplicationContext(webApplicationContext);
	}

}
