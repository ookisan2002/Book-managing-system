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
import com.example.demo.model.Employee;
import com.example.demo.model.comment;

public class BookDAO {
	private String jdbcURL="jdbc:mysql://localhost:3306/jdbc_demo";
	private String jdbcUsername="root";
	private String jdbcPass="dainam2002";

	
	private static final String selectAllBook="select * from book";
	private static final String addBook="INSERT INTO book  VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?)";
	private static final String selectBookDetail="SELECT idBook, BookName, author, Category, bookImage, relatedDate, sold, pages,bookPrice,cursory FROM book WHERE idBook = ?";
	private static final String updateBook="UPDATE book SET BookName = ?, author = ?, Category = ?, bookImage = ?, relatedDate = ?, sold = ?, pages = ?,bookPrice = ?, cursory= ? WHERE idBook = ?";
	private static final String selectAllCmtByBook="select * from comment where idBook = ?";
	private static final String addCmt="INSERT INTO comment (idBook, content, star,ownerEmail) VALUES (?, ?, ?, ?)";
	private static final String deleteBook="DELETE FROM `jdbc_demo`.`book` WHERE (`idBook` = ?);";
	public BookDAO(){
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
	public List<Book> selectAllBook(){
		List<Book> books = new ArrayList<>();
		try (Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(selectAllBook);)
		{
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				int idBook = rs.getInt("idBook");
				String bookName = rs.getString("BookName");
				String author = rs.getString("author");
				String Category = rs.getString("Category");
				String bookImage = rs.getString("bookImage");
				String relatedDate = rs.getString("relatedDate");
				int sold = rs.getInt("sold");
				int page = rs.getInt("pages");
				int bookPrice = rs.getInt("bookPrice");
				String cursory = rs.getString("cursory");
				books.add(new Book(idBook,bookName,author,Category,bookImage,relatedDate,sold,page,bookPrice,cursory));
				
			}
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		return books;
	}
	//add book
	public boolean insertBook(Book book) {
	    try (Connection connection = getConnection();
	         PreparedStatement ps = connection.prepareStatement(addBook)) {
	    	ps.setString(1, null);
	        ps.setString(2, book.getBookName());
	        ps.setString(3, book.getAuthor());
	        ps.setString(4, book.getCategory());
	        ps.setString(5, book.getBookImage());
	        ps.setString(6, book.getRelatedDate());
	        ps.setInt(7, book.getSold());
	        ps.setInt(8, book.getPage());
	        ps.setInt(9, book.getBookPrice());
	        ps.setString(10, book.getCursory());
	        int rowsAffected = ps.executeUpdate();
	        if(rowsAffected>0) {
	        	return true;
	        }else return false;
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
		return false;
	}
	
	//view book detail
	public Book selectBookById(@PathVariable String idBook){
		try (Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(selectBookDetail);)
		{
			ps.setInt(1, Integer.valueOf(idBook));
			ResultSet rs = ps.executeQuery();
			Book book= new Book();
			while(rs.next()) {
				book.setIdBook(rs.getInt("idBook"));
				book.setBookName(rs.getString("BookName"));
				book.setAuthor(rs.getString("author"));
				book.setCategory(rs.getString("Category"));
				book.setCategory(rs.getString("Category"));
				book.setBookImage(rs.getString("bookImage"));
				book.setRelatedDate(rs.getString("relatedDate"));
				book.setSold(rs.getInt("sold"));
				book.setPage(rs.getInt("pages"));
				book.setBookPrice(rs.getInt("bookPrice"));
				book.setCursory(rs.getString("cursory"));
				return book;
			}
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
		
		
	}
	//updateBook
	public boolean updateBook(Book book) {
	    try (Connection connection = getConnection();
	         PreparedStatement ps = connection.prepareStatement(updateBook);) {
	    	
	        ps.setString(1, book.getBookName());
	        ps.setString(2, book.getAuthor());
	        ps.setString(3, book.getCategory());
	        ps.setString(4, book.getBookImage());
	        ps.setString(5, book.getRelatedDate());
	        ps.setInt(6, book.getSold());
	        ps.setInt(7, book.getPage());
	        ps.setInt(10, book.getIdBook());
	        ps.setInt(8, book.getBookPrice());
	        ps.setString(9, book.getCursory());
	        int rowsAffected = ps.executeUpdate();
	        return rowsAffected > 0;
	    } catch (SQLException e) {
	        e.printStackTrace();
	        return false;
	    }
	    
	}
	
	//view book's cmt detail
	public List<comment> selectAllCmtByBook(@PathVariable String id){
		try (Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(selectAllCmtByBook);)
		{
			ps.setInt(1, Integer.valueOf(id));
			ResultSet rs = ps.executeQuery();
			List<comment> comments = new ArrayList<>();
			while(rs.next()) {
				int idComment=rs.getInt("idComment");
				int idBook= rs.getInt("idBook");
				String content= rs.getString("content");
				int star= rs.getInt("star");
				String ownerEmail= rs.getString("ownerEmail");
				comments.add(new comment(idComment,idBook,content,star,ownerEmail));
			}
			return comments;
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;	
	}
	//add cmt
	public void insertCmt(comment cmt) {
	    try (Connection connection = getConnection();
	         PreparedStatement ps = connection.prepareStatement(addCmt)) {
	        ps.setInt(1, cmt.getIdBook());
	        ps.setString(2, cmt.getContent());
	        ps.setInt(3, cmt.getStar());
	        ps.setString(4, cmt.getOwnerEmail());
	        ps.executeUpdate();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}
	
	//xóa book
	public void deleteBook(String idBook) {
	    try (Connection connection = getConnection();
	         PreparedStatement ps = connection.prepareStatement(deleteBook)) {
	        ps.setInt(1,  Integer.valueOf(idBook));
	        ps.executeUpdate();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}

}
