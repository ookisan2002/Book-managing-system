package com.example.demo.model;

public class comment {
	private int idComment;
	private int idBook;
	private String content;
	private int star;
	private String ownerEmail;
	
	public comment() {
	}

	public comment(int idComment, int idBook, String content, int star, String ownerEmail) {
		this.idComment = idComment;
		this.idBook = idBook;
		this.content = content;
		this.star = star;
		this.ownerEmail=ownerEmail;
	}

	public int getIdComment() {
		return idComment;
	}

	public void setIdComment(int idComment) {
		this.idComment = idComment;
	}

	public int getIdBook() {
		return idBook;
	}

	public void setIdBook(int idBook) {
		this.idBook = idBook;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getStar() {
		return star;
	}

	public void setStar(int star) {
		this.star = star;
	}

	public String getOwnerEmail() {
		return ownerEmail;
	}

	public void setOwnerEmail(String ownerEmail) {
		this.ownerEmail = ownerEmail;
	}
	
	
}
