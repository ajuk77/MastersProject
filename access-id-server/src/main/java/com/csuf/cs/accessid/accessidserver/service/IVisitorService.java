package com.csuf.cs.accessid.accessidserver.service;

import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public interface IVisitorService {
	
	public Map<String, Object> generateVisitorPass(Map<String, Object> payload);

}
