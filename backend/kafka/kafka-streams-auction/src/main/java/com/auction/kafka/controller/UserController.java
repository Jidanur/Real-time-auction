package com.auction.kafka.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.auction.kafka.domain.Response;
import com.auction.kafka.domain.User;
import com.auction.kafka.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = "/user")
@Slf4j
@CrossOrigin()
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/createuser")
    public ResponseEntity<Response> createUser(@RequestBody User user, UriComponentsBuilder ucBuilder) {
        log.info("create user---Controller");
        int userID = userService.createUser(user);
        if (userID == -1) {
            return new ResponseEntity<Response>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else if (userID == 0) {
            return new ResponseEntity<Response>(new Response("user email already exists"), HttpStatus.FOUND);
        } else {
            // HttpHeaders headers = new HttpHeaders();
            // headers.setLocation(ucBuilder.path("/user/getuser/{id}").buildAndExpand(userID).toUri());
            return new ResponseEntity<Response>(new Response("user created with UserID-" + userID), HttpStatus.CREATED);
        }

    }

    @PostMapping("/login")
    public ResponseEntity<Response> userLogin(@RequestBody User user) {
        User getUser = userService.userLogin(user);
        if (getUser != null) {
            return new ResponseEntity<Response>(new Response("" + getUser.getUserID()), HttpStatus.OK);
        } else {
            return new ResponseEntity<Response>(
                    new Response("User does not exists or Password doesn't match the email"), HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/getuser/{id}")
    public ResponseEntity<User> getUserByID(@PathVariable int id) {
        User getUser = userService.findbyId(id);
        if (getUser != null) {
            return new ResponseEntity<User>(getUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> allusers = userService.getAllUsers();

        if (allusers != null) {
            return new ResponseEntity<List<User>>(allusers, HttpStatus.OK);
        } else {
            return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);
        }
    }

}
