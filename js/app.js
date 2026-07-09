document.addEventListener("DOMContentLoaded",()=>{

    initializeStorage();

    initializeTicketModule();

});


function refreshApplication() {

    renderTickets(getTickets());

    updateDashboard();

}



window.addEventListener("storage", () => {

    refreshApplication();

});