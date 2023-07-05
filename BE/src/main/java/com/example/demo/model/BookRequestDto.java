package com.example.demo.model;

import org.springframework.web.multipart.MultipartFile;

public class BookRequestDto {
	private Book book;
    private MultipartFile imageFile;

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public MultipartFile getImageFile() {
        return imageFile;
    }

    public void setImageFile(MultipartFile imageFile) {
        this.imageFile = imageFile;
    }
}
