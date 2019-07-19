package com.richest.manager.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.richest.manager.dao.IArticleDao;
import com.richest.manager.domain.Article;


@Repository
public class ArticleDao extends BaseDao<Article,Integer> implements IArticleDao{

	final String GET_ARTICLES_BY_KEYWORD = "getArticlesByKeyword";
	final String GET_ARTICLE_BY_TICKET = "getArticleByTicket";
	final String GET_SALES_MP = "getSalesMp";
	final String GET_SUBSCRIBE_ARTILE_BY_TICKET = "getSubscribeArticleByTicket";
	
	final String GET_DEFAULTARTICLES = "getDefaultArticles";
	final String GET_TOPARTICLES = "getTopArticles";
	final String GET_GETESF = "getArticlesEsf";
	final String GET_DRCARTICLES = "getDRCArticles";
	final String GET_SUZHOUARTICLES = "getArticlesForSuZhou";
	
	
	@Override
	public List<Article> getArticlesByKeyword(String keyword) {
		Map<String, Object> params=new HashMap<String, Object>();
		params.put("keyword", keyword);
		return sqlSession.selectList(GET_ARTICLES_BY_KEYWORD, params);
	}

	@Override
	public List<Article> getArticleByTicket(String ticket) {
		// TODO Auto-generated method stub
		return sqlSession.selectList(GET_ARTICLE_BY_TICKET, ticket);
	}

	@Override
	public String getSalesMp(String openid) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne(GET_SALES_MP, openid);
	}
	
	@Override
	public List<Article> getSubscribeArticleByTicket(String ticket) {
		// TODO Auto-generated method stub
		return sqlSession.selectList(GET_SUBSCRIBE_ARTILE_BY_TICKET, ticket);
	}

	@Override
	public List<Article> getDefaultArticles() {
		// TODO Auto-generated method stub
		return sqlSession.selectList(GET_DEFAULTARTICLES);
	}

	@Override
	public List<Article> getTopArticles() {
		// TODO Auto-generated method stub
		return sqlSession.selectList(GET_TOPARTICLES);
	}

	@Override
	public List<Article> getEsf() {
		// TODO Auto-generated method stub
		return sqlSession.selectList(GET_GETESF);
	}

	@Override
	public List<Article> getDRCArticles() {
		// TODO Auto-generated method stub
		return sqlSession.selectList(GET_DRCARTICLES);
	}

	@Override
	public List<Article> getArticlesForSuZhou() {
		return sqlSession.selectList(GET_SUZHOUARTICLES);
	}
}
