package com.richest.manager.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.richest.manager.dao.IArticleDao;
import com.richest.manager.domain.Article;
import com.richest.manager.service.IArticleService;


@Service
@Transactional
public class ArticleService implements IArticleService{
	@Autowired
	private IArticleDao iArticleDao;
	
	/*@Autowired
	private IWchatScanLogDao iWchatScanLogDao;*/
	
	@Override
	public List<Article> getArticlesByKeyword(String keyword) {
		// TODO Auto-generated method stub
		return iArticleDao.getArticlesByKeyword(keyword);
	}
	
	/*@Override
	public void addWchatScanLog(WchatScanLog wchatScanLog) {
		// TODO Auto-generated method stub
		iWchatScanLogDao.addWchatScanLog(wchatScanLog);
	}*/

	@Override
	public List<Article> getArticleByTicket(String ticket) {
		// TODO Auto-generated method stub
		return iArticleDao.getArticleByTicket(ticket);
	}

	@Override
	public String getSalesMp(String openid) {
		// TODO Auto-generated method stub
		return iArticleDao.getSalesMp(openid);
	}

	@Override
	public List<Article> getSubscribeArticleByTicket(String ticket) {
		// TODO Auto-generated method stub
		return iArticleDao.getSubscribeArticleByTicket(ticket);
	}

	@Override
	public List<Article> getDefaultArticles() {
		// TODO Auto-generated method stub
		return iArticleDao.getDefaultArticles();
	}

	@Override
	public List<Article> getTopArticles() {
		// TODO Auto-generated method stub
		return iArticleDao.getTopArticles();
	}

	@Override
	public List<Article> getEsf() {
		// TODO Auto-generated method stub
		return iArticleDao.getEsf();
	}

	@Override
	public List<Article> getDRCArticles() {
		// TODO Auto-generated method stub
		return iArticleDao.getDRCArticles();
	}

	@Override
	public List<Article> getArticlesForSuZhou() {
		// TODO Auto-generated method stub
		return iArticleDao.getArticlesForSuZhou();
	}
}
