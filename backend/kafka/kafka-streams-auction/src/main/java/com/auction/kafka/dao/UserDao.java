package com.auction.kafka.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.auction.kafka.domain.User;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.extern.slf4j.Slf4j;

@Repository
@Transactional
@Slf4j
public class UserDao {
    
    @Autowired
    private SessionFactory sessionFactory;

    private Session getSession(){
        return sessionFactory.getCurrentSession();
    }

    public int createUser(User user){

        log.info("creating new User");
        int id = -1;
        try{
            getSession().persist(user);
            id = user.getUserID();
            log.info("successfully created user with userID--"+id);
        }
        catch(Exception ex){
            log.error("User Registration Failed for UserDao :: ",ex);
        }
        
        return id;
    }

    @Cacheable(value = "com.auction.kafka.domain.User", key ="#id", unless ="#result == null")
    public User findbyId(int id){
        log.info("Find User by ID:"+id+ "---UserDao");
        
        ///User represents the Hibernate entity not database table, same for the userID field.
        String hqlQuery = "from User where userID = :id";
        List<User> list = null;
        
        try{
            list = getSession().createQuery(hqlQuery, User.class).setParameter("id", id).list();
        }
        catch(Exception ex){
            log.error("Fail Getting user by ID -- UserDao", ex);
        }

        return (list!=null && list.size()>0)?list.get(0):null;
    }

    public List<User> getAllUsers(){
        CriteriaBuilder cb = getSession().getCriteriaBuilder();
        CriteriaQuery<User> criteriaQuery = cb.createQuery(User.class);
        Root<User> root = criteriaQuery.from(User.class);
        criteriaQuery.select(root);
        
        List<User> resultList = getSession().createQuery(criteriaQuery).getResultList();
        return (resultList!=null && resultList.size()>0)?resultList:null;
    }

}
