package com.tccspring.domains;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tccspring.domains.enums.TipoUsuario;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String urlFoto;
    @Enumerated(EnumType.STRING)
    private TipoUsuario tipo;
    @JsonFormat(pattern = "dd/MM/yyyy")
    protected LocalDate dataCriacao = LocalDate.now();
    private boolean ativo;
    @OneToMany(mappedBy = "redator")
    private List<Artigo> artigosRedator = new ArrayList<>();
    @OneToMany(mappedBy = "revisor")
    private List<Artigo> artigosRevisor = new ArrayList<>();
    @OneToMany(mappedBy = "cliente")
    private List<Artigo> artigosCliente = new ArrayList<>();

}