package com.gasparelli.doolt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tarefas")
public class TarefasEntity {

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

    @Column(name = "id_prioridade_fk")
    private int idPrioridadeFk;

    @Column(name = "id_categoria_fk")
    private int idCategoriaFk;

    @Column(name = "data_vencimento")
    private String dataVencimento;

    @Column(name = "id_feito_fk")
    private int idFeitoFk;
    
}
