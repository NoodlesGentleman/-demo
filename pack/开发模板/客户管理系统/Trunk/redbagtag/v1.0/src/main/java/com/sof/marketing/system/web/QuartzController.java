package com.sof.marketing.system.web;

import java.util.Map;

import com.sof.marketing.quartz.AutoDemo;
import com.sof.marketing.system.service.IQuartzManagerParamService;
import com.sof.marketing.system.service.impl.QuartzManagerParamServiceImpl;


public class QuartzController {

	/**
	 * 添加任务开启
	 * @param openJobName 开始任务名称
	 * @param closeJobName 关闭任务名称
	 * @param time 时间表达式
	 * @param params 需要带的参数
	 */
	public static void addAutoDemoJob(String openJobName, String closeJobName, String time, Map<String, Object> params) {
		IQuartzManagerParamService quartzManager = new QuartzManagerParamServiceImpl();

		try {
			quartzManager.addJob(openJobName, new AutoDemo(), time, params);
			quartzManager.removeJob(closeJobName);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} 

	}
}
