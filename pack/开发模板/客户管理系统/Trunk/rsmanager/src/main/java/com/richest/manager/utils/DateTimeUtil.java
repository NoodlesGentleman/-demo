/**  
 * @Title: DateTimeUtil.java 
 * @Package com.shangfu.GDAS.util 
 * @Description: TODO
 * @author Aaron 
 * @date 2014年4月17日 
 * @version V1.0  
 */ 
package com.richest.manager.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import org.joda.time.DateTime;

/**
 * @author Aaron
 *
 */
public class DateTimeUtil {
	
	private static String TIME_ZONE_UTC = "UTC";
	
	private static SimpleDateFormat SDF_DEFAULT = new SimpleDateFormat("yyyy-MM-dd");
	private static SimpleDateFormat SDF_ISO = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	/**
	 * 
	 * @Title: format 
	 * @Description: 将日期格式化为 "yyyy-MM-dd"的文本格式
	 * @param date
	 * @return 
	 * @throws
	 */
	public static String format(Date date){
		return SDF_DEFAULT.format(date);
	}
	
	/**
	 * 
	 * @Title: format2 
	 * @Description: 将日期格式化为 "yyyy-MM-dd HH:mm:ss"的文本格式
	 * @param date
	 * @return 
	 * @throws
	 */
	public static String format2(Date date){
		return SDF_ISO.format(date);
	}
	
	/**
	 * 
	 * @Title: format 
	 * @Description: 将日期格式换为 指定formatter格式的文本
	 * @param date
	 * @param formatter
	 * @return 
	 * @throws
	 */
	public static String format(Date date,String formatter){
		if(formatter == null || formatter.trim().equals("")){
			format(date);
		}
		SimpleDateFormat sdf = new SimpleDateFormat(formatter);
		return sdf.format(date);
	}
	
	/**
	 * 
	 * @Title: getDiffTimeZoneRawOffset 
	 * @Description: 计算指定时区和UTC时区之间相差的毫秒数 
	 * @param timeZoneId ——指定时间所处的时区
	 * @return 返回整数值，返回正数则表明指定时区时区的时间早于UTC时间，返回负值则表明晚于UTC时间
	 * @throws
	 */
	public static int getDiffTimeZoneRawOffsetHours(String timeZoneId) {  
        return (TimeZone.getTimeZone(TIME_ZONE_UTC).getRawOffset() - TimeZone.getTimeZone(timeZoneId).getRawOffset());  
    }
	
	/**
	 * 
	 * @Title: toLocalDate 
	 * @Description: 将UTC时间转换为指定 timeZoneId时区的时间
	 * @param utcDate ——UTC时间
	 * @param timeZoneId ——指定 timeZoneId时区ID，如北京时间为"Asia/Shanghai"
	 * @return 
	 * @throws
	 */
	public static Date toLocalDate(Date utcDate,String timeZoneId){
		if(null == timeZoneId || "".equals(timeZoneId)){
			return utcDate;
		}
		DateTime dt = new DateTime(utcDate);
		return dt.plus(-getDiffTimeZoneRawOffsetHours(timeZoneId)).toDate();
	}
	
	/**
	 * 
	 * @Title: toLocalDate 
	 * @Description: 将UTC时间转换为指定服务器所致时区的时间 
	 * @param utcDate
	 * @return 
	 * @throws
	 */
	public static Date toLocalDate(Date utcDate){
		String currTimeZonId = TimeZone.getDefault().getID();
		DateTime dt = new DateTime(utcDate);
		return dt.plus(-getDiffTimeZoneRawOffsetHours(currTimeZonId)).toDate();
	}
	
	/**
	 * 
	 * @Title: toUTCDate 
	 * @Description: 将指定 时区(时区ID为timeZoneId)的时间转换为UTC时间
	 * @param date ——要转换的指定时区的时间
	 * @param timeZoneId ——指定 时区IDm，如北京时间为"Asia/Shanghai"
	 * @return 
	 * @throws
	 */
	public static Date toUTCDate(Date date,String timeZoneId){
		if(null == timeZoneId || "".equals(timeZoneId) || TIME_ZONE_UTC.equals(timeZoneId)){
			return date;
		}
		DateTime dt = new DateTime(date);
		return dt.plus(getDiffTimeZoneRawOffsetHours(timeZoneId)).toDate();
	}
	
	/**
	 * 
	 * @Title: toUTCDate 
	 * @Description: 将服务器所在时区的时间转换为UTC时间 
	 * @param date
	 * @return 
	 * @throws
	 */
	public static Date toUTCDate(Date date){
		String currTimeZonId = TimeZone.getDefault().getID();
		if(TIME_ZONE_UTC.equals(currTimeZonId)){
			return date;
		}
		DateTime dt = new DateTime(date);
		return dt.plus(getDiffTimeZoneRawOffsetHours(currTimeZonId)).toDate();
	}
	
	/**
	 * 获取默认时区
	 * @return
	 */
	public static String getLocalTimeZone() {
		return TimeZone.getDefault().getID();
	}
	
	/**
	 * 
	 * @Title: getDiffTimeMills 
	 * @Description: 计算两个时间之前的毫秒差: date1 - date2
	 * @param date1
	 * @param date2
	 * @return 
	 * @throws
	 */
	public static long getDiffTimeMills(Date date1,Date date2){
		return date1.getTime() - date2.getTime();
	}
	
	/**
	 * 字符串时间转换成日期类型
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public static Date getDateFromString(String date) throws Exception {
		Date time = null;
		try {
			time = SDF_DEFAULT.parse(date);
			return time;
		} catch (Exception e) {
			// TODO: handle exception
			throw e;
		}
	}
}
