package com.sof.marketing.system.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import com.bluemobi.framework.common.dao.impl.BaseDao;
import com.sof.marketing.system.dao.ISystemRoleNavDao;
import com.sof.marketing.system.domain.SystemRoleNav;

@Repository
public class SystemRoleNavDao extends BaseDao<SystemRoleNav> implements ISystemRoleNavDao {

	private final String SYN_GETROLENAVLIST = "getRoleNavList";
	private final String SYN_GETALLNAV = "getAllNav";

	@Override
	public Integer insert(SystemRoleNav sysRoleNav) {
		try {
			return super.insert(sysRoleNav);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public List<SystemRoleNav> getRoleNavList(String roleId) {
		try {
			return this.session.selectList(SYN_GETROLENAVLIST, roleId);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer delete(SystemRoleNav sysRoleNav) {
		try {
			return super.delete(sysRoleNav);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public List<SystemRoleNav> getAllNav(Map<String, Object> pagemap) {
		try {
			if(pagemap != null && pagemap.get("currentPage") != null && pagemap.get("pageSize") != null) {
				RowBounds rb = new RowBounds((Integer.parseInt(pagemap.get("currentPage").toString()) - 1)
						* Integer.parseInt(pagemap.get("pageSize").toString()),
						Integer.parseInt(pagemap.get("pageSize").toString()));
				return this.session.selectList(SYN_GETALLNAV, null, rb);
			} else {
				return this.session.selectList(SYN_GETALLNAV, null);
			}
		} catch (RuntimeException re) {
			throw re;
		}
	}

}
