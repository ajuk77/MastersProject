package com.csuf.cs.accessid.accessidserver.util;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.csuf.cs.accessid.accessidserver.model.Employee;
import com.csuf.cs.accessid.accessidserver.repository.EmployeeRepository;

@Component
public class AuthUtil implements IAuthUtil, Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 9158167447051644377L;

	@Value("${app.secret}")
	private String secret;
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	public String createAuthToken(Employee employee) {
		Algorithm algorithm = Algorithm.HMAC256(secret);
		try {
			Date date = new Date();
			Calendar c = Calendar.getInstance();
			c.setTime(date);
			c.add(Calendar.DATE, 1);
			String token = JWT.create()
								.withClaim("employeeId", employee.getId())
								.withClaim("employeeEmail", employee.getEmail())
								.withIssuer("accessidserver")
								.withExpiresAt(c.getTime())
								.sign(algorithm);
			return token;
		} catch(JWTCreationException jwte) {
			jwte.printStackTrace();
			return null;
		}
	}
	
	public boolean verifyAuthToken(String token) {
		Algorithm algorithmHS = Algorithm.HMAC256(secret);
		try {
			JWTVerifier verifier = JWT.require(algorithmHS)
										.withIssuer("accessidserver")
										.acceptExpiresAt(5)
										.build();
			DecodedJWT jwt = verifier.verify(token);
			return true;
		} catch(JWTVerificationException exception) {
			exception.printStackTrace();
			return false;
		}
	}
}
