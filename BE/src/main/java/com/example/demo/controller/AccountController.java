package com.example.demo.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dao.AccountDAO;
import com.example.demo.model.Account;
import com.example.demo.model.Book;

@CrossOrigin
@RestController
public class AccountController {
	private AccountDAO dao=new AccountDAO();
	
	@GetMapping("/accs")
	public List<Account> getBooks(){
		List<Account> accounts = dao.selectAllAccount();
		return  accounts;
		
	}
	
	@PostMapping("/newAcc")
    public boolean insertBook(Model model,@RequestBody Account account) {
        try {
        	model.addAttribute("account", account);
            dao.insertAccount(account);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}

