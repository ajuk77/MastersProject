package com.csuf.cs.accessid.accessidserver.service;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csuf.cs.accessid.accessidserver.model.Visitor;
import com.csuf.cs.accessid.accessidserver.repository.VisitorRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class VisitorService implements IVisitorService {

	@Autowired
	private VisitorRepository visitorRepository;

	@Override
	public Map<String, Object> generateVisitorPass(Map<String, Object> payload) {
		// TODO Auto-generated method stub
		// Here it is assumed that the token is valid
		// need to handle two cases: 1. If already generated token then return the same
		// token, 2. Generate New
		/*
		 * long employeeId, String uuid, String email, Timestamp activationStartTime,
		 * Timestamp activationEndTime, String state, String firstName, String lastName,
		 * String contactNo, String visitorEmail
		 */
		try {
			Map<String, Object> response = new HashMap<>();
			String uuid = UUID.randomUUID().toString();
			long employeeId = Long.valueOf(payload.get("employeeId").toString());
			String employeeEmail = payload.get("email").toString();
			long currentTime = System.currentTimeMillis();
			long endTime = currentTime + 28800000;
			Timestamp startTimestamp = new Timestamp(currentTime);
			Timestamp endTimestamp = new Timestamp(endTime);
			String state = "active";
			String firstName = payload.get("firstName").toString();
			String lastName = payload.get("lastName").toString();
			String contactNo = payload.get("contactNo").toString();
			String visitorEmail = payload.get("visitorEmail").toString();

			Visitor visitor = new Visitor(employeeId, uuid, employeeEmail, startTimestamp, endTimestamp, state,
					firstName, lastName, contactNo, visitorEmail);
			visitor = visitorRepository.save(visitor);
			response.put("visitor", visitor);
			response.put("success", true);
			return response;
		} catch (Exception e) {
			Map<String, Object> response = new HashMap<>();
			response.put("error", "Something went wrong, please try again!");
			return response;
		}

	}

	@Override
	public Map<String, Object> validateVisitorPass(Map<String, Object> payload) {
		try {
			Map<String, Object> response = new HashMap<>();
			String uuid = payload.get("uuid").toString();
			if (null == uuid || uuid.isEmpty()) {
				response.put("error", "UUID is missing");
				return response;
			}
			Visitor visitor = visitorRepository.findVisitorByUniqueId(uuid);
			if (null == visitor) {
				response.put("invalid", "Visitor with uuid = " + uuid + " + not found");
			}
			long currentTime = System.currentTimeMillis();
			Timestamp currentTimestamp = new Timestamp(currentTime);
			if (currentTimestamp.before(visitor.getActivationEndTime())
					&& currentTimestamp.after(visitor.getActivationStartTime())) {
				response.put("success", true);
				response.put("visitor", visitor);
				return response;
			} else {
				response.put("invalid", "Visitor pass has been expired");
				return response;
			}
		} catch (Exception e) {
			Map<String, Object> response = new HashMap<>();
			response.put("error", "Something went wrong, please try again!");
			return response;
		}
	}

	@Override
	public Map<String, Object> getAllVisitorsOfEmployee(Map<String, Object> payload) {
		try {
			Map<String, Object> response = new HashMap<>();
			long employeeId = Long.valueOf(payload.get("employeeId").toString());
			List<Visitor> visitors = visitorRepository.findVisitorByEmployeeId(employeeId);

			response.put("visitor", visitors);
			response.put("success", true);
			return response;
		}catch(Exception e) {
			Map<String, Object> response = new HashMap<>();
			response.put("error", "Something went wrong, please try again!");
			return response;
		}
	}

}
