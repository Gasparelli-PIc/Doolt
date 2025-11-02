package com.gasparelli.doolt.services;

import com.gasparelli.doolt.model.TarefasEntity;
import com.gasparelli.doolt.repository.TarefasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TarefasServices {

    @Autowired
    private TarefasRepository tarefasRepository;

    public TarefasEntity salvarTarefa(TarefasEntity tarefas) {
        return tarefasRepository.save(tarefas);
    }

    public TarefasEntity procurarTarefa(String titulo) {
        return tarefasRepository.findByTitulo(titulo);
    }

    public void deletarTarefaPorID(Long id) {
        tarefasRepository.deleteById(id);
    }
}
