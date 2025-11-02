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

import com.gasparelli.doolt.model.NotasEntity;
import com.gasparelli.doolt.services.NotasServices;

@RestController
@RequestMapping("/notas")
public class NotasController {

    @Autowired
    private NotasServices notasServices;

    @PostMapping
    public ResponseEntity<NotasEntity> salvarNota(@RequestBody NotasEntity nota) {
        NotasEntity salvo = notasServices.salvarNotas(nota);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/notas/{titulo}")
    public NotasEntity buscarNota(@PathVariable String titulo) {
        return notasServices.buscarNota(titulo);
    }

    @DeleteMapping("/notas/{id}")
    public ResponseEntity<Void> deletarNota(@PathVariable Long id) {
        notasServices.deletarNotaPorID(id);
        return ResponseEntity.noContent().build();
    }
}

