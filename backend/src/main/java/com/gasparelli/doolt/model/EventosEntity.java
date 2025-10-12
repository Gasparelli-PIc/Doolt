package com.gasparelli.doolt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "eventos")
public class EventosEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "id_usuario_fk")
    private int idUsuarioFk;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "data_evento")
    private String dataEvento;

    @Column(name = "id_categoria_fk")
    private int idCategoriaFk;

    @Column(name = "inicio_hora")
    private String inicio_hora;

    @Column(name = "fim_hora")
    private String fimHora;

    @Column(name = "local")
    private String local;

    @Column(name = "participantes")
    private String participantes;

    @Column(name = "id_feito_fk")
    private int idFeitoFk;

}
