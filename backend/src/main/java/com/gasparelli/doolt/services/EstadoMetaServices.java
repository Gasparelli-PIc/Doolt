package com.gasparelli.doolt.services;

import com.gasparelli.doolt.model.EstadoMetaEntity;
import com.gasparelli.doolt.repository.EstadoMetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstadoMetaServices {

    @Autowired
    private EstadoMetaRepository estadoMetaRepository;

    public EstadoMetaEntity salvarEstadoMeta(EstadoMetaEntity estadoMeta) {
        return estadoMetaRepository.save(estadoMeta);
    }

    public void deletarEstadoMetaPorID(Long id) {
        estadoMetaRepository.deleteById(id);
    }
}

