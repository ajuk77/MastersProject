package com.csuf.cs.accessid.accessidserver.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.csuf.cs.accessid.accessidserver.model.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Integer> {

	@Query("SELECT u.id, u.firstName, u.lastName, u.email, u.contactNo FROM Employee u WHERE LOWER(u.email) = LOWER(:email)")
	public Employee findEmployeeByEmail(@Param("email") String email);

	@Query("SELECT u FROM Employee u WHERE LOWER(u.email) = LOWER(:email)")
	public Employee findEmployeeByEmailWithPassword(@Param("email") String email);

}
