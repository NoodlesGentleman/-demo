package com.sof.marketing.listener;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.sof.marketing.system.domain.SystemFunction;
import com.sof.marketing.system.domain.SystemVersion;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableWebMvc
@EnableSwagger2
public class SwaggerConfig {

	/**
	 * Every Docket bean is picked up by the swagger-mvc framework - allowing
	 * for multiple swagger groups i.e. same code base multiple swagger resource
	 * listings.
	 */
	@Bean
	public Docket customDocket() {
		return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo())
				.ignoredParameterTypes(SystemFunction.class)
				.ignoredParameterTypes(SystemVersion.class)
				.select().paths(PathSelectors.any()).build();
	}

	private ApiInfo apiInfo() {
		ApiInfo apiInfo = new ApiInfoBuilder()
				.title("项目所对应的API接口")
				.contact("COLIN YANG")
				.version("1.0").build();
		return apiInfo;
	}
}
