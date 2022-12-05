// Create a Toastify instance

  const toastify = function(options) {
    return new Toastify(options).showToast();
    };

  
   function register() {

    let updateBtn = $("#updateBtn");
    updateBtn.attr("disabled", true);
    updateBtn.value = ("Registering...");
    updateBtn.style= 'background-color: grey;' 

    let email = $("#email").val();
    let password = $("#password").val();
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    const user_Data = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    };
    console.log(user_Data);
    let response = $.ajax({
        url: "/users/register",
        type: "PUT",
        json: true,
        data: user_Data,
        
    });

    

    response.done(function(user_Data) {
        if (user_Data.message == "User created") {
            // Redirect to Account page
             Toastify({
                text: "Registration successful",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: 'center', // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                waitForAnimation: true,
                destination: "/users/login",
                stopOnFocus: true, // Prevents dismissing of toast on hover
                onClick: function(){ 
                    window.location.href = "/users/login";
                } // Callback after click
            }).showToast();
        } 

    });
     response.fail(function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        if (jqXHR.responseJSON.message == "Email already exists") {
            toastify({
                text: "User already exists", 
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: 'center', // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                stopOnFocus: true, // Prevents dismissing of toast on hover
            });
    updateBtn.attr("disabled", false);
    updateBtn.value = ("Register");
    updateBtn.style= 'background-color: #ff5f6d;'
        }
        else {
            toastify({
                text: `Error: ${jqXHR.responseJSON.message}`,
                duration: 3000,
                gravity: "top", // `top` or `bottom`

                position: 'center', // `left`, `center` or `right`

                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                stopOnFocus: true, // Prevents dismissing of toast on hover
            });
        }
    updateBtn.attr("disabled", false);
    updateBtn.value = ("Register");
    updateBtn.style= 'background-color: #ff5f6d;'
    });
    
}


    

