package com.example.demo.dao;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.ModelAttribute;

import com.example.demo.model.Account;
import com.example.demo.model.Book;

public class AccountDAO {
	private String jdbcURL="jdbc:mysql://localhost:3306/jdbc_demo";
	private String jdbcUsername="root";
	private String jdbcPass="dainam2002";

	
	private static final String selectAllAccount="select * from account";
//	private static final String addAccount="INSERT INTO account (ownerName, ownerEmail, password, accountRole) VALUES (?, ?, ?, ?)";
	private static final String addAccount="insert into account values(?, ?, ?, ?, ?)";
	private static final String selectBookDetail="SELECT idBook, BookName, author, Category, bookImage, relatedDate, sold, pages FROM book WHERE idBook = ?";
	private static final String updateBook="UPDATE book SET BookName = ?, author = ?, Category = ?, bookImage = ?, relatedDate = ?, sold = ?, pages = ? WHERE idBook = ?";
	
	public AccountDAO() {
		
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
	
	//view all book
	public List<Account> selectAllAccount(){
		List<Account> accounts = new ArrayList<>();
		try (Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(selectAllAccount);)
		{
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				int idAccount = rs.getInt("idAccount");
				String ownerName = rs.getString("ownerName");
				String ownerEmail = rs.getString("ownerEmail");
				String password = rs.getString("password");
				String accountRole = rs.getString("accountRole");
				accounts.add(new Account(idAccount,ownerName,ownerEmail,password,accountRole));
				
			}
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		return accounts;
	}
	
	//resign account
	public void insertAccount(@ModelAttribute Account account) {
	    try (Connection connection = getConnection();
	         PreparedStatement ps = connection.prepareStatement(addAccount)) {
            System.out.print(account.getOwnerName());
            ps.setString(1, null);
	        ps.setString(2, account.getOwnerName());
	        ps.setString(3, account.getOwnerEmail());
	        ps.setString(4, account.getPassword());
	        ps.setString(5, account.getAccountRole());
	        ps.executeUpdate();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}
	
}
