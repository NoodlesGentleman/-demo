package com.sof.marketing.quartz;

import java.text.MessageFormat;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.quartz.SchedulerException;
import org.springframework.stereotype.Service;

import com.sof.marketing.model.Redpackheadconfig;
import com.sof.marketing.system.service.impl.QuartzManagerParamServiceImpl;
@Service
public class TaskService {
	/**
	 * 添加红包任务
	 * @param redpackheadconfig
	 */
	public static void addredpackjob(Redpackheadconfig redpackheadconfig) {
		QuartzManagerParamServiceImpl qm = new QuartzManagerParamServiceImpl();
		//任务参数（任务配置ID）
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", redpackheadconfig.getId());
		//添加Job到任务管理器
		qm.addJob(redpackheadconfig.getJobname(), new RedPackJob(), dateToWildcard(redpackheadconfig.getSendtime()), param);
	}
	
	/**
	 * 根据任务名称删除任务
	 * @param jobname
	 */
	public static void removejob(String jobname) {
		QuartzManagerParamServiceImpl qm = new QuartzManagerParamServiceImpl();
		qm.removeJob(jobname);
	}
	
	/**
	 * 时间转时间通配符
	 * @param date
	 * @return
	 */
	private static String dateToWildcard(Date date) {
		String result = "{5} {4} {3} {2} {1} ? {0}";
		Calendar ca = Calendar.getInstance();
		ca.setTime(date);
		result = MessageFormat.format(result, 
				new Object[] {String.valueOf(ca.get(Calendar.YEAR)),
						(ca.get(Calendar.MONTH) + 1),
						ca.get(Calendar.DAY_OF_MONTH),
						ca.get(Calendar.HOUR_OF_DAY),
						ca.get(Calendar.MINUTE),
						ca.get(Calendar.SECOND)});
		return result;
	}
	
	public static void main(String[] args) throws SchedulerException, ParseException {
//		QuartzManagerParamServiceImpl qm = new QuartzManagerParamServiceImpl();
//		Map<String, Object> param = new HashMap<String, Object>();
//		param.put("id", 1);
//		qm.addJob("test3", new AutoDemo(), "0/10 * * * * ?", param);
    	//qm.addJob("test1", new AutoDemo(), "0 16 18 16 4 ? 2018", param);
		
		System.out.println(dateToWildcard(new Date()));

	}
	
}
