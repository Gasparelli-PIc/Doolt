package com.gasparelli.doolt.services;

import com.gasparelli.doolt.model.MetasEntity;
import com.gasparelli.doolt.repository.MetasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MetasServices {

    @Autowired
    private MetasRepository metasRepository;

    public MetasEntity salvarMeta(MetasEntity meta) {
        return metasRepository.save(meta);
    }

    public MetasEntity buscarMeta(String titulo) {
        return metasRepository.findByTitulo(titulo);
    }

    public void deletarMetaPorID(Long id) {
        metasRepository.deleteById(id);
    }
}

