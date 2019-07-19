package com.sof.marketing.system.service;

import java.util.Map;
import org.quartz.Job;

public interface IQuartzManagerParamService {
	
	public static String JOB_GROUP_NAME = "defaultJobGroup";
    public static String TRIGGER_GROUP_NAME = "defaultTriggerGroup";

    /**
     * 添加任务
     * @param jobName
     * @param job
     * @param cronExpression
     */
    public void addJob(String jobName, Job job, String cronExpression);
    
    /**
     * 添加任务
     * @param jobName
     * @param job
     * @param cronExpression
     * @param param
     */
    public void addJob(String jobName, Job job, String cronExpression, Map<String, Object> param);

    /**
     * 变更任务时间
     * @param jobName
     * @param cronExpression
     */
    public void modifyJobTime(String jobName, String cronExpression);

    /**
     * 移除任务
     * @param jobName
     */
    public void removeJob(String jobName);

    /**
     * 移除所有的任务
     */
    public void removeAll();

}
