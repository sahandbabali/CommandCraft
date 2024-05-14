let enterbtn = document.getElementById("enterbtn")
let commandline = document.getElementById("commandline")
const heap = document.getElementById("heap");
let topcommand = document.getElementById("topcommand");




let commandsarray = ["cat", "head", "tail", "|", "ps", "aux", "zip", "-r", "my_folder.zip", "~", "which", "whereis", "my_file.txt", "cp", "my_folder", "pwd", "tree", "cd", "ls", "-l", "-a", "-d", "in", ">", ">&", "grep", "wc", "-n", "locate", "file", "file1", "file2", "find", "-name", "echo", "sudo", "updatedb", ".", "less", "touch", "mkdir", "mv", "rm", "-rf", "rmdir", "yes", "no", "*", "?", "du", "-sh", "/", "find", "-type", "f",]

const questionsAndAnswers = [
    {
        question: "Are you ready to start?",
        answer: "yes"
    },
    {
        question: "What command can you use to list all files and directories in the current directory?",
        answer: "ls"
    },
    {
        question: "How can you create a new directory named 'my_folder' in the current directory?",
        answer: "mkdir my_folder"
    },
    {
        question: "What command can you use to navigate to the home directory of the current user?",
        answer: "cd ~"
    },
    {
        question: "How do you display the contents of a text file named 'my_file.txt' on the terminal?",
        answer: "cat my_file.txt"
    },
    {
        question: "What command allows you to copy a file named 'source.txt' to a directory named 'destination'?",
        answer: "cp source.txt destination/"
    },
    {
        question: "How can you remove a file named 'file_to_delete.txt' from the current directory?",
        answer: "rm file_to_delete.txt"
    },
    {
        question: "What command can you use to find files in the current directory with a '.txt' file extension?",
        answer: "find . -name '*.txt'"
    },
    {
        question: "How do you change the permissions of a file named 'my_script.sh' to make it executable?",
        answer: "chmod +x my_script.sh"
    },
    {
        question: "What command allows you to list the running processes on your system?",
        answer: "ps aux"
    },
    {
        question: "How can you compress a directory named 'my_folder' into a zip archive named 'my_folder.zip'?",
        answer: "zip -r my_folder.zip my_folder"
    }
];

const correctAnswers = [
    "You nailed it! 🎉",
    "Well done! Your command is correct. ✅",
    "Excellent! You're on the right track. 🌟",
    "Perfect! Your command is spot on. ✔️",
    "Great job! Command executed successfully. 👍"
];
const incorrectAnswers = [
    "Oops! That's not quite right. ❌",
    "Hmm, incorrect command. Give it another shot. ❎",
    "Not quite there. Try again! 🔄",
    "Sorry, incorrect command. Keep trying. 🙁",
    "That's not the command we're looking for. 🚫"
];





let playing = false
let currentlevel = 0


for (let index = 0; index < commandsarray.length; index++) {
    heap.innerHTML += `<span class="dragelement bg-gradient mx-1" draggable="true">${commandsarray[index]}</span>`

}


let draggedElement = null; // To keep track of the currently dragged element

// Get all elements with class "dragelement"
const draggableElements = document.querySelectorAll(".dragelement");

// Add a "dragstart" event listener to each draggable element
draggableElements.forEach((element) => {
    element.addEventListener("dragstart", (e) => {
        draggedElement = e.target;
    });
});


// Add "dragover" and "drop" event listeners to each drop target
const dropTargets = [commandline, heap];

dropTargets.forEach((target) => {
    target.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    target.addEventListener("drop", (e) => {
        e.preventDefault();
        if (draggedElement) {
            // Clone the dragged element and append it to the drop target
            const clonedElement = draggedElement.cloneNode(true);
            target.appendChild(clonedElement);
        }
    });
});



enterbtn.addEventListener("click", enterfunction)
// Event listener to detect Enter key press
document.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) { // 13 is the key code for Enter
        enterfunction(); // Call your function here
    }
});




function enterfunction() {

    // read commandline
    let cmdline = readcommandline()

    // check the answer based on current level
    if (cmdline === questionsAndAnswers[currentlevel].answer) {
        // if answer is true 
        // print users answer on command element
        topcommand.innerHTML += `<p class="mycommand">$ ${cmdline}</p>`
        // show a text message on command element to let the user know they passed the level
        commandline.innerHTML = ""

        scrollToBottom();

        // Use setTimeout with an anonymous function
        setTimeout(function () {
            const randomCorrectAnswerIndex = Math.floor(Math.random() * correctAnswers.length);
            const randomCorrectAnswer = correctAnswers[randomCorrectAnswerIndex];
            topcommand.innerHTML += `<p class="">${randomCorrectAnswer}</p>`
            // empty the command line div
            scrollToBottom();

            // Use setTimeout with an anonymous function
            setTimeout(function () {
                // increment current level and print the next question
                currentlevel++
                topcommand.innerHTML += `<p class="">Level ${currentlevel} | ${questionsAndAnswers[currentlevel].question}</p>`
                scrollToBottom();
            }, 1000); // 500 milliseconds (0.5 seconds)

        }, 1000); // 500 milliseconds (0.5 seconds)

    } else {
        // if the answer is false

        // print users answer on command element
        topcommand.innerHTML += `<p class="mycommand">$ ${cmdline}</p>`
        // empty the command line div
        commandline.innerHTML = ""
        scrollToBottom();


        // Use setTimeout with an anonymous function
        setTimeout(function () {

            const randomIncorrectAnswerIndex = Math.floor(Math.random() * incorrectAnswers.length);
            const randomIncorrectAnswer = incorrectAnswers[randomIncorrectAnswerIndex];
            topcommand.innerHTML += `<p class="mycommandred">${randomIncorrectAnswer}</p>`
            // empty the command line div
            scrollToBottom();

            // Use setTimeout with an anonymous function
            setTimeout(function () {
                // increment current level and print the next question
                topcommand.innerHTML += `<p class="">Level ${currentlevel} | ${questionsAndAnswers[currentlevel].question}</p>`
                scrollToBottom();
            }, 1000); // 500 milliseconds (0.5 seconds)

        }, 1000); // 500 milliseconds (0.5 seconds)


    }


}


function readcommandline() {
    // Get all the span elements inside the "commandline" div
    const spanElements = commandline.querySelectorAll("span");

    // Extract the text content of each span into an array
    const spanTextArray = Array.from(spanElements).map((span) => span.textContent);

    // Join the array elements into a single string with spaces between them
    const joinedText = spanTextArray.join(" ");

    // Output the result
    // console.log(joinedText);
    // console.log(typeof (joinedText));
    return joinedText
}

function scrollToBottom() {
    const divElement = document.getElementById("topcommand"); // Replace with your div's actual ID
    divElement.scrollTop = divElement.scrollHeight;
}