package com.example.demo.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.DAO;

import com.example.demo.model.Employee;
@CrossOrigin
@RestController
public class EmployeeController {
	private DAO dao = new DAO();

	@GetMapping("/employees")
	public List<Employee> getEmployee(){
		List<Employee> employee = dao.selectAllEmployee();
		return  employee;
		
	}
	@GetMapping("/employee/{id}")
	public Employee getEmployee(Model model, @PathVariable String id) {
		model.addAttribute("id", id);
		Employee employee = dao.selectEmployeeById(id);
		return employee;
	}
	@PostMapping("/add/{id}")
	public Employee addEmployee( Employee employee,@PathVariable String id) {
		try {
			boolean success = dao.insertEmployee(employee,id);
			if (success) {
				return employee;
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}

	@PutMapping("/update/{id}")
	public Employee updateEmployee(@RequestBody Employee employee, @PathVariable int id) {
	    try {
	        employee.setId(id);
	        boolean success = dao.updateEmployee(employee);
	        if (success) {
	            return employee;
	        }
	    } catch (Exception e) {
	        // TODO: handle exception
	    }
	    return null;
	}

	
}
