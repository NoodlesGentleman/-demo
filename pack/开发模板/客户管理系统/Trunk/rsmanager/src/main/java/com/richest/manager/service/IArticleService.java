package com.richest.manager.service;

import java.util.List;

import com.richest.manager.domain.Article;



public interface IArticleService {
	List<Article> getArticlesByKeyword(String keyword);

	//void addWchatScanLog(WchatScanLog wchatScanLog);
	
	List<Article> getArticleByTicket(String ticket);
	
	String getSalesMp(String openid);

	List<Article> getSubscribeArticleByTicket(String ticket);
	
	List<Article> getDefaultArticles();
	
	List<Article> getTopArticles();
	
	List<Article> getEsf();
	
	List<Article> getDRCArticles();
	List<Article> getArticlesForSuZhou();
}
