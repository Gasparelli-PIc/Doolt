package com.gasparelli.doolt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gasparelli.doolt.model.EventosEntity;
import com.gasparelli.doolt.services.EventosServices;

@RestController
@RequestMapping("/eventos")
public class EventosController {

    @Autowired
    private EventosServices eventosServices;

    @PostMapping
    public ResponseEntity<EventosEntity> salvarEvento(@RequestBody EventosEntity evento) {
        EventosEntity salvo = eventosServices.salvarEvento(evento);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/eventos/{titulo}")
    public EventosEntity buscarEvento(@PathVariable String titulo) {
        return eventosServices.buscarEvento(titulo);
    }

    @DeleteMapping("/eventos/{id}")
    public ResponseEntity<Void> deletarEvento(@PathVariable Long id) {
        eventosServices.deletarEventoPorID(id);
        return ResponseEntity.noContent().build();
    }
}

