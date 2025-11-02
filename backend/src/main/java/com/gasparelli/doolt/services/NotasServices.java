package com.gasparelli.doolt.services;

import com.gasparelli.doolt.model.NotasEntity;
import com.gasparelli.doolt.repository.NotasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class NotasServices {

    @Autowired
    private NotasRepository notasRepository;

    public NotasEntity salvarNotas(NotasEntity notas) {
        return notasRepository.save(notas);
    }

    public NotasEntity buscarNota(String titulo){
        return notasRepository.findByTitulo(titulo);
    }

    public void deletarNotaPorID(Long id){
        notasRepository.deleteById(id);
    }
}
