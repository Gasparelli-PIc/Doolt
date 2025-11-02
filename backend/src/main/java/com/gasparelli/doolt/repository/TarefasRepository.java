package com.gasparelli.doolt.repository;

import com.gasparelli.doolt.model.TarefasEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TarefasRepository extends JpaRepository<TarefasEntity, Long> {
    TarefasEntity findByTitulo(String titulo);
}
