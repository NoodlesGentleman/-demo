package com.sof.marketing.quartz;

import org.apache.commons.lang3.StringUtils;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sof.marketing.system.service.impl.QuartzManagerParamServiceImpl;

@Service
@Transactional
public class AutoDemo implements Job {
	
	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		JobDataMap data = arg0.getJobDetail().getJobDataMap();
		
		String id = StringUtils.EMPTY;
				
		if(data.get("id") != null && !"".equals(data.get("id"))){
			id = data.get("id").toString();
		}
		
		System.out.println(arg0.getJobDetail().getKey().getName());
		
		System.out.println(id);
		
		System.out.println("根据id到数据库获取任务配置，同时调用存储过程获取人群列表");
		
		System.out.println("判断任务类型jobtype");
		
		System.out.println("当jobtype == 'YC'时");
		
		System.out.println("遍历人群列表，调用发红包接口");
		
		System.out.println("执行完毕后，根据配置表中的jobname删除定时任务");

		QuartzManagerParamServiceImpl qm = new QuartzManagerParamServiceImpl();
		qm.removeJob(arg0.getJobDetail().getKey().getName());
	}

}
