package com.sof.marketing.system.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bluemobi.framework.common.contant.Const;
import com.bluemobi.framework.common.dto.ResponseEntity;
import com.bluemobi.framework.common.service.impl.BaseService;
import com.sof.marketing.system.dao.ISystemNavigationDao;
import com.sof.marketing.system.domain.SystemNavigation;
import com.sof.marketing.system.service.ISystemNavigationService;

@Service
@Transactional
public class SystemNavigationService extends BaseService<SystemNavigation> implements ISystemNavigationService {

	@Resource
	private ISystemNavigationDao dao;
	
	@Override
	public ResponseEntity insert(SystemNavigation nav) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			String tempNavId = nav.getParentId();
			// 获取父级菜单信息
			SystemNavigation tempParentNav = dao.selectOne(tempNavId);
			nav.setLevel(tempParentNav.getLevel() + 1);
			nav.setLoadType(Byte.valueOf("1"));
			
			Integer flag = dao.insert(nav);
			return super.saveOrUpdateOrDelete(flag);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity update(SystemNavigation nav) {
		ResponseEntity res = new ResponseEntity();
		
		try{			
			Integer flag = dao.update(nav);
			return super.saveOrUpdateOrDelete(flag);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity delete(SystemNavigation nav) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			Integer flag = dao.delete(nav);
			return super.saveOrUpdateOrDelete(flag);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity getNavigationList(SystemNavigation nav, Integer currentPage, Integer pageSize) {
		ResponseEntity res = new ResponseEntity();
		
		Map<String, Object> pagemap = new HashMap<String, Object>();
		pagemap.put("currentPage", currentPage);
		pagemap.put("pageSize", pageSize);
		
		try{
			List<SystemNavigation> navList = dao.getNavigationList(nav, pagemap);
			Integer totalCount = dao.getNavigationListCount(nav);
			
			res = super.selectResultList(navList, currentPage, pageSize, totalCount);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}
	
	@Override
	public ResponseEntity selectAllNavByParentNavId(String parentNavId) {

		ResponseEntity res = new ResponseEntity();
		
		try{
			List<SystemNavigation> navList = dao.selectAllNavByParentNavId(parentNavId);
			res = super.selectResultList(navList);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity selectOne(String navId) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			SystemNavigation nav = dao.selectOne(navId);
			res = super.selectResultOne(nav);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity selectParentNav(SystemNavigation nav) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			SystemNavigation navParent = dao.selectParentNav(nav);
			res = super.selectResultOne(navParent);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity selectSecondNavList() {
		ResponseEntity res = new ResponseEntity();
		
		try{
			SystemNavigation nav = new SystemNavigation(false);
			nav.setStatus((byte) 1);
			// 设置二级菜单标志
			nav.setLevel(2);
			List<SystemNavigation> navList = dao.getNavigationList(nav, null);

			res = super.selectResultList(navList);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

}
