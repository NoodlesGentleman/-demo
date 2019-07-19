<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML>
<html lang="zh-cn">
	<head>
		<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	    <meta name="author" content="上富科技">
	    <title>品源机构</title>
		<meta id="baseUrl" content="${pageContext.request.contextPath}">
	    <!-- Bootstrap -->
	    <link href="${pageContext.request.contextPath}/vendor/select2/css/select2.min.css" rel="stylesheet">
	    <link href="${pageContext.request.contextPath}/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	    <link href="${pageContext.request.contextPath}/style/style.css" rel="stylesheet">
	    <link href="${pageContext.request.contextPath}/vendor/jquery-ui-1.11.4/jquery-ui.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/vendor/DateBox/css/jtsage-datebox.min.css" rel="stylesheet">
	    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	    <!--[if lt IE 9]>
	      <script src="${pageContext.request.contextPath}/vendor/html5shiv/html5shiv.min.js"></script>
	      <script src="${pageContext.request.contextPath}/vendor/respond/respond.min.js"></script>
	    <![endif]-->
	</head>
	<body>
		
		<div class="container app">
			<div class="row mainframe">
				<%-- <div class="col-xs-12 col-sm-12 topContainer">
					<img src="${pageContext.request.contextPath}/images/banner_red.png" width="100%" height="100%">
				</div>
				<div class="col-xs-12 col-sm-12 menuList">
					<div class="col-xs-4 col-sm-4 menu" panel-data="recommend" title-data="推荐客户">
						<span class="glyphicon glyphicon-thumbs-up"></span>
						<p>推荐客户</p>
					</div>
					<div class="col-xs-4 col-sm-4 menu" panel-data="customer" title-data="我的客户">
						<span class="glyphicon glyphicon-knight"></span>
						<p>我的客户</p>
					</div>
					<div class="col-xs-4 col-sm-4 menu" panel-data="message" title-data="我的消息">
						<span class="glyphicon glyphicon-comment"></span>
						<p>我的消息</p>
					</div>
					<div class="col-xs-4 col-sm-4 menu" panel-data="rules" title-data="活动细则">
						<span class="glyphicon glyphicon-info-sign"></span>
						<p>活动细则</p>
					</div>
					<div class="col-xs-4 col-sm-4 menu" panel-data="project" title-data="项目介绍">
						<span class="glyphicon glyphicon-globe"></span>
						<p>项目介绍</p>
					</div>
					<div class="col-xs-4 col-sm-4 menu" panel-data="reward" title-data="我的奖励">
						<span class="glyphicon glyphicon-gift"></span>
						<p>我的奖励</p>
					</div>
					<div class="col-xs-4 col-sm-4 menu" panel-data="share" title-data="我要分享">
						<span class="glyphicon glyphicon-fullscreen"></span>
						<p>我要分享</p>
					</div>
					<div class="col-xs-4 col-sm-4 menu" panel-data="info" title-data="我的资料">
						<span class="glyphicon glyphicon-user"></span>
						<p>我的资料</p>
					</div>
					<div class="col-xs-4 col-sm-4 menu login" panel-data="login" title-data="注册成合伙人">
						<span class="glyphicon glyphicon-user"></span>
						<p>注册</p>
					</div>
				</div> --%>
				<div class="imagesShow" id="imagesShow">
					<div class="page">
						<div class="element current"></div>
						<div class="element"></div>
						<div class="element"></div>
					</div>
					<div class="imagesPanel">
						<div class="imageItem">
							<div class="img"><img src="" /></div>
							<div class="text"></div>
						</div>
					</div>
					
				</div>
				
				<div class="nav-panel">
					<table>
						<tr>
							<td class="fir menu" panel-data="login" title-data="快速注册">
								<div class="icon"></div>
								<div class="text" ><p>快速注册</p><p>Registration</p></div>
							</td>
							<td class="sec menu" panel-data="recommend" title-data="快速报备">
								<div class="icon"></div>
								<div class="text"><p>快速报备</p><p>Recommend</p></div>
							</td>
						</tr>
						<tr>
							<td class="third menu" panel-data="customer" title-data="我的客户">
								<div class="icon"></div>
								<div class="text"><p>我的客户</p><p>Project</p></div>
							</td>
							<td class="four menu" panel-data="project" title-data="在售项目">
								<div class="icon"></div>
								<div class="text"><p>在售项目</p><p>Reward</p></div>
							</td>
						</tr>
					</table>
				</div>
				
				<div class="product-item">
					<table>
						<caption>热门项目</caption>
						<%-- <tr>
							<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA3OTY5ODMxNQ==&mid=200797969&idx=1&sn=c429994193d377a26c106bc1cd2b6474#rd"><img src="${pageContext.request.contextPath}/images/jinshan-2.jpg" width="100%" height="180" /></a></td>
						</tr> 
						<tr>
							<td colspan=3><h4>上海金山香港城</h4></td>
						</tr>
						<tr>
							<td><font color="red">项目简介：</font></td>
							<td>大上海全球名品折扣直销和进口商品直销的首席综合商业旗舰</td>
							<td rowspan="3"><button type="button" class="btn btn-danger irecommend">我要报备</button></td>
						</tr>
						<tr>
							<td><font color="red">轨道交通：</font></td>
							<td>金山铁路:金山卫，22号线金山卫站</td>
						</tr>
						<tr>
							<td><font color="red">项目均价：</font></td>
							<td>均价23800元/平方米</td>
						</tr>
						<tr>
							<td style="width: 25%; padding: 5px;"><a href="javascript:void(0);" data-value=5 data-bname='弘阳上湖' class="irecommend"><img src="${pageContext.request.contextPath}/images/1.jpg" width="100%" /></a></td>
							<td style="width: 25%; padding: 5px;"><a href="javascript:void(0);" data-value=8 data-bname='朗诗绿洲' class="irecommend"><img src="${pageContext.request.contextPath}/images/2.jpg" width="100%" /></a></td>
							<td style="width: 25%; padding: 5px;"><a href="javascript:void(0);" data-value=6 data-bname='水岸清华瀚宫' class="irecommend"><img src="${pageContext.request.contextPath}/images/3.jpg" width="100%" /></a></td>
							<td style="width: 25%; padding: 5px;"><a href="javascript:void(0);" data-value=1 data-bname='星榈湾' class="irecommend"><img src="${pageContext.request.contextPath}/images/4.jpg" width="100%" /></a></td>
						</tr>
						<tr>
							<td style="text-align:center;">弘阳上湖</td>
							<td style="text-align:center;">朗诗绿洲</td>
							<td style="text-align:center;">水岸清华瀚宫</td>
							<td style="text-align:center;">星榈湾</td>
						</tr>--%>
						<tr>
							<c:forEach items="${hot}" var="hh" end='3' varStatus="hstatus">
								<td style="width: 25%; padding: 5px;"><a href="javascript:void(0);" data-value=5 data-bname='${hh.name }' class="irecommend"><img src="${hh.thumbnailUrl }" width="100%" height="60"/></a></td>
							</c:forEach>	
						</tr>
						<tr>
							<c:forEach items="${hot}" var="hh" end='3' varStatus="hstatus">
								<td style="text-align:center;">${hh.name }</td>
							</c:forEach>	
						</tr>
						
					</table>
				</div>
				
			</div>
		</div>
		
		<div class="panel panel-default managerPanel">
			<div class="panel-heading">
				<div class="returnBtn"><span class="glyphicon glyphicon-arrow-left"></span></div>
				<span class="title"></span>
			</div>
			<div class="panel-body">
				<div class="panel-content col-xs-12 col-sm-12 recommend" target-data="recommend">
					<form role="form">
						<p class="bg-danger" id="rc_danger"></p>
						<div class="form-group">
							<!-- <div class="input-group">
								<input type="text" class="form-control" id="recordName" value="" placeholder="客户姓名(必填)">
								<span class="input-group-btn">
							      <button class="btn btn-default" type="button">已有客户</button>
							    </span>
							</div> -->
							<div class="input-group">
								<input type="text" class="form-control" id="recordName" value="" placeholder="客户姓名(必填)">
								<div class="input-group-btn">
								  <button type="button" class="btn btn-default dropdown-toggle" style="height: 40px;line-height: 20px;" data-toggle="dropdown">已有客户 <span class="caret"></span></button>
								  <ul class="dropdown-menu pull-right" id="customerSelectList">
								    <li><a href="#">Action</a></li>
								  </ul>
								</div><!-- /btn-group -->
							</div><!-- /input-group -->
						</div>
						<div class="form-group">
							<input type="text" class="form-control" id="recordMobile" value="" placeholder="客户手机(必填)">
						</div>
						<!--<div class="form-group">
							<input type='text' class="form-control" id="appointmentTime" data-role="datebox" data-options='{"mode":"timeflipbox", "overrideTimeFormat": 24, "overrideTimeOutput":"%H:%M"}' placeholder="预约上门(必选)" />
							 <div class='input-group date' id='appointmentTime'>
								<input type='text' class="form-control" id="appTime" placeholder="预约上门(必选)" />
								<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
							</div> 
						</div>-->
						<div class="form-group">
							<input type="text" class="form-control inputDisable" value="请选择楼盘" id="recordBuilding" readonly placeholder="推荐楼盘(必选)">
						</div>
						<div class="form-group" style="display: none;">
							<input type="text" class="form-control inputDisable" value="商铺" id="recordProduct" readonly placeholder="推荐产品">
						</div>
						<!-- <div class="form-group">
							<input type="text" class="form-control inputDisable" id="recordCompany" readonly placeholder="指定接待公司">
						</div>
						<div class="checkbox">
						  <label>
						    <input type="checkbox" id="recordAccompany"> 陪同上门
						  </label>
						</div> -->
						<button id="custom" type="button" style="font-size:18px; padding: 12px;" class="btn btn-info col-xs-12 col-sm-12">马上推荐</button>
					</form>
				</div>
				<div class="panel-content col-xs-12 col-sm-12 customer" target-data="customer"></div>
				<div class="panel-content col-xs-12 col-sm-12 message" target-data="message"></div>
				<div class="panel-content col-xs-12 col-sm-12 rules" target-data="rules"></div>
				<div class="panel-content col-xs-12 col-sm-12 project" target-data="project">
					<c:forEach items="${buildings}" var="building">
						<div class="product-item">
							<table>
								<tr>
									<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTM3MzA2MA==&mid=403773198&idx=1&sn=a59c426166dea578ae8061aac053089c#rd"><img src="${ building.imgUrl }" width="100%" height="180" /></a></td>
								</tr>
								<tr>
									<td colspan=3><h4>${ building.name }</h4></td>
								</tr>
								<tr>
									<td colspan=2>${building.baseInfo }</td>
									<td style="width: 82px;">
										<table style="width: 100%;">
									      <tbody>
									      	<tr><td><button type="button" data-value="${building.id }" data-bname="${building.name }" class="btn btn-danger irecommend pull-right">我要报备</button></td></tr>
											<tr style="text-align: right;"><td><a style="width: 82px;margin-top: 5px;" class="btn btn-warning" href="#" name='scanBtn' bid='${building.id }'>扫一扫报备</td></tr>
									      	<%-- <tr><td><img src="http://s.jiathis.com/qrcode.php?url=http://${pageContext.request.getHeader('Host')}${pageContext.request.contextPath}/customer/regist/${us.id}/${building.id }" style="width: 100%;"></td> --%>
									      </tr>
									
									  </tbody></table>						
									</td>
									<%-- <td style="width:100px;">
									<img src='http://s.jiathis.com/qrcode.php?url=http://192.168.1.45${pageContext.request.contextPath}/customer/regist/${us.id}/${building.id }' />
									<button type="button" data-value=${building.id } data-bname='${building.name }' class="btn btn-danger irecommend pull-right">我要报备</button></td> --%>
								</tr>
							</table>
						</div>
					</c:forEach>
					<!-- <div class="product-item">
						<table>
							<tr>
								<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTM3MzA2MA==&mid=403773198&idx=1&sn=a59c426166dea578ae8061aac053089c#rd"><img src="https://mmbiz.qlogo.cn/mmbiz/4LthC2ULRys1WJ5D3JazkDLGXZFJFbcN95MjPP8JTwezuygSqRicRFudvMyh6fzribshscLPbY0H5cRl7NhlyQ1w/0?wx_fmt=jpeg" width="100%" height="180" /></a></td>
							</tr>
							<tr>
								<td colspan=3><h4>弘阳上湖</h4></td>
							</tr>
							<tr>
								<td><font color="red">项目特色：</font></td>
								<td>湖景地产</td>
								<td rowspan="3"><button type="button" data-value=5 data-bname='弘阳上湖' class="btn btn-danger irecommend pull-right">我要报备</button></td>
							</tr>
							<tr>
								<td><font color="red">楼盘地址：</font></td>
								<td>吴中尹山湖路与环湖路交汇处</td>
							</tr>
							<tr>
								<td><font color="red">项目均价：</font></td>
								<td>17500元/平方米</td>
							</tr>
						</table>
					</div>
					<div class="product-item">
						<table>
							<tr>
								<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTM3MzA2MA==&mid=403774375&idx=1&sn=0c1f0133b2dad13ad3193e11f7479028#rd"><img src="https://mmbiz.qlogo.cn/mmbiz/4LthC2ULRys1WJ5D3JazkDLGXZFJFbcNTiahalVjoLdIpGMurzGO633WIZys32HmpJWWI6UFkKUtlN3f7wBKrbw/0?wx_fmt=jpeg" width="100%" height="180" /></a></td>
							</tr>
							<tr>
								<td colspan=3><h4>朗诗绿洲</h4></td>
							</tr>
							<tr>
								<td><font color="red">项目特色：</font></td>
								<td>湖景地产</td>
								<td rowspan="3"><button type="button" data-value=8 data-bname='朗诗绿洲' class="btn btn-danger irecommend pull-right">我要报备</button></td>
							</tr>
							<tr>
								<td><font color="red">楼盘地址：</font></td>
								<td>新区武夷山路与富春江路交汇处</td>
							</tr>
							<tr>
								<td><font color="red">物业类别：</font></td>
								<td>别墅、联排</td>
							</tr>
						</table>
					</div>
					<div class="product-item">
						<table>
							<tr>
								<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTM3MzA2MA==&mid=403775252&idx=1&sn=3bc55b078e7b7d652ef5df0ff3b265ba#rd"><img src="https://mmbiz.qlogo.cn/mmbiz/4LthC2ULRys1WJ5D3JazkDLGXZFJFbcNLkVCAJluxEULOgq1XKXkU9A4ibicYqOM7T7EnicpPjicxlPOANMCAn0CfQ/0?wx_fmt=jpeg" width="100%" height="180" /></a></td>
							</tr>
							<tr>
								<td colspan=3><h4>水岸清华瀚宫</h4></td>
							</tr>
							<tr>
								<td><font color="red">项目特色：</font></td>
								<td>湖景地产</td>
								<td rowspan="3"><button type="button" data-value=6 data-bname='水岸清华瀚宫' class="btn btn-danger irecommend pull-right">我要报备</button></td>
							</tr>
							<tr>
								<td><font color="red">楼盘地址：</font></td>
								<td>吴中吴中大道1001号</td>
							</tr>
							<tr>
								<td><font color="red">物业类型：</font></td>
								<td>住宅、高层住宅</td>
							</tr>
						</table>
					</div>
					<div class="product-item">
						<table>
							<tr>
								<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTM3MzA2MA==&mid=403776033&idx=1&sn=1b321ae5ea42326087d20cd43acdfea8#rd"><img src="https://mmbiz.qlogo.cn/mmbiz/4LthC2ULRys1WJ5D3JazkDLGXZFJFbcN1dsEdltRbINvrKmzw90mq9Dw429nf6IIAcicDFIxm5ztlGs7R4aFmIw/0?wx_fmt=jpeg" width="100%" height="180" /></a></td>
							</tr>
							<tr>
								<td colspan=3><h4>星榈湾</h4></td>
							</tr>
							<tr>
								<td><font color="red">开盘时间：</font></td>
								<td>2015年10月16日已加推</td>
								<td rowspan="3"><button type="button" data-value=1 data-bname='星榈湾' class="btn btn-danger irecommend pull-right">我要报备</button></td>
							</tr>
							<tr>
								<td><font color="red">楼盘地址：</font></td>
								<td>新区浒杨路与大通路交汇处（新浒花园三区北门斜对面）</td>
							</tr>
							<tr>
								<td><font color="red">物业类型：</font></td>
								<td>住宅、高层</td>
							</tr>
						</table>
					</div>
					<div class="product-item">
						<table>
							<tr>
								<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTM3MzA2MA==&mid=403779178&idx=1&sn=56a113694c3cc7af6ead51200d1b8534#rd"><img src="http://mmbiz.qpic.cn/mmbiz/4LthC2ULRys1WJ5D3JazkDLGXZFJFbcNqIymXcIHgLmMqtWTLkObxoeZuxpnmkvianZhM2pd4AlgVtu0Aib1N8Iw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" width="100%" height="180" /></a></td>
							</tr>
							<tr>
								<td colspan=3><h4>红星国际生活广场</h4></td>
							</tr>
							<tr>
								<td><font color="red">项目特色：</font></td>
								<td>复合地产</td>
								<td rowspan="3"><button type="button" data-value=7 data-bname='红星国际生活广场' class="btn btn-danger irecommend pull-right">我要报备</button></td>
							</tr>
							<tr>
								<td><font color="red">楼盘地址：</font></td>
								<td>吴中区长江路与南环延长线（苏福路）交汇处（1号线玉山路站南）</td>
							</tr>
							<tr>
								<td><font color="red">物业类型：</font></td>
								<td>住宅、洋房、高层、SOHO办公</td>
							</tr>
						</table>
					</div>
					<div class="product-item">
						<table>
							<tr>
								<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTM3MzA2MA==&mid=403778420&idx=1&sn=f9639b137d789ec3f0f551301ee3b3ea#rd"><img src="http://mmbiz.qpic.cn/mmbiz/4LthC2ULRys1WJ5D3JazkDLGXZFJFbcND8qPDBvREKuhjygWJeiakXOguPia8A4qmgv9l16t66Iib53ibl3LEdHbWg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" width="100%" height="180" /></a></td>
							</tr>
							<tr>
								<td colspan=3><h4>中铁诺德誉园</h4></td>
							</tr>
							<tr>
								<td><font color="red">项目特色：</font></td>
								<td>复合地产</td>
								<td rowspan="3"><button type="button" data-value=4 data-bname='中铁诺德誉园' class="btn btn-danger irecommend pull-right">我要报备</button></td>
							</tr>
							<tr>
								<td><font color="red">楼盘地址：</font></td>
								<td>高新区通安镇华金路88号（通安中学西）</td>
							</tr>
							<tr>
								<td><font color="red">物业类型：</font></td>
								<td>住宅、高层、商业</td>
							</tr>
						</table>
					</div>
					<div class="product-item">
						<table>
							<tr>
								<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTM3MzA2MA==&mid=403777610&idx=1&sn=0b57e784e5912cb7abcd3d836d6628c6#rd"><img src="http://mmbiz.qpic.cn/mmbiz/4LthC2ULRysm9Inc5KV1xrzyOm6dNibAc7Fs1WU6RGjY4Ppj5AfCD3GTiaV4pIFrRHWl3axNOiaDr3BhPdkGMicESA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1" width="100%" height="180" /></a></td>
							</tr>
							<tr>
								<td colspan=3><h4>锦溪禾府</h4></td>
							</tr>
							<tr>
								<td><font color="red">项目特色：</font></td>
								<td>复合地产</td>
								<td rowspan="3"><button type="button" data-value=2 data-bname='锦溪禾府' class="btn btn-danger irecommend pull-right">我要报备</button></td>
							</tr>
							<tr>
								<td><font color="red">楼盘地址：</font></td>
								<td>新区嵩山路与石林路间交界处</td>
							</tr>
							<tr>
								<td><font color="red">物业类型：</font></td>
								<td>住宅、多层、联排</td>
							</tr>
						</table>
					</div>
					<div class="product-item">
						<table>
							<tr>
								<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTM3MzA2MA==&mid=403845290&idx=1&sn=1e99dac4d4b11ea174acb0208e72fcca#rd"><img src="https://mmbiz.qlogo.cn/mmbiz/4LthC2ULRysm9Inc5KV1xrzyOm6dNibAckyPxk7u6ksibNBFyxPjV3jYD01xkZuQXfADbjNDrtD6j0p8Hvz6RCUg/0?wx_fmt=jpeg" width="100%" height="180" /></a></td>
							</tr>
							<tr>
								<td colspan=3><h4>永新秀郡</h4></td>
							</tr>
							<tr>
								<td><font color="red">项目特色：</font></td>
								<td>景观居所,水景地产,打折优惠楼盘</td>
								<td rowspan="3"><button type="button" data-value=9 data-bname='永新秀郡' class="btn btn-danger irecommend pull-right">我要报备</button></td>
							</tr>
							<tr>
								<td><font color="red">楼盘地址：</font></td>
								<td>新区龙山路与科研路交汇处</td>
							</tr>
							<tr>
								<td><font color="red">均价：</font></td>
								<td>59万元/套</td>
							</tr>
						</table>
					</div>
					<div class="product-item">
						<table>
							<tr>
								<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTM3MzA2MA==&mid=403845591&idx=1&sn=a56517b2ca5ecf768bddd5266a67d34a#rd"><img src="https://mmbiz.qlogo.cn/mmbiz/4LthC2ULRysm9Inc5KV1xrzyOm6dNibAcrBR5NYQRb8MfO7QzBR2uicFic48CiaAPHfadksQicAI7drpicBhvIrV6SZQ/0?wx_fmt=jpeg" width="100%" height="180" /></a></td>
							</tr>
							<tr>
								<td colspan=3><h4>普禧观澜</h4></td>
							</tr>
							<tr>
								<td><font color="red">项目特色：</font></td>
								<td>不限购</td>
								<td rowspan="3"><button type="button" data-value=10 data-bname='普禧观澜' class="btn btn-danger irecommend pull-right">我要报备</button></td>
							</tr>
							<tr>
								<td><font color="red">楼盘地址：</font></td>
								<td>相城黄埭镇春秋路东、春华路北</td>
							</tr>
							
						</table>
					</div>
					<div class="product-item">
						<table>
							<tr>
								<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTM3MzA2MA==&mid=403845803&idx=1&sn=64e3be85072da4e009601b922c708c55#rd"><img src="https://mmbiz.qlogo.cn/mmbiz/4LthC2ULRysm9Inc5KV1xrzyOm6dNibAcT1bliaDXat557IBeaCdFQ3LTH9JZa5OKXwiaOOWUicLHs30PCRM5j3TwQ/0?wx_fmt=jpeg" width="100%" height="180" /></a></td>
							</tr>
							<tr>
								<td colspan=3><h4>恒宇旺墩道</h4></td>
							</tr> 
							<tr>
								<td><font color="red">均价：</font></td>
								<td>17200元/平方米</td>
								<td rowspan="3"><button type="button" data-value=11 data-bname='恒宇旺墩道' class="btn btn-danger irecommend pull-right">我要报备</button></td>
							</tr>
							<tr>
								<td><font color="red">楼盘地址：</font></td>
								<td>园区苏州园区旺墩道135号（国地税大楼东)</td>
							</tr>
							<tr>
								<td><font color="red">产权年限：</font></td>
								<td>40年</td>
							</tr>
						</table>
					</div>
					<div class="product-item">
						<table>
							<tr>
								<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTM3MzA2MA==&mid=403846662&idx=1&sn=50be35f429c2e60030f00a4d74983543#rd"><img src="https://mmbiz.qlogo.cn/mmbiz/4LthC2ULRysm9Inc5KV1xrzyOm6dNibAcrBR5NYQRb8MfO7QzBR2uicFic48CiaAPHfadksQicAI7drpicBhvIrV6SZQ/0?wx_fmt=jpeg" width="100%" height="180" /></a></td>
							</tr>
							<tr>
								<td colspan=3><h4>华园丽都</h4></td>
							</tr>
							<tr>
								<td><font color="red">均价：</font></td>
								<td>7800元/平方米</td>
								<td rowspan="3"><button type="button" data-value=16 data-bname='华园丽都' class="btn btn-danger irecommend pull-right">我要报备</button></td>
							</tr>
							<tr>
								<td><font color="red">楼盘地址：</font></td>
								<td>相城望亭镇问渡路与迎湖路交叉口</td>
							</tr>
						</table>
					</div>
					<div class="product-item">
						<table>
							<tr>
								<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTM3MzA2MA==&mid=403847405&idx=1&sn=ce34107247daa892fab7f78ac33dea14#rd"><img src="https://mmbiz.qlogo.cn/mmbiz/4LthC2ULRysm9Inc5KV1xrzyOm6dNibAc1tfW01BdJibEMo5NgEDGIntYjOuiagfFLXR0ZzEaCicJ6rCIu4WicuAGMg/0?wx_fmt=jpeg" width="100%" height="180" /></a></td>
							</tr>
							<tr>
								<td colspan=3><h4>薇尼诗</h4></td>
							</tr>
							<tr>
								<td><font color="red">项目特色：</font></td>
								<td>不限购</td>
								<td rowspan="3"><button type="button" data-value=12 data-bname='薇尼诗' class="btn btn-danger irecommend pull-right">我要报备</button></td>
							</tr>
							<tr>
								<td><font color="red">楼盘地址：</font></td>
								<td>银丰路与金门路交界处(东南大道33号)</td>
							</tr>
							<tr>
								<td><font color="red">产权年限：</font></td>
								<td>70</td>
							</tr>
						</table>
					</div>
					<div class="product-item">
						<table>
							<tr>
								<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTM3MzA2MA==&mid=403848013&idx=1&sn=0f4b6ca530cc1fcf0e5d26e3498dcb1a#rd"><img src="https://mmbiz.qlogo.cn/mmbiz/4LthC2ULRysm9Inc5KV1xrzyOm6dNibAcAw7gGNxPrkKMJW7pkFic5S7gfs2E5QVoeUGjhVnbz9p0n48stvxtcIA/0?wx_fmt=jpeg" width="100%" height="180" /></a></td>
							</tr>
							<tr>
								<td colspan=3><h4>津西美墅馆</h4></td>
							</tr>
							<tr>
								<td><font color="red">项目特色：</font></td>
								<td>湖景地产</td>
								<td rowspan="3"><button type="button" data-value=13 data-bname='津西美墅馆' class="btn btn-danger irecommend pull-right">我要报备</button></td>
							</tr>
							<tr>
								<td><font color="red">楼盘地址：</font></td>
								<td>新区华山路与支英街交汇处</td>
							</tr>
							<tr>
								<td><font color="red">均价：</font></td>
								<td>12000元/平方米</td>
							</tr>
						</table>
					</div>
					<div class="product-item">
						<table>
							<tr>
								<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTM3MzA2MA==&mid=403848155&idx=1&sn=121e456d6fa7a2efefeefc72aed582f5#rd"><img src="https://mmbiz.qlogo.cn/mmbiz/4LthC2ULRysm9Inc5KV1xrzyOm6dNibAcyBGzIaYcAsNban9dwTCDHldpliaiavXib9TBBQTibCr2OukXXkibFL82ibWQ/0?wx_fmt=jpeg" width="100%" height="180" /></a></td>
							</tr>
							<tr>
								<td colspan=3><h4>海星生活广场</h4></td>
							</tr>
							<tr>
								<td><font color="red">均价：</font></td>
								<td>13200元/平方米</td>
								<td rowspan="3"><button type="button" data-value=14 data-bname='海星生活广场' class="btn btn-danger irecommend pull-right">我要报备</button></td>
							</tr>
							<tr>
								<td><font color="red">楼盘地址：</font></td>
								<td>吴中经济开发区商城大街88号</td>
							</tr>
							
						</table>
					</div>
					<div class="product-item">
						<table>
							<tr>
								<td colspan="3"><a href="http://mp.weixin.qq.com/s?__biz=MzA5OTM3MzA2MA==&mid=403848277&idx=1&sn=44899afd8e36721cd355c8695b20006d#rd"><img src="https://mmbiz.qlogo.cn/mmbiz/4LthC2ULRysm9Inc5KV1xrzyOm6dNibAcH9QZ8m6ic7fONL40hyXx9HxFG8qXS9pS1P1X7NHjvakKzkqhsHQBzLw/0?wx_fmt=jpeg" width="100%" height="180" /></a></td>
							</tr>
							<tr>
								<td colspan=3><h4>棠悦湾*仁恒</h4></td>
							</tr>
							<tr>
								<td><font color="red">均价：</font></td>
								<td>24000元/平方米</td>
								<td rowspan="3"><button type="button" data-value=15 data-bname='棠悦湾*仁恒' class="btn btn-danger irecommend pull-right">我要报备</button></td>
							</tr>
							<tr>
								<td><font color="red">楼盘地址：</font></td>
								<td>新区滨河路与横山路交汇处</td>
							</tr>
						</table>
					</div> -->
				</div>
				<div class="panel-content col-xs-12 col-sm-12 reward" target-data="reward">
					奖励。
				</div>
				<div class="panel-content col-xs-12 col-sm-12 share" target-data="share"></div>
				<div class="panel-content col-xs-12 col-sm-12 info" target-data="info"></div>
				<div class="panel-content col-xs-12 col-sm-12 loginPanel" target-data="login">
					<c:choose>
						<c:when test="${us != null}">
							<form class="form-horizontal">
								<p class="bg-danger" id="up_danger"></p>
							    <table class="table table-bordered">
							    	<caption>
							    		<button id="editBtn" class="btn btn-danger" style="font-size:14px; padding: 6px;"><span class="glyphicon glyphicon-edit"></span>编辑</button>
							    		<button id="cBtn" class="btn btn-danger" style="font-size:14px; padding: 6px; display:none;"><span class="glyphicon glyphicon-edit"></span>取消</button>
							    		<button id="saveBtn" class="btn btn-primary" style="font-size:14px; padding: 6px; margin-left: 10px; display:none;"><span class="glyphicon glyphicon-floppy-saved"></span>保存</button>
							    	</caption>

							    	<tbody>
							    		<tr>
							    			<td>姓名</td>
							    			<td>${ us.name }</td>
							    		</tr>
							    		<tr>
							    			<td>手机号码</td>
							    			<td>${ us.mobile }</td>
							    		</tr>
							    		<tr>
							    			<td>所属公司</td>
							    			<td><span>${ us.company }</span>
							    				<%-- <input type="text" class="form-control" style="display:none;" id="editCampanyInput" value="${ us.company }" placeholder="输入关键字，查询所属公司(必填)">
												<div id="editSelectFilterList" >
													<ul>
														
													</ul>
												</div> --%>
												<div id="editCampany" style="display:none;">
													<select class="js-example-responsive" style="width:235px;" name="campany" id="editCompany">
															<c:forEach items="${companys}" var="company">
																<option id="${company.id }" data-value='${company.short_name }' <c:if test="${us.company == company.name}">selected="selected"</c:if>>${company.name }</option>
															</c:forEach>
													</select>
												</div>
												
							    			</td>
							    			<input id="editCampanyIdHidden" type="hidden" />
							    		</tr>
							    	</tbody>
							    </table>
							  <%-- <div class="form-group">
							    <label class="col-sm-2 control-label">姓名</label>
							    <div class="col-sm-10">
									<p class="form-control-static">${ us.name }</p>
							    </div>
							  </div>
							  <div class="form-group">
							    <label class="col-sm-2 control-label">手机号码</label>
							    <div class="col-sm-10">
									<p class="form-control-static">${ us.mobile }</p>
							    </div>
							  </div> --%>
							  
							  <%-- <div class="form-group">
							    <label class="col-sm-2 control-label">身份证号码</label>
							    <div class="col-sm-10">
									<p class="form-control-static">${ us.cardId }</p>
							    </div>
							  </div>
							  
							  <div class="form-group">
							    <label class="col-sm-2 control-label">身份类型</label>
							    <div class="col-sm-10">
									<p class="form-control-static">${ us.type_code }</p>
							    </div>
							  </div>
							  <c:if test="${us.isOccupation == 1}">
								  <div class="form-group">
								    <label class="col-sm-2 control-label"></label>
								    <div class="col-sm-10">
										<p class="form-control-static">专业经纪人</p>
								    </div>
								  </div>
							  </c:if> --%>
							</form>
						</c:when>
						<c:otherwise>
							<form role="form" method='POST' action='${pageContext.request.contextPath}/tologin' id="regisetForm" onsubmit="return regisetFormSubmit()">
								<h4 style="color: red;">立即注册，即可报备！</h4>
								<p class="bg-danger" id="rg_danger"></p>
								<div class="form-group">
									<input type="text" class="form-control" id="name" name="name" value="" placeholder="经纪人姓名(必填)">
								</div>
								<div class="form-group">
									<input type="text" class="form-control" id="mobile" name="mobile" value="" placeholder="经纪人手机号码(必填)">
								</div>
								
								<!-- <div class="form-group">
									<input type="text" class="form-control" id="cardId" value="" placeholder="身份证号码(必填)">
								</div> -->
								<!-- <div class="form-group">
									<input type="text" class="form-control pull-left" style="width:66%;" id="cardType" placeholder="身份类型(非必填)">
									<button id="fastChooseBtn" type="button" class="btn btn-default pull-right">快速选择</button>
								</div> -->
								<!-- <div class="form-group">
									<select id="isOccupation" class="form-control">
										<option value=0>职业经纪人</option>
										<option value=1 selected>独立经纪人</option>
									</select>
								</div> -->
								
								<div class="form-group">
									<!-- <input type="text" class="form-control" id="campany" value="" placeholder="所属公司(必填)"> -->
									<select class="js-example-responsive form-control" style="width:100%;height:40px;" name="campany" id="company">
												<option></option>
												<c:forEach items="${companys}" var="company">
													<option id="${company.id }" data-value='${company.short_name }'>${company.name }</option>
												</c:forEach>
										</select>
									<%--<select class="js-example-responsive" name="campany" style="width: 100%;" id="campany">
										 <option value="">请选择公司</option>
										<c:forEach items="${companys}" var="company">
											<option id="${company.id }">${company.name }</option>
										</c:forEach> 
									</select>--%>
									<!-- <input type="text" class="form-control" id="campanyInput" value="" placeholder="输入关键字，查询所属公司(必填)">
									<div id="selectFilterList" >
										<ul>
											
										</ul>
									</div> -->
								</div>
								
								<div class="form-group" style="display:none;">
									<!-- <input type="text" class="form-control" id="store" value="" placeholder="所属门店(必填)"> -->
									<select class="form-control" id="store" disabled>
										<option value="">请选择门店</option>
										<c:forEach items="${companys}" var="company">
											<option value="${company.id }">${company.short_name }</option>
										</c:forEach>
										
									</select>
								</div>
								<input type="hidden" value='' id="campanyIdHidden" name='campanyId' />
								<input type="hidden" value='' id="storeHidden" name='store' />
								<input type="hidden" value='' id="campanyHidden" name='campany' />
								<input type="hidden" value='' id="idHidden" name='id' />
								<div class="form-group">
									<input id="code" type="text" class="form-control" style="width:45%; display:inline; float: left;" id="mobile" value="" placeholder="验证码(必填)">
									<button id="sendCode" type="button" class="btn btn-primary" style="padding:9px; font-size:14px; margin-left: 10px;">发送验证码</button>
								</div>
								<div class="clearfix"></div>
								<!-- <div class="checkbox">
								  <label>
								    <input type="checkbox" id="isOccupation"> 专业经纪人
								  </label>
								</div> -->
								<button id="register" type="button" style="font-size:18px; padding: 12px;" class="btn btn-info col-xs-12 col-sm-12">注册提交</button>
							</form>
						</c:otherwise>
					</c:choose>
				</div>
			</div>
		</div>
		
		<div id="dialog-message" title="信息" style="display:none;">
		  <p>
		  	  保存成功.
		  </p>
		</div>
		
		<script>
			window.__COMPANYLIST__ = [
				<c:forEach items="${companys}" var="company">
					{ id : '${company.id }', text: '${company.name }', short_name: '${company.short_name }'},
				</c:forEach>
			];
		</script>
		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	    <script src="${pageContext.request.contextPath}/vendor/jquery/jquery.2.1.3.min.js"></script>
	    <script src="${pageContext.request.contextPath}/vendor/jquery-ui-1.11.4/jquery-ui.min.js"></script>
	    <!-- Include all compiled plugins (below), or include individual files as needed -->
	    <script src="${pageContext.request.contextPath}/vendor/select2/js/select2.full.min.js"></script>
	    <script src="${pageContext.request.contextPath}/vendor/select2/js/i18n/zh-CN.js"></script>
	    <script src="${pageContext.request.contextPath}/vendor/bootstrap/js/bootstrap.min.js"></script>
	    <script src="${pageContext.request.contextPath}/vendor/moment/moment-with-locales.min.js"></script>
	    <script src="${pageContext.request.contextPath}/vendor/bacon/bacon.min.js"></script>
	    <script src="${pageContext.request.contextPath}/vendor/lodash/lodash.min.js"></script>
	    <script src="${pageContext.request.contextPath}/vendor/DateBox/js/jtsage-datebox.js"></script>
	    <script src="${pageContext.request.contextPath}/vendor/DateBox/js/jtsage-datebox.i18n.zh-CN.utf8.min.js"></script>
	    <script src="${pageContext.request.contextPath}/vendor/eonasdan-bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
	    <script src="${pageContext.request.contextPath}/js/common.js"></script>
	    <script src="${pageContext.request.contextPath}/js/app.js"></script>
	</body>
</html>