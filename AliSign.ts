
import OSS from 'ali-oss'

/**
 * 
 * @param filename 获取签名
 * @param dir 
 */

/**
 * @param  配置上传文件时的文件名字修改
 *
 */
export const _getFileName = (filename: string, dir: string) => {
  return dir + _randomString(10) + _getSuffix(filename);
};
export const _getSuffix = (filename: string) => {
  let pos = filename.lastIndexOf(".");
  let suffix = "";
  if (pos !== -1) {
    suffix = filename.substring(pos);
  }
  return suffix;
};
export const _randomString = (len: number) => {
  len = len || 32;
  let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  let maxPos = chars.length;
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

/**
 * 
 * @description 阿里云图片完整路径 分权限和没有权限
 * 
 */

export const getAliImageUrlWithLocal = (filename: string) => {
  let client = new OSS({
    region: 'oss-cn-shanghai',
    accessKeyId: 'LTAIeIYqU773G4P9',
    accessKeySecret: 'dc7XKqYCbaAGTYRHIJ6DEYxuxHNTY1',
    bucket: 'yeedaa-image-store'
  });
  // return client.signatureUrl(filename); // 需要签名权限
  return "https://yeedaa-image-store.oss-cn-shanghai.aliyuncs.com/" + filename; // 不需要签名权限
}