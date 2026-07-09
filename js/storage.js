const STORAGE_KEY = "customerSupportTickets";

function initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
}

function getTickets() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveTickets(tickets) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

function generateTicketId() {
    const tickets = getTickets();

    if (tickets.length === 0) {
        return 1001;
    }

    return Math.max(...tickets.map(ticket => ticket.id)) + 1;
}

function addTicket(ticket) {
    const tickets = getTickets();

    tickets.push(ticket);

    saveTickets(tickets);
}

function updateTicket(updatedTicket) {

    const tickets = getTickets();

    const index = tickets.findIndex(
        ticket => ticket.id === updatedTicket.id
    );

    if (index !== -1) {

        tickets[index] = updatedTicket;

        saveTickets(tickets);

    }

}

function deleteTicket(id) {

    const tickets = getTickets().filter(
        ticket => ticket.id !== id
    );

    saveTickets(tickets);

}

function getTicketById(id) {

    return getTickets().find(
        ticket => ticket.id === id
    );

}

initializeStorage();