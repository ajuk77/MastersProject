package com.csuf.cs.accessid.accessidserver.service;

import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public interface IGenerateAccessCardService {
	
	public Map<String, Object> generateAccessCard(Map<String, Object> payload);
	
	public Map<String, Object> validateAccessCard(Map<String, Object> payload);

}
