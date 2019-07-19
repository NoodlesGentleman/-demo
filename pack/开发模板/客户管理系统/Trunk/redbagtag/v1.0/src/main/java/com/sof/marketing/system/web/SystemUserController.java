package com.sof.marketing.system.web;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.bluemobi.framework.common.contant.Const;
import com.bluemobi.framework.common.dto.PageEntity;
import com.bluemobi.framework.common.dto.ResponseEntity;
import com.bluemobi.framework.common.util.ValidateCodeUtil;
import com.sof.marketing.system.domain.SystemUser;
import com.sof.marketing.system.service.ISystemUserService;
import com.sof.marketing.system.util.ShareData;

import springfox.documentation.annotations.ApiIgnore;

@Controller
@RequestMapping("/sysUser")
@ApiIgnore
public class SystemUserController extends AbstractController {

	@Resource
	private ISystemUserService userService;

	@RequestMapping(value = "/tologin", method = RequestMethod.GET)
	public ModelAndView toLogin(HttpServletRequest request) {
		// 查询cookie中是否有值，有值则将值传递到登录页面
		// 可以不用记录COOKIES（如果禁用的话，就取不到值）
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			Cookie[] cookies = request.getCookies();
			for (Cookie c : cookies) {
				if ("user_login_name".equals(URLDecoder.decode(c.getName(),
						"utf-8"))) {
					map.put("user_login_name",
							URLDecoder.decode(c.getValue(), "utf-8"));
				}
				if ("user_password".equals(URLDecoder.decode(c.getName(),
						"utf-8"))) {
					map.put("user_password",
							URLDecoder.decode(c.getValue(), "utf-8"));
				}
			}
		} catch (Exception e) {
			return new ModelAndView("login/sign.in", map);
		}
		return new ModelAndView("login/sign.in", map);
	}

	@RequestMapping(value = "/getImage", method = RequestMethod.GET)
	public void getImage(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		// 禁止缓存
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "No-cache");
		response.setDateHeader("Expires", 0);
		// 指定生成的响应是图片
		response.setContentType("image/jpeg");

		ValidateCodeUtil validateCode = new ValidateCodeUtil();
		String code = validateCode.generateRandomNumberCode();

		HttpSession session = request.getSession(true);
		session.setAttribute("checkCode", code);
		ImageIO.write(validateCode.getImageWithNormal(code), "JPEG",
				response.getOutputStream());
	}

	@RequestMapping(value = "/userLogin", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity login(HttpServletRequest request,
			HttpServletResponse response) {
		// 参数获取
		String code = request.getParameter("captcha").toString();
		String username = request.getParameter("username").toString();
		String password = request.getParameter("password").toString();

		PageEntity page = new PageEntity();
		ResponseEntity res = new ResponseEntity(page);

		HttpSession session = request.getSession(true);
		String checkCode = session.getAttribute("checkCode").toString();

		if (code.equals(checkCode)) {
			// 如果相等的话，则进行下一步判断
			// 判断用户是否存在

			SystemUser user = new SystemUser(false);
			user.setUser_login_name(username);
			
			user = (SystemUser)userService.getSystemUserOne(user).getData();

			if (user != null) {
				if(user.getUser_pwd().equals(DigestUtils.md5Hex(DigestUtils.md5Hex(password) + user.getRandomStr()).toUpperCase())) {
					// 保留用户的信息 （单片机保留在session中，分布式则保存在数据库或者内存中）
					// 下面只实现单片机
					ShareData shareData = new ShareData();
					shareData.setUser_id(user.getUser_id());
					session.setAttribute("shareData", shareData);
					res.setStatus(Const.SUCCESS);
					res.setMsg("成功登录");
					res.setData("/sysUser/continue?rnd=" + Math.random());
				} else {
					res.setStatus(Const.FAIL);
					res.setError("密码错误！");
					res.setData("");
				}				
			} else {
				res.setStatus(Const.FAIL);
				res.setError("用户名不存在！");
				res.setData("");
			}
		} else {
			// 验证码不一致
			res.setStatus(Const.FAIL);
			res.setError("验证码错误！");
			res.setData("");
		}

		return res;
	}

	@RequestMapping(value = "/continue", method = RequestMethod.GET)
	public ModelAndView getContinue(HttpServletRequest req,
			HttpServletResponse response) {

		Map<String, Object> map = new HashMap<String, Object>();
		
		initIndex(req, response, map);

		return new ModelAndView("login/index.index", map);
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public ModelAndView logout(HttpServletRequest request) {

		HttpSession session = request.getSession(true);
		session.removeAttribute("shareData");
		return new ModelAndView("login/sign.in");
	}

	@RequestMapping(value = "/listView", method = RequestMethod.GET)
	public ModelAndView listView(HttpServletRequest req,
			HttpServletResponse response) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		initIndex(req, response, map);
		
		return new ModelAndView("sysUser/listView", map);
	}

	@RequestMapping(value = "/newView", method = RequestMethod.GET)
	public ModelAndView newView(HttpServletRequest req,
			HttpServletResponse response) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		initIndex(req, response, map);
		
		return new ModelAndView("sysUser/newView", map);
	}

	@RequestMapping(value = "/editView", method = RequestMethod.GET)
	public ModelAndView editView(HttpServletRequest req,
			HttpServletResponse response) {
		Map<String, Object> map = new HashMap<String, Object>();

		String id = req.getParameter("id").toString();
		SystemUser user = new SystemUser(id);
		user = (SystemUser)userService.getSystemUserOne(user).getData();

		initIndex(req, response, map);

		map.put("user", user);
		return new ModelAndView("sysUser/editView", map);
	}

	@RequestMapping(value = "/infoView", method = RequestMethod.GET)
	public ModelAndView infoView(HttpServletRequest req,
			HttpServletResponse response) {
		Map<String, Object> map = new HashMap<String, Object>();

		String id = req.getParameter("id").toString();
		SystemUser user = new SystemUser(id);
		user = (SystemUser)userService.getSystemUserOne(user).getData();

		initIndex(req, response, map);

		map.put("user", user);
		return new ModelAndView("sysUser/infoView", map);
	}

	@RequestMapping(value = "/listM", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity listM(Integer pageNum, Integer numPerPage, SystemUser user) {
		ResponseEntity res = new ResponseEntity();
		
		res = userService.getSystemUserList(user, pageNum, numPerPage);
		
		return res;
	}

	@RequestMapping(value = "/remove", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity remove(String user_id) {
		ResponseEntity res = new ResponseEntity();

		res = userService.delete(user_id);

		return res;
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity update(SystemUser user, String userRoleId) {
		ResponseEntity res = new ResponseEntity();

		SystemUser usertmp = new SystemUser(user.getUser_id());
		usertmp = (SystemUser)userService.getSystemUserOne(usertmp).getData();
		
		// 密码变成MD5
		if(!usertmp.getUser_pwd().equals(user.getUser_pwd())) {
			// 需要做变更
			// 密码变成MD5
			if (StringUtils.isNotEmpty(user.getUser_pwd())) {
				user.setUser_pwd(DigestUtils.md5Hex(DigestUtils.md5Hex(user.getUser_pwd()) + usertmp.getRandomStr()).toUpperCase());
			}
		}
		user.setRole_id(userRoleId);
		
		res = userService.update(user);
		
		return res;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity save(SystemUser user, String userRoleId) {
		ResponseEntity res = new ResponseEntity();

		// 密码变成MD5
		// 生成随机密码字符串
		String randomStr = new ValidateCodeUtil(65, 24, 4).generateRandomMixedCode();
		String password = DigestUtils.md5Hex(user.getUser_pwd()) + randomStr;
		
		user.setUser_pwd(DigestUtils.md5Hex(password).toUpperCase());
		user.setRandomStr(randomStr);
		user.setRole_id(userRoleId);
		
		res = userService.save(user);
		
		return res;
	}
}
