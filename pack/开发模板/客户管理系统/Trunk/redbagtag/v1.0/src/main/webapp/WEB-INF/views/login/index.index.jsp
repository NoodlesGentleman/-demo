<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<jsp:include page="/WEB-INF/views/panel/wrapper.prefix.jsp"/>

<section class="vbox">          
    <header class="header bg-white b-b clearfix">
        <p class="h4">Welcome, ${loggedInUser.userName}</p>
    </header>
    
    <section class="scrollable wrapper w-f">
    
    </section>
</section>

<jsp:include page="/WEB-INF/views/panel/wrapper.suffix.jsp"/>
