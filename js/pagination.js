function renderPagination(totalRecords){

    const pagination =
    document.getElementById("pagination");

    pagination.innerHTML = "";

    const totalPages =
    Math.ceil(totalRecords / recordsPerPage);

    if(totalPages <= 1){

        return;

    }

    const previousButton =
    document.createElement("button");

    previousButton.textContent = "Previous";

    previousButton.className = "page-btn";

    previousButton.disabled =
    currentPage === 1;

    previousButton.addEventListener("click",()=>{

        currentPage--;

        renderTickets(filteredTickets);

    });

    pagination.appendChild(previousButton);



    for(let i=1;i<=totalPages;i++){

        const pageButton =
        document.createElement("button");

        pageButton.textContent=i;

        pageButton.className="page-btn";

        if(i===currentPage){

            pageButton.classList.add("active");

        }

        pageButton.addEventListener("click",()=>{

            currentPage=i;

            renderTickets(filteredTickets);

        });

        pagination.appendChild(pageButton);

    }



    const nextButton =
    document.createElement("button");

    nextButton.textContent="Next";

    nextButton.className="page-btn";

    nextButton.disabled=
    currentPage===totalPages;

    nextButton.addEventListener("click",()=>{

        currentPage++;

        renderTickets(filteredTickets);

    });

    pagination.appendChild(nextButton);

}