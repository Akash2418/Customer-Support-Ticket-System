let currentEditId = null;

let filteredTickets = [];

let currentPage = 1;

const recordsPerPage = 10;



function formatDate(date){

    return new Date(date).toLocaleDateString("en-IN",{

        day:"2-digit",

        month:"short",

        year:"numeric"

    });

}



function getPriorityBadge(priority){

    switch(priority){

        case "High":

            return `<span class="high">High</span>`;

        case "Medium":

            return `<span class="medium">Medium</span>`;

        default:

            return `<span class="low">Low</span>`;

    }

}



function getStatusBadge(status){

    switch(status){

        case "Open":

            return `<span class="open">Open</span>`;

        case "In Progress":

            return `<span class="progress">In Progress</span>`;

        default:

            return `<span class="closed">Closed</span>`;

    }

}



function renderTickets(data=getTickets()){

    filteredTickets=[...data];

    const tbody=document.getElementById("ticketTableBody");

    tbody.innerHTML="";

    if(filteredTickets.length===0){

        tbody.innerHTML=`

        <tr>

            <td colspan="8" class="empty-state">

                No tickets available.

            </td>

        </tr>

        `;

        if(typeof renderPagination==="function"){

            renderPagination(0);

        }

        return;

    }

    const start=(currentPage-1)*recordsPerPage;

    const end=start+recordsPerPage;

    const pageData=filteredTickets.slice(start,end);

    pageData.forEach(ticket=>{

        tbody.innerHTML+=`

        <tr>

            <td>${ticket.id}</td>

            <td>${ticket.subject}</td>

            <td>${ticket.customer}</td>

            <td>${ticket.email}</td>

            <td>${getPriorityBadge(ticket.priority)}</td>

            <td>${getStatusBadge(ticket.status)}</td>

            <td>${formatDate(ticket.createdDate)}</td>

            <td>

                <button

                class="view-btn"

                onclick="viewTicket(${ticket.id})">

                View

                </button>

                <button

                class="edit-btn"

                onclick="editTicket(${ticket.id})">

                Edit

                </button>

                <button

                class="delete-btn"

                onclick="deleteTicketHandler(${ticket.id})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

    updateDashboard();

    if(typeof renderPagination==="function"){

        renderPagination(filteredTickets.length);

    }

}

function getFormData(){

    return{

        subject:document.getElementById("subject").value.trim(),

        customer:document.getElementById("customer").value.trim(),

        email:document.getElementById("email").value.trim(),

        description:document.getElementById("description").value.trim(),

        priority:document.getElementById("priority").value,

        status:document.getElementById("status").value

    };

}



function resetTicketForm(){

    document.getElementById("ticketForm").reset();

    currentEditId=null;

    document.getElementById("ticketId").value=generateTicketId();

    document.getElementById("modalTitle").textContent="Create Ticket";

    document.getElementById("saveTicketBtn").textContent="Save Ticket";

}



function createNewTicket(){

    const formData=getFormData();

    const ticket={

        id:generateTicketId(),

        subject:formData.subject,

        customer:formData.customer,

        email:formData.email,

        description:formData.description,

        priority:formData.priority,

        status:formData.status,

        createdDate:new Date().toISOString()

    };

    addTicket(ticket);

    closeModal();

    resetTicketForm();

    currentPage=1;

    renderTickets(getTickets());

}



function editTicket(id){

    const ticket=getTicketById(id);

    if(!ticket){

        return;

    }

    currentEditId=id;

    document.getElementById("ticketId").value=ticket.id;

    document.getElementById("subject").value=ticket.subject;

    document.getElementById("customer").value=ticket.customer;

    document.getElementById("email").value=ticket.email;

    document.getElementById("description").value=ticket.description;

    document.getElementById("priority").value=ticket.priority;

    document.getElementById("status").value=ticket.status;

    document.getElementById("modalTitle").textContent="Edit Ticket";

    document.getElementById("saveTicketBtn").textContent="Update Ticket";

    openModal(true);

}



function updateExistingTicket(){

    const ticketId=parseInt(

        document.getElementById("ticketId").value

    );



    const oldTicket=getTicketById(ticketId);



    if(!oldTicket){

        return;

    }



    const formData=getFormData();



    const updatedTicket={

        id:ticketId,

        subject:formData.subject,

        customer:formData.customer,

        email:formData.email,

        description:formData.description,

        priority:formData.priority,

        status:formData.status,

        createdDate:oldTicket.createdDate

    };



    updateTicket(updatedTicket);



    closeModal();



    resetTicketForm();



    renderTickets(getTickets());

}



function saveTicket(){

    if(!validateForm()){

        return;

    }



    const ticketId=parseInt(

        document.getElementById("ticketId").value

    );



    const existingTicket=getTicketById(ticketId);



    if(existingTicket){

        updateExistingTicket();

    }

    else{

        createNewTicket();

    }

}

function viewTicket(id){

    const ticket=getTicketById(id);

    if(!ticket){

        return;

    }

    document.getElementById("ticketDetails").innerHTML=`

    <div class="detail-row">

        <span class="detail-title">

        Ticket ID

        </span>

        <span class="detail-value">

        ${ticket.id}

        </span>

    </div>

    <div class="detail-row">

        <span class="detail-title">

        Subject

        </span>

        <span class="detail-value">

        ${ticket.subject}

        </span>

    </div>

    <div class="detail-row">

        <span class="detail-title">

        Customer Name

        </span>

        <span class="detail-value">

        ${ticket.customer}

        </span>

    </div>

    <div class="detail-row">

        <span class="detail-title">

        Email

        </span>

        <span class="detail-value">

        ${ticket.email}

        </span>

    </div>

    <div class="detail-row">

        <span class="detail-title">

        Description

        </span>

        <span class="detail-value">

        ${ticket.description}

        </span>

    </div>

    <div class="detail-row">

        <span class="detail-title">

        Priority

        </span>

        <span class="detail-value">

        ${getPriorityBadge(ticket.priority)}

        </span>

    </div>

    <div class="detail-row">

        <span class="detail-title">

        Status

        </span>

        <span class="detail-value">

        ${getStatusBadge(ticket.status)}

        </span>

    </div>

    <div class="detail-row">

        <span class="detail-title">

        Created Date

        </span>

        <span class="detail-value">

        ${formatDate(ticket.createdDate)}

        </span>

    </div>

    `;

    openViewModal();

}



function deleteTicketHandler(id){

    const confirmDelete=confirm(

        "Are you sure you want to delete this ticket?"

    );



    if(!confirmDelete){

        return;

    }



    deleteTicket(id);



    filteredTickets=getTickets();



    const totalPages=Math.ceil(

        filteredTickets.length/

        recordsPerPage

    );



    if(currentPage>totalPages){

        currentPage=totalPages||1;

    }



    renderTickets(getTickets());

}


function initializeTicketModule(){

    document.getElementById("ticketId").value = generateTicketId();

    renderTickets(getTickets());

    updateDashboard();

}



document.getElementById("addTicketBtn")

.addEventListener("click",()=>{

    openModal();

});



document.getElementById("ticketForm")

.addEventListener("submit",function(event){

    event.preventDefault();

    saveTicket();

});



window.addEventListener("load",()=>{

    initializeTicketModule();

});