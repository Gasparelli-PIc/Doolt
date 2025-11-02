package com.gasparelli.doolt.services;

import com.gasparelli.doolt.model.CategoriaMetaEntity;
import com.gasparelli.doolt.repository.CategoriaMetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaMetaServices {

    @Autowired
    private CategoriaMetaRepository categoriaMetaRepository;

    public CategoriaMetaEntity salvarCategoriaMeta(CategoriaMetaEntity categoriaMeta) {
        return categoriaMetaRepository.save(categoriaMeta);
    }

    public void deletarCategoriaMetaPorID(Long id) {
        categoriaMetaRepository.deleteById(id);
    }
}

