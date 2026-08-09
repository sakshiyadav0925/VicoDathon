
/* =========================================
   DATE
========================================= */

const dateElement =
    document.getElementById("currentDate");

if (dateElement) {

    const today = new Date();

    dateElement.innerText =
        today.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );
}


/* =========================================
   TASK SEARCH
========================================= */

function searchTasks() {

    const input =
        document
            .getElementById("searchTask")
            .value
            .toLowerCase();

    const rows =
        document.querySelectorAll(".task-row");


    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();

        if (text.includes(input)) {

            row.style.display = "flex";

        } else {

            row.style.display = "none";

        }

    });

}


/* =========================================
   TASK FILTER
========================================= */

function filterTasks() {

    const filter =
        document
            .getElementById("taskFilter")
            .value;


    const rows =
        document.querySelectorAll(".task-row");


    rows.forEach(row => {

        const status =
            row.dataset.status;

        const priority =
            row.dataset.priority;


        let show = true;


        if (filter === "pending") {

            show = status === "pending";

        }


        if (filter === "completed") {

            show = status === "completed";

        }


        if (filter === "high") {

            show = priority === "high";

        }


        row.style.display =
            show ? "flex" : "none";

    });

}


/* =========================================
   COMPLETE TASK
========================================= */

function completeTask(button) {

    const row =
        button.closest(".task-row");


    const isCompleted =
        row.classList.contains(
            "completed-row"
        );


    if (isCompleted) {

        row.classList.remove(
            "completed-row"
        );

        button.classList.remove(
            "checked"
        );

        row.dataset.status =
            "pending";

        showToast(
            "Task marked as pending."
        );

    } else {

        row.classList.add(
            "completed-row"
        );

        button.classList.add(
            "checked"
        );

        row.dataset.status =
            "completed";

        showToast(
            "Task completed! 🎉"
        );

    }

}


/* =========================================
   DELETE TASK
========================================= */

function deleteTask(button) {

    const row =
        button.closest(".task-row");


    row.remove();


    showToast(
        "Task deleted successfully."
    );

}


/* =========================================
   OPEN MODAL
========================================= */

function openTaskModal() {

    const modal =
        document.getElementById(
            "taskModal"
        );


    if (modal) {

        modal.classList.add(
            "show"
        );

    }

}


/* =========================================
   CLOSE MODAL
========================================= */

function closeTaskModal() {

    const modal =
        document.getElementById(
            "taskModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


/* =========================================
   ADD NEW TASK
========================================= */

function addNewTask() {

    const name =
        document.getElementById(
            "newTaskName"
        ).value;


    const date =
        document.getElementById(
            "newTaskDate"
        ).value;


    const priority =
        document.getElementById(
            "newTaskPriority"
        ).value;


    if (name === "" || date === "") {

        alert(
            "Please enter task name and deadline."
        );

        return;

    }


    const taskList =
        document.getElementById(
            "taskList"
        );


    const priorityText =
        priority.toUpperCase();


    const newTask =
        document.createElement("div");


    newTask.className =
        "task-row";


    newTask.dataset.status =
        "pending";


    newTask.dataset.priority =
        priority;


    newTask.innerHTML = `

        <button
            class="check-button"
            onclick="completeTask(this)">

            <i class="fa-solid fa-check"></i>

        </button>


        <div class="task-content">

            <strong>
                ${name}
            </strong>

            <span>
                Due ${date}
                • New Task
            </span>

        </div>


        <span
            class="priority ${priority}">

            ${priorityText}

        </span>


        <button
            class="delete-btn"
            onclick="deleteTask(this)">

            <i class="fa-solid fa-trash"></i>

        </button>

    `;


    taskList.appendChild(
        newTask
    );


    document.getElementById(
        "newTaskName"
    ).value = "";


    document.getElementById(
        "newTaskDate"
    ).value = "";


    closeTaskModal();


    showToast(
        "New task added successfully! ✅"
    );

}


/* =========================================
   CAREER BUTTONS
========================================= */

function careerMessage(type) {

    let message = "";


    if (type === "DSA") {

        message =
            "DSA practice module coming soon!";

    }

    else if (type === "Resume") {

        message =
            "Resume builder coming soon!";

    }

    else if (type === "Interview") {

        message =
            "Interview practice coming soon!";

    }

    else {

        message =
            "Project portfolio module coming soon!";

    }


    showToast(message);

}


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    let toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "toast";

        toast.className =
            "toast";

        document.body.appendChild(
            toast
        );

    }


    toast.innerHTML = `

        <i class="fa-solid fa-circle-check"></i>

        <span>
            ${message}
        </span>

    `;


    toast.classList.add(
        "show"
    );


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2500);

}

