package com.sof.marketing.system.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import com.bluemobi.framework.common.dao.impl.BaseDao;
import com.sof.marketing.system.dao.ISystemUserRoleDao;
import com.sof.marketing.system.domain.SystemUserRole;

@Repository
public class SystemUserRoleDao extends BaseDao<SystemUserRole> implements ISystemUserRoleDao {

	private final String SUR_SELECTBYCONDITION = "getSystemUserRoleList";
	private final String SUR_SELECTCOUNTBYCONDITION = "getSystemUserRoleListCount";
	private final String SUR_SELECTSINGLE = "selectUserRoleSingle";
	private final String SUR_SELECTBYUSERID = "selectByUserId";

	@Override
	public Integer insert(SystemUserRole sysUserRole) {
		try {
			return super.insert(sysUserRole);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer delete(SystemUserRole sysUserRole) {
		try {
			return super.delete(sysUserRole);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer update(SystemUserRole sysUserRole) {
		try {
			return super.update(sysUserRole);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public List<SystemUserRole> getSystemUserRoleList(SystemUserRole sysUserRole, Map<String, Object> pagemap) {
		try {
			if(pagemap != null && pagemap.get("currentPage") != null && pagemap.get("pageSize") != null) {
				RowBounds rb = new RowBounds((Integer.parseInt(pagemap.get("currentPage").toString()) - 1)
						* Integer.parseInt(pagemap.get("pageSize").toString()),
						Integer.parseInt(pagemap.get("pageSize").toString()));
				return this.session.selectList(SUR_SELECTBYCONDITION, sysUserRole, rb);
			} else {
				return this.session.selectList(SUR_SELECTBYCONDITION, sysUserRole);
			}
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer getSystemUserRoleListCount(SystemUserRole sysUserRole) {
		try {
			return this.session.selectOne(SUR_SELECTCOUNTBYCONDITION, sysUserRole);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public SystemUserRole selectSingle(String primeKey) {
		try {
			return this.session.selectOne(SUR_SELECTSINGLE, primeKey);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer selectByUserId(String userId) {
		try{
			return this.session.selectOne(SUR_SELECTBYUSERID, userId);
		} catch (RuntimeException re) {
			throw re;
		}
	}

}
