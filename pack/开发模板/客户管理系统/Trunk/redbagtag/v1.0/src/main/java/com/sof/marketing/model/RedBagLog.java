package com.sof.marketing.model;

import java.io.Serializable;
import java.util.Date;

public class RedBagLog implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
     * red_bag_log.openid (发放人openid)
     * @ibatorgenerated 2018-04-17 14:17:35
     */
    private String openid;

    /**
     * red_bag_log.total_amount (发放金额（分）)
     * @ibatorgenerated 2018-04-17 14:17:35
     */
    private Integer totalAmount;

    /**
     * red_bag_log.return_code (返回code )
     * @ibatorgenerated 2018-04-17 14:17:35
     */
    private String returnCode;

    /**
     * red_bag_log.return_msg (返回信息)
     * @ibatorgenerated 2018-04-17 14:17:35
     */
    private String returnMsg;

    /**
     * red_bag_log.err_code (返回错误code)
     * @ibatorgenerated 2018-04-17 14:17:35
     */
    private String errCode;

    /**
     * red_bag_log.mch_billno (红包订单号)
     * @ibatorgenerated 2018-04-17 14:17:35
     */
    private String mchBillno;

    /**
     * red_bag_log.sent_time (发放时间)
     * @ibatorgenerated 2018-04-17 14:17:35
     */
    private Date sentTime;

    /**
     * red_bag_log.receive (1收到，0未收到)
     * @ibatorgenerated 2018-04-17 14:17:35
     */
    private Integer receive;

    /**
     * red_bag_log.receive_time
     * @ibatorgenerated 2018-04-17 14:17:35
     */
    private Date receiveTime;

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public Integer getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Integer totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getReturnCode() {
        return returnCode;
    }

    public void setReturnCode(String returnCode) {
        this.returnCode = returnCode;
    }

    public String getReturnMsg() {
        return returnMsg;
    }

    public void setReturnMsg(String returnMsg) {
        this.returnMsg = returnMsg;
    }

    public String getErrCode() {
        return errCode;
    }

    public void setErrCode(String errCode) {
        this.errCode = errCode;
    }

    public String getMchBillno() {
        return mchBillno;
    }

    public void setMchBillno(String mchBillno) {
        this.mchBillno = mchBillno;
    }

    public Date getSentTime() {
        return sentTime;
    }

    public void setSentTime(Date sentTime) {
        this.sentTime = sentTime;
    }

    public Integer getReceive() {
        return receive;
    }

    public void setReceive(Integer receive) {
        this.receive = receive;
    }

    public Date getReceiveTime() {
        return receiveTime;
    }

    public void setReceiveTime(Date receiveTime) {
        this.receiveTime = receiveTime;
    }
}