package com.rit.arcade.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class PrintOrderController {

    // Simulating Spring Service dependency injection
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllOrders() {
        return ResponseEntity.ok(List.of());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getOrderById(@PathVariable String id) {
        return ResponseEntity.ok(Map.of("id", id, "status", "PRINTING_STARTED"));
    }

    @GetMapping("/track")
    public ResponseEntity<Map<String, Object>> trackOrder(@RequestParam String query) {
        return ResponseEntity.ok(Map.of("query", query, "found", true));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody Map<String, Object> orderPayload) {
        String orderId = "ARC" + System.currentTimeMillis();
        String token = "A-" + (new Random().nextInt(899) + 100);
        return ResponseEntity.ok(Map.of(
            "orderId", orderId,
            "tokenNumber", token,
            "status", "ORDER_RECEIVED",
            "message", "Order successfully created and queued in RIT Xerox system."
        ));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> statusUpdate) {
        return ResponseEntity.ok(Map.of(
            "orderId", id,
            "newStatus", statusUpdate.get("status"),
            "updatedAt", new Date().toString()
        ));
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadDocument(
            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(Map.of(
            "fileName", file.getOriginalFilename(),
            "size", file.getSize(),
            "status", "STORED_LOCALLY"
        ));
    }
}
