package com.richest.manager.dao;

import java.util.List;

import com.richest.manager.domain.BasicDic;

public interface IBasicDicDao {

	List<BasicDic> getDictionaryByType(String type);

}
