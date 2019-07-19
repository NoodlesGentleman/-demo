package com.sof.marketing.system.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.bluemobi.framework.common.dao.impl.BaseDao;
import com.sof.marketing.system.dao.ISystemRoleFunctionDao;
import com.sof.marketing.system.domain.SystemRoleFunction;

@Repository
public class SystemRoleFunctionDao extends BaseDao<SystemRoleFunction> implements ISystemRoleFunctionDao {

	private final String SRFD_GETSYSTEMROLEFUNCTION = "getSystemRoleFunction";
	
	@Override
	public List<SystemRoleFunction> getSystemRoleFunction(String role_id) {
		try{
			return this.session.selectList(SRFD_GETSYSTEMROLEFUNCTION, role_id);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer save(SystemRoleFunction systemRoleFunction) {
		try{
			return super.insert(systemRoleFunction);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer delete(SystemRoleFunction systemRoleFunction) {
		try{
			return super.delete(systemRoleFunction);
		} catch (RuntimeException re) {
			throw re;
		}
	}

}
