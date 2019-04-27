package com.csuf.cs.accessid.accessidserver.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.csuf.cs.accessid.accessidserver.model.ScheduleAccessCard;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScheduleAccessCardRepository extends CrudRepository<ScheduleAccessCard, Integer>{


    @Query("SELECT ac FROM ScheduleAccessCard ac WHERE ac.employeeId=:id and ac.state=:state")
    public List<ScheduleAccessCard> getIdCard(@Param("id") long id, @Param("state") String state);
    
    @Query("SELECT ac FROM ScheduleAccessCard ac WHERE LOWER(ac.uuid) = LOWER(:unique_id)")
    public ScheduleAccessCard findScheduleAccessCardByUniqueId(@Param("unique_id") String unique_id);

}
