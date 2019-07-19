package com.sof.marketing.system.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import com.bluemobi.framework.common.dao.impl.BaseDao;
import com.sof.marketing.system.dao.ISystemVersionDao;
import com.sof.marketing.system.domain.SystemVersion;

@Repository
public class SystemVersionDao extends BaseDao<SystemVersion> implements ISystemVersionDao {

	private final String VD_GETVERSIONBYID = "getVersionById";
	private final String VD_GETVERSIONLIST = "getVersionList";
	private final String VD_GETVERSIONCOUNT = "getVersionListCount";
	private final String VD_GETVERSIONBYPARAM = "getVersionByParam";
	private final String VD_GETVERSIONBYPARAMCOUNT = "getVersionByParamCount";

	@Override
	public Integer insert(SystemVersion version) {
		try {
			return super.insert(version);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer update(SystemVersion version) {
		try {
			return super.update(version);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public Integer delete(SystemVersion version) {
		try {
			return super.delete(version);
		} catch (RuntimeException re) {
			throw re;
		}
	}
	
	@Override
	public SystemVersion getVersion(String version_id) {
		try {
			return this.session.selectOne(VD_GETVERSIONBYID, version_id);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public List<SystemVersion> getVersionList(SystemVersion version, Map<String, Object> pagemap) {
		try {
			if(pagemap != null && pagemap.get("currentPage") != null && pagemap.get("pageSize") != null) {
				RowBounds rb = new RowBounds((Integer.parseInt(pagemap.get("currentPage").toString()) - 1)
						* Integer.parseInt(pagemap.get("pageSize").toString()),
						Integer.parseInt(pagemap.get("pageSize").toString()));
				return this.session.selectList(VD_GETVERSIONLIST, version, rb);
			} else {
				return this.session.selectList(VD_GETVERSIONLIST, version);
			}
		} catch (RuntimeException re) {
			throw re;
		}
	}
	
	@Override
	public Integer getVersionListCount(SystemVersion version) {
		try {
			return this.session.selectOne(VD_GETVERSIONCOUNT, version);
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public List<SystemVersion> getVersionByParam(String startTime,
			String endTime, String type, String version, Map<String, Object> pagemap) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("startTime", startTime);
		map.put("endTime", endTime);
		map.put("type", type);
		map.put("version", version);
		
		try {
			if(pagemap != null && pagemap.get("currentPage") != null && pagemap.get("pageSize") != null) {
				RowBounds rb = new RowBounds((Integer.parseInt(pagemap.get("currentPage").toString()) - 1)
						* Integer.parseInt(pagemap.get("pageSize").toString()),
						Integer.parseInt(pagemap.get("pageSize").toString()));
				return this.session.selectList(VD_GETVERSIONBYPARAM, map, rb);
			} else {
				return this.session.selectList(VD_GETVERSIONBYPARAM, map);
			}
		} catch (RuntimeException re) {
			throw re;
		}
	}
	
	@Override
	public List<SystemVersion> getVersionByParamCount(String startTime,
			String endTime, String type, String version) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("startTime", startTime);
			map.put("endTime", endTime);
			map.put("type", type);
			map.put("version", version);
			return this.session.selectOne(VD_GETVERSIONBYPARAMCOUNT, map);
		} catch (RuntimeException re) {
			throw re;
		}
	}
}
