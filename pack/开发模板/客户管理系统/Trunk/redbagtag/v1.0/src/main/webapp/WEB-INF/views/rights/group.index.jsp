<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<jsp:include page="/view/panel/wrapper.prefix.jsp"/>

<script src="${STATIC_URL}/js/rights/group.index.js" type="text/javascript"></script>

<section class="hbox stretch">
    <aside>
        <section class="vbox">
            <header class="header bg-white b-b clearfix">
                <div class="row m-t-sm">
                    <div class="col-sm-8 m-b-xs">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-default action-refresh" title="Refresh"><i class="fa fa-refresh"></i></button>
                        </div>
                        <a href="/admin/group/add" class="btn btn-sm btn-default load-content"><i class="fa fa-plus"></i> 添加</a>
                    </div>
                </div>
            </header>
                
            <section class="scrollable wrapper">
                <section class="panel panel-default">
                    <div class="table-responsive">
                        <table class="table table-striped m-b-sm datagrid" id="group_listing">
                            <thead>
                            </thead>
                        </table>
                    </div>
                </section>
            </section>
        </section>
    </aside>
</section>
            
<jsp:include page="/view/panel/wrapper.suffix.jsp"/>