package com.sof.marketing.system.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import com.bluemobi.framework.common.dao.impl.BaseDao;
import com.sof.marketing.system.dao.ISystemNavigationDao;
import com.sof.marketing.system.domain.SystemNavigation;

@Repository
public class SystemNavigationDao extends BaseDao<SystemNavigation> implements ISystemNavigationDao {

	private final String SYSNAV_GETLIST = "getNavigationList";
	private final String SYSNAV_GETLISTCOUNT = "getNavigationListCount";
	private final String SYSNAV_GETALLNAVBYPARENTNAVID = "selectAllNavByParentNavId";
	private final String SYSNAV_GETONE = "selectOne";
	private final String SYSNAV_GETPARENTNAV = "selectParentNav";
	
	@Override
	public Integer insert(SystemNavigation nav) {
		try {
			return super.insert(nav);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer update(SystemNavigation nav) {
		try {
			return super.update(nav);
		} catch (RuntimeException re) {
			throw re;
		}
	}
	
	@Override
	public Integer delete(SystemNavigation nav) {
		try {
			return super.delete(nav);
		} catch (RuntimeException re) {
			throw re;
		}
	}
	
	@Override
	public List<SystemNavigation> getNavigationList(SystemNavigation nav, Map<String, Object> pagemap) {
		try {
			if(pagemap != null && pagemap.get("currentPage") != null && pagemap.get("pageSize") != null) {
				RowBounds rb = new RowBounds((Integer.parseInt(pagemap.get("currentPage").toString()) - 1)
						* Integer.parseInt(pagemap.get("pageSize").toString()),
						Integer.parseInt(pagemap.get("pageSize").toString()));
				return this.session.selectList(SYSNAV_GETLIST, nav, rb);
			} else {
				return this.session.selectList(SYSNAV_GETLIST, nav);
			}
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer getNavigationListCount(SystemNavigation nav) {
		try {
			return session.selectOne(SYSNAV_GETLISTCOUNT, nav);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public List<SystemNavigation> selectAllNavByParentNavId(String parentNavId) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("parentNavId", parentNavId);
			return session.selectList(SYSNAV_GETALLNAVBYPARENTNAVID, map);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public SystemNavigation selectOne(String navId) {
		try {
			return session.selectOne(SYSNAV_GETONE, navId);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public SystemNavigation selectParentNav(SystemNavigation nav) {
		try {
			this.session.selectOne(SYSNAV_GETPARENTNAV, nav);
			return nav;
		} catch (RuntimeException re) {
			throw re;
		}
	}

}
