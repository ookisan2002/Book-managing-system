package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.OrderDAO;
import com.example.demo.model.Book;
import com.example.demo.model.Order;

@CrossOrigin
@RestController
public class OrderController {
	private OrderDAO dao=new OrderDAO();
	
	@GetMapping("/order/{idAccount}")
	public List<Order> getBookDetail(@PathVariable String idAccount){
		List<Order> orders = dao.selectAllOrderByCus(idAccount);
		return  orders;
		
	}
	
	@PostMapping("/newOrder")
	public ResponseEntity<String> insertOrder(@RequestBody List<Order> orders) {
	    try {
	    	System.out.print(orders);
	        dao.insertOrder(orders);
	        return ResponseEntity.ok("Order inserted successfully");
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inserting order");
	    }
	}
	
	@GetMapping("/cancelOrder/{idOrder}")
	public boolean cancelOrder(@PathVariable String idOrder) {
	    try {
	 
	        boolean success = dao.cancelOrder(idOrder);
	        return success;
	    } catch (Exception e) {
	        e.printStackTrace();
	        return false;
	    }
	}
}
