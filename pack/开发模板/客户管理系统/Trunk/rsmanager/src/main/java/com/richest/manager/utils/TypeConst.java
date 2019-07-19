package com.richest.manager.utils;

public class TypeConst {
	public enum Message {
		M00000 {
			public String getName() {
				return "注册成功！";
			}
			public String getValue() {
				return "00000";
			}
		},
		M00001 {
			public String getName() {
				return "该账号已经存在！";
			}
			public String getValue() {
				return "00001";
			}
		},
		M00002 {
			public String getName() {
				return "请使用微信浏览器！";
			}
			public String getValue() {
				return "00002";
			}
		},
		M00003 {
			public String getName() {
				return "保存成功！";
			}
			public String getValue() {
				return "00003";
			}
		},
		M00004 {
			public String getName() {
				return "保存失败！";
			}
			public String getValue() {
				return "00004";
			}
		},
		M00005 {
			public String getName() {
				return "登录超时！";
			}
			public String getValue() {
				return "00005";
			}
		},
		M00006 {
			public String getName() {
				return "您没有这个权限！";
			}
			public String getValue() {
				return "00006";
			}
		},
		M00007 {
			public String getName() {
				return "验证码发送失败，请稍后重试！";
			}
			public String getValue() {
				return "00007";
			}
		},
		M00008 {
			public String getName() {
				return "验证码发送成功！";
			}
			public String getValue() {
				return "00008";
			}
		},
		M00009 {
			public String getName() {
				return "校验码错误！";
			}
			public String getValue() {
				return "00009";
			}
		},
		M00010 {
			public String getName() {
				return "此客户已被标记为自访客户，无法报备！";
			}
			public String getValue() {
				return "00010";
			}
		},
		M00011 {
			public String getName() {
				return "此客户在保护期内，无法报备！";
			}
			public String getValue() {
				return "00011";
			}
		},
		M00012 {
			public String getName() {
				return "申请成功！";
			}
			public String getValue() {
				return "00012";
			}
		},
		M00013 {
			public String getName() {
				return "申请失败！";
			}
			public String getValue() {
				return "00013";
			}
		},
		M00014 {
			public String getName() {
				return "添加成功！";
			}
			public String getValue() {
				return "00014";
			}
		},
		M00015 {
			public String getName() {
				return "添加失败！";
			}
			public String getValue() {
				return "00015";
			}
		},
		M00016 {
			public String getName() {
				return "登记完成！";
			}
			public String getValue() {
				return "00016";
			}
		},
		M00017 {
			public String getName() {
				return "登记失败！";
			}
			public String getValue() {
				return "00017";
			}
		},
		M00018 {
			public String getName() {
				return "您还没有报备权限，请联系系统管理员！";
			}
			public String getValue() {
				return "00018";
			}
		},
		M00019 {
			public String getName() {
				return "二维码生成失败！";
			}
			public String getValue() {
				return "00019";
			}
		};
		
		public abstract String getName();
		public abstract String getValue();
	}
}
