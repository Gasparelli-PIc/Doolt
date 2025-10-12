package com.gasparelli.doolt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import javax.print.attribute.standard.MediaSize;

@Getter
@Setter
@Entity
@Table(name = "metas")
public class MetasEntity {

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

    @Column(name = "id_categoria_fk")
    private  int idCategoriaFk;

    @Column(name = "id_prioridade_fk")
    private int idPrioridadeFk;

    @Column(name = "meta")
    private int meta;

    @Column(name = "atual")
    private int atual;

    @Column(name = "unidade")
    private String unidade;

    @Column(name = "prazo")
    private String prazo;

    @Column(name = "id_feito_fk")
    private int idFeitoFk;

    @Column(name = "id_estado_fk")
    private int idEstadoFk;
}
