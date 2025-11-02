package com.gasparelli.doolt.services;

import com.gasparelli.doolt.model.CategoriaEventoEntity;
import com.gasparelli.doolt.repository.CategoriaEventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaEventoServices {

    @Autowired
    private CategoriaEventoRepository categoriaEventoRepository;

    public CategoriaEventoEntity salvarCategoriaEvento(CategoriaEventoEntity categoriaEvento) {
        return categoriaEventoRepository.save(categoriaEvento);
    }

    public void deletarCategoriaEventoPorID(Long id) {
        categoriaEventoRepository.deleteById(id);
    }
}

