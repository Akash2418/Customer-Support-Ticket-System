function updateDashboard() {

    const tickets = getTickets();

    const totalTickets = tickets.length;

    const openTickets = tickets.filter(ticket =>
        ticket.status === "Open"
    ).length;

    const progressTickets = tickets.filter(ticket =>
        ticket.status === "In Progress"
    ).length;

    const closedTickets = tickets.filter(ticket =>
        ticket.status === "Closed"
    ).length;

    document.getElementById("totalTickets").textContent = totalTickets;

    document.getElementById("openTickets").textContent = openTickets;

    document.getElementById("progressTickets").textContent = progressTickets;

    document.getElementById("closedTickets").textContent = closedTickets;

}

function refreshDashboard() {

    updateDashboard();

}