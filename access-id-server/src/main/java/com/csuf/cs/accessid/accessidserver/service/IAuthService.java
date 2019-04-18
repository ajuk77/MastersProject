package com.csuf.cs.accessid.accessidserver.service;

import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public interface IAuthService {

	public Map<String, Object> employeeLogin(String email, String password);

}
