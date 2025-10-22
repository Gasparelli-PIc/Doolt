package com.gasparelli.doolt.services;

import com.gasparelli.doolt.model.UsuarioEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gasparelli.doolt.repository.UsuarioRepository;

@Service
public class UsuarioServices {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioEntity salvarUsuario(UsuarioEntity user){
        return usuarioRepository.save(user);
    }

    public UsuarioEntity procurarUsuario(String email, String senha){
        return usuarioRepository.buscarUsuarioPorEmailESenha(email, senha);
    }

    public void deletarUsuarioPorID(Long id){
        usuarioRepository.deleteById(id);
    }
}
