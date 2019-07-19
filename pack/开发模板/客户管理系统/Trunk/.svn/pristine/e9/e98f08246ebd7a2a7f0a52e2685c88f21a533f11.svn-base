package com.richest.manager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.richest.manager.dao.ICompanyDao;
import com.richest.manager.domain.Company;

@Controller
@RequestMapping(value="/company")
public class CompanyController extends BaseController{
	@Autowired
	ICompanyDao iCompanyDao;
	
	@ResponseBody
	@RequestMapping(value = "/list/{bid}",method=RequestMethod.GET)
	protected List<Company> getCompanyBybuildingId(@PathVariable("bid") int bid){
		return iCompanyDao.getCompanyBybuildingId(bid);
	}
}
