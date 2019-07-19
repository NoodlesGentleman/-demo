package com.sof.marketing.system.service.impl;

import java.util.ArrayList;
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
import com.sof.marketing.system.dao.ISystemRoleNavDao;
import com.sof.marketing.system.domain.SystemNavigation;
import com.sof.marketing.system.domain.SystemRoleNav;
import com.sof.marketing.system.service.ISystemRoleNavService;

@Service
@Transactional
public class SystemRoleNavService extends BaseService<SystemRoleNav> implements ISystemRoleNavService {

	@Resource
	private ISystemRoleNavDao sysRoleNavDao;
	@Resource
	private ISystemNavigationDao systemNavigationDao;

	@Override
	public ResponseEntity insert(SystemRoleNav sysRoleNav) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			Integer flag = sysRoleNavDao.insert(sysRoleNav);
			res = super.saveOrUpdateOrDelete(flag);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity getRoleNavList(String roleId) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			List<SystemRoleNav> list = sysRoleNavDao.getRoleNavList(roleId);
			res = super.selectResultList(list);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity delete(SystemRoleNav sysRoleNav) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			Integer flag = sysRoleNavDao.delete(sysRoleNav);
			res = super.saveOrUpdateOrDelete(flag);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity getAllNav(Integer currentPage, Integer pageSize) {
		ResponseEntity res = new ResponseEntity();
		Map<String, Object> pagemap = new HashMap<String, Object>();
		pagemap.put("currentPage", currentPage);
		pagemap.put("pageSize", pageSize);
		
		try{
			List<SystemRoleNav> list = sysRoleNavDao.getAllNav(pagemap);
			res = super.selectResultList(list);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public void saveParentNode(String navId, String roleId) {		
		List<String> strList = new ArrayList<String>();
		List<SystemNavigation> sysNavParent = new ArrayList<SystemNavigation>();
		SystemNavigation sysNavSon = systemNavigationDao.selectOne(navId);
		
		// 这个角色下所有的权限，用来进行重复判断
		List<SystemRoleNav> roleNavList = sysRoleNavDao.getRoleNavList(roleId);
		for(SystemRoleNav rolenav : roleNavList) {
			strList.add(rolenav.getSysNavId());
		}
		
		getParentNode(sysNavParent, sysNavSon, strList);
		
		for(SystemNavigation parentNav : sysNavParent) {
			SystemRoleNav rolenav = new SystemRoleNav();
			rolenav.setRoleId(roleId);
			rolenav.setSysNavId(parentNav.getNavigationId());
			sysRoleNavDao.insert(rolenav);
		}
	}

	private void getParentNode(List<SystemNavigation> allNavList, SystemNavigation sonNode, List<String> strList) {
		if(sonNode.getLevel() != 1) {
			SystemNavigation navTemp = new SystemNavigation(false);
			navTemp.setLevel(sonNode.getLevel() - 1);
			
			List<SystemNavigation> navList = systemNavigationDao.getNavigationList(navTemp, null);
			
			for(SystemNavigation nav : navList) {
				if(nav.getNavigationId().equals(sonNode.getParentId())) {
					if(!strList.contains(nav.getNavigationId())) {
						allNavList.add(nav);
						getParentNode(allNavList, nav, strList);
					}
				}
			}
		}
	}
}
