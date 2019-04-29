package com.csuf.cs.accessid.accessidserver.util;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Component;

@Component
public class PasswordUtil {
	
	public static String hashPassword(String password) {
		return BCrypt.hashpw(password, BCrypt.gensalt());
	}
	
	public static boolean verifyPassword(String password, String candidatePassword) {
		return BCrypt.checkpw(candidatePassword, password);
	}

}
