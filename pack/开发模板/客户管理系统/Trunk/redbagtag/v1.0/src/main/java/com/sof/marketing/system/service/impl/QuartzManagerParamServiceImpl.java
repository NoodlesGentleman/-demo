package com.sof.marketing.system.service.impl;

import java.util.Map;
import java.util.Map.Entry;

import org.quartz.CronScheduleBuilder;
import org.quartz.CronTrigger;
import org.quartz.Job;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdScheduler;
import org.quartz.impl.StdSchedulerFactory;

import com.bluemobi.framework.common.service.impl.QuartzManagerImpl;
import com.sof.marketing.system.service.IQuartzManagerParamService;

public class QuartzManagerParamServiceImpl extends QuartzManagerImpl implements IQuartzManagerParamService{

	private SchedulerFactory gSchedulerFactory = new StdSchedulerFactory();
	private StdScheduler scheduler;
	
	public QuartzManagerParamServiceImpl(){
		try {
			scheduler = (StdScheduler)gSchedulerFactory.getScheduler();
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void addJob(String jobName, Job job, String cronExpression) {
		try {
			super.addJob(jobName, job, cronExpression);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
	
	@Override
	public void addJob(String jobName, Job job, String cronExpression, Map<String, Object> param) {
		// 生成任务
		JobDetail jobDetail = JobBuilder.newJob(job.getClass())
				.withIdentity(jobName, null).build();

		// 放入参数
		for(Entry<String, Object> entry : param.entrySet()){
			jobDetail.getJobDataMap().put(entry.getKey(), entry.getValue());
		}
		
		// 生成触发器
		CronTrigger cronTrigger = TriggerBuilder.newTrigger()
				.withIdentity(jobName, null)
				.withSchedule(CronScheduleBuilder.cronSchedule(cronExpression))
				.build();

		// 装入
		try {
			scheduler.scheduleJob(jobDetail, cronTrigger);
		} catch (SchedulerException e) {
			e.printStackTrace();
		}

		if (!scheduler.isShutdown()) {
			try {
				scheduler.start();
			} catch (SchedulerException e) {
				e.printStackTrace();
			}
		}
		
		
		return ;
	}

	@Override
	public void modifyJobTime(String jobName, String cronExpression) {
		try {
			super.modifyJobTime(jobName, cronExpression);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
	
	@Override
	public void removeJob(String jobName) {
		try {
			super.removeJob(jobName);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
	
	@Override
	public void removeAll(){
		try {
			super.removeAll();
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
}
