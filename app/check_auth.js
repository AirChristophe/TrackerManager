import { router } from "expo-router";

  export function checkAuth() {
//console.log("checkAuth");
        fetch("https://splanner.georacing.com/users/app_geotraker_management_login",
        { 
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: "login=empty&password=empty"
        }) 
        .then((response) => response.json()) 
        .then((data) => { 
            //setData(JSON.stringify(data)); 
//console.log(data); 
                        
            if (data.state != 1)
            {
                router.push("/login");
            }
        }) 
        .catch((error) => { 
            // Handle any errors that occur 
            console.error("error : " + error); 
        }); 
  }

