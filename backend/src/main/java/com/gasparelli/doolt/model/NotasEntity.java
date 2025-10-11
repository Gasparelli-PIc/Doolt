package com.gasparelli.doolt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "notas")
public class NotasEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_usuario_fk")
    private int idUsuarioFk;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "id_cores_fk")
    private int idCoresFk;

    @Column(name = "tags")
    private String tags;

    @Column(name = "id_bolean_favorito_fk")
    private int idBoleanFavoritoFk;
}
