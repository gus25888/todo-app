
// Vite permite la importación de HTML de la misma manera que el uso de los módulos JS.
// Se debe usar "?raw" para que no lo intente interpretar como JS y lo use como texto plano.
import html from './app.html?raw';

import todoStore, { Filters } from '../store/todo.store';
import { renderPending, renderTodos } from './use-cases';

// Para evitar el problema de tener que cambiar la referencia de donde se renderiza en el HTML dentro del código,
// se define un objeto con nombres dentro de una constante,
// esto permite el uso de solo los elementos definidos aquí y evitar que la app se "rompa" por cambios en el HTML.
const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}
/**
 * 
 * @param {String} elementId Permite indicar el elemento en el cual se renderizará la aplicación.
 */
export const App = (elementId) => {


    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCountLabel)
    }
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount()
    }




    // Cuando la funcion app se llama, se crea un elemento el cual se agrega dentro del elemento enviado por parámetro
    (() => {
        const app = document.createElement("div");
        // El html se obtiene importandolo desde app.html
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();





    // Referencias HTML
    // Se crean después de la función de renderización inicial para poder tener los elementos ya creados en el DOM.
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const filtersLi = document.querySelectorAll(ElementIDs.TodoFilters);




    /*********************************************************
    **********************    Listeners   ********************** 
    *********************************************************/

    // Usado para determinar cuando crear un nuevo TODO:
    newDescriptionInput.addEventListener('keyup', (event) => {
        // El hecho de usar return para cualquier tecla distinta de ENTER, 
        // Sirve para procesar lo que contiene el newDescriptionInput, solo cuando ENTER es presionado.
        if (event.keyCode !== 13) return;

        // event.target hace referencia al elemento que lanzó este evento...

        // Se toma el valor del input hasta el momento de presionar ENTER....
        const textoIngresado = event.target.value.trim();

        // Si está vacío, no se hace nada.
        if (textoIngresado.length === 0) return;

        // Si tiene texto, se usa para generar un nuevo TODO...
        todoStore.addTodo(textoIngresado);

        // Se limpia el elemento...
        event.target.value = '';

        // Y se renderizan nuevamente los TODOs...
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        // Se busca ascendentemente el elemento más cercano que tenga el atributo "data-id"...
        const elementLi = event.target.closest('[data-id]');
        // Se obtiene el ID del Todo Seleccionado
        const todoIdSelected = elementLi.getAttribute('data-id');
        // Si el elemento seleccionado corresponde al botón de Eliminar...
        if (event.target.nodeName.toLowerCase() === "button" && event.target.className === "destroy") {
            if (confirm(`¿Desea borrar la tarea "${event.target.previousElementSibling.innerText}"?`)) {
                // Se elimina y se refresca la lista...
                todoStore.deleteTodo(todoIdSelected);
                displayTodos();
            }
        } else {
            // Se modifica su estado y se refresca la lista...
            todoStore.toggleTodo(todoIdSelected);
            displayTodos();
        }
    });

    // Borrado de tareas completadas...
    clearCompletedButton.addEventListener('click', (event) => {
        if (confirm(`¿Desea borrar las tareas completadas?`)) {
            todoStore.deleteCompletedTodo()
            displayTodos()
        }
    });

    // Para todos los elementos de filtro, se aplica este evento...
    filtersLi.forEach((element) => {

        element.addEventListener('click', (el) => {
            // Se quita la clase "selected" y después se le agrega al que se hizo "click"...
            filtersLi.forEach(elem => elem.classList.remove('selected'));
            el.target.classList.add('selected');

            // Se basa en el atributo href para determinar el filtro a aplicar...
            const direccionFiltro = el.target.getAttribute("href").toLowerCase();
            const tipoFiltro = direccionFiltro.substring(direccionFiltro.indexOf("/") + 1);

            switch (tipoFiltro) {
                case "all":
                    todoStore.setFilter(Filters.All);
                    break;
                case "completed":
                    todoStore.setFilter(Filters.Completed);
                    break;
                case "pending":
                    todoStore.setFilter(Filters.Pending);
                    break;
            }

            displayTodos()
        })
    });
}