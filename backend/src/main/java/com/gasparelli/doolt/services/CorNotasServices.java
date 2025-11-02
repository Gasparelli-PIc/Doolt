package com.gasparelli.doolt.services;

import com.gasparelli.doolt.model.CorNotasEntity;
import com.gasparelli.doolt.repository.CorNotasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CorNotasServices {

    @Autowired
    private CorNotasRepository corNotasRepository;

    public CorNotasEntity salvarCorNota(CorNotasEntity corNota) {
        return corNotasRepository.save(corNota);
    }

    public void deletarCorNotaPorID(Long id) {
        corNotasRepository.deleteById(id);
    }
}

