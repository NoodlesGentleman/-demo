package com.sof.marketing.dao;

import java.util.List;
import java.util.Map;

import com.sof.marketing.model.RedBagLog;

public interface IRedBagLogDao {
    /**
     * 插入，空属性也会插入
     * 参数:pojo对象
     * 返回:删除个数
     * @ibatorgenerated 2018-04-17 14:17:36
     */
    Integer insert(RedBagLog record);

    /**
     * 插入，空属性不会插入
     * 参数:pojo对象
     * 返回:删除个数
     * @ibatorgenerated 2018-04-17 14:17:36
     */
    Integer insertSelective(RedBagLog record);
    
    List<RedBagLog> getListByCondition(Map<String, Object> pagemap);

	Integer getCountByCondition(RedBagLog redBagLog);
	
	

	List<Map<String, Object>> getListRedBagLogByTaskid(Integer id);
	
	
	
}