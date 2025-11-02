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

import com.gasparelli.doolt.model.MetasEntity;
import com.gasparelli.doolt.services.MetasServices;

@RestController
@RequestMapping("/metas")
public class MetasController {

    @Autowired
    private MetasServices metasServices;

    @PostMapping
    public ResponseEntity<MetasEntity> salvarMeta(@RequestBody MetasEntity meta) {
        MetasEntity salvo = metasServices.salvarMeta(meta);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/metas/{titulo}")
    public MetasEntity buscarMeta(@PathVariable String titulo) {
        return metasServices.buscarMeta(titulo);
    }

    @DeleteMapping("/metas/{id}")
    public ResponseEntity<Void> deletarMeta(@PathVariable Long id) {
        metasServices.deletarMetaPorID(id);
        return ResponseEntity.noContent().build();
    }
}

