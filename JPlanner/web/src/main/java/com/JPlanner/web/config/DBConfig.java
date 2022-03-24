package com.JPlanner.web.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DBConfig {

	@Value("${spring.datasource.driver-class-name}")
	private String dbClassName;
	
	@Value("${spring.datasource.url}")
	private String dbUrl;
	
	@Value("${spring.datasource.username}")
	private String dbUsername;
	
	@Value("${spring.datasource.password}")
	private String dbPassword;
	
	@SuppressWarnings("rawtypes")
	@Bean(name = "dataSource")
	public DataSource dataSource() {
		DataSourceBuilder builder = DataSourceBuilder.create();
		
		builder.driverClassName(dbClassName);
		builder.url(dbUrl);
		builder.username(dbUsername);
		builder.password(dbPassword);
		return builder.build();
	}
}
