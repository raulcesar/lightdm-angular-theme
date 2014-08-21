
////////////////////////////////////////////////////////////////////////////////
// CALLBACK API. Called by the greeeter                                       //
// Here, we just integrate with angular, and call the functions on the scope. //
////////////////////////////////////////////////////////////////////////////////

// called when the greeter asks to show a login prompt for a user
function show_prompt(text) {
    var scope = angular.element("#greeterbody").scope();
    scope.show_prompt();
}

// called when the greeter asks to show a message
function show_message(text) {
    var scope = angular.element("#greeterbody").scope();
    scope.show_message(text);
}

// called when the greeter asks to show an error
function show_error(text) {
    var scope = angular.element("#greeterbody").scope();
    scope.show_message(text, true);
}

// called when the greeter is finished the authentication request
function authentication_complete() {
    var scope = angular.element("#greeterbody").scope();
    scope.authenticationComplete();
}



