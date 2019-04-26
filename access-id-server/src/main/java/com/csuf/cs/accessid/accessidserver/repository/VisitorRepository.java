package com.csuf.cs.accessid.accessidserver.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.csuf.cs.accessid.accessidserver.model.Visitor;

public interface VisitorRepository extends CrudRepository<Visitor, Integer> {

	@Query("SELECT u FROM Visitor u WHERE LOWER(u.unique_id) = LOWER(:unique_id)")
	public Visitor findVisitorByUniqueId(@Param("unique_id") String unique_id);
}
