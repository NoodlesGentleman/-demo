<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib  prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page isELIgnored="false" %>

<%boolean isAjax = com.sof.marketing.system.util.AjaxUtil.checkIsAjax(request);%>
<c:if test="${isAjax != true}">
<jsp:include page="/WEB-INF/views/panel/inc/footer.jsp"/> 

</body>
</html>

</c:if> 