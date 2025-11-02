package com.gasparelli.doolt.services;

import com.gasparelli.doolt.model.EventosEntity;
import com.gasparelli.doolt.repository.EventosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventosServices {

    @Autowired
    private EventosRepository eventosRepository;

    public EventosEntity salvarEvento(EventosEntity evento) {
        return eventosRepository.save(evento);
    }

    public EventosEntity buscarEvento(String titulo) {
        return eventosRepository.findByTitulo(titulo);
    }

    public void deletarEventoPorID(Long id) {
        eventosRepository.deleteById(id);
    }
}

