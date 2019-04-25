package com.csuf.cs.accessid.accessidserver.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "visitor")
public class Visitor extends ScheduleAccessCard {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4103767179645150067L;

	@Column(name = "first_name", nullable = false)
	private String firstName;

	@Column(name = "last_name", nullable = false)
	private String lastName;

	@Column(name = "contact_no")
	private String contactNo;

	@Column(name = "visitor_email")
	private String visitorEmail;

	public Visitor() {
		super();
	}

	public Visitor(long employeeId, String uuid, String email, Timestamp activationStartTime,
			Timestamp activationEndTime, String state, String firstName, String lastName, String contactNo,
			String visitorEmail) {
		super(employeeId, uuid, email, activationStartTime, activationEndTime, state);
		this.firstName = firstName;
		this.lastName = lastName;
		this.contactNo = contactNo;
		this.visitorEmail = visitorEmail;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public String getVisitorEmail() {
		return visitorEmail;
	}

	public void setVisitorEmail(String visitorEmail) {
		this.visitorEmail = visitorEmail;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "{id=" + this.getId() + ", employeeId=" + this.getEmployeeId() + ", uuid=" + this.getUuid() + ", email="
				+ this.getEmail() + ", activationStartTime=" + this.getActivationStartTime() + ", activationEndTime="
				+ this.getActivationEndTime() + ", state=" + this.getState() + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", contactNo=" + contactNo + ", visitorEmail=" + visitorEmail + "}";
	}

}
