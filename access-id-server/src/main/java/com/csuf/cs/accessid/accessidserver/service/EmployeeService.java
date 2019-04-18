package com.csuf.cs.accessid.accessidserver.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.csuf.cs.accessid.accessidserver.model.Employee;
import com.csuf.cs.accessid.accessidserver.repository.EmployeeRepository;

@Service
public class EmployeeService implements IEmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Override
	public List<Employee> getAllEmployees() {
		List<Employee> employees = new ArrayList<Employee>();
		employeeRepository.findAll().forEach(employees::add);
		return employees;

	}

	@Override
	public Map<String, Object> createEmployee(Employee employee) throws DataIntegrityViolationException {
		Map<String, Object> response = new HashMap<String, Object>();
		employeeRepository.save(employee);
		response.put("success", true);
		response.put("employee", employee.toString());
		return response;
	}

}
