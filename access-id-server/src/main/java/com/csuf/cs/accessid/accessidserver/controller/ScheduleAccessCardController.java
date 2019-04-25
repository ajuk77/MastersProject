package com.csuf.cs.accessid.accessidserver.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.csuf.cs.accessid.accessidserver.service.IGenerateAccessCardService;
import com.csuf.cs.accessid.accessidserver.util.IAuthUtil;

@RestController
@RequestMapping("/api/generateid")
@CrossOrigin(origins = "*")
public class ScheduleAccessCardController {

	@Autowired
	private IAuthUtil authUtil;

	@Autowired
	private IGenerateAccessCardService generateAccessCardService;

	@PostMapping
	public @ResponseBody ResponseEntity<Map<String, Object>> generateAccessId(@RequestHeader("authorization") String jwt, 
			@RequestBody Map<String, Object> payload) {
		try {
			Map<String, Object> response = new HashMap<>();
			
			String email = payload.get("email").toString();
			long id = Long.valueOf(payload.get("id").toString());
			if (!authUtil.verifyAuthToken(jwt)) {
				response.put("error", "Access token is invalid");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.UNAUTHORIZED);
			}
			Map<String, Object> accessToken = generateAccessCardService.generateAccessCard(payload);
			if (accessToken.containsKey("error")) {
				return new ResponseEntity<Map<String, Object>>(accessToken, HttpStatus.UNAUTHORIZED);
			}
			return new ResponseEntity<Map<String, Object>>(accessToken, HttpStatus.ACCEPTED);

		} catch (Exception e) {
			Map<String, Object> response = new HashMap<>();
			response.put("error", "Something went wrong, please try again!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
