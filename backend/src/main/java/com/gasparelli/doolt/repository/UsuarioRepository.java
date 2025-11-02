package com.gasparelli.doolt.repository;

import com.gasparelli.doolt.model.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {

    UsuarioEntity fyndByEmailAndSenha(String email, String senha);
    Long id(Long id);
}
