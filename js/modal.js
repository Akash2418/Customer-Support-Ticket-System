const ticketModal = document.getElementById("ticketModal");

const viewModal = document.getElementById("viewModal");

const closeButton = document.querySelector(".close");

const closeViewButton = document.querySelector(".closeView");



function openModal(isEdit=false){

    if(!isEdit){

        resetTicketForm();

    }

    ticketModal.style.display="flex";

}



function closeModal(){

    ticketModal.style.display = "none";

}



function openViewModal(){

    viewModal.style.display = "flex";

}



function closeViewModal(){

    viewModal.style.display = "none";

}



closeButton.addEventListener("click",()=>{

    closeModal();

});



closeViewButton.addEventListener("click",()=>{

    closeViewModal();

});



window.addEventListener("click",(event)=>{

    if(event.target===ticketModal){

        closeModal();

    }

    if(event.target===viewModal){

        closeViewModal();

    }

});



document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        closeModal();

        closeViewModal();

    }

});