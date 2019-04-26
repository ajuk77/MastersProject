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

import com.csuf.cs.accessid.accessidserver.repository.VisitorRepository;
import com.csuf.cs.accessid.accessidserver.service.IVisitorService;
import com.csuf.cs.accessid.accessidserver.util.IAuthUtil;

@RestController
@RequestMapping("/api/visitor")
@CrossOrigin(origins = "*")
public class VisitorController {

	@Autowired
	private IVisitorService visitorService;

	@Autowired
	private IAuthUtil authUtil;

	@PostMapping
	public @ResponseBody ResponseEntity<Map<String, Object>> createVisitor(@RequestHeader("authorization") String jwt,
			@RequestBody Map<String, Object> payload) {
		try {
			Map<String, Object> response = new HashMap<>();

			if (!authUtil.verifyAuthToken(jwt)) {
				response.put("error", "Access token is invalid");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.UNAUTHORIZED);
			}
			Map<String, Object> visitorPass = visitorService.generateVisitorPass(payload);
			if (visitorPass.containsKey("error")) {
				return new ResponseEntity<Map<String, Object>>(visitorPass, HttpStatus.UNAUTHORIZED);
			}

			return new ResponseEntity<Map<String, Object>>(visitorPass, HttpStatus.ACCEPTED);

		} catch (Exception e) {
			Map<String, Object> response = new HashMap<>();
			response.put("error", "Something went wrong, please try again!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/validatepass")
	public @ResponseBody ResponseEntity<Map<String, Object>> validateVisitor(@RequestHeader("authorization") String jwt,
			@RequestBody Map<String, Object> payload) {
		try {
			Map<String, Object> response = new HashMap<>();
			if (!authUtil.verifyAuthToken(jwt)) {
				response.put("error", "Access token is invalid");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.UNAUTHORIZED);
			}
			Map<String, Object> visitorPass = visitorService.validateVisitorPass(payload);
			if (visitorPass.containsKey("error") || visitorPass.containsKey("invalid")) {
				return new ResponseEntity<Map<String, Object>>(visitorPass, HttpStatus.UNAUTHORIZED);
			}
			return new ResponseEntity<Map<String, Object>>(visitorPass, HttpStatus.ACCEPTED);
		} catch (Exception e) {
			Map<String, Object> response = new HashMap<>();
			response.put("error", "Something went wrong, please try again!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@RequestMapping
	public @ResponseBody ResponseEntity<Map<String, Object>> getAllVisitorsOfEmployee(
			@RequestHeader("authorization") String jwt, @RequestBody Map<String, Object> payload) {
		try {
			Map<String, Object> response = new HashMap<>();
			if (!authUtil.verifyAuthToken(jwt)) {
				response.put("error", "Access token is invalid");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.UNAUTHORIZED);
			}
			Map<String, Object> visitorsMap = visitorService.getAllVisitorsOfEmployee(payload);
			if (visitorsMap.containsKey("error")) {
				return new ResponseEntity<Map<String, Object>>(visitorsMap, HttpStatus.UNAUTHORIZED);
			}
			return new ResponseEntity<Map<String, Object>>(visitorsMap, HttpStatus.ACCEPTED);
		} catch (Exception e) {
			Map<String, Object> response = new HashMap<>();
			response.put("error", "Something went wrong, please try again!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}
