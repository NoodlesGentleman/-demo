<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page isELIgnored="false"%>

<!DOCTYPE html>

<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
	<title>marketing</title>
	<link rel="stylesheet" href="css/clearstyle.css"/>
	<link rel="stylesheet" href="css/indexs.css"/>
</head>
<body>
   <!-- 展示的图片 -->
   <div class="cont" id="downloadImage" style="display:none;">
		<img class="arrow" src="images/arrow01.png" alt="">
		<div class="text">
			<p>点击右上角菜单</p>
			<p>在默认浏览器中打开并安装应用</p>
		</div>
		<img class="logo" src="images/logo01.png" alt="">
	</div>
  
</body>
<script type="text/javascript">
//检测浏览器语言
currentLang = navigator.language;   //判断除IE外其他浏览器使用语言
if(!currentLang){//判断IE浏览器使用语言
    currentLang = navigator.browserLanguage;
}
//alert(currentLang);
//判断访问终端
var browser = 
{
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

//browser.versions.trident返回真假，真则是IE内核，以此类推browser.versions.webKit是否为谷歌内核
//判断是否IE内核
// if(browser.versions.trident)
// {
//     alert("1");
// }

//判断是否webKit内核
// if(browser.versions.webKit)
// {

// }

//判断是否移动端
// if(browser.versions.mobile){

// }

//是否是ios
if(browser.versions.ios)
{
	if (isWeiXin())
	{
		document.getElementById("downloadImage").style.display = "block";
	}
	window.location.href="https://itunes.apple.com/us/app/jia-men-wang/id1061012446?l=zh&ls=1&mt=8";
}

//是否是安卓
if (browser.versions.android)
{
	if (isWeiXin())
	{
		document.getElementById("downloadImage").style.display = "block";
	}
	window.location.href="http://112.74.115.136:8080/sansheng/version2/android/jiamenwang.apk";
}


// window.onload = function(){ 
// 	if(isWeiXin())
// 	{ 
// 		var p = document.getElementsByTagName('p'); 
// 		p[0].innerHTML = window.navigator.userAgent; 
// 	} 
// 	} 
	 

//是否是微信浏览器
function isWeiXin()
{ 
	var ua = window.navigator.userAgent.toLowerCase(); 
	if(ua.match(/MicroMessenger/i) == 'micromessenger')
	{ 
	    return true; 
	}
	else{ 
	   return false; 
    } 
}



</script>
</html>