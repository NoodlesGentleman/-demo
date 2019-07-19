package com.richest.manager.dao;

import org.springframework.dao.DataAccessException;

public interface IBaseDao<T, E> {
	T add(T entity) throws DataAccessException;
	T update(T entity) throws DataAccessException;
	T delete(T entity) throws DataAccessException;
}
