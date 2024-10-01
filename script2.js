class Task {
    createTask(str) {
        return {str: str, status: "Task"};
    }

    createDone(str,id) {
        return {str: str, id: id};
    }

    deleteTask(str, id) {
        return {str: str, id: id};
    };

};

class TaskList {
    
   static dataTask = []

    tasksInDoneData(id) {
        TaskList.dataTask.forEach((el) => {
            if(el.id == id) {
                console.log(el);
                delete el.id;
                el.status = "Done";
            };
        });
    };

    createTask(str) {
        let task = new Task;
        let obj = task.createTask(str);
        let local = new DB,
            createUi = new UI(str);
        obj.id = local.returnIdTasks();
        local.addTasksInLocalData(obj);
        TaskList.dataTask.push(obj);
        createUi.createTasks(obj);
    };

    createLoadDomData() {
        let dataLocal = new DB,
            data = dataLocal.returnLocalStorageData();
        data.forEach((el) => {
            if(el.status == "Done") {
                TaskList.dataTask.push(el);
                let createUi = new UI;
                createUi.createDone(el)
            } else {
                TaskList.dataTask.push(el);
                let createUi = new UI;
                createUi.createTasks(el)
            }    
        });
    };

    createDone(str, id) {
        let done = new Task;
        let obj = done.createDone(str,id)
        let local = new DB,
        createUi = new UI;
        local.tasksInDoneData(obj.id);
        createUi.createDone(obj);
        this.tasksInDoneData(obj.id);
    };

    deleteTask(str, id) {
        let task = new Task
        let obj = task.deleteTask(str, id)
        let data = TaskList.dataTask.filter((el) => {if(el.id != obj.id) {return el}}),
            createUi = new UI,
            dataLocal = new DB;
        createUi.deleteTasks(obj);
        TaskList.dataTask = data;
        dataLocal.deleteObjectInLocal(obj.id);
    };

};

//TaskList.prototype.data = [];

class UI {

    createTasks(obj) {
        document.getElementById('articleTasks').insertAdjacentHTML('afterbegin', `<section class="sectionTodo" id = "section${obj.id}">
        <p class='pTasks'>${obj.str}</p> 
        <article class="acticleSectionTodo"> 
        <button class = 'buttonTodoSection' id='buttonCheck' data-id = '${obj.id}' data-name = 'True'><img calss='imgTodo' data-id = ${obj.id} data-name = 'True'src="foto/Check.png"></button> 
        <button class = 'buttonTodoSection' data-id = "${obj.id}" data-name = 'Del'>
        <svg class='svgTodo' data-id = ${obj.id} data-name = 'Del' width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path data-name = 'Del' d="M18.6112 4.125H3.48621C3.30387 4.125 3.129 4.19743 3.00007 4.32636C2.87114 4.4553 2.79871 4.63016 2.79871 4.8125C2.79871 4.99484 2.87114 5.1697 3.00007 5.29864C3.129 5.42757 3.30387 5.5 3.48621 5.5H4.17371V17.875C4.17371 18.2397 4.31857 18.5894 4.57643 18.8473C4.8343 19.1051 5.18403 19.25 5.54871 19.25H16.5487C16.9134 19.25 17.2631 19.1051 17.521 18.8473C17.7788 18.5894 17.9237 18.2397 17.9237 17.875V5.5H18.6112C18.7935 5.5 18.9684 5.42757 19.0973 5.29864C19.2263 5.1697 19.2987 4.99484 19.2987 4.8125C19.2987 4.63016 19.2263 4.4553 19.0973 4.32636C18.9684 4.19743 18.7935 4.125 18.6112 4.125ZM16.5487 17.875H5.54871V5.5H16.5487V17.875ZM6.92371 2.0625C6.92371 1.88016 6.99614 1.7053 7.12507 1.57636C7.254 1.44743 7.42887 1.375 7.61121 1.375H14.4862C14.6685 1.375 14.8434 1.44743 14.9723 1.57636C15.1013 1.7053 15.1737 1.88016 15.1737 2.0625C15.1737 2.24484 15.1013 2.4197 14.9723 2.54864C14.8434 2.67757 14.6685 2.75 14.4862 2.75H7.61121C7.42887 2.75 7.254 2.67757 7.12507 2.54864C6.99614 2.4197 6.92371 2.24484 6.92371 2.0625Z" fill="#9e78cf"/>
        </svg>
        </button>
    </article></section`);
    document.getElementById('h2Tasks').textContent = `Tasks to do - ${document.getElementById('articleTasks').children.length}`;
    }

    createDone(obj) {
        document.getElementById('articleDone').insertAdjacentHTML("afterbegin", `<section class="sectionTodo"><p class='pDone'><strike>${obj.str}</strike></p></section> `);
        document.getElementById('h2Done').textContent = `Done - ${document.getElementById('articleDone').children.length}`;
        if(document.getElementById(`section${obj.id}`)) {
            document.getElementById(`section${obj.id}`).remove();
            document.getElementById('h2Tasks').textContent = `Tasks to do - ${document.getElementById('articleTasks').children.length}`;
        };
    };

    deleteTasks(obj) {
        document.getElementById(`section${obj.id}`).remove();
        document.getElementById('h2Tasks').textContent = `Tasks to do - ${document.getElementById('articleTasks').children.length}`;
    }

}

class DB {

    returnIdTasks() {
        let ar = [],
            data = this.returnLocalStorageData();
            data.forEach((el) => {
                if(el.id) {
                    ar.push(el.id);
                }
            });
            if(ar.length) {
                return Math.max(...ar) + 1;
            } else {
                return 1
            }
    };

    addTasksInLocalData(str) {
        let data = this.returnLocalStorageData();
        delete localStorage.Todo;
        data.push(str) ;
        //return data
        localStorage.setItem('Todo', JSON.stringify(data));
    };

    createLocalStorageData() {
        localStorage.setItem('Todo', JSON.stringify([]));
    };

    returnLocalStorageData() {
        return JSON.parse(localStorage.Todo);
    };

    tasksInDoneData(id) {
        let data = this.returnLocalStorageData();
        delete localStorage.Todo;
        data.forEach((el) => {
            if(el.id == id) {
                el.status = "Done"
                delete el.id
            }
        })
        localStorage.setItem('Todo', JSON.stringify(data));
    };

    deleteObjectInLocal(id) {
        let data = this.returnLocalStorageData();
        delete localStorage.Todo;
        let result = data.filter((element) => {if(id != element.id) {return element}});
        //return result
        localStorage.setItem('Todo', JSON.stringify(result));
    };

}

//module.exports = DB;
document.addEventListener('DOMContentLoaded', () => {
    if(!localStorage.Todo) {
        let local = new DB;
        local.createLocalStorageData();
    } else {
        let createData = new TaskList;
        createData.createLoadDomData();
    };
});

document.getElementById('buttonTodoAdd').addEventListener('click', (el) => {
    el.preventDefault();
    if(document.getElementById('inputTextTodo').value) {
        let add = new TaskList;
        add.createTask(document.getElementById('inputTextTodo').value);
    } else {
        alert('Вы ничего не ввели');
    };
});

document.addEventListener('click', (el) => {
    if(el.target.dataset.name) {
        if(el.target.dataset.name == 'True' ) {
            let  str =  el.target.parentElement.parentElement.parentElement.children[0].textContent,
                 done = new TaskList;
            done.createDone(str, el.target.dataset.id);
        } else if(el.target.dataset.name == 'Del') {
            let  str =  el.target.parentElement.parentElement.parentElement.children[0] ,
                 done = new TaskList;
                 done.deleteTask(str, el.target.dataset.id);
        };
    };
    
});