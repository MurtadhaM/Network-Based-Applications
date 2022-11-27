
/*
This Middleware is used to check if the user is logged in or not.
*/



const flash = require("connect-flash/lib/flash");


/* Handle request for JWT token and local storage*/

function authenticate( req, res, next ) {
    if ( req.session.user ) {
        return next();
    }


}


function generateToken() {
    const login = $("#login").val();
    const postData = "login=" + encodeURIComponent(login) + "&password=test";

    $.post("/services/authenticate", postData, function (data) {
        if (data.status == "Authentication successful!") {
            alert("Authentication successful!");
            sessionStorage.setItem("token", data.token);
        }
        else {
            alert("Logout successful!");
            sessionStorage.removeItem("token");
        }
    })
    .fail(function (jqXHR, textStatus, error) {
        alert("Authentication failed!");
        sessionStorage.removeItem("token");
    });
}





/* Handle request for JWT token and local storage*/
/* Handle request for JWT token validation */
function validateToken() {
    var token = sessionStorage.getItem("token");

    if (token == undefined || token == "") {
        $("#infoZone").removeClass();
        $("#infoZone").addClass("alert alert-warning");
        $("#infoZone").text("Obtain a JWT token first :)");
        return;
    }

    $.ajax({
        url: "/services/validate",
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "bearer " + token);
        },
        success: function (data) {
            $("#infoZone").removeClass();
            $("#infoZone").addClass("alert alert-success");
            $("#infoZone").text("Token is valid :)");
        },
        error: function (jqXHR, textStatus, error) {
            $("#infoZone").removeClass();
            $("#infoZone").addClass("alert alert-danger");
            $("#infoZone").text("Token is invalid :(");
        },
    });
}

/* Handle request for JWT token validation */
/* Handle request for JWT token revocation */
function revokeToken() {
    
    $.ajax({
        
        // Revocation is done by sending a DELETE request to the token endpoint
        url: "/services/revoke",
        type: "DELETE",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "bearer " + token);
        }
    })
    .done(function (data) {

        // Remove token from local storage
        sessionStorage.removeItem("token");
        $("#infoZone").removeClass();
        $("#infoZone").addClass("alert alert-success");
        $("#infoZone").text("Token has been revoked :)");
    }
    )
    .fail(function (jqXHR, textStatus, error) {

        // Remove token from local storage
        sessionStorage.removeItem("token");
        $("#infoZone").removeClass();
        $("#infoZone").addClass("alert alert-danger");
        $("#infoZone").text("Token has been revoked :)");
    }
    );
}


/* Handle request for JWT token revocation */
/* Handle request for JWT token refresh */
function refreshToken() {
    var token = sessionStorage.getItem("token");

    if (token == undefined || token == "") {
        $("#infoZone").removeClass();
        $("#infoZone").addClass("alert alert-warning");
        $("#infoZone").text("Obtain a JWT token first :)");
        return;
    }

    $.ajax({
        url: "/services/refresh",
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "bearer " + token);
        },
        success: function (data) {
            sessionStorage.setItem("token", data.token);
            $("#infoZone").removeClass();
            $("#infoZone").addClass("alert alert-success");
            $("#infoZone").text("Token has been refreshed :)");
        }
    })
    .fail(function (jqXHR, textStatus, error) {
        $("#infoZone").removeClass();
        $("#infoZone").addClass("alert alert-danger");
        $("#infoZone").text("Token refresh failed :(");
    }
    );
}


/* Handle request for JWT token generation */




exports.authenticate = authenticate;
exports.validateToken = validateToken;
exports.revokeToken = revokeToken;
exports.refreshToken = refreshToken;
exports.generateToken = generateToken;

