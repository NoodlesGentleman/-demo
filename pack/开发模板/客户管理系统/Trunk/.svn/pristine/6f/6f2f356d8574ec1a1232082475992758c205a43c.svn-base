package com.richest.manager.dao.impl;

import org.springframework.stereotype.Repository;

import com.richest.manager.dao.IQrCodeDao;
import com.richest.manager.domain.QrCode;

@Repository
public class QrCodeDao extends BaseDao<QrCode, Integer> implements IQrCodeDao {
	final String GETQRCODEBYID = "getQrCodeById";
	
	@Override
	public QrCode addQrCode(QrCode qrcode) {
		// TODO Auto-generated method stub
		return this.add(qrcode);
	}
	
	@Override
	public QrCode updateQrCode(QrCode qrcode) {
		// TODO Auto-generated method stub
		return this.update(qrcode);
	}
	
	@Override
	public QrCode getQrCodeById(Integer id){
		return this.sqlSession.selectOne(GETQRCODEBYID, id);
	}
}
