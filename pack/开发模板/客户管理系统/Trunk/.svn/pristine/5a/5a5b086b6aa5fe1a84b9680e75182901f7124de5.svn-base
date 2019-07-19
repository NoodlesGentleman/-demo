<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page isELIgnored="false"%>

<!-- 网页头部和公共样式加载-->
<jsp:include page="/WEB-INF/views/panel/wrapper.prefix.jsp" />
<script src="${STORE_URL}/ui/ueditor/ueditor.config.js"></script>
<script src="${STORE_URL}/ui/ueditor/ueditor.all.min.js"></script>
<script type="text/javascript">
  var webroot = "${STORE_URL}";

  $(document).ready(function() {
		var toolars = {
				initialFrameHeight : 400,
				initialFrameWidth : 700,
				maximumWords : 100000,
				charset : "utf-8",
				elementPathEnabled : false,
				toolbars :[
		  						[ 'fullscreen', 'source', '|', 'undo',
		  							'redo', '|', 'bold', 'italic',
		  							'underline', 'strikethrough',
		  							'superscript', 'subscript',
		  							'removeformat', 'pasteplain', '|',
		  							'forecolor', 'backcolor',
		  							'cleardoc' ],
		
		  					[ 'lineheight', '|', 'fontfamily',
		  							'fontsize', "blockquote", '|',
		  							'justifyleft', 'justifycenter',
		  							'justifyright', 'justifyjustify',
		  							'|', 'link', 'unlink', '|', 'date',
		  							'time', 'spechars', '|', 'preview',
		  							'simpleupload' ]
		  						
		  				  ]};
		
		
		var ue = new UE.ui.Editor(toolars);
		ue.render("text");
  });
</script>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
  <section class="vbox">
  <header class="header bg-white b-b clearfix">
    <p class="h4">技艺工艺详情</p>
  </header>
   <section class="scrollable wrapper" id="">
		<div class="row m-t-sm">
	      <div class="col-sm-12 m-l-xl m-b-xl text-left p-left-1 p-right-0">
	        <form class="form-inline"  id ="addForm" method="post" action="${STORE_URL }/award/editArt" enctype="multipart/form-data">
	          <textarea  id = "text" name = "text"  ></textarea>
	        </form>
	      </div>
	    </div>
    </section>
    <!--底部-->
    <footer class="footer b-t bg-white-only">
    <div class="m-t-sm">
       <button class="btn btn-sm btn-success" type="button" id = "submit_save_back" style="width:100px;margin-left:0;">保存</button>
    </div>
  </footer>
</section>
</body>
</html>
<!-- 网页尾部加载-->
<jsp:include page="/WEB-INF/views/panel/wrapper.suffix.jsp" />
