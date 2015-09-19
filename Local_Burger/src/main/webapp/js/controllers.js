'use strict';

/**
 * The root localBurgerApp module.
 *
 * @type {localBurgerApp|*|{}}
 */
var localburgerApp = localburgerApp || {};

/**
 * @ngdoc module
 * @name localburgerControllers
 *
 * @description
 * Angular module for controllers.
 *
 */
localburgerApp.controllers = angular.module('localburgerControllers', ['ui.bootstrap']);

/**
 * @ngdoc controller
 * @name MyProfileCtrl
 *
 * @description
 * A controller used for the My Profile page.
 */
localburgerApp.controllers.controller('MyProfileCtrl',
    function ($scope, $log, oauth2Provider, HTTP_ERRORS) {
        $scope.submitted = false;
        $scope.loading = false;

        /**
         * The initial profile retrieved from the server to know the dirty state.
         * @type {{}}
         */
        $scope.initialProfile = {};

        /**
         * Candidates for the teeShirtSize select box.
         * @type {string[]}
         */
        $scope.teeShirtSizes = [
            'XS',
            'S',
            'M',
            'L',
            'XL',
            'XXL',
            'XXXL'
        ];

        /**
         * Initializes the My profile page.
         * Update the profile if the user's profile has been stored.
         */
        $scope.init = function () {
            var retrieveProfileCallback = function () {
                $scope.profile = {};
                $scope.loading = true;
                gapi.client.conference.getProfile().
                    execute(function (resp) {
                        $scope.$apply(function () {
                            $scope.loading = false;
                            if (resp.error) {
                                // Failed to get a user profile.
                            } else {
                                // Succeeded to get the user profile.
                                $scope.profile.displayName = resp.result.displayName;
                                $scope.profile.teeShirtSize = resp.result.teeShirtSize;
                                $scope.initialProfile = resp.result;
                            }
                        });
                    }
                );
            };
            if (!oauth2Provider.signedIn) {
                var modalInstance = oauth2Provider.showLoginModal();
                modalInstance.result.then(retrieveProfileCallback);
            } else {
                retrieveProfileCallback();
            }
        };

        /**
         * Invokes the conference.saveProfile API.
         *
         */
        $scope.saveProfile = function () {
            $scope.submitted = true;
            $scope.loading = true;
            gapi.client.conference.saveProfile($scope.profile).
                execute(function (resp) {
                    $scope.$apply(function () {
                        $scope.loading = false;
                        if (resp.error) {
                            // The request has failed.
                            var errorMessage = resp.error.message || '';
                            $scope.messages = 'Failed to update a profile : ' + errorMessage;
                            $scope.alertStatus = 'warning';
                            $log.error($scope.messages + 'Profile : ' + JSON.stringify($scope.profile));

                            if (resp.code && resp.code == HTTP_ERRORS.UNAUTHORIZED) {
                                oauth2Provider.showLoginModal();
                                return;
                            }
                        } else {
                            // The request has succeeded.
                            $scope.messages = 'The profile has been updated';
                            $scope.alertStatus = 'success';
                            $scope.submitted = false;
                            $scope.initialProfile = {
                                displayName: $scope.profile.displayName,
                                teeShirtSize: $scope.profile.teeShirtSize
                            };

                            $log.info($scope.messages + JSON.stringify(resp.result));
                        }
                    });
                });
        };
    });

/**
 * @ngdoc controller
 * @name ReservationCtl
 *
 * @description
 * A controller used for the Create conferences page.
 */
localburgerApp.controllers.controller('ReservationCtl',
    function ($scope, $log, oauth2Provider, HTTP_ERRORS) {

        /**
         * The conference object being edited in the page.
         * @type {{}|*}
         */
        $scope.reservation = $scope.reservation || {};
});

/**
 * @ngdoc controller
 * @name MenuCtl
 *
 * @description
 * A controller used for the Create conferences page.
 */
localburgerApp.controllers.controller('EventsCtl',
    function ($scope, $log, oauth2Provider, HTTP_ERRORS) {

        /**
         * The event object being displayed on the page.
         * @type {{}|*}
         */
        $scope.events = $scope.events || {};
        
        /**
         * Invokes the localburger. API.
         */
        $scope.queryEventsAll = function () {
            $scope.loading = true;
            gapi.client.localburger.getUpcomingEvents().
                execute(function (resp) {
                    $scope.$apply(function () {
                        $scope.loading = false;
                        if (resp.error) {
                            // The request has failed.
                            var errorMessage = resp.error.message || '';
                            $scope.messages = 'Failed to query menuItems : ' + errorMessage;
                            $scope.alertStatus = 'warning';
                        } else {
                            // The request has succeeded.
                            $scope.submitted = false;
                            $scope.messages = 'Query succeeded : ' + 
                            resp.items;
                            $scope.alertStatus = 'success';
                            $log.info($scope.messages);

                            $scope.events = [];
                            angular.forEach(resp.items, function (event) {
                                $scope.events.push(event);
                            });
                        }
                        $scope.submitted = true;
                    });
                });
        	};
        	angular.element(document).ready(function () {
    	            $scope.queryEventsAll();
    		});
});

/**
 * @ngdoc controller
 * @name EventsCtl
 *
 * @description
 * A controller used for the Create conferences page.
 */
localburgerApp.controllers.controller('MenuCtl',
    function ($scope, $log, oauth2Provider, HTTP_ERRORS) {

		
        $scope.loading = false;
        
        $scope.menuItems = {};
        		
        
        $scope.getBrunch = function () {
            $scope.selectedTab = 'BRUNCH';
        };

        /**
         * Sets the selected tab to 'YOU_HAVE_CREATED'
         */
        $scope.getHappyHour = function () {
            $scope.selectedTab = 'HAPPYHOUR';
        };
        
        $scope.getDinner = function () {
            $scope.selectedTab = 'DINNER';
        };

        /**
         * Sets the selected tab to 'YOU_HAVE_CREATED'
         */
        $scope.getCatering = function () {
            $scope.selectedTab = 'CATERING';
        };

        $scope.init = function(){
        	$scope.loading = true;
        	$scope.menuItems = [];
        	gapi.client.localburger.getMenuItems().
              	execute(function (resp) {
              		$scope.$apply(function () {
              			$scope.loading = false;
              			if (resp.error) {
              				// Failed to get a user profile.
              			} else {
              				$scope.menuItems = [];
              				angular.forEach(resp.items, function (menuItem) {
              					$scope.menuItems.push(menuItem);
              				});
              			}
              		});
              	});      
        }
});


/**
 * @ngdoc controller
 * @name ContactCtl
 *
 * @description
 * A controller used for the Create conferences page.
 */
localburgerApp.controllers.controller('ContactCtl',
    function ($scope, $log, oauth2Provider, HTTP_ERRORS) {

        /**
         * The conference object being edited in the page.
         * @type {{}|*}
         */
        $scope.contact = $scope.contact || {};
});
/**
 * @ngdoc controller
 * @name RootCtrl
 *
 * @description
 * The root controller having a scope of the body element and methods used in the application wide
 * such as user authentications.
 *
 */
localburgerApp.controllers.controller('RootCtrl', function ($scope, $location, oauth2Provider) {

    /**
     * Returns if the viewLocation is the currently viewed page.
     *
     * @param viewLocation
     * @returns {boolean} true if viewLocation is the currently viewed page. Returns false otherwise.
     */
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    /**
     * Returns the OAuth2 signedIn state.
     *
     * @returns {oauth2Provider.signedIn|*} true if signedin, false otherwise.
     */
    $scope.getSignedInState = function () {
        return oauth2Provider.signedIn;
    };

    /**
     * Calls the OAuth2 authentication method.
     */
    $scope.signIn = function () {
        oauth2Provider.signIn(function () {
            gapi.client.oauth2.userinfo.get().execute(function (resp) {
                $scope.$apply(function () {
                    if (resp.email) {
                        oauth2Provider.signedIn = true;
                        $scope.alertStatus = 'success';
                        $scope.rootMessages = 'Logged in with ' + resp.email;
                    }
                });
            });
        });
    };

    /**
     * Render the signInButton and restore the credential if it's stored in the cookie.
     * (Just calling this to restore the credential from the stored cookie. So hiding the signInButton immediately
     *  after the rendering)
     */
    $scope.initSignInButton = function () {
        gapi.signin.render('signInButton', {
            'callback': function () {
                jQuery('#signInButton button').attr('disabled', 'true').css('cursor', 'default');
                if (gapi.auth.getToken() && gapi.auth.getToken().access_token) {
                    $scope.$apply(function () {
                        oauth2Provider.signedIn = true;
                    });
                }
            },
            'clientid': oauth2Provider.CLIENT_ID,
            'cookiepolicy': 'single_host_origin',
            'scope': oauth2Provider.SCOPES
        });
    };

    /**
     * Logs out the user.
     */
    $scope.signOut = function () {
        oauth2Provider.signOut();
        $scope.alertStatus = 'success';
        $scope.rootMessages = 'Logged out';
    };

    /**
     * Collapses the navbar on mobile devices.
     */
    $scope.collapseNavbar = function () {
        angular.element(document.querySelector('.navbar-collapse')).removeClass('in');
    };

});

















/**
 * @ngdoc controller
 * @name OAuth2LoginModalCtrl
 *
 * @description
 * The controller for the modal dialog that is shown when an user needs to login to archive some functions.
 *
 */
localburgerApp.controllers.controller('OAuth2LoginModalCtrl',
    function ($scope, $modalInstance, $rootScope, oauth2Provider) {
        $scope.singInViaModal = function () {
            oauth2Provider.signIn(function () {
                gapi.client.oauth2.userinfo.get().execute(function (resp) {
                    $scope.$root.$apply(function () {
                        oauth2Provider.signedIn = true;
                        $scope.$root.alertStatus = 'success';
                        $scope.$root.rootMessages = 'Logged in with ' + resp.email;
                    });
                    $modalInstance.close();
                });
            });
        };
    });

/**
 * @ngdoc controller
 * @name DatepickerCtrl
 *
 * @description
 * A controller that holds properties for a datepicker.
 */
localburgerApp.controllers.controller('DatepickerCtrl', function ($scope) {
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function () {
        $scope.minDate = ( $scope.minDate ) ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
    $scope.format = $scope.formats[0];
});









/**
 * @ngdoc controller
 * @name AdminAddMenuItemCtl
 *
 * @description
 * A controller used for the Create menu items page.
 */
localburgerApp.controllers.controller('AdminAddMenuItemCtl',
    function ($scope, $log, oauth2Provider, HTTP_ERRORS) {

        /**
         * The conference object being edited in the page.
         * @type {{}|*}
         */
        $scope.menuItem = $scope.menuItem || {};

        /**
         * Holds the default values for the input menuTypes for menuType select.
         * @type {string[]}
         */
        $scope.menuTypes = [
                            'BRUNCH',
                            'DINNER',
                            'CATERING',
                            'HAPPY_HOUR'
        ];

        /**
         * Holds the default values for the input menuCourses for menuCourse select.
         * @type {string[]}
         */
        $scope.menuCourses = [
                          	'STARTERS',
                        	'SIDES',
                        	'SALADS',
                        	'BURGERS',
                        	'LOCAL_ADD_ONS',
                        	'COCKTAILS',
                        	'DESSERTS', 
                        	'FOOD',
                        	'DRINKS',
                        	'LIBATIONS',
                        	'MAINS',
                        	'SANDWICHES_AND_WRAPS',
                        	'PLATTERS'
        ];


        /**
         * Tests if $scope.menuItem is valid.
         * @param menuItemForm the form object from the Admin_AddMenu.html page.
         * @returns {boolean|*} true if valid, false otherwise.
         */
        $scope.isValidMenu = function (menuItemForm) {
            return !menuItemForm.$invalid
        }

        /**
         * Invokes the conference.createConference API.
         *
         * @param menuItemForm the form object.
         */
        $scope.createMenuItem = function (menuItemForm) {
            if (!$scope.isValidMenu(menuItemForm)) {
                return;
            }

            $scope.loading = true;
            gapi.client.localburger.createMenuItem($scope.menuItem).
                execute(function (resp) {
                    $scope.$apply(function () {
                        $scope.loading = false;
                        if (resp.error) {
                            // The request has failed.
                            var errorMessage = resp.error.message || '';
                            $scope.messages = 'Failed to create a menu item : ' + errorMessage;
                            $scope.alertStatus = 'warning';
                            $log.error($scope.messages + ' MenuItem : ' + JSON.stringify($scope.menuItem));

                            if (resp.code && resp.code == HTTP_ERRORS.UNAUTHORIZED) {
                                oauth2Provider.showLoginModal();
                                return;
                            }
                        } else {
                            // The request has succeeded.
                            $scope.messages = 'The menu item has been created : ' + resp.result.name;
                            $scope.alertStatus = 'success';
                            $scope.submitted = false;
                            $scope.menuItem = {};
                            $log.info($scope.messages + ' : ' + JSON.stringify(resp.result));
                        }
                    });
                });
        };
    });


/**
 * @ngdoc controller
 * @name AdminAddMenuItemCtl
 *
 * @description
 * A controller used for the Create menu items page.
 */
localburgerApp.controllers.controller('AdminUpdateMenuItemCtl',
    function ($scope, $log, oauth2Provider, HTTP_ERRORS) {

        /**
         * The conference object being edited in the page.
         * @type {{}|*}
         */
        $scope.menuItem = $scope.menuItem || {};

        /**
         * Holds the default values for the input menuTypes for menuType select.
         * @type {string[]}
         */
        $scope.menuTypes = [
                            'BRUNCH',
                            'DINNER',
                            'CATERING',
                            'HAPPY_HOUR'
        ];

        /**
         * Holds the default values for the input menuCourses for menuCourse select.
         * @type {string[]}
         */
        $scope.menuCourses = [
                          	'STARTERS',
                        	'SIDES',
                        	'SALADS',
                        	'BURGERS',
                        	'LOCAL_ADD_ONS',
                        	'COCKTAILS',
                        	'DESSERTS', 
                        	'FOOD',
                        	'DRINKS',
                        	'LIBATIONS',
                        	'MAINS',
                        	'SANDWICHES_AND_WRAPS',
                        	'PLATTERS'
        ];


        /**
         * Tests if $scope.menuItem is valid.
         * @param menuItemForm the form object from the Admin_AddMenu.html page.
         * @returns {boolean|*} true if valid, false otherwise.
         */
        $scope.isValidMenu = function (menuItemForm) {
            return !menuItemForm.$invalid
        }

        /**
         * Invokes the conference.createConference API.
         *
         * @param menuItemForm the form object.
         */
	    $scope.initialEvents = [];        


	    $scope.init = function () {
	    	var retrieveMenuItemCallback = function () {
	    		$scope.menuItems = [];
	    		$scope.loading = true;
	    		gapi.client.localburger.getMenuItems().
	    			execute(function (resp) {
	    				$scope.$apply(function () {
	    					$scope.loading = false;
	                            if (resp.error) {
	                            	console.log("ERROR");
	                                // Failed to get the events.
	                            } else {
	                            	console.log("resp.items: " + resp.items);
	                                angular.forEach(resp.items, function (menuItem) {
	                                    $scope.menuItems.push(angular.copy(menuItem));
	                                });
	                                $scope.initialMenuItems = resp.items.slice();
                            }
	                        });
	                    }
	                );
	            };
	            if (!oauth2Provider.signedIn) {
	                var modalInstance = oauth2Provider.showLoginModal();
	                modalInstance.result.then(retrieveMenuItemCallback);
	            } else {
	            	retrieveMenuItemCallback();
	            }
	        };
        $scope.deleteMenuItem = function(menuItem, index){
        	$scope.loading = true;
        	gapi.client.localburger.deleteMenuItem(menuItem).
        		execute(function(resp){
    				$scope.$apply(function () {
	    	        	$scope.loading = false;	        			
	    	        	if(resp.error){
	    	        		$scope.alertStatus = "warning";
	    	        		$scope.messages = resp.message;
	        			}
	        			else{
	        				/**
	        				 * Update both initialMenuItems and menu
	        				 */
	        				$scope.initialMenuItems.splice(index,1);
	        				$scope.menuItems.splice(index,1);
	        				$scope.alertStatus = "success";
	        				$scope.messages = resp.message;
	        			}
    				});
        		})
        };
        $scope.updateMenuItem = function(menuItem, index){
        	$scope.loading = true;
        	gapi.client.localburger.updateMenuItem(menuItem).
        		execute(function(resp){
        			$scope.$apply(function(){
        				$scope.loading = false;
        				if(resp.error){
        					$scope.alertStatus = "warning";
        					$scope.messages = "Failed to update";
        				}
        				else{
        					/**
        					 * Updating initialMenuItems and menuItems
        					 */
        					$scope.initialMenuItems[index] = resp.result;
        					$scope.menuItems[index] = resp.result;
        					$scope.alertStatus = "success";
        					$scope.messages = "Updated successfully";
        				}
        			});
        		})
        };       
        
        
    });
/**
 * @ngdoc controller
 * @name AdminAddMenuItemCtl
 *
 * @description
 * A controller used for the Create menu items page.
 */
localburgerApp.controllers.controller('AdminAddEventCtl',
    function ($scope, $log, oauth2Provider, HTTP_ERRORS) {


    /**
     * The conference object being edited in the page.
     * @type {{}|*}
     */
    $scope.event = $scope.event || {};


    /**
     * Tests if the event.date is valid.
     * @returns {boolean} true if the dates are valid, false otherwise.
     */
    $scope.isValidDate = function () {
    	console.log("\nisValidDate()");
    	var date = new Date();
        if (!$scope.event.date) {
        	console.log('Why am I here');
            return false;
        }
    	console.log('date.setHours(0,0,0,0) <= $scope.event.date: ' + date.setHours(0,0,0,0) <= $scope.event.date);
        return date.setHours(0,0,0,0) <= $scope.event.date;
    }
    /**
     * Tests if $scope.menuItem is valid.
     * @param menuItemForm the form object from the Admin_AddMenu.html page.
     * @returns {boolean|*} true if valid, false otherwise.
     */
    $scope.isValidEvent = function (eventForm) {
    	console.log("\nisValidEvent()");
    	console.log('!eventForm.$invalid: ' + !eventForm.$invalid);
    	console.log('isValidDate(): ' + $scope.isValidDate());
        return !eventForm.$invalid && $scope.isValidDate();
    }

    /**
     * Invokes the localburger.createEvent API.
     *
     * @param menuItemForm the form object.
     */
    $scope.createEvent = function (eventForm) {
        if (!$scope.isValidEvent(eventForm)) {
            return;
        }

        $scope.loading = true;
        gapi.client.localburger.createEvent($scope.event).
            execute(function (resp) {
                $scope.$apply(function () {
                    $scope.loading = false;
                    if (resp.error) {
                        // The request has failed.
                        var errorMessage = resp.error.message || '';
                        $scope.messages = 'Failed to create a menu item : ' + errorMessage;
                        $scope.alertStatus = 'warning';
                        $log.error($scope.messages + ' Event : ' + JSON.stringify($scope.event));

                        if (resp.code && resp.code == HTTP_ERRORS.UNAUTHORIZED) {
                            oauth2Provider.showLoginModal();
                            return;
                        }
                    } else {
                        // The request has succeeded.
                        $scope.messages = 'The menu item has been created : ' + resp.result.name;
                        $scope.alertStatus = 'success';
                        $scope.submitted = false;
                        $scope.event = {};
                        $log.info($scope.messages + ' : ' + JSON.stringify(resp.result));
                    }
                });
            });
    };
    });


/**
 * @ngdoc controller
 * @name AdminAddMenuItemCtl
 *
 * @description
 * A controller used for the Create menu items page.
 */
localburgerApp.controllers.controller('AdminUpdateEventCtl',
    function ($scope, $log, oauth2Provider, HTTP_ERRORS) {
	
	    $scope.submitted = false;
	    $scope.loading = false;
	
	    /**
	     * The initial event retrieved from the server to know the dirty state.
	     * @type {{}}
	     */
	    $scope.initialEvents = [];        


	    $scope.init = function () {
	    	var retrieveEventCallback = function () {
	    		$scope.events = [];
	    		$scope.loading = true;
	    		gapi.client.localburger.getEvents().
	    			execute(function (resp) {
	    				$scope.$apply(function () {
	    					$scope.loading = false;
	                            if (resp.error) {
	                            	console.log("ERROR");
	                                // Failed to get the events.
	                            } else {
	                            	console.log("resp.items: " + resp.items);
	                                angular.forEach(resp.items, function (event) {
	                                	console.log(event.name);
	                                    $scope.events.push(angular.copy(event));
	                                });
	                                $scope.initialEvents = resp.items.slice();
                            }
	                        });
	                    }
	                );
	            };
	            if (!oauth2Provider.signedIn) {
	                var modalInstance = oauth2Provider.showLoginModal();
	                modalInstance.result.then(retrieveEventCallback);
	            } else {
	            	retrieveEventCallback();
	            }
	        };
	        $scope.deleteEvent = function(event, index){
	        	console.log(index);

	        	$scope.loading = true;
	        	gapi.client.localburger.deleteEvent(event).
	        		execute(function(resp){
	    				$scope.$apply(function () {
		    	        	$scope.loading = false;	        			
		    	        	if(resp.error){
		    	        		$scope.alertStatus = "warning";
		    	        		$scope.messages = resp.message;
		        			}
		        			else{
		        				/**
		        				 * Update both initialEvents and events
		        				 */
		        				$scope.initialEvents.splice(index,1);
		        				$scope.events.splice(index,1);
		        				$scope.alertStatus = "success";
		        				$scope.messages = resp.message;
		        			}
	    				});
	        		})
	        };
	        $scope.updateEvent = function(event, index){
	        	console.log(event);
	        	$scope.loading = true;
	        	gapi.client.localburger.updateEvent(event).
	        		execute(function(resp){
	        			$scope.$apply(function(){
	        				$scope.loading = false;
	        				if(resp.error){
	        					$scope.alertStatus = "warning";
	        					$scope.messages = "Failed to update";
	        				}
	        				else{
	        					/**
	        					 * Updating initialEvents and events
	        					 */
	        					$scope.initialEvents[index] = resp.result;
	        					$scope.events[index] = resp.result;
	        					$scope.alertStatus = "success";
	        					$scope.messages = "Updated successfully";
	        				}
	        			});
	        		})
	        };
    });