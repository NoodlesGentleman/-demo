package com.sof.marketing.dao;

import java.util.List;
import java.util.Map;

import com.sof.marketing.model.RedBagObj;

public interface IRedBagObjDao {
    /**
     * 根据主键删除
     * 参数:主键
     * 返回:删除个数
     * @ibatorgenerated 2018-04-16 16:54:39
     */
    Integer deleteByPrimaryKey(Integer id);

    /**
     * 插入，空属性也会插入
     * 参数:pojo对象
     * 返回:删除个数
     * @ibatorgenerated 2018-04-16 16:54:39
     */
    Integer insert(RedBagObj record);

    /**
     * 插入，空属性不会插入
     * 参数:pojo对象
     * 返回:删除个数
     * @ibatorgenerated 2018-04-16 16:54:39
     */
    Integer insertSelective(RedBagObj record);

//    /**
//     * 根据主键查询
//     * 参数:查询条件,主键值
//     * 返回:对象
//     * @ibatorgenerated 2018-04-16 16:54:39
//     */
//    RedBagObj selectByPrimaryKey(Integer id);


	List<RedBagObj> getListByCondition(Map<String, Object> pagemap);

	Integer getCountByCondition(RedBagObj record);

}