<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false"%>

<jsp:include page="/WEB-INF/views/panel/wrapper.prefix.jsp"/>
<script type="text/javascript">
	var webroot = "${STORE_URL}";
</script>
<script src="${STATIC_URL}/js/version/json2.js"></script>
<script src="${STATIC_URL}/js/version/versionAdd.js"></script>

<section class="hbox stretch">
    <aside class="aside-md bg-white b-r">
        <section class="vbox">
            <header class="b-b header">
                <p class="h4">新建版本</p>
                <p class="h4" style="float: right;"><a href="Javascript:history.go(-1);void(0);" class="list"  rel="questionnaireList">&lt&lt版本信息列表</a></p>
            </header>
            <section class="scrollable wrapper w-f">
                <form class="form-horizontal" id="add_check_form" action="${STORE_URL}/mainVersion/insert" method="post" >
    				<div class="form-group">
				    	<label for="paper_name" class="col-sm-3 control-label"><font class="red">* </font>安卓版本号(以x.x.x表示)：</label>
				 		<div class="col-sm-2">
				     		<input type="text" class="form-control" maxlength="10" id="android_version" name="android_version" placeholder="请输入安卓版本号"/>
						</div>	
					</div>
					<div class="form-group">
				    	<label for="content" class="col-sm-3 control-label"><font class="red">* </font>安卓更新内容：</label>
				 		<div class="col-sm-2">
				     		<textarea rows="4" cols="40" name="android_content" id="android_content" ></textarea>
						</div>	
					</div>
					<div class="form-group">
                        <label class="col-sm-3 control-label">安卓是否强制更新</label>
                        <div class="col-sm-4">
                            <label class="checkbox-inline p-left-0">
                                <input type="radio" name="android_is_forced" value="0" checked="checked"/>&nbsp;否
                            </label>
                            <label class="checkbox-inline">
                                <input type="radio" name="android_is_forced" value="1"/>&nbsp;是
                            </label>
                        </div>
                    </div>
                    <!-- <div class="form-group">
               			<label for="imagesFile" class="col-sm-3 control-label"><font class="red">* </font>上传版本：</label>
	                		<div class="col-sm-2">
			     		   <input id="imgFile1" type="file" name="imagesFile" value="浏览"/>
					    </div>

            			</div> -->
                    
                    <div class="form-group">
				    	<label for="ios_version" class="col-sm-3 control-label"><font class="red">* </font>IOS版本号(以x.x.x表示)：</label>
				 		<div class="col-sm-2">	
				     		<input type="text" class="form-control" maxlength="10" id="ios_version" name="ios_version" placeholder="请输入IOS版本号"/>
						</div>	
					</div>
                    <div class="form-group">
				    	<label for="ios_content" class="col-sm-3 control-label"><font class="red">* </font>IOS更新内容：</label>
				 		<div class="col-sm-2">
				     		<textarea rows="4" cols="40" name = "ios_content" id="ios_content" ></textarea>
						</div>	
					</div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">IOS是否强制更新</label>
                        <div class="col-sm-4">
                            <label class="checkbox-inline p-left-0">
                                <input type="radio" name="ios_is_forced" value="0" checked="checked"/>&nbsp;否
                            </label>
                            <label class="checkbox-inline">
                                <input type="radio" name="ios_is_forced" value="1"/>&nbsp;是
                            </label>
                        </div>
                    </div>
                   <!--  <div class="form-group">
                        <label class="col-sm-3 control-label">IOS是否需要更新</label>
                        <div class="col-sm-4">
                            <label class="checkbox-inline p-left-0">
                                <input type="radio" name="ios_flag" value="0" checked="checked"/>&nbsp;否
                            </label>
                            <label class="checkbox-inline">
                                <input type="radio" name="ios_flag" value="1"/>&nbsp;是
                            </label>
                        </div>
                    </div> -->
					
                    
				 </form>
          	</section>
            <footer class="footer b-t bg-white-only">
                <div class="m-t-sm">
                	<span id="edit_notice"></span>
                   	<button type="button" id="submit_save_back" class="btn btn-s-md btn-primary btn-sm input-submit">提交</button>
					<button type="button" id="submit_cancel" class="btn btn-danger btn-sm input-submit">取消</button>
                </div>
           	</footer>
        
        </section>
    </aside>
</section>

<!-- 模态框（Modal） -->
<div class="modal fade" id="versionModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog" id="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" 
               data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="myModalLabel"><i class="fa fa-exclamation-circle"></i>[Title]</h4>
         </div>
         <div class="modal-body">[Message]</div>
         <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">[BtnOk]</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">[BtnCancel]</button>
         </div>
      </div><!-- /.modal-content -->
</div><!-- /.modal -->
<jsp:include page="/WEB-INF/views/panel/wrapper.suffix.jsp"/>