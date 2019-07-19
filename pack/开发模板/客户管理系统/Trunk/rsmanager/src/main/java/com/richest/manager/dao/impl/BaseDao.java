package com.richest.manager.dao.impl;

import java.io.Serializable;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;

import com.richest.manager.dao.IBaseDao;


public class BaseDao<T, E extends Serializable> implements IBaseDao<T, E> {

	public static Logger logger = LoggerFactory.getLogger(BaseDao.class);
	@Autowired
	protected SqlSessionTemplate sqlSession;
	
	/* (非 Javadoc) 
	 * <p>Title: add</p> 
	 * <p>Description: </p> 
	 * @param entity
	 * @return
	 * @throws DataAccessException 
	 * @see com.madhouse.madplatform.middleware.biz.dao.IBaseDao#add(java.lang.Object) 
	 */ 
	@Override
	public T add(T entity) throws DataAccessException {
		try {
			sqlSession.insert(entity.getClass().getName() + ".save",
					entity);
			return entity;
		} catch (RuntimeException re) {
			logger.error("save " + entity.getClass().getName() + " failed :{}",
					re);
			throw re;
		}
	}

	/* (非 Javadoc) 
	 * <p>Title: update</p> 
	 * <p>Description: </p> 
	 * @param entity
	 * @return
	 * @throws DataAccessException 
	 * @see com.madhouse.madplatform.middleware.biz.dao.IBaseDao#update(java.lang.Object) 
	 */ 
	@Override
	public T update(T entity) throws DataAccessException {
		try {
			this.sqlSession.update(
					entity.getClass().getName() + ".update", entity);
			return entity;
		} catch (RuntimeException re) {
			logger.error("update " + entity.getClass().getName()
					+ " failed :{}", re);
			throw re;
		}
	}

	/* (非 Javadoc) 
	 * <p>Title: delete</p> 
	 * <p>Description: </p> 
	 * @param entity
	 * @return
	 * @throws DataAccessException 
	 * @see com.madhouse.madplatform.middleware.biz.dao.IBaseDao#delete(java.lang.Object) 
	 */ 
	@Override
	public T delete(T entity) throws DataAccessException {
		try {
			this.sqlSession.delete(
					entity.getClass().getName() + ".delete", entity);
			return entity;
		} catch (RuntimeException re) {
			logger.error("delete " + entity.getClass().getName()
					+ " failed :{}", re);
			throw re;
		}
	}


}
