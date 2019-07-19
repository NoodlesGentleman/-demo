<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<jsp:include page="/view/panel/wrapper.prefix.jsp"/>
<html>
  <head>  
<script type="text/javascript" src="/js/jquery-1.8.2.js"></script>  
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
<title>图片上传工具</title>  
<script type="text/javascript">  
    i = 1;  
    j = 1;  
    $(document).ready(function(){  
          
        $("#btn_add1").click(function(){  
            document.getElementById("newUpload1").innerHTML+='<div id="div_'+i+'"><input  name="file" type="file"  /><input type="button" value="删除"  onclick="del_1('+i+')"/></div>';  
              i = i + 1;  
        });  
          
        $("#btn_add2").click(function(){  
            document.getElementById("newUpload2").innerHTML+='<div id="div_'+j+'"><input  name="file_'+j+'" type="file"  /><input type="button" value="删除"  onclick="del_2('+j+')"/></div>';  
              j = j + 1;  
        });  
    });  
  
    function del_1(o){  
     document.getElementById("newUpload1").removeChild(document.getElementById("div_"+o));  
    }  
      
    function del_2(o){  
         document.getElementById("newUpload2").removeChild(document.getElementById("div_"+o));  
    }  
  
</script>  
</head>  
<body>  
  
     <h4>springMVC字节流输入上传文件</h4>   
    <form name="userForm1" action="/nodo/upload/upload" enctype="multipart/form-data" method="post">  
        <div id="newUpload1">  
            <input type="file" name="file">  
        </div>  
    	
        <input type="button" id="btn_add1" class="btn btn-s-md btn-primary btn-sm input-submit" value="增加一行" >  
        <input type="submit" class="btn btn-danger btn-sm input-submit" value="上传" >  
    </form>   
    <br>  
    <br>  
    <hr align="left" width="60%" color="#FF0000" size="3">  
    <br>  
    <br>  
     <h4>springMVC包装类上传文件</h4>   
    <form name="userForm2" action="/nodo/upload/upload2" enctype="multipart/form-data" method="post"">  
        <div id="newUpload2">  
            <input type="file" name="file">  
        </div>  
        <input type="button" id="btn_add2" class="btn btn-s-md btn-primary btn-sm input-submit" value="增加一行" >  
        <input type="submit"  class="btn btn-danger btn-sm input-submit" value="上传" >  
          
          
    </form>   
</body>  
</html>  
