/* 
    El "store" es un repositorio centralizado de la información de una aplicación, 
    se busca generar un acceso único dentro de toda la aplicación.
*/
import { Todo } from "../todos/models/todo.model";

// La definición de un objeto para las opciones de filtros permite mantener opciones limitadas para el uso dentro del "store"
export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}


const state = {
    todos: [
        // new Todo('Piedra del Alma'),
        // new Todo('Piedra de la Realidad'),
        // new Todo('Piedra del Tiempo'),
        // new Todo('Piedra del Poder'),
        // new Todo('Piedra de la Mente'),
    ],
    filter: Filters.All
}

// Esta función permite obtener información desde el storage (disco, BD, etc.) y cargarla al inicio de la aplicación.
const initStore = () => {
    loadStore();
    console.log(`InitStore 🍍`);
}

/**
 * 
 * @returns state Retorna el State con los valores obtenidos desde LocalStorage, si los hay.
 */
const loadStore = () => {
    if (!localStorage.getItem("state")) return;

    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem("state"));
    state.todos = todos;
    state.filter = filter;
}

/**
 * Permite grabar la información en el LocalStorage del navegador web.
 * El localStorage es un espacio de disco en que se puede guardar información asociada al dominio desde el que se llame. 
 * Es persistente mientras se mantengan los datos del navegador.
 * Es visible por cualquiera dentro del navegador, por lo que no se debe guardar datos sensibles ahí.
 * La información guardada son pares de clave / valor, que solo aceptan Strings.
 * Su manipulación se considera una operación síncrona.
 */
const saveStateToLocalStorage = () => {
    localStorage.setItem("state", JSON.stringify(state))
}

/**
 * Permite obtener los Todos creados, dependiendo del filtro indicado.
 * @param {Filters} filter 
 */
const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            // Se devuelve un array con una "copia" de los "todos" para evitar la posibilidad de modificar datos por accidente.
            // Esto se hace debido a que las variables pasan "por referencia" en JS.
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Option ${filter} is not valid.`);
    }
}
/**
 * Agrega un nuevo Todo al listado.
 * @param {String} description 
*/
const addTodo = (description) => {
    if (!description)
        throw new Error('Description required to create a To Do.');

    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Number} todoId Id del todo a modificar.
 */
const toggleTodo = (todoId) => {
    let positionTodo = -1;
    // Se busca el Todo indicado por ID de Todo, y se guarda su posición en el array.
    const todoFound = state.todos.find((element, index) => {
        if (element.id === todoId) {
            positionTodo = index;
            return element;
        }
    });

    if (!todoFound) {
        throw new Error(`todoId ${todoId} not found.`)
    }
    // Se invierte el valor de "done".
    todoFound.done = !todoFound.done;
    // Se actualiza el Todo en el array
    state.todos[positionTodo] = todoFound;
    saveStateToLocalStorage();
}

/**
 * Elimina el Todo identificado por Id.
 * @param {Number} todoId Id del todo a modificar.
 */
const deleteTodo = (todoId) => {
    // Para borrar se asigna una copia al array de todos los elementos del mismo, excluyendo el enviado.
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();

}

/**
 * Borra todos los Todos completados.
 */
const deleteCompletedTodo = () => {
    // Para borrar las completadas se asigna una copia al array de todos los elementos que NO estén completados.
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();

}

/**
 * Permite determinar el filtro a usar.
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    if (!Object.values(Filters).includes(newFilter))
        throw new Error(`Filter must be one of these "${Object.keys(Filters).join(',')}".`);

    state.filter = newFilter;
    saveStateToLocalStorage();

}

const getCurrentFilter = () => state.filter;

export default {
    addTodo,
    deleteCompletedTodo,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}