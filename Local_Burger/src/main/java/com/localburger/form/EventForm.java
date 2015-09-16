package com.localburger.form;

/**
 * Pojo representing a profile form on the client side.
 */
public class EventForm {
    /**
     * Any string user wants us to display him/her on this system.
     */
    private String name;
    
    private String description;

    
    private EventForm() {}

    /**
     * Constructor for MenuItemType, solely for unit test.
     * @param displayName A String for displaying the user on this system.
     * @param notificationEmail An e-mail address for getting notifications from this system.
     */
    public EventForm(String name, String description) {
        this.name = name;
        this.description = description;
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

}
