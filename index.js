$(function(){

    const btnReset = document.querySelector(".btnReset");
    const btnAdd = document.querySelector(".btnAdd");
    const todo = document.querySelector(".todo");
    const dueDate = document.querySelector(".dueDate");
    const dueTime = document.querySelector(".dueTime");
    const overDueContent = document.querySelector(".overDueContent");
    const overDueTasks = document.querySelector(".overDueTasks");
    const todayTasks = document.querySelector(".todayTasks");
    const tomorrowTasks = document.querySelector(".tomorrowTasks");
    const thisWeekTasks = document.querySelector(".thisWeekTasks");
    const laterTasks = document.querySelector(".laterTasks");
    const hobbies = document.querySelector(".hobbies");
    const work = document.querySelector(".work");
    const reminder = document.querySelector(".reminder");
    const studies = document.querySelector(".studies");
    let getDate = new Date().getDate();
    let getMonth = new Date().getMonth()+1;
    let getFullYear = new Date().getFullYear();
    let getDay = new Date().getDay()+1;
    ///declare allNotes as new array or active array of localStorage
    if(JSON.parse(localStorage.getItem('todos'))){
        allNotes = JSON.parse(localStorage.getItem('todos'));
    }else{
        allNotes = [];
    };



    ////////////////////// start of quotes API function
    function getYourQuote(){
        $.get("https://type.fit/api/quotes", function(j){
            let q = Math.floor(Math.random()*JSON.parse(j).length)
            $(".blockquote p").text(`“${JSON.parse(j)[q].text}”`);
            $(".cite").text(JSON.parse(j)[q].author);
        })
    }

    getYourQuote()
    //////////////// end of quotes API function




    ///////start of cats API
    function getYourCat(){
        $.get("https://api.thecatapi.com/v1/images/search", function(j){
            $("img").attr("src",j[0].url);
        })
    }

    $("img").click(function(){
        getYourCat()
    })

    $(".topTitle").click(function(){
        $(".catsHidden").toggleClass("hide");
        $(".catsPar").toggleClass("hide");
    })

    getYourCat()
    
    //////end of cats API



    /////////////////// input checks, and buttons
    // text area input check
    todo.addEventListener("keyup", function(){
        if(todo.value){
            todo.classList.remove("is-invalid")
            todo.classList.add("is-valid");
        }else{
            todo.classList.remove("is-valid");
        }
    });

    
    // date input check
    dueDate.addEventListener("focusout", function(){
        let x = dueDate.value.split("-");
        if(x[0]<getFullYear){
            dueDate.classList.add("is-invalid");
        }else if(x[0]==getFullYear && x[1]<getMonth){
            dueDate.classList.add("is-invalid");
        }else if(x[0]==getFullYear && x[1]==getMonth && x[2]<getDate){
            dueDate.classList.add("is-invalid");
        }else{
            dueDate.classList.remove("is-invalid")
            dueDate.classList.add("is-valid");
        }
    });
    
    
    // hour input check
    dueTime.addEventListener("focusout", function(){
        if(dueTime.value){
            dueTime.classList.add("is-valid");
        }else{
            dueTime.classList.remove("is-valid");
        }
    });
    
    //Reset Button
    btnReset.addEventListener("click", function(){
        resetAfterRstAndSubmit()
    });
    /////////////////////////////////// end of "input checks, and buttons"
    
    
    // reset fields after reset button and submitting a form
    function resetAfterRstAndSubmit(){
        todo.value = null;
        dueDate.value = null;
        dueTime.value = null;
        todo.classList.remove("is-invalid");
        todo.classList.remove("is-valid");
        dueDate.classList.remove("is-invalid");
        dueDate.classList.remove("is-valid");
        dueTime.classList.remove("is-valid");
    };
    
    
    
    
    // checking what radio is selected
    function getRadioCheck(){
        if (hobbies.checked){
            return "green"
        }else if(work.checked){
            return "yellow"
        }else if(reminder.checked){
            return "info"
        }else if(studies.checked){
            return "grey"
        }
    };





    function createElements(){
        newDiv = document.createElement("div");
        newDiv.classList.add("card","text-white","m-2","notes", "d-inline-block");
        newDiv.setAttribute("style","max-width: 18rem;");
        headerDiv = document.createElement("div");
        headerDiv.classList.add("card-header","d-flex","justify-content-between","align-items-center");
        newDiv.appendChild(headerDiv);
        newDelBtn = document.createElement("i");
        newDelBtn.classList.add("fa","fa-close","hide");
        bodyDiv = document.createElement("div");
        bodyDiv.classList.add("card-body","d-flex","flex-column","justify-content-between");
        newDiv.appendChild(bodyDiv);
        textParagraph = document.createElement("p");
        textParagraph.classList.add("card-text");
        dateParagraph = document.createElement("P");
        dateParagraph.classList.add("mb-0","mt-3");
        timeParagraph = document.createElement("p");
        timeParagraph.classList.add("mb-2");
        let dateAndTimeDiv = document.createElement("div");
        bodyDiv.appendChild(textParagraph);
        bodyDiv.appendChild(dateAndTimeDiv);
        dateAndTimeDiv.appendChild(dateParagraph);
        dateAndTimeDiv.appendChild(timeParagraph);
        newDelBtn.addEventListener("click", function(e){
            e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement)
            for (t=0; t<allNotes.length; t++){
                // looking for the chore name in local storage
                if(e.target.parentElement.parentElement.children[1].children[0].innerHTML == allNotes[t].chore){
                    let dateSwap = allNotes[t].deadline.split("-");
                    let temp = dateSwap[0];
                    dateSwap[0]=dateSwap[2];
                    dateSwap[2]=temp;
                    temp = dateSwap.join("/");
                    // looking for the same date in the note, in case you wrote "do the dishes" for example in two different days
                    if(e.target.parentElement.parentElement.children[1].children[1].children[0].innerHTML==temp){
                        let remainNotes = allNotes;
                        remainNotes.splice(t,1);
                        localStorage.todos = JSON.stringify(remainNotes);
                        allNotes = JSON.parse(localStorage.getItem('todos'));
                        break;
                    }
                }
            }
        })
    };
    

    

    
    
    
    // loading the notes at first
    getData();
    function getData(){
        if(localStorage.getItem('todos')){
            for(i=0; i<allNotes.length; i++){
                //creating the necessary elements with a function
                createElements()
                //changing the bgc in accordance with the user's choice
                if (allNotes[i].field == "green"){
                    newDiv.setAttribute("style","background-color: #4C834C");
                    headerDiv.innerHTML = "Hobbies"
                }else if(allNotes[i].field == "yellow"){
                    newDiv.classList.add("bg-warning");
                    headerDiv.innerHTML = "Work"
                }else if(allNotes[i].field == "info"){
                    newDiv.classList.add("bg-info");
                    headerDiv.innerHTML = "Reminder"
                }else if(allNotes[i].field == "grey"){
                    newDiv.classList.add("bg-secondary");
                    headerDiv.innerHTML = "Studies"
                };
                // this line didn't work in the function, so I had to put it here
                headerDiv.appendChild(newDelBtn);
                //
                // defining the date, switching from yyyy/mm/dd to dd/mm/yyyy, and creating the notes in the right time
                let changeDate = allNotes[i].deadline;
                let swap = changeDate.split("-");
                let y = 7-getDay;
                if(+swap[0]<getFullYear){
                    overDueTasks.appendChild(newDiv);
                    overDueContent.classList.remove("d-none")
                }else if(+swap[0]==getFullYear && +swap[1]<getMonth){
                    overDueTasks.appendChild(newDiv);
                    overDueContent.classList.remove("d-none")
                }else if(+swap[0]==getFullYear && +swap[1]==getMonth && +swap[2]<getDate){
                    overDueTasks.appendChild(newDiv);
                    overDueContent.classList.remove("d-none")
                }else if(+swap[0]==getFullYear && +swap[1]==getMonth && +swap[2]==getDate){
                    todayTasks.appendChild(newDiv);
                }else if(+swap[0]==getFullYear && +swap[1]==getMonth && +swap[2]==getDate+1){
                    tomorrowTasks.appendChild(newDiv);
                }else if(+swap[0]==getFullYear && +swap[1]==getMonth && +swap[2]<=getDate+y){
                    thisWeekTasks.appendChild(newDiv);
                }else{
                    laterTasks.appendChild(newDiv);
                };
                let year = swap[0];
                swap[0] = swap[2];
                swap[2] = year;
                let join = swap.join("/");
                //creating the innerHTML
                dateParagraph.innerHTML = join;
                textParagraph.innerHTML = allNotes[i].chore;
                timeParagraph.innerHTML = allNotes[i].when;
            }
        }
    };
    

    
    // saving the note to the page
    btnAdd.addEventListener("click", function(e){
        let text = todo.value;
        let date = dueDate.value;
        let time = dueTime.value;
        //checking the radio selected
        let radioCheck = getRadioCheck();
        // date verification, you can't add overdue tasks
        let changeDate = date;
        let swap = changeDate.split("-");
        let y = 7-getDay;
        if(text && date){
            if(+swap[0]<getFullYear){
                dueDate.classList.add("is-invalid");
            }else if(+swap[0]==getFullYear && +swap[1]<getMonth){
                dueDate.classList.add("is-invalid");
            }else if(+swap[0]==getFullYear && +swap[1]==getMonth && +swap[2]<getDate){
                dueDate.classList.add("is-invalid");
            }else{
            // Saving the data to myNote and push it to allNotes, and then to localStorage
            let myNote = {chore:text,deadline:date,when:time,field:radioCheck};
            allNotes.push(myNote);
            localStorage.todos = JSON.stringify(allNotes);
            // Creating the necessary elements
            createElements()
            // changing the bgc in accordance with the user's choice
            if (radioCheck == "green"){
                newDiv.setAttribute("style","background-color: #4C834C");
                headerDiv.innerHTML = "Hobbies"
            }else if(radioCheck == "yellow"){
                newDiv.classList.add("bg-warning");
                headerDiv.innerHTML = "Work"
            }else if(radioCheck == "info"){
                newDiv.classList.add("bg-info");
                headerDiv.innerHTML = "Reminder"
            }else if(radioCheck == "grey"){
                newDiv.classList.add("bg-secondary");
                headerDiv.innerHTML = "Studies"
            };
            // this line didn't work in the function, so I had to put it here
            headerDiv.appendChild(newDelBtn);
            //
            // Swap the day and year in the date extracted from dueDate(date input), and checking where to put it
            if(+swap[0]==getFullYear && +swap[1]==getMonth && +swap[2]==getDate){
                todayTasks.appendChild(newDiv);
            }else if(+swap[0]==getFullYear && +swap[1]==getMonth && +swap[2]==getDate+1){
                tomorrowTasks.appendChild(newDiv);
            }else if(+swap[0]==getFullYear && +swap[1]==getMonth && +swap[2]<=getDate+y){
                thisWeekTasks.appendChild(newDiv);
            }else{
                laterTasks.appendChild(newDiv);
            };
            let year = swap[0];
            swap[0] = swap[2];
            swap[2] = year;
            let join = swap.join("/");
            // applying innerHTMLs
            dateParagraph.innerHTML = join;
            textParagraph.innerHTML = text;
            timeParagraph.innerHTML = time;
            // removing the valid class created by the event listener of the validation
            todo.classList.remove("is-valid");
            dueDate.classList.remove("is-valid");
            // reset the input fields
            todo.value = "";
            dueDate.value = "";
            dueTime.value = "";
        }
        
        }else{
            if(!text && !date){
                todo.classList.add("is-invalid");
                dueDate.classList.add("is-invalid");
            }else if(!text){
                todo.classList.add("is-invalid");
            }else{
                dueDate.classList.add("is-invalid");
            }
        }
    })
})