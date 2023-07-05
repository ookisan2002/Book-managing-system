package com.example.demo.model;

public class Order {
	private int idorder;
	private int idAccount;
	private int idBook;
	private String bookName;
	private String author;
	private String dateOrder;
	private String status;
	private int quantity;
	public Order() {
	}



	public Order(int idorder, int idAccount, int idBook, String bookName, String author, String dateOrder,
			String status,int quantity) {
		this.idorder = idorder;
		this.idAccount = idAccount;
		this.idBook = idBook;
		this.bookName = bookName;
		this.author = author;
		this.dateOrder = dateOrder;
		this.status = status;
		this.quantity=quantity;
	}



	public int getIdorder() {
		return idorder;
	}

	public void setIdorder(int idorder) {
		this.idorder = idorder;
	}

	public int getIdAccount() {
		return idAccount;
	}

	public void setIdAccount(int idAccount) {
		this.idAccount = idAccount;
	}

	public int getIdBook() {
		return idBook;
	}

	public void setIdBook(int idBook) {
		this.idBook = idBook;
	}

	public String getDateOrder() {
		return dateOrder;
	}

	public void setDateOrder(String dateOrder) {
		this.dateOrder = dateOrder;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}



	public String getBookName() {
		return bookName;
	}



	public void setBookName(String bookName) {
		this.bookName = bookName;
	}



	public String getAuthor() {
		return author;
	}



	public void setAuthor(String author) {
		this.author = author;
	}
	


	public int getQuantity() {
		return quantity;
	}



	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}



	@Override
	public String toString() {
		return "Order [idorder=" + idorder + ", idAccount=" + idAccount + ", idBook=" + idBook + ", bookName="
				+ bookName + ", author=" + author + ", dateOrder=" + dateOrder + ", status=" + status + "]";
	}
	
	
	
}
