package com.example.issuetracker.controller;

import com.example.issuetracker.model.Task;
import com.example.issuetracker.enums.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
    }

    @Test
    public void testGetAllTasks() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/task/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void testGetTaskById() throws Exception {
        Integer taskId = 29;
        mockMvc.perform(MockMvcRequestBuilders.get("/task/{id}", taskId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(taskId));
    }

    @Test
    public void testCreateTask() throws Exception {
        Task newTask = new Task();
        newTask.setTitle("New Task Title");
        newTask.setDescription("New Task Description");
        newTask.setCompany(Company.APPLE);
        newTask.setSeverity(Severity.HIGH);
        newTask.setPriority(Priority.HIGH);
        newTask.setStatus(Status.TESTING);

        mockMvc.perform(MockMvcRequestBuilders.post("/task")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newTask)))
                .andExpect(status().isCreated());
    }

    @Test
    public void testUpdateTask() throws Exception {
        Integer taskId = 1;
        Task updatedTask = new Task();
        updatedTask.setId(taskId);
        updatedTask.setTitle("Updated Task Title");
        updatedTask.setDescription("Updated Task Description");

        mockMvc.perform(MockMvcRequestBuilders.put("/task")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedTask)))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteTask() throws Exception {
        Integer taskId = 29;

        mockMvc.perform(MockMvcRequestBuilders.delete("/task/{id}", taskId))
                .andExpect(status().isOk());
    }

    @Test
    public void testSearchTasks() throws Exception {
        String title = "Sample Task";
        mockMvc.perform(MockMvcRequestBuilders.get("/task/search")
                        .param("title", title)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}