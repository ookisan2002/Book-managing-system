package com.example.demo.model;

public class Account {
	private int idAccount;
	private String ownerName;
	private String ownerEmail;
	private String password;
	private String accountRole;
	
	public Account() {
	}

	public Account(int idAccount, String ownerName, String ownerEmail, String password, String accountRole) {
		this.idAccount = idAccount;
		this.ownerName = ownerName;
		this.ownerEmail = ownerEmail;
		this.password = password;
		this.accountRole = accountRole;
	}

	public int getIdAccount() {
		return idAccount;
	}

	public void setIdAccount(int idAccount) {
		this.idAccount = idAccount;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getOwnerEmail() {
		return ownerEmail;
	}

	public void setOwnerEmail(String ownerEmail) {
		this.ownerEmail = ownerEmail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAccountRole() {
		return accountRole;
	}

	public void setAccountRole(String accountRole) {
		this.accountRole = accountRole;
	}
	
}
