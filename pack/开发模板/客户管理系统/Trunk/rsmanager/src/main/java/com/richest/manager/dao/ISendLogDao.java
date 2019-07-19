package com.richest.manager.dao;

import com.richest.manager.domain.SendLog;

public interface ISendLogDao {

	SendLog addSendLog(SendLog sendLog);

	SendLog getLogByMobile(SendLog sendLog);

}
