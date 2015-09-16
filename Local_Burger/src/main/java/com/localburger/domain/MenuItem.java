package com.localburger.domain;

import java.util.ArrayList;
import java.util.List;

import com.google.appengine.repackaged.com.google.common.collect.ImmutableList;
import com.googlecode.objectify.annotation.Cache;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.localburger.form.MenuItemForm;
import com.localburger.form.MenuItemForm.MenuCourse;
import com.localburger.form.MenuItemForm.MenuType;


// TODO indicate that this class is an Entity
@Entity
@Cache
public class MenuItem {
    
    @Id 
    private long id;
    
    @Index
    private String name;
    
    private String description;
    
    @Index
    private MenuType menuType;
    
    @Index
    private MenuCourse menuCourse;
    
    @Index
    private boolean glutenFree;
    
    @Index
    private double price;
    
    private MenuItem(){}
    
    /**
     * Public constructor for MenuItem.
     * @param id The id, created to uniquely id
     * @param menuItemForm the MenuItemForm object passed through GUI
     * 
     */
    public MenuItem (long id, MenuItemForm menuItemForm) {
    	this.id = id;
    	this.name = menuItemForm.getName();
    	this.description = menuItemForm.getDescription();
    	this.menuType = menuItemForm.getMenuType();
    	this.menuCourse = menuItemForm.getMenuCourse();
    	this.glutenFree = menuItemForm.isGlutenFree();
    	this.price = menuItemForm.getPrice();
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
	/**
	 * @return the glutenFree
	 */
	public double getPrice() {
		return price;
	}
	
}
