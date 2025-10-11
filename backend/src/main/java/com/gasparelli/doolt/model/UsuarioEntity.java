package com.gasparelli.doolt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "usuarios")
public class UsuarioEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome; 

    @Column(name = "email")
    private String email;

    @Column(name = "senha")
    private String senha;

    @Column(name = "telefone")
    private int telefone;

    @Column(name = "cargo")
    private String cargo;

    @Column(name = "membro_desde")
    private String membroDesde;

    @Column(name = "sobre_mim")
    private String sobreMim; 
    
}
