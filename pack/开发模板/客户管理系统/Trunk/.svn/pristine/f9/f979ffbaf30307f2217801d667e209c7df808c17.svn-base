package com.sof.marketing.system.util;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.bluemobi.framework.common.util.ValidateCodeUtil;

public class UploadFileUtil {

	/**
	 * HTTPSERVLETREQUEST接受上传文件
	 * 
	 * @param request
	 * @param path
	 * @return
	 */
	public static String uploadFile(HttpServletRequest request) {
		String vpath = null;
		// 将HTTPSERVLET转成上传的SERVLET
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		// 可上传多个FILE
		Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();
		
		ValidateCodeUtil validateCode = new ValidateCodeUtil();

		// 循环把所有的图片都保存起来
		for (Entry<String, MultipartFile> entry : fileMap.entrySet()) {
			// 获取文件上传以及文件名称
			MultipartFile mf = entry.getValue();
			String fileName = validateCode.generateRandomMixedCode()
					+ UploadFileUtil.toString(new Date(), "yyyyMMddHHmmssSSS")
					+ "." + mf.getOriginalFilename().split("[.]")[1];
			try {
				// 生成图片路径
				String fileSubPath = UploadFileUtil.toString(new Date(),
						"yyyyMMdd");
				// 临时保存路径
				String logoPathDir = "/upload/" + fileSubPath;
				// 得到图片保存目录的真实路径
				String logoRealPathDir = StringUtils.EMPTY;
				if(Config.IS_FORMAL.equals("0")) {
					logoRealPathDir = request.getServletContext()
							.getRealPath("/") + logoPathDir;
				} else {
					logoRealPathDir = Config.IMG_URL + logoPathDir;
				}

				File logoSaveFile = new File(logoRealPathDir);
				if (!logoSaveFile.exists())
					logoSaveFile.mkdirs();
				String realFileName = logoRealPathDir + "/" + fileName;
				File upLoadedfile = new File(realFileName);

				vpath = logoPathDir + "/" + fileName;

				mf.transferTo(upLoadedfile);
			} catch (IllegalStateException e) {
				e.getMessage();
			} catch (IOException e) {
				e.getMessage();
			}
		}
		return vpath;
	}

	/**
	 * 将时间按样式转换成字符串
	 * 
	 * @param time
	 *            时间
	 * @param stringpattern
	 *            需要转成的样式
	 * @return
	 */
	private static String toString(Date time, String stringpattern) {
		SimpleDateFormat dateformat = new SimpleDateFormat(stringpattern);
		String dateString = dateformat.format(time);
		return dateString;
	}
	
	/**
	 * HTTPSERVLETREQUEST接受上传文件
	 * 
	 * @param request
	 * @param path
	 * @return
	 */
	public static Map<String, String> uploadMultiFile(HttpServletRequest request) {
		Map<String, String> vpath = new HashMap<String, String>();
		// 将HTTPSERVLET转成上传的SERVLET
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		// 可上传多个FILE
		Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();
		
		ValidateCodeUtil validateCode = new ValidateCodeUtil();

		// 循环把所有的图片都保存起来
		for (Entry<String, MultipartFile> entry : fileMap.entrySet()) {
			// 获取文件上传以及文件名称
			MultipartFile mf = entry.getValue();
			String fileName = validateCode.generateRandomMixedCode()
					+ UploadFileUtil.toString(new Date(), "yyyyMMddHHmmssSSS")
					+ "." + mf.getOriginalFilename().split("[.]")[1];
			try {
				// 生成图片路径
				String fileSubPath = UploadFileUtil.toString(new Date(),
						"yyyyMMdd");
				// 临时保存路径
				String logoPathDir = "/upload/" + fileSubPath;
				// 得到图片保存目录的真实路径
				String logoRealPathDir = StringUtils.EMPTY;
				if(Config.IS_FORMAL.equals("0")) {
					logoRealPathDir = request.getServletContext()
							.getRealPath("/") + logoPathDir;
				} else {
					logoRealPathDir = Config.IMG_URL + logoPathDir;
				}

				File logoSaveFile = new File(logoRealPathDir);
				if (!logoSaveFile.exists())
					logoSaveFile.mkdirs();
				String realFileName = logoRealPathDir + "/" + fileName;
				File upLoadedfile = new File(realFileName);
				
				vpath.put(entry.getKey(), logoPathDir + "/" + fileName);

				mf.transferTo(upLoadedfile);
			} catch (IllegalStateException e) {
				e.getMessage();
			} catch (IOException e) {
				e.getMessage();
			}
		}
		return vpath;
	}
}
