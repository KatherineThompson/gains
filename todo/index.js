(function($) {
    'use strict';
    
    const view = getView(),
        controller = getController(),
        model = getModel();
        
    controller.init(view, model);
    
    /**
     * The model contains functions related to the backing
     * data of our app. A task is represetnted as an object:
     * 
     *      {name: string, isComplete: boolean}
     * 
     * For instance:
     *  
     *      {name: "Feed the cat", isComplete: false}
     * 
     * Our collection of tasks is represented as a list of tasks.
     * 
     *      [{name: "Wash the cat", isComplete: true}]
     * 
     * It is ok for two tasks to have the same name.
     */
    function getModel() {
        
        /**
         * Get a set of default tasks that can be used
         * if the user does not have anything in local storage.
         * 
         * @return a list of tasks, all of which have isComplete = false
         */
        function getDefaultTasks() {
            // Define some list of initial tasks
            // and return that list, instead of 
            // just returning an empty list.
            return [];
        }
        
        /**
         * Get a set of default completed tasks that can be used
         * if the user does not have anything in local storage.
         * 
         * @return a list of completed tasks, all of which have isComplete = true
         */
        function getDefaultCompletedTasks() {
            // Just like getDefaultTasks, except
            // these are the tasks that the user 
            // has already completed.
            return [];
        }
        
        /**
         * Load tasks from persistent storage. Called by the controller 
         * when the app is initializing, and we want to fetch the 
         * tasks saved from the user's previous session.
         * 
         * @return a list of tasks if there are tasks in storage. null if there is nothing in storage.
         */
        function loadTasks() {
            // Access local storage, and check to see if there is anything saved
            // under the key that this app uses for incomplete tasks. You may wish to store this key 
            // as a const that can be shared between both this function and 
            // saveTasks(). If there is nothing saved under the key, then return null.
            // Otherwise, return the saved value.
            return null;
        }
        
        /**
         * Load completed tasks from persistent storage. Called by the controller 
         * when the app is initializing, and we want to fetch the 
         * completed tasks saved from the user's previous session.
         * 
         * @return a list of completed tasks if there are tasks in storage. null if there is nothing in storage.
         */
        function loadCompletedTasks() {
            // Access local storage, and check to see if there is anything saved
            // under the key that this app uses for complete tasks. You may wish to store this key 
            // as a const that can be shared between both this function and 
            // saveTasks(). If there is nothing saved under the key, then return null.
            // Otherwise, return the saved value.
            return null;
        }
        
        /**
         * Save tasks to persistent storage. Called by the controller
         * whenever the user makes a change that we want to persist
         * between sessions. Invoking this method overwrites any tasks
         * that were previously saved in local storage.
         * 
         * @param tasks - a list of tasks to save to local storage.
         * @return nothing
         */
        function saveTasks(tasks) {
            // Write `tasks` to local storage. To figure out which
            // key to use, see if the tasks are marked as complete or not.     
        }
        
        return {getDefaultTasks: getDefaultTasks, loadTasks: loadTasks, saveTasks: saveTasks};
    }
    
    /**
     * The view contains functions for dealing with the DOM:
     * registering event handlers, updating elements to have
     * new values, etc. All DOM-specific knowledge (eg which
     * class names exist on which elements) lives here.
     */
    function getView() {
        /**
         * Add a task to the end of the list. Called by the controller when
         * a new task has been created, and it needs to be added to the view.
         * 
         * @param task - a task to add.
         * @return nothing
         */
        function addTask(task) {
            // Construct a DOM element for the new task. If task.isComplete === true,
            // the task will look different. (See index.html for a spec of how it should look.)
            
            // Find the DOM element that contains the list of tasks. If task.isComplete === true,
            // you'll want to use the list that contains completed tasks. Otherwise,
            // you'll want to use the list that contains uncompleted tasks.  
            
            // Append the newly created DOM element to the list of tasks DOM element
        }
        
        /**
         * Register a function to be invoked when a new task is created
         * by the user. Invoke that function with the task name.
         * 
         * Called by the controller so it can update the model when the user
         * wants to create a new task.
         * 
         * @param callback - a function to invoke with the name of a newly created task
         * @return nothing
         */
        function onTaskCreated(callback) {
            // Find the DOM element that lets us know when a new task was created.
            // (This is probably a button that gets clicked, or a form that gets 
            // submitted, or a text field that has the "enter" key pressed, etc.)
            
            // Add an event listener to that DOM element so we know when a new 
            // task is created.
            
                // Within that event listener, figure out what the name of the
                // new task should be. 
                
                // Call the callback with that new name.
        }
        
        /**
         * Register a function to be invoked when an existing task is completed.
         * Invoke that function with the index of the task that has been completed.
         * 
         * @param callback - a callback to call when a task has been completed.
         * @return nothing
         */
        function onTaskCompleted(callback) {
            // Find DOM elements that the user will interact with to indicate
            // that a task has been completed.
            
            // Add an event listener to those DOM elements so we know when a task
            // has been completed.
            
                // Within that event listener, figure out what the index of the 
                // completed task is.
                
                // Call the callback with that index.
        }
        
        /**
         * Remove the task at index taskIndex from the DOM list of uncomplete tasks.
         * Called by the controller when a task has been completed by the user,
         * and it needs to be removed from the incomplete list.
         * 
         * @param taskIndex - an integer indicating which task to remove
         * @return nothing
         */
        function removeTaskFromUncompletedList(taskIndex) {
            // Find the DOM element containing a list of incomplete tasks.
            // Find the child at index taskIndex.
            // Remove that child.
        }
        
        /**
         * Register a function to be invoked when an existing task's priority is changed
         * by the user. Invoke the function with the task's index in the list, and a boolean indicating
         * if the priority is increasing or decreasing. True means that the priority is
         * increasing, whereas false means that the priority is decreasing.
         * 
         * @param callback - a function that will be invoked with two arguments: 
         *                   (taskIndex, isIncreasingPriority) when a task's priority is 
         *                   changed by the user.
         * @return nothing
         */
        function onTaskPriorityChange(callback) {
            // Find DOM elements that the user will click to change a task's priority.
            
            // Add an event listener to those DOM elements.
            
                // Within that event listener, figure out what the index of the task
                // that was clicked is. Also, figure out if the priority should be 
                // increasing or decreasing.
                
                // Call the callback with the aforementioned index, and a boolean
                // representing if the priority is increasing or decreasing.
        }
        
        /**
         * Increase a task's priority in the list of incomplete tasks.
         * Called by the controller when it sees that the user wants to
         * bump up a task's ranking. If the task is already at the top of 
         * the list, this function does nothing.
         * 
         * @param taskIndex - the index in the incomplete task DOM list of the task to rank up.
         * @return nothing
         */
        function increaseTaskPriority(taskIndex) {
            // Find the DOM element that contains incomplete tasks
            // Find the task with index taskIndex
            // Modify the DOM to move that element before its sibling. 
        }
        
        /**
         * Decrease a task's priority in the list of incomplete tasks.
         * Called by the controller when it sees that the user wants to
         * lower a task's ranking. If the task is already at the 
         * bottom of the list, this function does nothing.
         * 
         * @param taskIndex - the index in the incomplete task DOM list of the task to rank down.
         * @return nothing
         */
        function decreaseTaskPriority(taskIndex) {
            // Find the DOM element that contains incomplete tasks
            // Find the task with index taskIndex
            // Modify the DOM to move that element after its sibling. 
        }
        
        return {
            onTaskCreated: onTaskCreated, 
            addTask: addTask,
            removeTaskFromUncompletedList: removeTaskFromUncompletedList,
            onTaskCompleted: onTaskCompleted,
            onTaskPriorityChange: onTaskPriorityChange,
            increaseTaskPriority: increaseTaskPriority, 
            decreaseTaskPriority: decreaseTaskPriority
        };
    }
    
    /**
     * The controller ties everything together. It orchestrates
     * calling the view and model to create a working app.
     * It is responsible for the initial bootstrapping of the
     * application, as well as handling business logic, input
     * validation, etc.
     */
    function getController() {
        /**
         * Bootstrap the app. Called by the outermost function
         * in this file to get everything started.
         * 
         * @param The view functions, used to interface with the DOM
         * @param The model functions, used to interface with the data
         * @return nothing
         */
        function init(view, model) {
            debugger;
            
            // Using the model, load the tasks from storage.
            // const tasks = ???
            // const completedTasks = ???
            // We want to define these lists here, so we can 
            // share them via closure with the rest of the controller.
            
            // If the tasks are null, it means we didn't have anything in 
            // storage. Use the default tasks, provided by the model, instead.
            
            // Now that we have some tasks, add them to the view.
            
            // We want to know when a new task is created, but we don't
            // want to hardcode to DOM details in the controller. We'll
            // use the view to allow us to talk to the DOM while containing
            // those potentially messy details to one part of our code.
            view.onTaskCreated(function(newTaskName) {
                // If this function is being called, then we know
                // that a new task has been created. Let's create a new 
                // task object to represent that new task. New tasks start
                // with isComplete = false.
                
                // Once we have a new task object, add it to the view.
                // Next, add it to our in-memory tasks list. 
                
                // Save the tasks list to persistent storage.  
            });
            
            // Just like we needed a way to know when tasks are created,
            // we need a way to know when tasks are completed. Again, 
            // the view will notify us. Call the view function that will
            // allow us to provide a callback that give us a chance to
            // react to a task being commpleted.
            
                // Within that callback, remove the completed task from the view's
                // collection of incomplete tasks.
                
                // Additionally, find that task in our in-memory tasks list. Mark
                // it as completed. Remove it from the tasks list, and add it
                // to the completedTasks list.
                
                // Add the newly completed task to the view, so it shows up in the 
                // completed tasks DOM list.
                
                // Save both in-memory task lists to persistent storage.
                
            // We would also like to know when a task has been re-ordered. 
            // Just like we registered a callback with the view for when a task
            // was created or completed, register a callback for when a task
            // has been re-ordered.
            
                // Within that callback, use the index to find the task to update.
                
                // Call a view function to move the task up or down in the list.
                
                // Modify the in-memory tasks list so the task is bumped forward
                // or backward, as need be.
                
                // Save the tasks list to persistent storage.
            
        }
        
        return {init: init};
    }
    
})(window.$);