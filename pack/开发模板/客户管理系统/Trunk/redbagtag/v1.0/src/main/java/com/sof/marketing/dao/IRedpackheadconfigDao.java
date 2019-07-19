package com.sof.marketing.dao;

import java.util.List;
import java.util.Map;

import com.sof.marketing.model.Redpackheadconfig;

public interface IRedpackheadconfigDao {
    /**
     * 根据主键删除
     * 参数:主键
     * 返回:删除个数
     * @ibatorgenerated 2018-04-17 13:49:09
     */
    Integer deleteByPrimaryKey(Integer id);

    /**
     * 插入，空属性也会插入
     * 参数:pojo对象
     * 返回:删除个数
     * @ibatorgenerated 2018-04-17 13:49:09
     */
    Integer insert(Redpackheadconfig record);

    /**
     * 插入，空属性不会插入
     * 参数:pojo对象
     * 返回:删除个数
     * @ibatorgenerated 2018-04-17 13:49:09
     */
    Integer insertSelective(Redpackheadconfig record);

    /**
     * 根据主键查询
     * 参数:查询条件,主键值
     * 返回:对象
     * @ibatorgenerated 2018-04-17 13:49:09
     */
    Redpackheadconfig selectByPrimaryKey(Integer id);

    /**
     * 根据主键修改，空值条件不会修改成null
     * 参数:1.要修改成的值
     * 返回:成功修改个数
     * @ibatorgenerated 2018-04-17 13:49:09
     */
    Integer updateByPrimaryKeySelective(Redpackheadconfig record);

    /**
     * 根据主键修改，空值条件会修改成null,支持大字段类型
     * 参数:1.要修改成的值
     * 返回:成功修改个数
     * @ibatorgenerated 2018-04-17 13:49:09
     */
    Integer updateByPrimaryKeyWithBLOBs(Redpackheadconfig record);

    /**
     * 根据主键修改，空值条件会修改成null
     * 参数:1.要修改成的值
     * 返回:成功修改个数
     * @ibatorgenerated 2018-04-17 13:49:09
     */
    Integer updateByPrimaryKey(Redpackheadconfig record);
    
    List<Redpackheadconfig> getListByCondition(Map<String, Object> pagemap);

	Integer getCountByCondition(Map<String, Object> pagemap);
}