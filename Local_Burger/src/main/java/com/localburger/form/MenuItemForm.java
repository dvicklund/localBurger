package com.localburger.form;

/**
 * Pojo representing a profile form on the client side.
 */
public class MenuItemForm {
    /**
     * Any string user wants us to display him/her on this system.
     */
    private String name;
    
    private String description;

    /**
     * Menu Type
     */
    private MenuType menuType;

    private MenuCourse menuCourse;
    
    private boolean glutenFree;
    
    private MenuItemForm() {}

    /**
     * Constructor for MenuItemType, solely for unit test.
     * @param displayName A String for displaying the user on this system.
     * @param notificationEmail An e-mail address for getting notifications from this system.
     */
    public MenuItemForm(String name, String description,MenuType menuType, MenuCourse menuCourse, boolean glutenFree) {
        this.name = name;
        this.description = description;
        this.menuType = menuType;
        this.menuCourse = menuCourse;
        this.glutenFree = glutenFree;
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
	/**
	 * @return the menuType
	 */
	public MenuType getMenuType() {
		return menuType;
	}

	/**
	 * @return the menuCourse
	 */
	public MenuCourse getMenuCourse() {
		return menuCourse;
	}

	/**
	 * @return the glutenFree
	 */
	public boolean isGlutenFree() {
		return glutenFree;
	}



	public static enum MenuType {
    	NOT_SPECIFIED,
        BRUNCH,
        DINNER,
        CATERING,
        HAPPY_HOUR
    }
    public static enum MenuCourse{
    	STARTERS,
    	SIDES,
    	SALADS,
    	BURGERS,
    	LOCAL_ADD_ONS,
    	COCKTAILS,
    	DESSERTS, 
    	FOOD,
    	DRINKS,
    	LIBATIONS,
    	MAINS,
    	SANDWICHES_AND_WRAPS,
    	PLATTERS
    }
}
