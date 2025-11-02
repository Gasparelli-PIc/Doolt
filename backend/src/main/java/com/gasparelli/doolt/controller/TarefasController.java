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

import com.gasparelli.doolt.model.TarefasEntity;
import com.gasparelli.doolt.services.TarefasServices;

@RestController
@RequestMapping("/tarefas")
public class TarefasController {

    @Autowired
    private TarefasServices tarefasServices;

    @PostMapping
    public ResponseEntity<TarefasEntity> salvarTarefa(@RequestBody TarefasEntity tarefa) {
        TarefasEntity salvo = tarefasServices.salvarTarefa(tarefa);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/tarefas/{titulo}")
    public TarefasEntity buscarTarefa(@PathVariable String titulo) {
        return tarefasServices.procurarTarefa(titulo);
    }

    @DeleteMapping("/tarefas/{id}")
    public ResponseEntity<Void> deletarTarefa(@PathVariable Long id) {
        tarefasServices.deletarTarefaPorID(id);
        return ResponseEntity.noContent().build();
    }
}

