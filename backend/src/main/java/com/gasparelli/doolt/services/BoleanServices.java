package com.gasparelli.doolt.services;

import com.gasparelli.doolt.model.BoleanEntity;
import com.gasparelli.doolt.repository.BoleanRepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoleanServices {

    @Autowired
    private BoleanRepositoty boleanRepository;

    public BoleanEntity salvarBolean(BoleanEntity bolean) {
        return boleanRepository.save(bolean);
    }

    public void deletarBoleanPorID(Long id) {
        boleanRepository.deleteById(id);
    }
}

