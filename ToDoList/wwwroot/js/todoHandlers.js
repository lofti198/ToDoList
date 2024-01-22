
document.querySelectorAll('.is-completed-checkbox').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        var toDoId = this.getAttribute('data-todo-id');
        var newStatus = this.checked;
        updateIsCompletedStatus(toDoId, newStatus);
    });
});

function updateIsCompletedStatus(toDoId, isCompleted) {
    // Send the updated status to the server
    $.ajax({
        url: '/ToDos/UpdateStatus',
        type: 'POST',
        data: {
            id: toDoId,
            isCompleted: isCompleted
        },
        headers: {
            "RequestVerificationToken": globalVars.token
        },
        success: function (response) {
            console.log('Status updated successfully');
        },
        error: function (error) {
            console.error('Error updating status', error);
            // Optionally revert the checkbox state if the server update fails
        }
    });
}


    function makeEditable(td) {
        // Add 'editing' class to the td
        td.classList.add('editing');
        var span = td.querySelector('span');
    var input = td.querySelector('.title-input');
    var icon = td.querySelector('.edit-icon');

    span.style.display = 'none';
    // icon.style.display = 'none';
    input.style.display = 'block';

    input.focus();
    input.select();
    }
    function revertIfUnchanged(input) {
        var td = input.closest('td');
        var originalValue = input.value;
    var currentValue = input.value;
    console.log('revertIfUnchanged', originalValue, currentValue);
    if (originalValue === currentValue) {
        console.log('originalValue===currentValue');
    // If no change was made, hide the input and show the span and icon
    var span = input.previousElementSibling; // Assuming the span is before the input
    var icon = input.nextElementSibling; // Assuming the icon is after the span

    input.style.display = 'none';
    span.style.display = '';
        // icon.style.display = 'none';

        // Remove 'editing' class from td
        td.classList.remove('editing');
        }
    }

function updateTitle(toDoId, input) {
    var td = input.closest('td');
        var newValue = input.value;
    // Hide the input and show the span again
    input.style.display = 'none';
    console.log(input.previousElementSibling)
    input.previousElementSibling.style.display = '';
    input.previousElementSibling.textContent = newValue; // Update the span text

    // Remove 'editing' class from td
    td.classList.remove('editing');
    // Send the updated value to the server using AJAX
    $.ajax({
        url: '/ToDos/UpdateTitle',
    type: 'POST',
    data: {
        id: toDoId,
    title: newValue
            },
    headers: {
        "RequestVerificationToken": globalVars.token
            },
    success: function (response) {
        console.log('Title updated successfully');
            },
    error: function (error) {
        console.error('Error updating title', error);
            }
        });
    }


    function deleteToDoItem(id) {
        // if (!confirm("Are you sure you want to delete this item?")) {
        //     return;
        // }
        // Directly retrieve the anti-forgery token value


        $.ajax({
            url: '/ToDos/Delete/' + id,
            type: 'POST',
            headers: {
                "RequestVerificationToken": globalVars.token
            },
            success: function (response) {
                if (response.success) {
                    $('#todo-item-' + response.id).remove();
                } else {
                    alert("There was an error deleting the item.");
                }
            },
            error: function () {
                alert("Something went wrong.");
            }
        });
    }
    // Global variables for direction and currently sorted column
    var currentDir = "asc";
    var currentColumn = null;
    function sortTable(column, header) {
        var table, rows, i, x, y, shouldSwitch;
    table = document.querySelector(".table");
    var switching = true;
    var switchcount = 0;
    // If a new column is clicked, reset the direction
    if (currentColumn !== column) {
        currentColumn = column;
    currentDir = "asc";
        }
    // Remove the sorting classes from all headers except the current one
    var headers = table.querySelectorAll("th");
    headers.forEach(function (th, index) {
            var span = th.querySelector("span");
    if (index !== column) {
        // span.classList.remove("fa-sort-up", "fa-sort-down");
        // span.classList.add("fa-sort");
    }
        });
    // Sort the table
    while (switching) {
        switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
    x = rows[i].getElementsByTagName("TD")[column];
    y = rows[i + 1].getElementsByTagName("TD")[column];
    if (currentDir === "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
    break;
                    }
                } else if (currentDir === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
    break;
                    }
                }
            }
    if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
    switching = true;
    switchcount++;
            } else {
                if (switchcount === 0 && currentDir === "asc") {
        currentDir = "desc";
    switching = true;
                } else if (switchcount === 0 && currentDir === "desc") {
        currentDir = "asc";
    switching = true;
                }
            }
        }
        // Toggle the sorting icon class on the current header
        // var headerSpan = header.querySelector("span");
        // if (currentDir === "asc") {
        //     headerSpan.classList.remove("fa-sort", "fa-sort-down");
        //     headerSpan.classList.add("fa-sort-up");
        // } else {
        //     headerSpan.classList.remove("fa-sort", "fa-sort-up");
        //     headerSpan.classList.add("fa-sort-down");
        // }
    }
