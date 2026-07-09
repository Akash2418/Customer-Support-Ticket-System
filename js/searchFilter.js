function applyFilters() {

    let tickets = getTickets();

    const searchValue = document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    const statusValue = document
        .getElementById("statusFilter")
        .value;

    const priorityValue = document
        .getElementById("priorityFilter")
        .value;

    const sortValue = document
        .getElementById("sortTickets")
        .value;



    if (searchValue !== "") {

        tickets = tickets.filter(ticket => {

            return (

                ticket.id.toString().includes(searchValue) ||

                ticket.subject.toLowerCase().includes(searchValue) ||

                ticket.customer.toLowerCase().includes(searchValue)

            );

        });

    }



    if (statusValue !== "") {

        tickets = tickets.filter(ticket =>
            ticket.status === statusValue
        );

    }



    if (priorityValue !== "") {

        tickets = tickets.filter(ticket =>
            ticket.priority === priorityValue
        );

    }



    switch (sortValue) {

        case "dateDesc":

            tickets.sort((a, b) =>
                new Date(b.createdDate) - new Date(a.createdDate)
            );

            break;

        case "dateAsc":

            tickets.sort((a, b) =>
                new Date(a.createdDate) - new Date(b.createdDate)
            );

            break;

        case "priorityHigh":

            tickets.sort((a, b) => {

                const order = {
                    High: 3,
                    Medium: 2,
                    Low: 1
                };

                return order[b.priority] - order[a.priority];

            });

            break;

        case "priorityLow":

            tickets.sort((a, b) => {

                const order = {
                    High: 3,
                    Medium: 2,
                    Low: 1
                };

                return order[a.priority] - order[b.priority];

            });

            break;

    }



    filteredTickets = tickets;

    currentPage = 1;

    renderTickets(filteredTickets);

}



document
.getElementById("searchInput")
.addEventListener("input", applyFilters);



document
.getElementById("statusFilter")
.addEventListener("change", applyFilters);



document
.getElementById("priorityFilter")
.addEventListener("change", applyFilters);



document
.getElementById("sortTickets")
.addEventListener("change", applyFilters);