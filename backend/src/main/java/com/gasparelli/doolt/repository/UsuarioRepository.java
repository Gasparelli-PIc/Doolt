package com.gasparelli.doolt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gasparelli.doolt.model.UsuarioEntity;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {

    UsuarioEntity findByEmailAndSenha(String email, String senha);
    Long id(Long id);
}
