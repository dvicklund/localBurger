package com.localburger.form;

import java.util.Date;

import com.googlecode.objectify.annotation.Index;

/**
 * Pojo representing a profile form on the client side.
 */
public class EventForm {
    /**
     * Any string user wants us to display him/her on this system.
     */
    private String name;
    
    private String description;

    @Index 
    private Date date;


    private double startHour;
    
    private double durationHour;
    
    
    private EventForm() {}

    /**
     * Constructor for MenuItemType, solely for unit test.
     * @param displayName A String for displaying the user on this system.
     * @param notificationEmail An e-mail address for getting notifications from this system.
     */
    public EventForm(String name, String description, Date date, double startHour, double durationHour) {
        this.name = name;
        this.description = description;
        this.date = date == null ? null : new Date(date.getTime());
        this.startHour = startHour;
        this.durationHour = durationHour;
    }
    
    
    
    /**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
    /**
	 * @return the name
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
