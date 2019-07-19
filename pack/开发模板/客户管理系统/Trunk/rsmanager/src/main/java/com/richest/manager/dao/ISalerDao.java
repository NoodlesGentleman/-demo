package com.richest.manager.dao;

import java.util.List;

import com.richest.manager.domain.Saler;

public interface ISalerDao {

	List<Saler> getSalers();

	List<Saler> getSalerOpenidsByBuilidngId(Integer buildingId);

}
