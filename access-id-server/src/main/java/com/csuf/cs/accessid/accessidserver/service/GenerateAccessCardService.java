package com.csuf.cs.accessid.accessidserver.service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.csuf.cs.accessid.accessidserver.model.ScheduleAccessCard;
import com.csuf.cs.accessid.accessidserver.model.Visitor;
import com.csuf.cs.accessid.accessidserver.repository.EmployeeRepository;
import com.csuf.cs.accessid.accessidserver.repository.ScheduleAccessCardRepository;
import com.csuf.cs.accessid.accessidserver.util.IAuthUtil;

@Service
public class GenerateAccessCardService implements IGenerateAccessCardService {

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

			if (scheduleAccessCardRepository.getIdCard(id, "active").size() == 0) {
//			String token = payload.get("token").toString();
				// token is valid, and checked in controller itself
				String uuid = UUID.randomUUID().toString();

				long currentTime = System.currentTimeMillis();
				logger.info(String.valueOf(currentTime));
				long endTime = currentTime + 28800000;
				Timestamp startTimestamp = new Timestamp(currentTime);
				Timestamp endTimestamp = new Timestamp(endTime);

				ScheduleAccessCard accessCard = new ScheduleAccessCard(id, uuid, email, startTimestamp, endTimestamp,
						"active");
				scheduleAccessCardRepository.save(accessCard);

				response.put("uuid", uuid);
				response.put("email", email);
				// response.put("token", token);
				response.put("id", id);
				return response;
			} else {
				response.put("error", "Active ID card already present");
				return response;
			}
		} catch (Exception e) {
			e.printStackTrace();
			Map<String, Object> response = new HashMap<>();
			response.put("error", "Failed to generate access id, please try again!");
			return response;
		}

	}

	@Override
	public Map<String, Object> validateAccessCard(Map<String, Object> payload) {
		try {
			Map<String, Object> response = new HashMap<>();
			String uuid = payload.get("uuid").toString();
			if (null == uuid || uuid.isEmpty()) {
				response.put("error", "UUID is missing");
				return response;
			}
			ScheduleAccessCard scheduleAccessCard = scheduleAccessCardRepository.findScheduleAccessCardByUniqueId(uuid);
			if (null == scheduleAccessCard) {
				response.put("invalid", "Access card with uuid = " + uuid + " not found");
				return response;
			}
			long currentTime = System.currentTimeMillis();
			Timestamp currentTimestamp = new Timestamp(currentTime);
			if (currentTimestamp.before(scheduleAccessCard.getActivationEndTime())
					&& currentTimestamp.after(scheduleAccessCard.getActivationStartTime())) {
				response.put("success", true);
				response.put("visitor", scheduleAccessCard);
				return response;
			} else {
				response.put("invalid", "Visitor pass has been expired");
				return response;
			}
		} 
		catch (Exception e) {
			Map<String, Object> response = new HashMap<>();
			response.put("error", "Something went wrong, please try again!");
			return response;
		}
	}

	@Override
	public Map<String, Object> getEmployeeIdDetails(long empId) {
		Map<String, Object> response = new HashMap<>();
		try {
//			Sort sort = new Sort(new Sort.Order(Sort.Direction.DESC, "employeeId"));
//			Pageable pageable = new PageRequest(0, 1);
			List<ScheduleAccessCard> scheduleAccessCard =
					scheduleAccessCardRepository.findScheduleAccessCardByEmployeeId(empId);

//			Get only first record. We only want the last ID record.
			ScheduleAccessCard sac = scheduleAccessCard.get(0);
//			Get current time and compare with time in record...
			long currTime = System.currentTimeMillis();
			Timestamp ts = new Timestamp(currTime);
			if(sac.getActivationStartTime().before(ts) && sac.getActivationEndTime().after(ts)) {
				sac.setState("active");
			} else sac.setState("inactive");
			response.put("employee", sac);
			return response;
		} catch(Exception e) {
			response.put("error", "Something went wrong, try again in some time.");
			return response;
		}
	}

}
