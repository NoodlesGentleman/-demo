package com.richest.manager.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.richest.manager.dao.IBuildingDao;
import com.richest.manager.dao.IBuildingPropertyDao;
import com.richest.manager.domain.Building;
import com.richest.manager.domain.BuildingProperty;
import com.richest.manager.utils.FinalOpenId;

@Controller
@RequestMapping(value="/building")
public class BuildingController extends BaseController{
	@Autowired
	IBuildingDao iBuildingDao;
	
	@Autowired
	IBuildingPropertyDao iBuildingPropertyDao;
	
	@ResponseBody
	@RequestMapping(value = "/list",method=RequestMethod.GET)
	protected List<Building> getBuildings(HttpServletRequest request){
		Object obj = request.getSession().getAttribute("userInfo");
		return iBuildingDao.getBuildings(((FinalOpenId)obj).getUser().getCompanyId());
	}
	
	@ResponseBody
	@RequestMapping(value = "/hot",method=RequestMethod.GET)
	protected List<Building> getHotBuildings(HttpServletRequest request){
		Object obj = request.getSession().getAttribute("userInfo");
		return iBuildingDao.getHotBuildings(((FinalOpenId)obj).getUser().getCompanyId());
	}
	
	@ResponseBody
	@RequestMapping(value = "/property/list/{bid}",method=RequestMethod.GET)
	protected List<BuildingProperty> getBuildingProperty(@PathVariable("bid") int bid){
		return iBuildingPropertyDao.getBuildingProperty(bid);
	}
}
