package com.richest.manager.dao;

import com.richest.manager.domain.QrCode;

public interface IQrCodeDao {

	QrCode addQrCode(QrCode qrcode);

	QrCode updateQrCode(QrCode qrcode);

	QrCode getQrCodeById(Integer id);

}
