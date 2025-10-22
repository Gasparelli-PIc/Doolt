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

import com.gasparelli.doolt.model.UsuarioEntity;
import com.gasparelli.doolt.services.UsuarioServices;


@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioServices usuarioServices;

    @PostMapping
    public ResponseEntity<UsuarioEntity> registrarUsuario(@RequestBody UsuarioEntity usuario){
        UsuarioEntity salvo = usuarioServices.salvarUsuario(usuario);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping("/usuario/{email}/{senha}")
    public UsuarioEntity buscarUsuario(@PathVariable String email, @PathVariable String senha){
        return usuarioServices.procurarUsuario(email, senha);
    }


    @DeleteMapping("/usuario/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Long id){
        usuarioServices.deletarUsuarioPorID(id);
        return ResponseEntity.noContent().build();
    }
}
