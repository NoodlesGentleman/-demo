package com.sof.marketing.quartz;

import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sof.marketing.dao.IRedpackheadconfigDao;
import com.sof.marketing.listener.ApplicationContextHelper;
import com.sof.marketing.model.Redpackheadconfig;
import com.sof.marketing.system.util.Constant;

@Service
@Transactional
public class RedPackJob implements Job{

	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		// TODO Auto-generated method stub
		JobDataMap data = arg0.getJobDetail().getJobDataMap();
		IRedpackheadconfigDao iRedpackheadconfigDao = (IRedpackheadconfigDao)ApplicationContextHelper.getContext().getBean(IRedpackheadconfigDao.class);
		if(null != data) {
			Integer id = data.getInt("id");
			//根据任务ID获取任务配置
			
			Redpackheadconfig redpackheadconfig = iRedpackheadconfigDao.selectByPrimaryKey(id);
			
			if(null != redpackheadconfig) {
				switch (redpackheadconfig.getJobtype()) {
				case Constant.REDPACK_JOBTYPE_YC:
					runRedPack_YC(redpackheadconfig);
					break;
				case Constant.REDPACK_JOBTYPE_DS:
					
					break;
				case Constant.REDPACK_JOBTYPE_CF:
	
					break;
				default:
					break;
				}
			}
		}
	}
	
	private void runRedPack_YC(Redpackheadconfig redpackheadconfig) {
		
		
		//掉用红包发送接口
		
		
		//一次性任务执行完成后删除该任务
		System.out.println("任务执行完毕，开始删除任务！");
		TaskService.removejob(redpackheadconfig.getJobname());
	}
}
