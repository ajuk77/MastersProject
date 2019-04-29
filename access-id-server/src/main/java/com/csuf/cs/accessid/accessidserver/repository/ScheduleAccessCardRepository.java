package com.csuf.cs.accessid.accessidserver.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.csuf.cs.accessid.accessidserver.model.ScheduleAccessCard;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScheduleAccessCardRepository extends CrudRepository<ScheduleAccessCard, Integer>{


    @Query("SELECT ac FROM ScheduleAccessCard ac WHERE ac.employeeId=:id and ac.state=:state and TYPE(ac) = ScheduleAccessCard")
    public List<ScheduleAccessCard> getIdCard(@Param("id") long id, @Param("state") String state);
    
    @Query("SELECT ac FROM ScheduleAccessCard ac WHERE LOWER(ac.uuid) = LOWER(:unique_id) and TYPE(ac) = ScheduleAccessCard")
    public ScheduleAccessCard findScheduleAccessCardByUniqueId(@Param("unique_id") String unique_id);

    @Query("SELECT ac FROM ScheduleAccessCard ac " +
            "WHERE ac.employeeId=:empID " +
            "and TYPE(ac) = ScheduleAccessCard ORDER BY ac.id DESC")
    public List<ScheduleAccessCard> findScheduleAccessCardByEmployeeId(@Param("empID") long empID);

}
