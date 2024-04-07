package com.auction.kafka.config;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
public class DBConfig {
    
    @Value("${spring.datasource.driver-class-name}")
	private String DB_DRIVER_CLASS;

	@Value("${spring.datasource.username}")
	private String DB_USERNAME;

	@Value("${spring.datasource.password}")
	private String DB_PASSWORD;

	@Value("${spring.datasource.url}")
	private String DB_URL;

	@Value("${spring.jpa.show-sql}")
	private String HIBERNATE_SHOW_SQL;

	@Value("${spring.jpa.hibernate.ddl-auto}")
	private String HIBERNATE_HBM2DDL_AUTO;

	


    @Bean
    public DataSource dataSource(){
        DriverManagerDataSource dataSource = null;
		try {
			dataSource = new DriverManagerDataSource();
			dataSource.setDriverClassName(DB_DRIVER_CLASS);
			dataSource.setUrl(DB_URL);
			dataSource.setUsername(DB_USERNAME);
			dataSource.setPassword(DB_PASSWORD);
		} catch (Exception e) {
			e.getMessage();
		}
		return dataSource;
    }

    @Bean(name = "entityManagerFactory")
	public LocalSessionFactoryBean sessionFactory() {
		LocalSessionFactoryBean sessionFactoryBean = new LocalSessionFactoryBean();
		sessionFactoryBean.setDataSource(dataSource());
		sessionFactoryBean.setPackagesToScan("com.auction.kafka");
		Properties hibernateProps = new Properties();
		hibernateProps.put("hibernate.show_sql", HIBERNATE_SHOW_SQL);
		hibernateProps.put("hibernate.hbm2ddl.auto", HIBERNATE_HBM2DDL_AUTO);
		sessionFactoryBean.setHibernateProperties(hibernateProps);
		return sessionFactoryBean;
	}

	@Bean
	public HibernateTransactionManager transactionManager() {
		HibernateTransactionManager transactionManager = new HibernateTransactionManager();
		transactionManager.setSessionFactory(sessionFactory().getObject());
		return transactionManager;
	}
}
