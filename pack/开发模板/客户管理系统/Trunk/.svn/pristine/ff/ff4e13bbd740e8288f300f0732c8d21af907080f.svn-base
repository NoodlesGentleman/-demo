<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<!doctype html public "-//w3c//dtd html 4.0 transitional//en">
<html>
<head>
<title>登录超时</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<style>
html, body { height: 100% }
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, dl, dt, dd, ol, nav ul, nav li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline }
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block }
ol, ul { list-style: none; margin: 0; padding: 0 }
blockquote, q { quotes: none }
blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none }
table { border-collapse: collapse; border-spacing: 0 }
a { text-decoration: none }
.txt-rt { text-align: right }
.txt-lt { text-align: left }
.txt-center { text-align: center }
.float-rt { float: right }
.float-lt { float: left }
.clear { clear: both }
.pos-relative { position: relative }
.pos-absolute { position: absolute }
.vertical-base { vertical-align: baseline }
.vertical-top { vertical-align: top }
.underline { padding-bottom: 5px; border-bottom: 1px solid #eee; margin: 0 0 20px 0 }
nav.vertical ul li { display: block }
nav.horizontal ul li { display: inline-block }
img { max-width: 100% }
body { background: url("${STORE_URL}/images/sun.jpg") no-repeat; background-size: cover; font-family: Microsoft YaHei; font-size: 100%; padding-top: 8rem; box-sizing: border-box }
.not-found { margin: 0 auto 0em; padding: 7em 3em 7em 3em; background: #fff; border-radius: 5px; width: 55% }
.notfound-top h1 { font-size: 9.5em; color: #94a531; padding-top: 0.2em }
.notfound-top { float: left; width: 35%; text-align: right; padding: 0em 4em 0em 0em }
.content { float: right; width: 50%; padding-left: 5em; border-left: 2px solid #94a531; box-sizing: border-box }
.content h3 { font-size: 14px; font-weight: 500; line-height: 1.8em; color: #656262; margin: 20px 0px }
.copyright { padding: 5em 0em 1.5em 0em; text-align: center; position: fixed; width: 100%; bottom: 0.5rem }
.copyright p { font-size: 15px; font-weight: 400; color: #fff; line-height: 1.7em }
.copyright p a { font-size: 15px; font-weight: 400; color: #fff }
.copyright p a:hover { color: #94a531; transition: 0.5s all; -webkit-transition: 0.5s all; -moz-transition: 0.5s all; -o-transition: 0.5s all }
@media(max-width:1440px) {
  .copyright { padding: 3em 0em 3em 0em }
}
@media(max-width:1366px) {
  .not-found { width: 60% }
}
@media(max-width:1280px) {
  .not-found { width: 62% }
}
@media(max-width:1024px) {
  .notfound-top { padding: 0em 0em 0em 0em }
  .copyright { padding: 3em 1em 3em 1em }
  .content h3 { margin: 10px 0px }
  .notfound-top h1 { font-size: 8em; padding-top: 0.35em }
}
@media(max-width:768px) {
  .notfound-top h1 { font-size: 7.5em }
  .content { width: 52%; padding-left: 2em }
  .not-found { width: 78%; padding: 5em 3em 5em 3em; margin: 12em auto 0em }
  .content h3 { font-size: 13px }
  .copyright { padding: 13em 0em 5em 0em }
}
@media(max-width:667px) {
  .notfound-top h1 { font-size: 6.5em; padding-top: 0.5em }
}
@media(max-width:640px) {
  .notfound-top { float: none; width: 34%; margin: 0 auto }
  .content { width: 100%; float: none; margin: 0 auto; padding-left: 0em; text-align: center; border-left: none }
  .notfound-top h1 { padding-top: 0em }
  .not-found { width: 78%; padding: 3em 3em 3em 3em; margin: 7em auto 0em }
  .copyright { padding: 4em 0em 3em 0em }
  ul.social-icon { margin: 1em 0em 0em 0em }
}
@media(max-width:600px) {
  .notfound-top { width: 39% }
}
@media(max-width:568px) {
  .notfound-top { width: 42% }
}
@media(max-width:480px) {
  .not-found { width: 70%; margin: 6em auto 0em }
  .notfound-top h1 { font-size: 5em }
  .content img { width: 20% }
  .copyright p { font-size: 13px }
  .copyright { padding: 4em 0.4em 2em 0.4em }
  .notfound-top { width: 41% }
}
@media(max-width:414px) {
  .notfound-top { width: 50% }
  .copyright { padding: 5.5em 0.4em 4em 0.4em }
}
@media(max-width:384px) {
  .notfound-top { width: 53% }
  .not-found { padding: 2em 3em 2em 3em }
  .copyright { padding: 3.5em 0.4em 3em 0.4em }
}
@media(max-width:320px) {
  .not-found { width: 83%; margin: 3em auto 0em; padding: 1em 1em 1em 1em }
  .notfound-top { width: 44% }
  .notfound-top h1 { font-size: 4em }
  .content h3 { margin: 10px 0px; font-size: 12px }
  .content input[type="text"] { width: 55% }
  .copyright p a { font-size: 13px }
}
</style>
</head>
<body>
<!--404 page start here-->
<div class="not-found">
	<div class="notfound-top">
	    <h1>404</h1>
	</div>
	<div class="content">
		<img src="${STORE_URL}/images/green.png" alt="" title="" style="    margin-top: 2rem;">
		<h2 style="font-size:20px;line-height:60px;">登陆信息过期，请重新登陆</h2>
		<a href="${STORE_URL}/index.jsp" id="ShowDiv"></a>
	</div>
  <div class="clear"> </div>
</div>
<div class="copyright">
	<p>上海科匠信息科技有限公司<br>© 2015</p>
</div>	
<!--404 page end here-->
</body>
	<script language="javascript">
		var webroot = "${STORE_URL}";
		var secs = 3; //倒计时的秒数 
		var URL;
		function Load(url){
			URL = url;
			for(var i=secs;i>=0;i--){ 
			   window.setTimeout('doUpdate(' + i + ')', (secs-i) * 1000); 
			} 
		}
		function doUpdate(num) 
			{ 
			document.getElementById('ShowDiv').innerHTML = '将在'+num+'秒后自动跳转到登陆页' ;
			if(num == 0) { window.location = URL; }
		}
		Load(webroot + "/index.jsp")
		
</script>
</html>

