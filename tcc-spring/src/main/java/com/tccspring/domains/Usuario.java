package com.tccspring.domains;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tccspring.domains.enums.TipoUsuario;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

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


}