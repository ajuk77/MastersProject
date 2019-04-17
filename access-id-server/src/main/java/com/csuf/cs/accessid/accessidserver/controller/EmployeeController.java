package com.csuf.cs.accessid.accessidserver.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.csuf.cs.accessid.accessidserver.model.Employee;
import com.csuf.cs.accessid.accessidserver.service.IEmployeeService;

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

}
