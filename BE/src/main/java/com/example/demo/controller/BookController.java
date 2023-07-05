package com.example.demo.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dao.BookDAO;
import com.example.demo.model.Book;
import com.example.demo.model.BookRequestDto;
import com.example.demo.model.Employee;
import com.example.demo.model.comment;

@CrossOrigin
@RestController
public class BookController {
	private BookDAO dao = new BookDAO();
	
	@GetMapping("/books")
	public List<Book> getBooks(){
		List<Book> books = dao.selectAllBook();
		return  books;
		
	}
	
	@GetMapping("/book/{idBook}")
	public Book getBookDetail(@PathVariable String idBook){
		Book book = dao.selectBookById(idBook);
		return  book;
		
	}
	
//	@PostMapping("/newBook")
//	public ResponseEntity<String> insertBook(@RequestBody BookRequestDto requestDto) {
//	    try {
//	        // Lấy thông tin từ requestDto
//	        Book book = requestDto.getBook();
//	        MultipartFile imageFile = requestDto.getImageFile();
//
//	        // Xử lý logic thêm sách vào CSDL
//	        InputStream imageStream = imageFile.getInputStream();
//	        dao.insertBook(book, imageStream);
//
//	        return ResponseEntity.ok("Book inserted successfully");
//	    } catch (IOException e) {
//	        e.printStackTrace();
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inserting book");
//	    }
//	}
	
	@PostMapping("/newBook")
	public boolean insertBook(@RequestBody Book book) {
	    return dao.insertBook(book);
	}
	
	@PutMapping("/edit")
    public boolean updateBook(@RequestBody Book book) {
        return dao.updateBook(book);
            
    }
	@GetMapping("/cmt/{idBook}")
	public List<comment> getBookCmt(@PathVariable String idBook){
		List<comment> cmts = dao.selectAllCmtByBook(idBook);
		return  cmts;	
	}
	
	@PostMapping("/newCmt")
    public ResponseEntity<String> insertCmt(@RequestBody comment cmt) {
        try {
            dao.insertCmt(cmt);
            return ResponseEntity.ok("Book inserted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inserting book");
        }
    }
	@DeleteMapping("/deleteBook/{idBook}")
	public ResponseEntity<String> deleteBook(@PathVariable String idBook) {
	    try {
	        dao.deleteBook(idBook);
	        return ResponseEntity.ok("Book deleted successfully");
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting book");
	    }
	}
}
