package com.csuf.cs.accessid.accessidserver.service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csuf.cs.accessid.accessidserver.model.ScheduleAccessCard;
import com.csuf.cs.accessid.accessidserver.repository.EmployeeRepository;
import com.csuf.cs.accessid.accessidserver.repository.ScheduleAccessCardRepository;
import com.csuf.cs.accessid.accessidserver.util.IAuthUtil;

@Service
public class GenerateAccessCardService implements IGenerateAccessCardService{

	private Logger logger = LoggerFactory.getLogger(GenerateAccessCardService.class);

	@Autowired
	private IAuthUtil authUtil;
	
	@Autowired
	private ScheduleAccessCardRepository scheduleAccessCardRepository;
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Override
	public Map<String, Object> generateAccessCard(Map<String, Object> payload) {
		try {
			Map<String, Object> response = new HashMap<>();
			
			String email = payload.get("email").toString();
			long id = Long.valueOf(payload.get("id").toString());

			if(scheduleAccessCardRepository.getIdCard(id, "active").size() == 0) {
//			String token = payload.get("token").toString();
				//token is valid, and checked in controller itself
				String uuid = UUID.randomUUID().toString();

				long currentTime = System.currentTimeMillis();
				logger.info(String.valueOf(currentTime));
				long endTime = currentTime + 28800000;
				Timestamp startTimestamp = new Timestamp(currentTime);
				Timestamp endTimestamp = new Timestamp(endTime);

				ScheduleAccessCard accessCard = new ScheduleAccessCard(id, uuid, email, startTimestamp, endTimestamp, "active");
				scheduleAccessCardRepository.save(accessCard);

				response.put("uuid", uuid);
				response.put("email", email);
				//response.put("token", token);
				response.put("id", id);
				return response;
			} else {
				response.put("error", "Active ID card already present");
				return response;
			}
		}catch(Exception e) {
			e.printStackTrace();
			Map<String, Object> response = new HashMap<>();
			response.put("error", "Failed to generate access id, please try again!");
			return response;
		}
		
	}

}
