/*
 Navicat Premium Data Transfer

 Source Server         : SHDB
 Source Server Type    : MySQL
 Source Server Version : 50615
 Source Host           : 175.102.18.4
 Source Database       : rights

 Target Server Type    : MySQL
 Target Server Version : 50615
 File Encoding         : utf-8

 Date: 03/19/2018 14:09:57 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `sys_role`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `role_id` varchar(50) NOT NULL COMMENT '角色编号',
  `role_name` varchar(50) DEFAULT NULL COMMENT '角色名称',
  `role_no` int(10) DEFAULT NULL COMMENT '角色编号',
  `role_desc` varchar(255) DEFAULT NULL COMMENT '角色详情',
  `status` varchar(2) DEFAULT NULL COMMENT '状态',
  `role_type` varchar(2) DEFAULT NULL COMMENT '角色类型',
  `create_person` varchar(50) DEFAULT NULL COMMENT '创建人',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `update_person` varchar(50) DEFAULT NULL COMMENT '更新人',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统角色表';

-- ----------------------------
--  Records of `sys_role`
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` VALUES ('4a570b84-f8a6-4e8f-9aca-f529d9fe33d8', 'user', '10001', 'user', '00', '02', 'superadmin', '2016-06-02 18:38:18', null, null), ('6f60e3ea-0a89-48e7-bd7b-1e53da6dae1c', 'admin', '10000', 'admin', '00', '01', 'colin', '2015-08-26 10:10:17', 'colin', '2015-08-26 10:10:21');
COMMIT;

-- ----------------------------
--  Table structure for `sys_role_function`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_function`;
CREATE TABLE `sys_role_function` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自动编号',
  `role_id` varchar(50) DEFAULT NULL COMMENT '角色编号',
  `function_id` int(11) DEFAULT NULL COMMENT '功能编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色功能关联表';

-- ----------------------------
--  Table structure for `sys_role_nav`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_nav`;
CREATE TABLE `sys_role_nav` (
  `sys_nav_id` varchar(50) DEFAULT NULL COMMENT '菜单栏编号',
  `role_id` varchar(50) DEFAULT NULL COMMENT '角色编号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色导航关联表';

-- ----------------------------
--  Records of `sys_role_nav`
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_nav` VALUES ('bb4741dc-781c-4d23-84ff-0c94fa007d45', '6f60e3ea-0a89-48e7-bd7b-1e53da6dae1c'), ('063c9f9f-5145-4305-bb99-47595aeef877', '6f60e3ea-0a89-48e7-bd7b-1e53da6dae1c'), ('44dc1c79-fdf4-4e05-94b6-92a2d6dbff13', '6f60e3ea-0a89-48e7-bd7b-1e53da6dae1c'), ('44dc1c79-fdf4-4e05-94b6-92a2d6dbff13', '4a570b84-f8a6-4e8f-9aca-f529d9fe33d8'), ('bb4741dc-781c-4d23-84ff-0c94fa007d45', '4a570b84-f8a6-4e8f-9aca-f529d9fe33d8'), ('55fbb997-6e0f-4f23-a9ff-c24758502ef7', '4a570b84-f8a6-4e8f-9aca-f529d9fe33d8'), ('fd088473-7ad3-4a89-b175-70446229b8fd', '4a570b84-f8a6-4e8f-9aca-f529d9fe33d8');
COMMIT;

-- ----------------------------
--  Table structure for `sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `user_id` varchar(50) NOT NULL COMMENT '编号',
  `user_login_name` varchar(200) DEFAULT NULL COMMENT '登录名',
  `user_pwd` varchar(200) DEFAULT NULL COMMENT '密码',
  `randomStr` varchar(50) DEFAULT NULL COMMENT '密码随机字符串',
  `userName` varchar(100) DEFAULT NULL COMMENT '用户名称',
  `userMobile` varchar(20) DEFAULT NULL COMMENT '用户手机号码',
  `userSex` tinyint(1) DEFAULT NULL COMMENT '用户性别',
  `isSuperAdmin` tinyint(1) DEFAULT '0' COMMENT '是否是超级管理员',
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统用户表';

-- ----------------------------
--  Records of `sys_user`
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` VALUES ('28b93af7-c8bb-4943-b246-b91e095ab474', 'yangxmone', '5E5B7054049B3995E014AA841D96BD61', 'OE85', 'colin', '13564607860', '0', '0', '2018-03-19 14:08:42'), ('8e34dd17-1e6c-4b9b-8d26-4a6e5d22db63', 'superadmin', '37346455EEB01CAA4C23A3E4EE36C2C0', '28E9', 'superadmin', '13564607860', '0', '1', '2018-03-19 14:08:42');
COMMIT;

-- ----------------------------
--  Table structure for `sys_user_copy`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_copy`;
CREATE TABLE `sys_user_copy` (
  `user_id` varchar(50) NOT NULL COMMENT '编号',
  `user_login_name` varchar(200) DEFAULT NULL COMMENT '登录名',
  `user_pwd` varchar(200) DEFAULT NULL COMMENT '密码',
  `randomStr` varchar(50) DEFAULT NULL COMMENT '密码随机字符串',
  `userName` varchar(100) DEFAULT NULL COMMENT '用户名称',
  `userMobile` varchar(20) DEFAULT NULL COMMENT '用户手机号码',
  `userSex` tinyint(1) DEFAULT NULL COMMENT '用户性别',
  `isAdmin` tinyint(1) DEFAULT '0' COMMENT '是否是管理员',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统用户表';

-- ----------------------------
--  Records of `sys_user_copy`
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_copy` VALUES ('28b93af7-c8bb-4943-b246-b91e095ab474', 'yangxmone', '5E5B7054049B3995E014AA841D96BD61', 'OE85', 'colin', '13564607860', '0', '0'), ('8e34dd17-1e6c-4b9b-8d26-4a6e5d22db63', 'superadmin', '37346455EEB01CAA4C23A3E4EE36C2C0', '28E9', 'superadmin', '13564607860', '0', '1');
COMMIT;

-- ----------------------------
--  Table structure for `sys_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` varchar(50) NOT NULL COMMENT '编号',
  `role_id` varchar(50) DEFAULT NULL COMMENT '角色编号',
  `user_id` varchar(50) DEFAULT NULL COMMENT '用户编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户角色表';

-- ----------------------------
--  Records of `sys_user_role`
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_role` VALUES ('513827c8-d1e3-4089-bd32-b04779f5a133', '4a570b84-f8a6-4e8f-9aca-f529d9fe33d8', '28b93af7-c8bb-4943-b246-b91e095ab474');
COMMIT;

-- ----------------------------
--  Table structure for `sys_version`
-- ----------------------------
DROP TABLE IF EXISTS `sys_version`;
CREATE TABLE `sys_version` (
  `version_id` varchar(36) NOT NULL COMMENT '版本Id',
  `android_version` varchar(10) DEFAULT NULL COMMENT '安卓版本号',
  `ios_version` varchar(10) DEFAULT NULL COMMENT 'ios版本号',
  `android_url` varchar(200) DEFAULT NULL COMMENT '安卓下载地址',
  `ios_url` varchar(200) DEFAULT NULL COMMENT 'IOS下载地址',
  `android_content` text COMMENT '安卓更新内容',
  `ios_content` text COMMENT 'ios更新内容',
  `create_time` datetime DEFAULT NULL COMMENT '更新时间',
  `create_by` varchar(36) DEFAULT NULL COMMENT '更新人',
  `android_is_forced` tinyint(1) DEFAULT NULL COMMENT '安卓是否强制更新',
  `ios_is_forced` tinyint(1) DEFAULT NULL COMMENT '苹果是否强制更新',
  `ios_flag` tinyint(1) DEFAULT NULL COMMENT '是否可以更新（1是可以，0是不可以）',
  PRIMARY KEY (`version_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='版本信息表';

-- ----------------------------
--  Table structure for `system_function`
-- ----------------------------
DROP TABLE IF EXISTS `system_function`;
CREATE TABLE `system_function` (
  `function_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '功能编号',
  `navigation_id` int(11) DEFAULT NULL COMMENT '导航编号',
  `function_title` varchar(50) DEFAULT NULL COMMENT '标题',
  `function_remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `function_sort` int(11) DEFAULT NULL COMMENT '排序标志',
  `function_status` int(11) DEFAULT NULL COMMENT '状态（0为不可用，1为可用）',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`function_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COMMENT='系统功能信息表';

-- ----------------------------
--  Records of `system_function`
-- ----------------------------
BEGIN;
INSERT INTO `system_function` VALUES ('11', '3', '查看权限', '', '1', '1', '2016-11-25 10:10:01', '2016-11-25 10:10:01'), ('12', '3', '编辑权限', '', '2', '1', '2016-11-25 10:41:49', '2016-11-25 10:41:49'), ('13', '3', '冻结/解冻权限', '', '3', '1', '2016-11-25 10:53:10', '2016-11-25 10:53:10');
COMMIT;

-- ----------------------------
--  Table structure for `system_navigation`
-- ----------------------------
DROP TABLE IF EXISTS `system_navigation`;
CREATE TABLE `system_navigation` (
  `navigationId` varchar(50) NOT NULL COMMENT '菜单栏编号',
  `parentId` varchar(50) DEFAULT NULL COMMENT '父级编号',
  `level` int(11) DEFAULT NULL COMMENT '层级（从1开始）',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `link` varchar(255) DEFAULT NULL COMMENT '链接',
  `loadType` tinyint(1) DEFAULT NULL COMMENT '加载方式。1：ajax 加载；2：iframe 加载；',
  `description` varchar(50) DEFAULT NULL COMMENT '描述',
  `icon` varchar(50) DEFAULT NULL COMMENT '导航的图标',
  `iconBg` varchar(50) DEFAULT NULL COMMENT '导航的图标背景',
  `sortOrder` int(10) DEFAULT NULL COMMENT '排序序列',
  `status` tinyint(1) DEFAULT NULL COMMENT '状态     是否启用。1：是；0：否；',
  `ctime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `mtime` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`navigationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统菜单栏信息表';

-- ----------------------------
--  Records of `system_navigation`
-- ----------------------------
BEGIN;
INSERT INTO `system_navigation` VALUES ('063c9f9f-5145-4305-bb99-47595aeef877', '44dc1c79-fdf4-4e05-94b6-92a2d6dbff13', '3', '系统用户管理', 'sysUser/listView', '1', '', 'fa-file-text', 'bg-info', '1', '1', '2017-08-21 14:57:19', '2016-10-19 14:56:25'), ('44dc1c79-fdf4-4e05-94b6-92a2d6dbff13', 'bb4741dc-781c-4d23-84ff-0c94fa007d45', '2', '系统设置', null, '1', '', 'fa-file-text', 'bg-info', '1', '1', '2017-08-21 15:33:32', '2016-10-19 14:54:59'), ('4760ea0b-28b0-4496-b3c6-485ba1ff875c', '44dc1c79-fdf4-4e05-94b6-92a2d6dbff13', '3', '角色权限管理', 'sysRole/listView', '1', '', 'fa-file-text', 'bg-info', '3', '1', '2017-11-01 14:53:54', '2016-10-19 14:57:43'), ('55fbb997-6e0f-4f23-a9ff-c24758502ef7', '44dc1c79-fdf4-4e05-94b6-92a2d6dbff13', '3', '版本控制', 'mainVersion/versionListView', '1', null, 'fa-file-text', 'bg-info', '6', '1', '2017-08-21 11:39:48', null), ('88f4294d-677f-471f-a332-f62dbcde27c7', '44dc1c79-fdf4-4e05-94b6-92a2d6dbff13', '3', '权限配置', 'sysNav/listView', '1', '', 'fa-file-text', 'bg-white', '2', '1', '2017-08-21 11:39:29', '2015-08-31 17:40:10'), ('94160992-2b93-4a22-913a-eb39e8b3119b', '44dc1c79-fdf4-4e05-94b6-92a2d6dbff13', '3', '用户角色管理', 'sysUserRole/listView', '1', '', 'fa-bar-chart-o', 'bg-info', '4', '0', '2017-11-01 14:53:54', '2016-10-19 14:58:03'), ('bb4741dc-781c-4d23-84ff-0c94fa007d45', '0', '1', '内容', null, '1', '', null, null, '1', '1', '2017-08-21 11:39:06', '2016-10-19 14:54:05'), ('f920c508-ea37-43bf-9ede-bc0869b35b6c', '44dc1c79-fdf4-4e05-94b6-92a2d6dbff13', '3', '角色权限管理', 'sysRoleNav/listView', '1', '', 'fa-bell', 'bg-primary', '5', '0', '2017-11-01 14:53:55', '2016-10-19 14:58:24'), ('fd088473-7ad3-4a89-b175-70446229b8fd', '44dc1c79-fdf4-4e05-94b6-92a2d6dbff13', '3', '接口文档管理', 'swagger/listView', '1', null, 'fa-bell', 'bg-info', '7', '1', '2017-08-21 11:39:47', '2016-10-20 14:38:26');
COMMIT;

-- ----------------------------
--  Table structure for `system_navigation_copy`
-- ----------------------------
DROP TABLE IF EXISTS `system_navigation_copy`;
CREATE TABLE `system_navigation_copy` (
  `navigationId` varchar(50) NOT NULL COMMENT '菜单栏编号',
  `parentId` varchar(50) DEFAULT NULL COMMENT '父级编号',
  `level` int(11) DEFAULT NULL COMMENT '层级（从1开始）',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `link` varchar(255) DEFAULT NULL COMMENT '链接',
  `loadType` tinyint(1) DEFAULT NULL COMMENT '加载方式。1：ajax 加载；2：iframe 加载；',
  `description` varchar(50) DEFAULT NULL COMMENT '描述',
  `icon` varchar(50) DEFAULT NULL COMMENT '导航的图标',
  `iconBg` varchar(50) DEFAULT NULL COMMENT '导航的图标背景',
  `sortOrder` int(10) DEFAULT NULL COMMENT '排序序列',
  `status` tinyint(1) DEFAULT NULL COMMENT '状态     是否启用。1：是；0：否；',
  `ctime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `mtime` timestamp NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`navigationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统菜单栏信息表';

-- ----------------------------
--  Records of `system_navigation_copy`
-- ----------------------------
BEGIN;
INSERT INTO `system_navigation_copy` VALUES ('1', '0', '1', '内容', null, '1', '', null, null, '1', '1', '2017-07-25 18:04:33', '2016-10-19 14:54:05'), ('2', '1', '2', '系统设置', null, '1', '', 'fa-file-text', 'bg-info', '1', '1', '2017-07-25 18:04:36', '2016-10-19 14:54:59'), ('3', '2', '3', '系统用户管理', 'sysUser/listView', '1', '', 'fa-file-text', 'bg-info', '1', '1', '2017-07-25 18:04:42', '2016-10-19 14:56:25'), ('4', '2', '3', '权限配置', 'sysNav/listView', '1', '', 'fa-file-text', 'bg-white', '2', '1', '2017-07-25 18:04:40', '2015-08-31 17:40:10'), ('5', '2', '3', '角色管理', 'sysRole/listView', '1', '', 'fa-file-text', 'bg-info', '3', '1', '2017-07-25 18:04:40', '2016-10-19 14:57:43'), ('6', '2', '3', '用户角色管理', 'sysUserRole/listView', '1', '', 'fa-bar-chart-o', 'bg-info', '4', '1', '2017-07-25 18:04:39', '2016-10-19 14:58:03'), ('7', '2', '3', '角色权限管理', 'sysRoleNav/listView', '1', '', 'fa-bell', 'bg-primary', '5', '1', '2017-07-25 18:04:39', '2016-10-19 14:58:24'), ('8', '2', '3', '接口文档管理', 'swagger/listView', '1', null, 'fa-bell', 'bg-info', '7', '1', '2017-07-25 18:04:38', '2016-10-20 14:38:26'), ('9', '2', '3', '版本控制', 'mainVersion/versionListView', '1', null, 'fa-file-text', 'bg-info', '6', '1', '2017-07-25 18:04:38', null);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
