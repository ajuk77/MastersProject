package com.csuf.cs.accessid.accessidserver.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.csuf.cs.accessid.accessidserver.model.Employee;
import com.csuf.cs.accessid.accessidserver.service.IEmployeeService;
import com.csuf.cs.accessid.accessidserver.util.PasswordUtil;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

	@Autowired
	private IEmployeeService employeeService;

	@RequestMapping
	public @ResponseBody ResponseEntity<List<Employee>> getAllEmployees() {
		List<Employee> employees = employeeService.getAllEmployees();
		return (employees != null) ? new ResponseEntity<List<Employee>>(employees, HttpStatus.ACCEPTED)
				: new ResponseEntity<List<Employee>>(HttpStatus.BAD_REQUEST);

	}

	@PostMapping
	public @ResponseBody ResponseEntity<Map<String, Object>> createUser(@RequestBody Map<String, Object> payload) {

		try {
			String firstName = payload.get("firstName").toString();
			String lastName = payload.get("lastName").toString();
			String password = PasswordUtil.hashPassword(payload.get("password").toString());
			String contactNo = payload.get("contactNo").toString();
			String email = payload.get("email").toString();
			Employee newEmployee = new Employee(firstName, lastName, email, contactNo, password);
			Map<String, Object> response = employeeService.createEmployee(newEmployee);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);

		} catch (DataIntegrityViolationException exception) {
			exception.printStackTrace();
			Map<String, Object> error = new HashMap<>();
			error.put("error", "An employee with the same email address already exists.");
			return new ResponseEntity<Map<String, Object>>(error, HttpStatus.CONFLICT);

		} catch (Exception exception) {
			exception.printStackTrace();
			Map<String, Object> error = new HashMap<>();
			error.put("error", "Employee Creation Failed, Try again.");
			return new ResponseEntity<Map<String, Object>>(error, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}
