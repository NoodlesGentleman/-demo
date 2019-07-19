<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<jsp:include page="/view/panel/wrapper.prefix.jsp"/>

<script src="${STATIC_URL}/js/rights/group.edit.js" type="text/javascript"></script>

<section class="hbox stretch">
    <aside class="aside-md bg-white b-r">
        <section class="vbox">
            <header class="b-b header">
                <p class="h4"><c:choose><c:when test="${group != null}">编辑角色</c:when><c:otherwise>添加角色</c:otherwise></c:choose></p>
            </header>
            
            <section class="scrollable wrapper w-f">
                <form class="form-horizontal" id="edit_form" action="/admin/group/save" method="post">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">父级角色</label>
                        <div class="col-sm-4">
                            <select class="form-control" name="parentid">
		                        <option value="0" <c:if test="${group.parentid == 0}">selected</c:if>>请选择父级角色</option>
		                        <c:if test="${parent_groups != null }">
		                        <c:forEach items="${parent_groups}" var="v">
		                        <option value="${v.groupid}" <c:if test="${v.groupid == group.parentid}">selected</c:if>>${v.groupname}</option>
		                        </c:forEach>
		                        </c:if>
                            </select>
                        </div>
                    </div>
                    <div class="line line-dashed line-lg pull-in"></div>
                        
                    <div class="form-group">
                        <label for="groupname" class="col-sm-2 control-label"><font class="red">*</font> 角色名</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="groupname" name="groupname" value="${group.groupname}" placeholder="请输入角色名" />
                        </div>
                    </div>
                    <div class="line line-dashed line-lg pull-in"></div>
                        
                    <div class="form-group">
                        <label for="description" class="col-sm-2 control-label">描述</label>
                        <div class="col-sm-4">
                            <textarea name="description" id="description" class="form-control" rows="3" placeholder="请输入描述">${group.description}</textarea>
                        </div>
                    </div>
                    
                    <input type="hidden" name="groupid" value="${group.groupid}" />
                </form>
            </section>
            
            <footer class="footer b-t bg-white-only">
                <div class="m-t-sm">
                    <button type="button" id="submit_save_back" class="btn btn-s-md btn-primary btn-sm input-submit">保存</button>
                    <c:if test="${group != null }"><button type="button" id="submit_save_continue" class="btn btn-s-md btn-primary btn-sm input-submit">保存并继续添加</button></c:if>
                    <button type="button" id="submit_cancel" class="btn btn-danger btn-sm input-submit">取消</button>
                    <span id="edit_notice"></span>
                </div>
            </footer>
        </section>
    </aside>
</section>

<jsp:include page="/view/panel/wrapper.suffix.jsp"/>