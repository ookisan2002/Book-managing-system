package com.example.demo.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.model.Employee;
import java.sql.*;

public class DAO {
	private String jdbcURL="jdbc:mysql://localhost:3306/jdbc_demo";
	private String jdbcUsername="root";
	private String jdbcPass="dainam2002";

	
	private static final String selectAllEmployee="select * from employee";
	private static final String selectEmployeeById="select * from employee where id =?";
	private static final String insertEmployee="insert into employee values (?,?,?,?,?)";
	private static final String updateEmploye="update employee set name=?, dob=?, department=?,hired=? where id=?";
	
	public DAO(){
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
	//view all employee
	public List<Employee> selectAllEmployee(){
		List<Employee> employees = new ArrayList<>();
		try (Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(selectAllEmployee);)
		{
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				int id = rs.getInt("id");
				String name = rs.getString("name");
				String dob = rs.getString("dob");
				String department = rs.getString("department");
				int hired = rs.getInt("hired");
				employees.add(new Employee(id,name,dob,department,hired ==0? false:true));
			}
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		return employees;
	}
	//view employee
	public Employee selectEmployeeById(@PathVariable String id){
		try (Connection connection = getConnection();
				PreparedStatement ps = connection.prepareStatement(selectEmployeeById);)
		{
			ps.setInt(1, Integer.valueOf(id));
			ResultSet rs = ps.executeQuery();
			Employee employee= new Employee();
			while(rs.next()) {
				 employee.setId(rs.getInt("id"));
				 employee.setName(rs.getString("name"));
				 employee.setDob(rs.getString("dob"));
				 employee.setDepartment(rs.getString("department"));
				 employee.setHired(rs.getInt("hired") != 0 ? true : false);
				return employee;
			}
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
		
		
	}
	//them employee
	public boolean insertEmployee(Employee employee,String id) {
		try (Connection connection = getConnection();
			PreparedStatement ps = connection.prepareStatement("INSERT INTO employee (id,name, dob, department, hired) VALUES (?,?, ?, ?, ?)");)
		{	
			ps.setInt(1, employee.getId());
			ps.setString(2, employee.getName());
			ps.setString(3, employee.getDob());
			ps.setString(4, employee.getDepartment());
			ps.setInt(5, employee.isHired() ? 1 : 0);

			int rowsInserted = ps.executeUpdate();
			return (rowsInserted > 0);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return false;
	}
	//update employee
	public boolean updateEmployee(Employee employee) {
	    try (Connection connection = getConnection();
	         PreparedStatement ps = connection.prepareStatement("UPDATE employee SET name=?, dob=?, department=?, hired=? WHERE id=?");)
	    {
	        ps.setString(1, employee.getName());
	        ps.setString(2, employee.getDob());
	        ps.setString(3, employee.getDepartment());
	        ps.setInt(4, employee.isHired() ? 1 : 0);
	        ps.setInt(5, employee.getId());

	        int rowsUpdated = ps.executeUpdate();
	        return (rowsUpdated > 0);
	    } catch (Exception e) {
	        // TODO: handle exception
	    }
	    return false;
	}

	
}
