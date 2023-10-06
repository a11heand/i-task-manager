/*
Filename: ComplexCode.js

This code is a complex implementation of a task management system.
It includes features such as creating and managing tasks, assigning due dates,
tracking progress, and generating reports.

Author: John Doe
Date: October 1, 2022
*/

// --------------- Utility Functions ---------------

/**
 * Generates a random string of specified length.
 * @param {number} length - Length of the generated string.
 * @returns {string} - Randomly generated string.
 */
function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Generates a random integer between specified min and max values.
 * @param {number} min - Minimum value.
 * @param {number} max - Maximum value.
 * @returns {number} - Randomly generated integer.
 */
function generateRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --------------- Task Management System ---------------

class Task {
  constructor(id, title, description, dueDate) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isCompleted = false;
  }

  completeTask() {
    this.isCompleted = true;
    console.log(`Task ${this.id} marked as completed.`);
  }

  postponeTask(days) {
    const currentDate = new Date();
    this.dueDate.setDate(this.dueDate.getDate() + days);
    console.log(`Task ${this.id} due date postponed by ${days} days.`);
    if (this.dueDate < currentDate) {
      console.log(`Task ${this.id} is overdue!`);
    }
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
  }

  createTask(title, description, dueDate) {
    const id = generateRandomString(6);
    const task = new Task(id, title, description, dueDate);
    this.tasks.push(task);
    console.log(`Task ${task.id} created successfully.`);
  }

  completeTask(taskId) {
    const task = this.findTaskById(taskId);
    if (task) {
      task.completeTask();
    } else {
      console.log(`Task with ID ${taskId} not found.`);
    }
  }

  postponeTask(taskId, days) {
    const task = this.findTaskById(taskId);
    if (task) {
      task.postponeTask(days);
    } else {
      console.log(`Task with ID ${taskId} not found.`);
    }
  }

  findTaskById(taskId) {
    return this.tasks.find(task => task.id === taskId);
  }

  generateReport() {
    const completedTasks = this.tasks.filter(task => task.isCompleted);
    const inProgressTasks = this.tasks.filter(task => !task.isCompleted);

    console.log(`----- Completed Tasks -----`);
    completedTasks.forEach(task => {
      console.log(`ID: ${task.id}`);
      console.log(`Title: ${task.title}`);
      console.log(`Description: ${task.description}`);
      console.log(`Due Date: ${task.dueDate}`);
      console.log(`Status: Completed`);
      console.log(`---------------------------`);
    });

    console.log(`----- In Progress Tasks ------`);
    inProgressTasks.forEach(task => {
      console.log(`ID: ${task.id}`);
      console.log(`Title: ${task.title}`);
      console.log(`Description: ${task.description}`);
      console.log(`Due Date: ${task.dueDate}`);
      console.log(`Status: In Progress`);
      console.log(`---------------------------`);
    });
  }
}

// --------------- Usage ---------------

const taskManager = new TaskManager();

taskManager.createTask('Implement Login Page', 'Implement the UI and functionality for the login page.', new Date(2022, 10, 5));
taskManager.createTask('Add Validation', 'Implement form validation for login inputs.', new Date(2022, 10, 7));
taskManager.createTask('Implement Dashboard', 'Implement the main dashboard with all its components.', new Date(2022, 10, 10));

taskManager.completeTask('ABCDE1');
taskManager.completeTask('FGHIJK');
taskManager.postponeTask('ABCDE1', 2);
taskManager.generateReport();
