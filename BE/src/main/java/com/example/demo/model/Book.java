package com.example.demo.model;

import java.util.Arrays;

public class Book {
	private int idBook;
	private String bookName;
	private String author;
	private String Category;
	private String bookImage;
	private String relatedDate;
	private int sold;
	private int page;
	private int bookPrice;
	private String cursory;
	public Book() {
	}
	public Book(int idBook, String bookName, String author, String category, String bookImage, String relatedDate,
			int sold, int page,int bookPrice , String cursory) {
		this.idBook = idBook;
		this.bookName = bookName;
		this.author = author;
		Category = category;
		this.bookImage = bookImage;
		this.relatedDate = relatedDate;
		this.sold = sold;
		this.page = page;
		this.bookPrice=bookPrice;
		this.cursory=cursory;
	}
	public int getIdBook() {
		return idBook;
	}
	public void setIdBook(int idBook) {
		this.idBook = idBook;
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
	public String getCategory() {
		return Category;
	}
	public void setCategory(String category) {
		Category = category;
	}
	public String getBookImage() {
		return bookImage;
	}
	public void setBookImage(String bookImage) {
		this.bookImage = bookImage;
	}
	public String getRelatedDate() {
		return relatedDate;
	}
	public void setRelatedDate(String relatedDate) {
		this.relatedDate = relatedDate;
	}
	public int getSold() {
		return sold;
	}
	public void setSold(int sold) {
		this.sold = sold;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	
	public int getBookPrice() {
		return bookPrice;
	}
	public void setBookPrice(int bookPrice) {
		this.bookPrice = bookPrice;
	}
	public String getCursory() {
		return cursory;
	}
	public void setCursory(String cursory) {
		this.cursory = cursory;
	}
	
//	@Override
//	public String toString() {
//		return "Book [idBook=" + idBook + ", bookName=" + bookName + ", author=" + author + ", Category=" + Category
//				+ ", bookImage=" + Arrays.toString(bookImage) + ", relatedDate=" + relatedDate + ", sold=" + sold
//				+ ", page=" + page + "]";
//	}
	
	
	
}
