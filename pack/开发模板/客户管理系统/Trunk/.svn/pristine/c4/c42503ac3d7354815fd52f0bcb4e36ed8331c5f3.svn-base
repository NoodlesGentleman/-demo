<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<jsp:include page="/WEB-INF/views/panel/wrapper.prefix.jsp"/>
<script type="text/javascript">
	var webroot = "${STORE_URL}";
</script>
<link href="${STATIC_URL}/admin/css/permissionassign.css" rel="stylesheet" type="text/css" />
<script src="${STATIC_URL}/js/rights/permissionassign.edit.js" type="text/javascript"></script>

<section class="hbox stretch">
    <aside class="aside-md bg-white b-r" id="subNav">
        <section class="vbox">
            <header class="b-b header"><p class="h4">权限组</p></header>
			<input type="hidden" id="roleId" value="${sysRole.role_id}">
            <section class="scrollable w-f">
                <ul class="nav nav-pills nav-stacked no-radius">
                	<c:forEach items="${navigations}" var="v">
                    <li class="b-b m-t-none-reset <c:if test="${navigationId == v.navigationId }">active</c:if>">
                        <a href="${STORE_URL}/sysRoleNav/editViewNew?navigationId=${v.navigationId}&roleId=${sysRole.role_id}" class="load-content">
                            <i class="fa fa-chevron-right pull-right m-t-xs text-xs icon-muted"></i>
                            <i class="fa fa-fw fa-ellipsis-v"></i>
                            ${v.title}
                        </a>
                    </li>
                    </c:forEach>
                    <input type="hidden" id="navigationId" name="navigationId" value="${navigationId}"/>
                </ul>
            </section>
        </section>
    </aside>
        
    <aside>
        <section class="vbox">
            <header class="header bg-white b-b clearfix">
                <p>为角色《${sysRole.role_name}》分配权限</p>
            </header>
                 <table>
                    <tbody>
                    <tr>
                        <td width="80"></td>
                        <td width="270"></td>
                        <td>
                        </td>
                        <td>
                        </td>
                    </tr>
                    </tbody>
                 </table>
            <section class="scrollable wrapper" id="permission_content">
            <span class="edit_notice" id="edit_notice"></span>
            <!-- <div style="margin-left:334px;">  全选/反选&nbsp;&nbsp;<input type="checkbox" name="post[]" class="select-all" value=""/></div> -->
                <section class="panel panel-default">
                    <table class="table table-striped m-b-none text-sm" id="permission_listing">
                        <thead>
						</thead>
                    </table>
                </section>
            </section>
        </section>
    </aside>
</section>

<jsp:include page="/WEB-INF/views/panel/wrapper.suffix.jsp"/>
<!-- {literal} -->
<script type="text/javascript">
	/* 下拉菜单 */
	var $drop_button = $("div.drop>div>.drop_button");
	
	$drop_button.hover(function(){
	    $(this).parent().parent().addClass("drop_hover");
	},
	function(){
	    $(this).parent().parent().removeClass("drop_hover");
	});
	
	$drop_button.click(function(){
	    dropMenu($(this));
	    return false;
	});

    /* 弹出/隐藏表单层 */
    $('.stretch-button').click(function(event){
        event.preventDefault();
        
        var sbid = $(this).attr("id");
        var sbid_arr = sbid.split("_");
        var sb_goal_id = "stretch_" + sbid_arr[2];
        
        $("#" + sb_goal_id).slideToggle();
    });
    
    /* tr hover */
    $("tbody>tr").hover(function() {
        $(this).addClass("tr_hover");
    },
    function() {
        $(this).removeClass("tr_hover");
    });
</script>
<!-- {/literal} -->