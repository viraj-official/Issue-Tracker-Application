package com.example.issuetracker.controller;

import com.example.issuetracker.enums.*;
import com.example.issuetracker.model.Task;
import com.example.issuetracker.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Slf4j
@Validated
@RestController
@RequestMapping(path = "/task")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping()
    public ResponseEntity<Task> newTask(@RequestBody Task task) {
        Task createdTask = taskService.createTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @PutMapping()
    public Task updateTask(@RequestBody Task task) {
        return taskService.updateTask(task);
    }

    @GetMapping("/{id}")
    public Task viewTask(@PathVariable Integer id) {
        return taskService.getTaskById(id);
    }

    @GetMapping("/all")
    public List<Task> viewAllTasks() {
        return taskService.getAllTasks();
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Integer id) {
        taskService.deleteTask(id);
    }

    @GetMapping("/search")
    public List<Task> searchTasks(@RequestParam(required = false) String title,
                                  @RequestParam(required = false) String description,
                                  @RequestParam(required = false) Company company,
                                  @RequestParam(required = false) Severity severity,
                                  @RequestParam(required = false) Priority priority,
                                  @RequestParam(required = false) Status status) {
        return taskService.searchTasks(title, description, company, severity, priority, status);
    }
}
