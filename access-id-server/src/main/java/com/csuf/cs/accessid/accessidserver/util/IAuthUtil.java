package com.csuf.cs.accessid.accessidserver.util;

import org.springframework.stereotype.Component;

import com.csuf.cs.accessid.accessidserver.model.Employee;

@Component
public interface IAuthUtil {

	public String createAuthToken(Employee employee);

	public boolean verifyAuthToken(String token);
}
