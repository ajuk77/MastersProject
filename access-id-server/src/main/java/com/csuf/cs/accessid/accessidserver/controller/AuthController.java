package com.csuf.cs.accessid.accessidserver.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.csuf.cs.accessid.accessidserver.service.IAuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private IAuthService authService;

	@PostMapping("/login")
	public @ResponseBody ResponseEntity<Map<String, Object>> employeeLogin(@RequestBody Map<String, Object> request) {
		try {
			String email = request.get("email").toString();
			String password = request.get("password").toString();
			Map<String, Object> response = authService.employeeLogin(email, password);
			if (!response.containsKey("error")) {
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.ACCEPTED);
			} else {
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.UNAUTHORIZED);
			}

		} catch (Exception e) {
			e.printStackTrace();
			Map<String, Object> response = new HashMap<>();
			response.put("error", "Something went wrong, please try again!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}

}
