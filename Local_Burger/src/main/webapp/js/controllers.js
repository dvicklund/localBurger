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

        $scope.setSelectedTab = function(){
            $scope.selectedTab = "BRUNCH";
        }
        
        $scope.menuItems = [];
        
        $scope.getBrunch = function () {
            $scope.selectedTab = 'BRUNCH';
            $scope.queryMeals();
        };

        /**
         * Sets the selected tab to 'YOU_HAVE_CREATED'
         */
        $scope.getHappyHour = function () {
            $scope.selectedTab = 'HAPPYHOUR';
            $scope.queryMeals();
        };
        
        $scope.getDinner = function () {
            $scope.selectedTab = 'DINNER';
            $scope.queryMeals();
        };

        /**
         * Sets the selected tab to 'YOU_HAVE_CREATED'
         */
        $scope.getCatering = function () {
            $scope.selectedTab = 'CATERING';
            $scope.queryMeals();
        };
        /**
         * Query the conferences depending on the tab currently selected.
         *
         */
        $scope.queryMeals = function () {
            $scope.submitted = false;
            if ($scope.selectedTab == 'BRUNCH') {
                $scope.queryMealsAll();
            } else if ($scope.selectedTab == 'HAPPYHOUR') {
                $scope.queryMealsAll();
            }  else if ($scope.selectedTab == 'DINNER') {
                $scope.queryMealsAll();
            }  else if ($scope.selectedTab == 'CATERING') {
                $scope.queryMealsAll();
            } 
        };

        /**
         * Invokes the localburger. API.
         */
        $scope.queryMealsAll = function () {
            $scope.loading = true;
            gapi.client.localburger.getMenuItems().
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
                            $scope.messages = 'Query succeeded : ' + resp.items;
                            $scope.alertStatus = 'success';
                            $log.info($scope.messages);

                            $scope.menuItems = [];
                            angular.forEach(resp.items, function (menuItem) {
                                $scope.menuItems.push(menuItem);
                            });
                        }
                        $scope.submitted = true;
                    });
                });
        	};
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
        $scope.conference = $scope.conference || {};
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
     * @returns {oauth2Provider.signedIn|*} true if siendIn, false otherwise.
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
 * The controller for the modal dialog that is shown when an user needs to login to achive some functions.
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

   