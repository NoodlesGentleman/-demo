package com.richest.manager.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/wechat")
public class WeChatController {
	@RequestMapping(value = "show")
	public ModelAndView show(HttpServletRequest request,Map<String, Object> map) throws Exception{
		return new ModelAndView("/WEB-INF/show_material_wx");
	}
}
