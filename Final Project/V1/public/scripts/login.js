// Create a Toastify instance

const { session } = require("passport");


 function login(){
    

    // Make an AJAX request to the server
    let email = $("#email").val();
    let password = $("#password").val();
    const user_Data = {
        email: email,
        password: password
    };
    console.log(user_Data);
    let response = $.ajax({
        url: "/users/login",
        type: "PUT",
        contentType: "application/json",
        data:  JSON.stringify(user_Data),
        
    });
     

    response.done(function(user_Data) {
        if (user_Data.message == "User logged in") {
            // Redirect to Account page
                Toastify({
                text: "Login successful",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: 'center', // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                waitForAnimation: true,
                destination: "/users/profile",
                stopOnFocus: false, // Prevents dismissing of toast on hover       
                function(){
                    window.location.href = "/users/profile";
                } // Callback after click
            }).showToast(  );
            localStorage.setItem('token', user_Data.token)
            window.location.href = "/users/profile";
             
        } 
        else  {
            
            Toastify({
                text: "Incorrect password",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: 'center', // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                waitForAnimation: true,
                stopOnFocus: true, // Prevents dismissing of toast on hover
                onClick: function(){ 
                    window.location.href = "/users/login";
                } // Callback after click
            }).showToast();
        }
    });

    response.fail(function(jqXHR, textStatus, errorThrown) {
        
        {
            Toastify({
                text: "User not found", 
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: 'center', // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                waitForAnimation: true,
               
            }).showToast();
        
        }
    });

}

    /**
     * THROUGH API AND JWT
     */

     async function APILogin()  {
        
      
        let email = $("#email").val();
        let password = $("#password").val();

      
        try {
          const { data } = await axios.post('/api/v1/login', { email, password })          
          alert(data.msg)
      
          email.value = ''
          password.value = ''
      
          localStorage.setItem('token', data.token)
          console.log(data.token);
            window.location.href = "/users/profile";
        } catch (error) {
            
        
          console.log(error)
          return res.status(500).json({ message: 'Server error' });
        }
        setTimeout(() => {
          alert('no token present')
        }, 2000)
      }

    
    
 
    