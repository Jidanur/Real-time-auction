package com.auction.kafka.dao;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.auction.kafka.domain.Auction;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Repository
@Transactional
@Slf4j
public class AuctionDao {
    
    @Autowired
    private SessionFactory sessionFactory;

    private Session getSession(){
        return sessionFactory.getCurrentSession();
    }

    public int createAuction(Auction auction){

        log.info("creating new Auction record-- AuctionDao");
        int id = -1;
        try{
            auction.setStartTime(new Timestamp(System.currentTimeMillis())); /// sets current time as start time
            getSession().persist(auction);
            id = auction.getAuctionID();
            log.info("successfully created auction with auctionID--"+id);
        }
        catch(Exception ex){
            log.error("auction creation Failed for Auctiondao :: ",ex);
        }   
        return id;
    }

    public Auction getAuctionById(int auctionID){
        log.info("Find Auction by ID"+ auctionID);

        String hqlQuery = "from Auction where auctionID= :auctionID";
        List<Auction> list = null;

        try{
            list = getSession().createQuery(hqlQuery, Auction.class).setParameter("auctionID", auctionID).list();
        }
        catch(Exception ex){
            log.error("Fail Getting auction by ID -- AuctionDao", ex);
        }

        return (list!=null && list.size()>0)?list.get(0):null;
    }

    public List<Auction> getAuctionsList(){
        CriteriaBuilder cb = getSession().getCriteriaBuilder();
        CriteriaQuery<Auction> criteriaQuery = cb.createQuery(Auction.class);
        Root<Auction> root = criteriaQuery.from(Auction.class);
        criteriaQuery.select(root);
        
        List<Auction> resultList = getSession().createQuery(criteriaQuery).getResultList();
        return (resultList!=null && resultList.size()>0)?resultList:null;
    }





}
