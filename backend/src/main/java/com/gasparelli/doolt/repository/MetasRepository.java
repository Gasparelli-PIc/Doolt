package com.gasparelli.doolt.repository;

import com.gasparelli.doolt.model.MetasEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetasRepository extends JpaRepository<MetasEntity, Long> {
    MetasEntity findByTitulo(String titulo);
}
