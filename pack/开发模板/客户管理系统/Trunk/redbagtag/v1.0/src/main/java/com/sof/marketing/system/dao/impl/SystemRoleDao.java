package com.sof.marketing.system.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import com.bluemobi.framework.common.dao.impl.BaseDao;
import com.sof.marketing.system.dao.ISystemRoleDao;
import com.sof.marketing.system.domain.SystemRole;

@Repository
public class SystemRoleDao extends BaseDao<SystemRole> implements ISystemRoleDao {

	private final String SRD_GETSYSROLESBYCONDITION = "getSysRolesList";
	private final String SRD_GETSYSROLESCOUNTBYCONDITION = "getSysRolesListCount";
	private final String SRD_FINDSYSROLEBYID = "selectRoleSingle";
	private final String SRD_SELECTMAXNO = "selectMaxNo";

	@Override
	public List<SystemRole> getSysRolesList(SystemRole sysUserRoles, Map<String, Object> pagemap) {
		try {
			if(pagemap != null && pagemap.get("currentPage") != null && pagemap.get("pageSize") != null) {
				RowBounds rb = new RowBounds((Integer.parseInt(pagemap.get("currentPage").toString()) - 1)
						* Integer.parseInt(pagemap.get("pageSize").toString()),
						Integer.parseInt(pagemap.get("pageSize").toString()));
				return this.session.selectList(SRD_GETSYSROLESBYCONDITION, sysUserRoles, rb);
			} else {
				return this.session.selectList(SRD_GETSYSROLESBYCONDITION, sysUserRoles);
			}
		} catch (RuntimeException re) {
			throw re;
		}
	}
	
	@Override
	public Integer getSysRolesListCount(SystemRole sysUserRoles) {
		try {
			return this.session.selectOne(SRD_GETSYSROLESCOUNTBYCONDITION, sysUserRoles);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public SystemRole findSysRolesById(String primeKey) {
		try {
			return this.session.selectOne(SRD_FINDSYSROLEBYID, primeKey);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer selectMaxNo() {
		try {
			return this.session.selectOne(SRD_SELECTMAXNO);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer insert(SystemRole sysrole) {
		try {
			return super.insert(sysrole);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer delete(SystemRole sysrole) {
		try {
			return super.delete(sysrole);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer update(SystemRole sysrole) {
		try {
			return super.update(sysrole);
		} catch (RuntimeException re) {
			throw re;
		}
	}
}
