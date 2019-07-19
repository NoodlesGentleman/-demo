package com.richest.manager.utils;

import java.util.Date;
import java.util.List;

import net.sf.json.JSONObject;

import org.springframework.util.StringUtils;

import com.richest.manager.dto.CampaignDto;
import com.richest.manager.domain.QrCode;
import com.richest.manager.domain.Saler;
import com.richest.manager.utils.DateTimeUtil;
import com.richest.manager.utils.WechatSendMessage;


public class WeChatUtil {
	private static String template_id_reg = "NQzPifc8J0P7oiBTJXX8P5ho-ZyrHdfLYsn7MUQOQX8";
	private static String template_id_saler = "ztqAVLs9ZtbOOY_dGOZHoxLjkO8Uh2xsGZcu3OlZy44";
	private static String template_cus_regist = "81A0hc3AxStrk-6hmHd-EvYuv9g4OzUbdkZaxDP9fAM";
	
	public void sendRegistMessage(String openid, QrCode qr, String token) throws Exception{
		if(StringUtils.hasText(openid)){
			String url = "";
			if(qr.getCampaignId() > 0 && qr.getSalerId() > 0)
				url = "http://manager.fangsir007.com/customer/check/" + qr.getCampaignId() + "/" + qr.getSalerId();
			else
				url = "http://manager.fangsir007.com/customer/regist/" + qr.getUserId() + "/" + qr.getBuildingId();
			String json =  "{"
					   + "\"touser\":\"" + openid + "\","
			           + "\"template_id\":\"" + template_cus_regist + "\","
			           + "\"url\":\"" + url + "\","
			           + "\"topcolor\":\"#FF0000\","
			           + "\"data\":{"
	                + "\"first\": {"
	                + "\"value\":\"尊敬的客户\","
	                + "\"color\":\"#173177\""
	                + "},"
	                + "\"keyword1\":{"
	                + "\"value\":\"" + DateTimeUtil.format(new Date()) +"\","
	                + "\"color\":\"#173177\""
	                + "},"
	                + "\"keyword2\":{"
	                + "\"value\":\"" + qr.getUserName() + " " + qr.getUserMobile() +"\","
	                + "\"color\":\"#173177\""
	                + "},"
	                + "\"keyword3\": {"
	                + "\"value\":\"" + qr.getBuildingName() +"\","
	                + "\"color\":\"#173177\""
	                + "},"
	                + "\"remark\":{"
	                + "\"value\":\"点击详情登记\","
	                + "\"color\":\"#173177\""
	                + "}"
	                + "}"
	                + "}";
			WechatSendMessage.send("https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=",json,token);
		}
	}
	
	public void sendCheckCode(String openid, String code, String token) throws Exception{
		if(StringUtils.hasText(openid)){
			String json =  "{"
					   + "\"touser\":\"" + openid + "\","
			           + "\"template_id\":\"" + template_id_reg + "\","
			           + "\"url\":\"\","
			           + "\"topcolor\":\"#FF0000\","
			           + "\"data\":{"
	                + "\"first\": {"
	                + "\"value\":\"品源科技\","
	                + "\"color\":\"#173177\""
	                + "},"
	                + "\"keyword1\": {"
	                + "\"value\":\"" + code + "\","
	                + "\"color\":\"#173177\""
	                + "},"
	                + "\"keyword2\":{"
	                + "\"value\":\"" + DateTimeUtil.format(new Date()) + "\","
	                + "\"color\":\"#173177\""
	                + "},"
	                + "\"remark\":{"
	                + "\"value\":\"请不要把验证码泄露给其他人\","
	                + "\"color\":\"#173177\""
	                + "}"
	                + "}"
	                + "}";
			WechatSendMessage.send("https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=",json,token);
		}
	}
	
	public Integer sendSalerApply(List<Saler> salers, String token, CampaignDto campaignDto, String Event_name) {
		String json = "";
		try{
			for(Saler saler : salers){
				if(StringUtils.hasText(saler.getOpenId())){
					json =  "{"
						    + "\"touser\":\"" + saler.getOpenId() + "\","
				            + "\"template_id\":\"" + template_id_saler + "\","
				            + "\"url\":\"\","
				            + "\"topcolor\":\"#FF0000\","
				            + "\"data\":{"
			                + "\"first\": {"
			                + "\"value\":\"【" + campaignDto.getUserCompany() + "】经纪人" + campaignDto.getUserName() + "，申请" + Event_name + "\","
			                + "\"color\":\"#173177\""
			                + "},"
			                + "\"keyword1\": {"
			                + "\"value\":\"" + campaignDto.getUserMobile() + "\","
			                + "\"color\":\"#173177\""
			                + "},"
			                + "\"keyword2\":{"
			                + "\"value\":\"" + DateTimeUtil.format(new Date()) + "\","
			                + "\"color\":\"#173177\""
			                + "},"
			                + "\"remark\":{"
			                + "\"value\":\""
			                + "报备单编号：" + campaignDto.getCode() +"\\r\\n"
			                + "客户姓名：" + campaignDto.getCustomerName() +"\\r\\n"
			                + "联系电话：" + campaignDto.getCustomermobile() +"\","
			                + "\"color\":\"#173177\""
			                + "}"
			                + "}"
			                + "}";
					WechatSendMessage.send("https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=",json,token);
				}
			}
		}catch(Exception ex){
			return 0;
		}
		return 1;
	}
	
	public QrCode getqrcode(QrCode qr, String token){
		try{
			String json = "{\"expire_seconds\": 3600, \"action_name\": \"QR_SCENE\", \"action_info\": {\"scene\": {\"scene_id\": " + qr.getId() + "}}}";
			String result = WechatSendMessage.send("https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=",json,token);			
			JSONObject jsonobject = JSONObject.fromObject(result);
			String ticket = jsonobject.getString("ticket");
			if(StringUtils.hasText(ticket)){
				qr.setTicket(ticket);
				qr.setUrl(jsonobject.getString("url"));
				qr.setExpire_seconds(Integer.parseInt(jsonobject.getString("expire_seconds")));
			}else
				return null;
		}catch(Exception ex){
			return null;
		}
		return qr;
	}
}
