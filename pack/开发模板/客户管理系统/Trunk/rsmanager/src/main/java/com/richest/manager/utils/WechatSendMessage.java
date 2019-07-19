package com.richest.manager.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

public class WechatSendMessage {
	public static String send(String url, String json, String token) throws Exception{
		HttpClient httpClient = new DefaultHttpClient(); 
		String result = "";
    	HttpPost httpPost = new HttpPost(url + token);
    	httpPost.addHeader("Content-Type", "application/json");    
    	httpPost.addHeader("charset", "UTF-8");
    	StringEntity reqEntity = new StringEntity(json,"UTF-8");
		
		httpPost.setEntity(reqEntity);
		
		HttpResponse response = httpClient.execute(httpPost); 

		HttpEntity entity = response.getEntity();

		if (entity != null) {
			System.out.println("Response content length: " + entity.getContentLength());
			BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(entity.getContent(),"UTF-8"));
			String text;
			
			while ((text = bufferedReader.readLine()) != null) {
				System.out.println(text);
				result += text;
            }
			
        }
        EntityUtils.consume(entity);
        httpClient.getConnectionManager().shutdown();
        return result;
	}
}
