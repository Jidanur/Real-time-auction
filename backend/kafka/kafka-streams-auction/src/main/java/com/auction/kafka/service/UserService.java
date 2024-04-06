package com.auction.kafka.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auction.kafka.dao.UserDao;
import com.auction.kafka.domain.User;
@Service
public class UserService {
    
    @Autowired
    UserDao userDao;

    public int createUser(User user){
        return userDao.createUser(user);
    }

    public User findbyId(int id){
        return userDao.findbyId(id);
    }
}
