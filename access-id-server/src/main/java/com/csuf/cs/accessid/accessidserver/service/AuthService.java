package com.csuf.cs.accessid.accessidserver.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csuf.cs.accessid.accessidserver.model.Employee;
import com.csuf.cs.accessid.accessidserver.repository.EmployeeRepository;
import com.csuf.cs.accessid.accessidserver.util.IAuthUtil;
import com.csuf.cs.accessid.accessidserver.util.PasswordUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AuthService implements IAuthService {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private IAuthUtil iAuthUtil;

	@Override
	public Map<String, Object> employeeLogin(String email, String password) {
		Employee employee = employeeRepository.findEmployeeByEmailWithPassword(email);
		if (PasswordUtil.verifyPassword(employee.getPassword(), password)) {
			String token = iAuthUtil.createAuthToken(employee);

			Map<String, Object> response = new HashMap<>();
			response.put("token", token);

			ObjectMapper mapper = new ObjectMapper();
			Map<?, ?> objMap = mapper.convertValue(employee, Map.class);
			objMap.remove("password");
			response.put("employee", objMap);
			return response;
		} else {
			Map<String, Object> response = new HashMap<>();
			response.put("error", "Invalid emailId/password, please try again!");
			return response;
		}
	}

}
