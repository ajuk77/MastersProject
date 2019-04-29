package com.csuf.cs.accessid.accessidserver.model;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

@Entity
@Table(name = "schedule_access_card")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class ScheduleAccessCard implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2061555684494980878L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private long id;

	@Column(name = "emp_id", nullable = false)
	private long employeeId;

	@Column(name = "unique_id", nullable = false)
	private String uuid;

	@Column(name = "emp_email", nullable = false)
	private String email;

	@Column(name = "activation_start_time", nullable = false)
	private Timestamp activationStartTime;

	@Column(name = "activation_end_time", nullable = false)
	private Timestamp activationEndTime;

	@Column(name = "state", nullable = false)
	private String state;

	public ScheduleAccessCard() {
		super();
	}

	public ScheduleAccessCard(long employeeId, String uuid, String email, Timestamp activationStartTime,
			Timestamp activationEndTime, String state) {
		super();
		this.employeeId = employeeId;
		this.uuid = uuid;
		this.email = email;
		this.activationStartTime = activationStartTime;
		this.activationEndTime = activationEndTime;
		this.state = state;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(long employeeId) {
		this.employeeId = employeeId;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Timestamp getActivationStartTime() {
		return activationStartTime;
	}

	public void setActivationStartTime(Timestamp activationStartTime) {
		this.activationStartTime = activationStartTime;
	}

	public Timestamp getActivationEndTime() {
		return activationEndTime;
	}

	public void setActivationEndTime(Timestamp activationEndTime) {
		this.activationEndTime = activationEndTime;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

}
