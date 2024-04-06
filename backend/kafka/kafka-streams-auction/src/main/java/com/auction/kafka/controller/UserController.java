package com.auction.kafka.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.auction.kafka.domain.User;
import com.auction.kafka.service.UserService;

import lombok.extern.slf4j.Slf4j;



@RestController
@RequestMapping(value = "/user")
@Slf4j
public class UserController {
    
    @Autowired
    private UserService userService;

    @PostMapping("/createuser")
    public ResponseEntity<User> createUser(@RequestBody User user, UriComponentsBuilder ucBuilder){
        log.info("create user---Controller");
        int userID = userService.createUser(user);
        HttpHeaders headers = new HttpHeaders();
		//headers.setLocation(ucBuilder.path("/user/getuser/{id}").buildAndExpand(userID).toUri());
		return new ResponseEntity<User>(headers, HttpStatus.CREATED);

    }

    @GetMapping("/getuser/{id}")
    public ResponseEntity<User> getUserByID(@PathVariable int id) {
        User getUser = userService.findbyId(id);
        if(getUser != null){
            return new ResponseEntity<User>(getUser,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
       
    }
    
    
    

}
