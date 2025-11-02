package com.gasparelli.doolt.services;

import com.gasparelli.doolt.model.CategoriaTarefasEntity;
import com.gasparelli.doolt.repository.CategoriaTarefasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaTarefasServices {

    @Autowired
    private CategoriaTarefasRepository categoriaTarefasRepository;

    public CategoriaTarefasEntity salvarCategoriaTarefa(CategoriaTarefasEntity categoriaTarefa) {
        return categoriaTarefasRepository.save(categoriaTarefa);
    }

    public void deletarCategoriaTarefaPorID(Long id) {
        categoriaTarefasRepository.deleteById(id);
    }
}

