package com.localburger.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.appengine.repackaged.com.google.common.collect.ImmutableList;
import com.googlecode.objectify.annotation.Cache;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.localburger.form.EventForm;



// TODO indicate that this class is an Entity
@Entity
@Cache
public class Event {
    
    @Id 
    private long id;
    
    @Index 
    private Date date;
        
    @Index
    private double startHour;
    
    private double durationHour;
    
    @Index
    private String name;
    
    private String description;
    
    
    private Event(){}
    
    /**
     * Public constructor for MenuItem.
     * @param id The id, created to uniquely id
     * @param menuItemForm the MenuItemForm object passed through GUI
     * 
     */
    public Event (long id, EventForm eventForm) {
    	this.id = id;
    	this.name = eventForm.getName();
    	this.description = eventForm.getDescription();
    	this.date = eventForm.getDate();
    	this.durationHour = eventForm.getDurationHour();
    	this.startHour = eventForm.getDurationHour();
    			
    }

	/**
	 * @return the id
	 */
	public long getId() {
		return id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}
	public Date getDate(){
		return date;
	}
	public double getStartHour(){
		return startHour;
	}
	public double getDurationHour(){
		return durationHour;
	}
}
