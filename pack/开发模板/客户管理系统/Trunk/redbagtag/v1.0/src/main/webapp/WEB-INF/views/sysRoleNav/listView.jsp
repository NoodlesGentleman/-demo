<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<!-- 网页头部和公共样式加载-->
<jsp:include page="/WEB-INF/views/panel/wrapper.prefix.jsp"/>
<script type="text/javascript">
	var webroot = "${STORE_URL}";
</script>

<!-- 网页内容的js和css样式加载-->
<script src="${STATIC_URL}/js/sysRoleNav/sysRoleNav.js"></script>

<section class="vbox">
    <header class="header bg-white b-b clearfix">
        <div class="row m-t-sm">
            <div class="col-sm-2 m-b-xs">
                <div class="input-group">
                    <input type="text" style = "width:130px" name="role_name" class="input-sm form-control" placeholder="角色名称搜索" />
                </div>
            </div>
            <div class="col-sm-1 m-b-xs">
                    <span class="input-group-btn">
                        <button name = "search" class="btn btn-sm btn-default action-refresh" type="button">搜索</button>
                    </span>
            </div>
        </div>
    </header>
        
    <section class="scrollable wrapper">
        <section class="panel panel-default">
            <div class="table-responsive">
                <table class="table table-striped m-b-none datagrid" id="sysRoleNav_listing">
                    <thead>
                    </thead>
                    <tfoot>
                        <tr>
                            <th class="row">
                                <div class="datagrid-footer-left col-sm-6 text-left text-center-xs m-l-n"
                                     style="display:none;">
                                    <div class="grid-controls m-t-sm">
                                            <span>
                                                <span class="grid-start"></span> -
                                                <span class="grid-end"></span> （共
                                                <span class="grid-count"></span>）
                                            </span>

                                        <div class="select grid-pagesize dropup" data-resize="auto">
                                            <button data-toggle="dropdown"
                                                    class="btn btn-sm btn-default dropdown-toggle">
                                                <span class="dropdown-label"></span>
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li data-value="10" data-selected="true"><a href="#">10</a></li>
                                            </ul>
                                        </div>
                                        <span>/页</span>
                                    </div>
                                </div>

                                <div class="datagrid-footer-right col-sm-6 text-right text-center-xs"
                                     style="display:none;">
                                    <div class="grid-pager m-r-n">
                                        <button type="button" class="btn btn-sm btn-default grid-prevpage"><i
                                                class="fa fa-chevron-left"></i></button>
                                        <!--<span>页</span>-->

                                        <div class="inline">
                                            <div class="input-group dropdown combobox">
                                                <input class="input-sm form-control" type="text">

                                                <div class="input-group-btn dropup">
                                                    <button class="btn btn-sm btn-default" data-toggle="dropdown"><i
                                                            class="caret"></i></button>
                                                    <ul class="dropdown-menu pull-right"></ul>
                                                </div>
                                            </div>
                                        </div>
                                        <span>/ <span class="grid-pages"></span></span>
                                        <button type="button" class="btn btn-sm btn-default grid-nextpage"><i
                                                class="fa fa-chevron-right"></i></button>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </section>
    </section>
</section>
<!-- 网页尾部加载-->
<jsp:include page="/WEB-INF/views/panel/wrapper.suffix.jsp"/>