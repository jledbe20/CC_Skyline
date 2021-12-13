
// Document event listener
document.addEventListener("DOMContentLoaded", () => {

    // Event method for submit button click
    $("#submit").addEventListener("click", () => {

        // Call method to validate the submitter information and store the return in a variable
        let subRet = validateSubmitter();

        // Call method to validate the event information and store the return in a variable
        let eventRet = validateEvent();

        // Determine if all of the information has been submitted
        if(subRet == false || eventRet == false){

            // Alert the user to missing information

        }else{
            
            // Submit the request to the database to be processed


            // Allow the user to go the the request confirmation
            

        }

    })

})

// Validate the submitter information
const validateSubmitter = function() {

    // Ensure that the user has submitted their information
    if($("#name").value == ""){

        // Return false
        return false;

    }else if($("#email").value == "" || $("#email").value.search("@") == -1 || $("#email").value.search(".") == -1){

        // Return false
        return false

    }else if($("#phone").value == ""){

        // Return false
        return false;

    }else{

        // Return true;
        return true;

    }

}

// Validate the submitter information
const validateEvent = function() {

    // Ensure that the user has submitted their information
    if($("#eventName").value == ""){

        // Return false
        return false;

    }else if($("#description").value == ""){

        // Return false
        return false

    }else if($("#startTime").value == ""){

        // Return false
        return false;

    }else if($("#startDate").value == ""){

        // Return false
        return false;

    }else if($("#endTime").value == ""){

        // Return false
        return false;

    }    
    else if($("#endDate").value == ""){

        // Return false
        return false;
    
    }else if($("#hex1").value == ""){

        // Return false
        return false;

    }else{

        // Return true;
        return true;

    }

}