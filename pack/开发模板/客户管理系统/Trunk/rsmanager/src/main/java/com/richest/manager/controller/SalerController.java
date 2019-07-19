package com.richest.manager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.richest.manager.dao.ISalerDao;
import com.richest.manager.domain.Saler;

@Controller
@RequestMapping("/saler")
public class SalerController extends BaseController{
	@Autowired
	ISalerDao iSalerDao;
	
	@RequestMapping(value = "/list",method=RequestMethod.GET)
	@ResponseBody
	protected List<Saler> getSalers(){
		return iSalerDao.getSalers();
	}
}
