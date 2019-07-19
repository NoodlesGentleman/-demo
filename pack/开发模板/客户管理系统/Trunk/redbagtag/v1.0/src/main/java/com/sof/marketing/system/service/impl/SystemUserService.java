package com.sof.marketing.system.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bluemobi.framework.common.contant.Const;
import com.bluemobi.framework.common.dto.ResponseEntity;
import com.bluemobi.framework.common.service.impl.BaseService;
import com.sof.marketing.system.dao.ISystemUserDao;
import com.sof.marketing.system.dao.ISystemUserRoleDao;
import com.sof.marketing.system.domain.SystemUser;
import com.sof.marketing.system.domain.SystemUserRole;
import com.sof.marketing.system.service.ISystemUserService;

@Service
@Transactional
public class SystemUserService extends BaseService<SystemUser> implements ISystemUserService {

	@Resource
	private ISystemUserDao userDao;
	@Resource
	private ISystemUserRoleDao sysUserRoleDao;

	@Override
	public ResponseEntity save(SystemUser user) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			// 保存用户的角色
			SystemUserRole sysUserRole = new SystemUserRole();
			sysUserRole.setId(UUID.randomUUID().toString());
			sysUserRole.setUser_id(user.getUser_id());
			sysUserRole.setRole_id(user.getRole_id());
			sysUserRoleDao.insert(sysUserRole);
			
			// 保存用户信息
			Integer flag = userDao.insert(user);
			res = super.saveOrUpdateOrDelete(flag);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity update(SystemUser user) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			// 保存用户的角色
			SystemUserRole sysUserRole = new SystemUserRole();
			sysUserRole.setUser_id(user.getUser_id());
			List<SystemUserRole> sysUserRoleList = sysUserRoleDao.getSystemUserRoleList(sysUserRole, null);
			if(sysUserRoleList != null && sysUserRoleList.size() > 0) {
				// 更新数据
				sysUserRole = sysUserRoleList.get(0);
				sysUserRole.setRole_id(user.getRole_id());
				sysUserRoleDao.update(sysUserRole);
			} else {
				// 没有则插入新数据
				sysUserRole.setRole_id(user.getRole_id());
				sysUserRole.setId(UUID.randomUUID().toString());
				sysUserRoleDao.insert(sysUserRole);
			}

			Integer flag = userDao.update(user);
			res = super.saveOrUpdateOrDelete(flag);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}
	
	@Override
	public ResponseEntity delete(String user_id) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			// 要删除角色关联
			SystemUser user = userDao.getSystemUserOne(new SystemUser(user_id));
			SystemUserRole sysUserRole = new SystemUserRole();
			sysUserRole.setUser_id(user.getUser_id());
			sysUserRole.setRole_id(user.getRole_id());
			sysUserRoleDao.delete(sysUserRole);
			
			Integer flag = userDao.delete(user_id);
			res = super.saveOrUpdateOrDelete(flag);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}
	
	@Override
	public ResponseEntity getSystemUserList(SystemUser systemUser, Integer currentPage, Integer pageSize) {
		ResponseEntity res = new ResponseEntity();
		Map<String, Object> pagemap = new HashMap<String, Object>();
		pagemap.put("currentPage", currentPage);
		pagemap.put("pageSize", pageSize);
		
		try{
			systemUser.setUser_id(null);
			List<SystemUser> userList = userDao.getSystemUserList(systemUser, pagemap);
			Integer totalCount = userDao.getSystemUserListCount(systemUser);
			
			res = super.selectResultList(userList, currentPage, pageSize, totalCount);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

	@Override
	public ResponseEntity getSystemUserOne(SystemUser systemUser) {
		ResponseEntity res = new ResponseEntity();
		
		try{
			SystemUser user = userDao.getSystemUserOne(systemUser);
			res = super.selectResultOne(user);
		} catch (Exception re) {
			re.printStackTrace();
			res.setStatus(Const.SYSTEM_FAIL);
			res.setMsg(Const.SYSTEM_FAIL_MSG);
		}
		
		return res;
	}

}
