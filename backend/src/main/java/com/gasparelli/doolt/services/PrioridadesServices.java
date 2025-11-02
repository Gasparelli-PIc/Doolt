package com.gasparelli.doolt.services;

import com.gasparelli.doolt.model.PrioridadesEntity;
import com.gasparelli.doolt.repository.PrioridadesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrioridadesServices {

    @Autowired
    private PrioridadesRepository prioridadesRepository;

    public PrioridadesEntity salvarPrioridade(PrioridadesEntity prioridade) {
        return prioridadesRepository.save(prioridade);
    }

    public void deletarPrioridadePorID(Long id) {
        prioridadesRepository.deleteById(id);
    }
}

