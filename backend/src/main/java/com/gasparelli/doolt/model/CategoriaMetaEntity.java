package com.gasparelli.doolt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CollectionIdMutability;
import org.hibernate.collection.internal.StandardBagSemantics;

@Getter
@Setter
@Entity
@Table(name = "categoria_meta")
public class CategoriaMetaEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "categoria")
    private String categoria;

}
