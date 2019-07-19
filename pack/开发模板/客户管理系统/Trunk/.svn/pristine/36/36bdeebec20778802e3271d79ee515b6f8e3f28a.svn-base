package com.richest.manager.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.richest.manager.dao.IBuildingDao;
import com.richest.manager.dao.ICampaignDao;
import com.richest.manager.dao.ICompanyDao;
import com.richest.manager.dao.IQrCodeDao;
import com.richest.manager.dao.IUserDao;
import com.richest.manager.dao.IWXAccessTokenDao;
import com.richest.manager.domain.Article;
import com.richest.manager.domain.Company;
import com.richest.manager.domain.QrCode;
import com.richest.manager.domain.User;
import com.richest.manager.dto.MessageDto;
import com.richest.manager.dto.ProjectStatisticsDto;
import com.richest.manager.service.IArticleService;
import com.richest.manager.utils.CommonUtils;
import com.richest.manager.utils.FinalOpenId;
import com.richest.manager.utils.WeChatUtil;
import com.richest.manager.utils.TypeConst.Message;

@Controller
@RequestMapping("/")
public class IndexController extends BaseController{
	@Autowired
	ICompanyDao iCompanyDao;
	@Autowired
	IUserDao iUserDao;
	@Autowired
	ICampaignDao iCampaignDao;
	@Autowired
	IBuildingDao iBuildingDao;
	@Autowired
	IArticleService iArticleService;
	@Autowired
	IQrCodeDao iQrCodeDao;
	@Autowired
	IWXAccessTokenDao iWXAccessTokenDao;
	
	private ModelAndView load(HttpServletRequest request, Map<String,Object> map){
		Object obj = request.getSession().getAttribute("userInfo");
		if(obj != null && ((FinalOpenId)obj).getUser() != null){
			map.put("us", ((FinalOpenId)obj).getUser());
		}
		if(obj != null && ((FinalOpenId)obj).getUser() != null && ((FinalOpenId)obj).getUser().getType_code() != null
				&& (((FinalOpenId)obj).getUser().getType_code().equals("ADMIN") || ((FinalOpenId)obj).getUser().getType_code().equals("SALER"))){
			List<ProjectStatisticsDto> statistics = iCampaignDao.getProjectStatisticsById(((FinalOpenId)obj).getUser().getId());
			map.put("Statistics", statistics.get(0));
			return new ModelAndView("/admin");
		}
		List<Company> companys = iCompanyDao.getCompanyBybuildingId(0);
		map.put("companys", companys);
		Integer companyId = 0;
		if(null != obj && ((FinalOpenId)obj).getUser() != null)
			companyId = ((FinalOpenId)obj).getUser().getCompanyId();
		map.put("buildings", iBuildingDao.getBuildings(companyId));
		map.put("hot", iBuildingDao.getHotBuildings(companyId));
		return new ModelAndView("/index");
	}
	
	@RequestMapping(value = "index")
	protected ModelAndView Index(HttpServletRequest request, HttpServletResponse response, Map<String,Object> map) throws IOException{
		String reload = request.getParameter("reload");
		if(!StringUtils.hasText(reload))
			this.getUserOpenId(request,response);
		
		return load(request, map);
	}
	
	@RequestMapping(value = "/showqrcode/{bid}",method=RequestMethod.GET)
	@ResponseBody
	protected MessageDto showqrcode(HttpServletRequest request, @PathVariable("bid") Integer bid){
		MessageDto mdto = new MessageDto();
		Object obj = request.getSession().getAttribute("userInfo");
		if(null != obj && null != ((FinalOpenId)obj).getUser()){
			Integer uid = ((FinalOpenId)obj).getUser().getId();
			if(1 == iUserDao.getUserById(uid).getIsDel()){
				mdto.setCode(Message.M00018.getValue());
				mdto.setMessage(Message.M00018.getName());
				return mdto;
			}
			QrCode qrcode = new QrCode();
			qrcode.setUserId(uid);
			qrcode.setBuildingId(bid);
			qrcode = iQrCodeDao.addQrCode(qrcode);

			String token = iWXAccessTokenDao.getToken().getAccess_token();
			qrcode = new WeChatUtil().getqrcode(qrcode, token);
			if(null != qrcode){
				iQrCodeDao.updateQrCode(qrcode);
				mdto.setObj("https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + qrcode.getTicket());
			}
		}else{
			mdto.setCode(Message.M00019.getValue());
			mdto.setMessage(Message.M00019.getValue());
		}
		return mdto;
	}
	
	@RequestMapping(value = "/regqrcode/{uid}/{bid}/{cid}",method=RequestMethod.GET)
	@ResponseBody
	protected MessageDto regqrcode(HttpServletRequest request, @PathVariable("uid") Integer uid, @PathVariable("bid") Integer bid, @PathVariable("cid") Integer cid){
		MessageDto mdto = new MessageDto();
		Object obj = request.getSession().getAttribute("userInfo");
		if(null != obj && null != ((FinalOpenId)obj).getUser()){
			Integer sid = ((FinalOpenId)obj).getUser().getId();
			QrCode qrcode = new QrCode();
			qrcode.setUserId(uid);
			qrcode.setBuildingId(bid);
			qrcode.setCampaignId(cid);
			qrcode.setSalerId(sid);
			qrcode = iQrCodeDao.addQrCode(qrcode);
			String token = iWXAccessTokenDao.getToken().getAccess_token();
			qrcode = new WeChatUtil().getqrcode(qrcode, token);
			if(null != qrcode){
				iQrCodeDao.updateQrCode(qrcode);
				mdto.setObj(qrcode.getTicket());
			}
		}else{
			mdto.setCode(Message.M00019.getValue());
			mdto.setMessage(Message.M00019.getValue());
		}
		return mdto;
	}

	@RequestMapping(value = "wchat")
	protected void wchat(HttpServletRequest request, HttpServletResponse response) throws IOException {		
		String echostr = request.getParameter("echostr");
		if(StringUtils.hasText(echostr)){
			response.getWriter().write(echostr);
		}else{
			Map<?,?> map = null;
			try {
				BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));  
				String line = null;  
		        StringBuilder sb = new StringBuilder();  
		        while((line = br.readLine())!=null){  
		            sb.append(line);  
		        }
				map = CommonUtils.doXMLParse(sb.toString());
				//文本消息
				if(map == null || map.size() <= 0){
					response.getWriter().write("");
					return;
				}
				StringBuilder result = new StringBuilder("");
				StringBuffer url = request.getRequestURL(); 
				String tempContextUrl = url.delete(url.length() - request.getRequestURI().length(), url.length()).append(request.getContextPath()).append("/").toString();
				
				result.append("<xml>");
				result.append("<ToUserName><![CDATA[").append(map.get("FromUserName")).append("]]></ToUserName>");
				result.append("<FromUserName><![CDATA[").append(map.get("ToUserName")).append("]]></FromUserName>");
				result.append("<CreateTime>").append(System.currentTimeMillis()).append("</CreateTime>");
				result.append("<MsgType><![CDATA[news]]></MsgType>");
				
				//微信文本输入
				if(map.get("MsgType").equals("text")){
					
					if(!StringUtils.hasText(map.get("Content").toString())){
						response.getWriter().write("");
						return;
					}
									
					List<Article> Articles = iArticleService.getArticlesByKeyword(map.get("Content").toString());
					
					result.append("<ArticleCount>").append(Articles.size()).append("</ArticleCount>");
					result.append("<Articles>");
					
					
					if(Articles.size() > 0){
						Articles = Articles.subList(0, Articles.size() - 1);
						for(Article item : Articles){
							result.append("<item>");
							result.append("<Title><![CDATA[").append(item.getTitle()).append("]]></Title>");
							result.append("<Description><![CDATA[").append(item.getDescription()).append("]]></Description>");
							result.append("<PicUrl><![CDATA[").append(item.getPicUrl()).append("]]></PicUrl>");
							result.append("<Url><![CDATA["+tempContextUrl+"wechat/show.do?openid="+map.get("FromUserName") + "&sofcustomoid=" + map.get("FromUserName") +"&t=").append(URLEncoder.encode(item.getUrl(), "utf-8")).append("]]></Url>");
							result.append("</item>");
						}
						
					}else{
						response.setCharacterEncoding("UTF-8");
						response.getWriter().write("该楼盘尚未收录，我们会尽快收录并为您推送该楼盘相关信息！");
						return;
					}
				}else if(map.get("MsgType").equals("event")){
					if(map.get("Event").equals("subscribe")){//微信关注事件
						
						List<Article> Articles = iArticleService.getArticlesForSuZhou();
						
						result.append("<ArticleCount>").append(Articles.size()).append("</ArticleCount>");
						result.append("<Articles>");
						if(Articles.size() > 0){
							//Articles = Articles.subList(0, max);
							for(Article item : Articles){
								result.append("<item>");
								result.append("<Title><![CDATA[").append(item.getTitle()).append("]]></Title>");
								result.append("<Description><![CDATA[").append(item.getDescription()).append("]]></Description>");
								result.append("<PicUrl><![CDATA[").append(item.getPicUrl()).append("]]></PicUrl>");
								result.append("<Url><![CDATA["+tempContextUrl+"wechat/show.do?openid="+map.get("FromUserName") + "&sofcustomoid=" + map.get("FromUserName") +"&t=").append(URLEncoder.encode(item.getUrl(), "utf-8")).append("]]></Url>");
								result.append("</item>");
							}
							
						}else{
							response.getWriter().write("");
							return;
						}
						
						if(null != map.get("EventKey") && StringUtils.hasText(map.get("EventKey").toString()) 
								&& map.get("EventKey").toString().contains("qrscene_")){
							new WeChatUtil().sendRegistMessage(map.get("FromUserName").toString()
									, iQrCodeDao.getQrCodeById(Integer.parseInt(map.get("EventKey").toString().replace("qrscene_", "")))
									, iWXAccessTokenDao.getToken().getAccess_token());
						}
						
						System.out.print("-----result----------"+result);
						
					} else if(map.get("Event").equals("unsubscribe")) {
						
					} else if (map.get("Event").equals("SCAN")) {//微信扫码事件
						if(null != map.get("EventKey") && StringUtils.hasText(map.get("EventKey").toString())){
							new WeChatUtil().sendRegistMessage(map.get("FromUserName").toString()
									, iQrCodeDao.getQrCodeById(Integer.parseInt(map.get("EventKey").toString()))
									, iWXAccessTokenDao.getToken().getAccess_token());
						}
					} else if (map.get("Event").equals("CLICK")) {//微信点击事件
						String key = map.get("EventKey").toString();
						if (key.equals("szhouse")) {
							List<Article> Articles = iArticleService.getArticlesForSuZhou();
							
							result.append("<ArticleCount>").append(Articles.size()).append("</ArticleCount>");
							result.append("<Articles>");
							if(Articles.size() > 0){
								//Articles = Articles.subList(0, max);
								for(Article item : Articles){
									result.append("<item>");
									result.append("<Title><![CDATA[").append(item.getTitle()).append("]]></Title>");
									result.append("<Description><![CDATA[").append(item.getDescription()).append("]]></Description>");
									result.append("<PicUrl><![CDATA[").append(item.getPicUrl()).append("]]></PicUrl>");
									result.append("<Url><![CDATA["+tempContextUrl+"wechat/show.do?sofcustomoid=" + map.get("FromUserName") +"&t=").append(URLEncoder.encode(item.getUrl(), "utf-8")).append("]]></Url>");
									result.append("</item>");
								}
								
							}else{
								response.getWriter().write("");
								return;
							}
						}
					}
				}
				
				result.append("</Articles>");
				result.append("</xml>");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write(result.toString());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.getWriter().write("");
			}
			response.getWriter().write("");
		}
	}
	
	
	@RequestMapping(value = "recommend")
	protected ModelAndView recommend(HttpServletRequest request, HttpServletResponse response, Map<String,Object> map){
		return load(request, map);
	}
	
	
	@RequestMapping(value = "customer")
	protected ModelAndView customer(HttpServletRequest request, HttpServletResponse response, Map<String,Object> map){
		return load(request, map);
	}
	
	
	@RequestMapping(value = "message")
	protected ModelAndView message(HttpServletRequest request, HttpServletResponse response, Map<String,Object> map){
		return load(request, map);
	}
	
	
	@RequestMapping(value = "rules")
	protected ModelAndView rules(HttpServletRequest request, HttpServletResponse response, Map<String,Object> map){
		return load(request, map);
	}
	
	
	@RequestMapping(value = "project")
	protected ModelAndView project(HttpServletRequest request, HttpServletResponse response, Map<String,Object> map){
		return load(request, map);
	}
	
	
	@RequestMapping(value = "reward")
	protected ModelAndView reward(HttpServletRequest request, HttpServletResponse response, Map<String,Object> map){
		return load(request, map);
	}
	
	
	@RequestMapping(value = "share")
	protected ModelAndView share(HttpServletRequest request, HttpServletResponse response, Map<String,Object> map){
		return load(request, map);
	}
	
	
	@RequestMapping(value = "info")
	protected ModelAndView info(HttpServletRequest request, HttpServletResponse response, Map<String,Object> map){
		return load(request, map);
	}
	
	
	@RequestMapping(value = "login")
	protected ModelAndView login(HttpServletRequest request, HttpServletResponse response, Map<String,Object> map){
		return load(request, map);
	}
	
	
	@RequestMapping(value = "archives")
	protected ModelAndView archives(HttpServletRequest request, HttpServletResponse response){
		return new ModelAndView("/admin");
	}
	
	@RequestMapping(value = "tologin")
	protected ModelAndView tologin(HttpServletRequest request, HttpServletResponse response, Map<String,Object> map){
		String id = request.getParameter("id");
		User user = iUserDao.getUserById(Integer.parseInt(id));
		FinalOpenId OpenIdInstance = new FinalOpenId(user.getOpenid(), user);
		request.getSession().setAttribute("userInfo", OpenIdInstance);
		return load(request, map);
	}
	
	@ResponseBody
	@RequestMapping(value = "islogin")
	protected int islogin(HttpServletRequest request){
		Object obj = request.getSession().getAttribute("userInfo");
		if(null != obj && null != ((FinalOpenId)obj).getUser()){
			return 1;
		}
		return 0;
	}
}
