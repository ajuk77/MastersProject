package com.csuf.cs.accessid.accessidserver.service;

import java.util.List;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;

import com.csuf.cs.accessid.accessidserver.model.Employee;

@Component
public interface IEmployeeService {

	public List<Employee> getAllEmployees();
	
	public Map<String, Object> createEmployee(Employee employee) throws DataIntegrityViolationException;
}
