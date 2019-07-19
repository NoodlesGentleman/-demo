package com.sof.marketing.system.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import com.bluemobi.framework.common.dao.impl.BaseDao;
import com.sof.marketing.system.dao.ISystemUserDao;
import com.sof.marketing.system.domain.SystemUser;

@Repository
public class SystemUserDao extends BaseDao<SystemUser> implements ISystemUserDao {

	private final String SU_GETSYSTEMUSERBYPARAMETER = "getSystemUserList";
	private final String SU_GETSYSTEMUSERCOUNTBYPARAMETER = "getSystemUserListCount";
	private final String SU_GETSYSTEMUSERONEBYPARAMETER = "getSystemUserOneByParameter";
	private final String GET_ONE = "getOneUser";

	@Override
	public List<SystemUser> getSystemUserList(SystemUser systemUser, Map<String, Object> pagemap) {
		try {
			if(pagemap != null && pagemap.get("currentPage") != null && pagemap.get("pageSize") != null) {
				RowBounds rb = new RowBounds((Integer.parseInt(pagemap.get("currentPage").toString()) - 1)
						* Integer.parseInt(pagemap.get("pageSize").toString()),
						Integer.parseInt(pagemap.get("pageSize").toString()));
				return this.session.selectList(SU_GETSYSTEMUSERBYPARAMETER, systemUser, rb);
			} else {
				return this.session.selectList(SU_GETSYSTEMUSERBYPARAMETER, systemUser);
			}
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer getSystemUserListCount(SystemUser systemUser) {
		try {
			return this.session.selectOne(SU_GETSYSTEMUSERCOUNTBYPARAMETER, systemUser);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public SystemUser getSystemUserOne(SystemUser systemUser) {
		try {
			return this.session.selectOne(SU_GETSYSTEMUSERONEBYPARAMETER,
					systemUser);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public SystemUser getOne(String user_id) {
		try {
			return this.session.selectOne(GET_ONE, user_id);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer insert(SystemUser systemUser) {
		try {
			return super.insert(systemUser);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer update(SystemUser systemUser) {
		try {
			return super.update(systemUser);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer delete(String user_id) {
		try {
			SystemUser user = new SystemUser(user_id);
			return super.delete(user);
		} catch (RuntimeException re) {
			throw re;
		}
	}

}
