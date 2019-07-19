package com.richest.manager.domain;

import java.util.Date;

public class AccessToken {
	public String access_token;
	public Integer expires_in;
	public String errcode;
	public String errmsg;
	public Date createTime;

	public String getAccess_token() {
		return access_token;
	}

	public Integer getExpires_in() {
		return expires_in;
	}

	public String getErrcode() {
		return errcode;
	}

	public String getErrmsg() {
		return errmsg;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setAccess_token(String access_token) {
		this.access_token = access_token;
	}

	public void setExpires_in(Integer expires_in) {
		this.expires_in = expires_in;
	}

	public void setErrcode(String errcode) {
		this.errcode = errcode;
	}

	public void setErrmsg(String errmsg) {
		this.errmsg = errmsg;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/*public AccessToken(String appid, String secret) throws Exception {

		URL url = new URL(
				"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="
						+ appid + "&secret=" + secret);

		// 返回一个 URLConnection 对象，它表示到 URL 所引用的远程对象的连接。
		URLConnection uc = url.openConnection();
		// 打开的连接读取的输入流。
		InputStreamReader reader = new InputStreamReader(uc.getInputStream(),
				"UTF-8");
		BufferedReader br = new BufferedReader(reader);
		String result = "";
		String str;
		while ((str = br.readLine()) != null) {
			result += str;
		}
		br.close();
		JSONObject jsonobject = JSONObject.fromObject(result);

		this.access_token = jsonobject.get("access_token") == null ? ""
				: jsonobject.getString("access_token");
		this.expires_in = jsonobject.get("expires_in") == null ? 0 : jsonobject
				.getInt("expires_in");
		this.errcode = jsonobject.get("errcode") == null ? "" : jsonobject
				.getString("errcode");
		this.errmsg = jsonobject.get("errmsg") == null ? "" : jsonobject
				.getString("errmsg");
		this.createTime = new Date();
	}*/
}
