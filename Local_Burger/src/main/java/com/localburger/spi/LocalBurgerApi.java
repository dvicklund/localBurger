package com.localburger.spi;

import static com.localburger.service.OfyService.factory;
import static com.localburger.service.OfyService.ofy;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiMethod.HttpMethod;
import com.google.api.server.spi.config.Named;
import com.google.api.server.spi.response.ConflictException;
import com.google.api.server.spi.response.ForbiddenException;
import com.google.api.server.spi.response.NotFoundException;
import com.google.api.server.spi.response.UnauthorizedException;
import com.google.appengine.api.memcache.MemcacheService;
import com.google.appengine.api.memcache.MemcacheServiceFactory;
import com.google.appengine.api.taskqueue.Queue;
import com.google.appengine.api.taskqueue.QueueFactory;
import com.google.appengine.api.taskqueue.TaskOptions;
import com.google.appengine.api.users.User;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Work;
import com.googlecode.objectify.cmd.Query;
import com.localburger.Constants;
import com.localburger.domain.Conference;
import com.localburger.domain.Event;
import com.localburger.domain.MenuItem;
import com.localburger.domain.Profile;
import com.localburger.form.ConferenceForm;
import com.localburger.form.EventForm;
import com.localburger.form.MenuItemForm;
import com.localburger.form.ProfileForm;
import com.localburger.form.ProfileForm.TeeShirtSize;

/**
 * Defines localburger APIs.
 */
@Api(name = "localburger", version = "v1", scopes = { Constants.EMAIL_SCOPE }, clientIds = {
        Constants.WEB_CLIENT_ID, Constants.API_EXPLORER_CLIENT_ID }, description = "API for the local-burger  Backend application.")
public class LocalBurgerApi {
	/**
     * Creates a new MenuItem object and stores it to the datastore.
     *
     * @param user A user who invokes this method, null when the user is not signed in.
     * @param menuItemForm A MenuItemForm object representing user's inputs.
     * @return A newly created menuItem Object.
     * @throws UnauthorizedException when the user is not signed in.
     */
    @ApiMethod(
    		name = "createMenuItem", 
    		path = "createMenuItem", 
    		httpMethod = HttpMethod.POST)
    public MenuItem createMenuItem(final User user, final MenuItemForm menuItemForm)
        throws UnauthorizedException {
        if (user == null) {
            throw new UnauthorizedException("Authorization required");
        }
        final Key<MenuItem> menuItemKey = factory().allocateId(MenuItem.class);
        final long menuItemId = menuItemKey.getId();
        final Queue queue = QueueFactory.getDefaultQueue();
        
        // Start transactions
        MenuItem menuItem = ofy().transact(new Work<MenuItem>(){
        	@Override
        	public MenuItem run(){
        		MenuItem menuItem = new MenuItem(menuItemId, menuItemForm);
                ofy().save().entities(menuItem).now();
                
                return menuItem;
        	}
        }); 
        return menuItem;
    }
    /**
     * Queries the datastore for menuItems.
     *
     * @return A list of MenuItem objects
     * @throws UnauthorizedException when the user is not signed in.
     */
    @ApiMethod(
            name = "getMenuItems",
            path = "getMenuItems",
            httpMethod = HttpMethod.GET
    )
    public List<MenuItem> getMenuItems(){
    	Query<MenuItem> query = ofy().load().type(MenuItem.class);
    	return query.list();
    }
 /**
  * Creates a new MenuItem object and stores it to the datastore.
  *
  * @param user A user who invokes this method, null when the user is not signed in.
  * @param menuItemForm A MenuItemForm object representing user's inputs.
  * @return A newly created menuItem Object.
  * @throws UnauthorizedException when the user is not signed in.
  */
 @ApiMethod(
 		name = "createEvent", 
 		path = "createEvent", 
 		httpMethod = HttpMethod.POST)
 public Event createEvent(final User user, final EventForm eventForm)
     throws UnauthorizedException {
     if (user == null) {
         throw new UnauthorizedException("Authorization required");
     }
     final Key<Event> eventKey = factory().allocateId(Event.class);
     final long eventId = eventKey.getId();
     final Queue queue = QueueFactory.getDefaultQueue();
     
     // Start transactions
     Event event = ofy().transact(new Work<Event>(){
     	@Override
     	public Event run(){
     		Event event = new Event(eventId, eventForm);
             ofy().save().entities(event).now();
             
             return event;
     	}
     }); 
     return event;
 }
 /**
  * Queries the datastore for events.
  *
  * @return A list of Event objects
  * @throws UnauthorizedException when the user is not signed in.
  */
 @ApiMethod(
         name = "getEvents",
         path = "getEvents",
         httpMethod = HttpMethod.POST
 )
 public List<Event> getEvents(){
	 Date date = new Date();
	 Query<Event> query = ofy().load().type(Event.class).order("date");
	 return query.list();
 } 
 /**
  * Queries the datastore for events.
  *
  * @return A list of Event objects
  * @throws UnauthorizedException when the user is not signed in.
  */
 @ApiMethod(
         name = "getUpcomingEvents",
         path = "getUpcomingEvents",
         httpMethod = HttpMethod.POST
 )
 public List<Event> getUpcomingEvents(){
	 Date date = new Date();
	 System.out.println(date.toString());
	 Long time = new Date().getTime();
	 Date midnightDate = new Date(time - time % (60 * 60 * 60 * 1000));
	 System.out.println(midnightDate);

	 Query<Event> query = ofy().load().type(Event.class).filter("date >=", midnightDate).order("date");
	 return query.list();
}   
 

public static class WrappedResult{
	private final boolean isCreated;
	private final String message;
	public WrappedResult(boolean isCreated, String message) {
		this.isCreated = isCreated;
		this.message = message;
	}
	public boolean isCreated(){
		return isCreated;
	}
	public String getMessage(){
		return message;
	}
}
@ApiMethod(
		 name = "deleteMenuItem",
		 path = "deleteMenuItem",
		 httpMethod = HttpMethod.POST
		 )
public WrappedResult deleteMenuItem(User user, MenuItem m)
		throws UnauthorizedException {
  if (user == null) {
      throw new UnauthorizedException("Authorization required");
  }	
	long menuItemId = m.getId();
	System.out.println("\n\n" + m.getName() + "\n\n");
	if(m != null){
		ofy().delete().type(MenuItem.class).id(m.getId()).now();
		System.out.println("Deleted");
		return new WrappedResult(true, "SUCCESS: Menu Item deleted with id: " + menuItemId);
	}
	else{
		System.out.println("Not Deleted");
		return new WrappedResult(false, "FAILED: Menu Item not deleted with id: " + menuItemId);
	}
}


@ApiMethod(
		name = "updateMenuItem",
		path = "updateMenuItem",
		httpMethod = HttpMethod.POST
		)
public MenuItem updateMenuItem(User user, MenuItem m) throws UnauthorizedException {
	if(user == null){
		throw new UnauthorizedException("Authorization Required");
	}
	MenuItem menuItemUpdating = ofy().load().type(MenuItem.class).id(m.getId()).now();
	if(menuItemUpdating != null){
		menuItemUpdating.updateMenuItem(m);
		ofy().save().entity(menuItemUpdating).now();
		System.out.println("MenuItem updated");
	}
	return menuItemUpdating;
}

@ApiMethod(
		 name = "deleteEvent",
		 path = "deleteEvent",
		 httpMethod = HttpMethod.POST
		 )
public WrappedResult deleteEvent(User user, Event e)
		throws UnauthorizedException {
   if (user == null) {
       throw new UnauthorizedException("Authorization required");
   }	
	long eventId = e.getId();
	System.out.println("\n\n" + e.getName() + "\n\n");
	if(e != null){
		ofy().delete().type(Event.class).id(e.getId()).now();
		return new WrappedResult(true, "SUCCESS: Event deleted with id: " + eventId);
	}
	else{
		return new WrappedResult(false, "FAILED: Event not deleted with id: " + eventId);
	}
}


@ApiMethod(
		name = "updateEvent",
		path = "updateEvent",
		httpMethod = HttpMethod.POST
		)
public Event updateEvent(User user, Event e) throws UnauthorizedException {
	if(user == null){
		throw new UnauthorizedException("Authorization Required");
	}
	Event eventUpdating = ofy().load().type(Event.class).id(e.getId()).now();
	if(eventUpdating != null){
		eventUpdating.updateEvent(e);
		ofy().save().entity(eventUpdating).now();
	}
	return eventUpdating;
}
}