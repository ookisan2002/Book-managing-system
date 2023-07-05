package com.example.demo.dao;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.model.Book;
import com.example.demo.model.Order;

public class OrderDAO {
	private String jdbcURL="jdbc:mysql://localhost:3306/jdbc_demo";
	private String jdbcUsername="root";
	private String jdbcPass="dainam2002";

	
	private static final String selectAllOrderByCus="SELECT o.idOrder, o.idAccount, o.idBook, b.BookName, b.author, o.dateOrder, o.status ,o.quantity  FROM jdbc_demo.order o JOIN jdbc_demo.book b ON o.idBook = b.idBook WHERE o.idAccount =? ;";
	private static final String addOrder="INSERT INTO `jdbc_demo`.`order` ( `idAccount`, `idBook`, `dateOrder`, `status`, `quantity`) VALUES (?,?,?,?,?)";
	private static final String cancelOrder="UPDATE `jdbc_demo`.`order` SET `status` = 'Cancel' WHERE (`idOrder` = ?);";

	public OrderDAO(){
		
	}
	protected Connection getConnection() {
		Connection connection = null;
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
				connection = DriverManager.getConnection(jdbcURL,jdbcUsername,jdbcPass);
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		return connection;
	}
	
	//view all order
	public List<Order> selectAllOrderByCus(String idCus){
		List<Order> orders = new ArrayList<>();
		try (Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(selectAllOrderByCus);)
		{
			ps.setInt(1, Integer.valueOf(idCus));
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				int idorder = rs.getInt("idOrder");
				int idAccount = rs.getInt("idAccount");
				int idBook = rs.getInt("idBook");
				int quantity = rs.getInt("quantity");
				String bookName = rs.getString("BookName");
				String author = rs.getString("author");
				String dateOrder = rs.getString("dateOrder");
				String status = rs.getString("status");
				
				orders.add(new Order(idorder,idAccount,idBook,bookName,author,dateOrder,status,quantity));
				
			}
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		return orders;
	}
	
	//add order
	public void insertOrder(List<Order> orders) {
	    try (Connection connection = getConnection();
	         PreparedStatement ps = connection.prepareStatement(addOrder)) {
	    	for(Order i: orders) {
		        ps.setInt(1, i.getIdAccount());
		        ps.setInt(2, i.getIdBook());
		        ps.setString(3, i.getDateOrder());
		        ps.setString(4, "Pending");
		        ps.setInt(5, i.getQuantity());
		        ps.executeUpdate();
	    	}
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}
	
	//updateOrder
	public boolean cancelOrder(@PathVariable String idOrder) {
		
	    try (Connection connection = getConnection();
	         PreparedStatement ps = connection.prepareStatement(cancelOrder);) {
	    	System.out.print(idOrder+"   DAO");
	    	ps.setInt(1, Integer.valueOf(idOrder));
	        int rowsAffected = ps.executeUpdate();
	        return rowsAffected > 0;
	    } catch (SQLException e) {
	        e.printStackTrace();
	        return false;
	    }
	    
	}
	
}
