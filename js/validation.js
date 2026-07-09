function clearValidation(){

    const fields=document.querySelectorAll(

        "#ticketForm input,#ticketForm textarea,#ticketForm select"

    );

    fields.forEach(field=>{

        field.classList.remove("error-field");

    });

}



function showValidation(field,message){

    clearValidation();

    field.classList.add("error-field");

    alert(message);

    field.focus();

}



function validateEmail(email){

    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}



function validateForm(){

    clearValidation();



    const subject=document.getElementById("subject");

    const customer=document.getElementById("customer");

    const email=document.getElementById("email");

    const description=document.getElementById("description");

    const priority=document.getElementById("priority");

    const status=document.getElementById("status");



    if(subject.value.trim()===""){

        showValidation(subject,"Subject is required.");

        return false;

    }



    if(customer.value.trim()===""){

        showValidation(customer,"Customer Name is required.");

        return false;

    }



    if(email.value.trim()===""){

        showValidation(email,"Email is required.");

        return false;

    }



    if(!validateEmail(email.value.trim())){

        showValidation(email,"Please enter a valid email.");

        return false;

    }



    if(description.value.trim()===""){

        showValidation(description,"Description is required.");

        return false;

    }



    if(priority.value===""){

        showValidation(priority,"Select Priority.");

        return false;

    }



    if(status.value===""){

        showValidation(status,"Select Status.");

        return false;

    }



    return true;

}