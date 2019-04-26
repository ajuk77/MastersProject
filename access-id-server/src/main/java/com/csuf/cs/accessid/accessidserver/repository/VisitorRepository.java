package com.csuf.cs.accessid.accessidserver.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.csuf.cs.accessid.accessidserver.model.Visitor;

public interface VisitorRepository extends CrudRepository<Visitor, Integer> {

	@Query("SELECT u FROM Visitor u WHERE LOWER(u.uuid) = LOWER(:unique_id)")
	public Visitor findVisitorByUniqueId(@Param("unique_id") String unique_id);
	
	@Query("SELECT u FROM Visitor u WHERE LOWER(u.employeeId) = LOWER(:emp_id)")
	public List<Visitor> findVisitorByEmployeeId(@Param("emp_id") long emp_id);
}
