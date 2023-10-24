package com.tccspring.domains;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.tccspring.domains.enums.EstadoArtigo;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class HistoricoEstado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    private Artigo artigo;

    @Enumerated(EnumType.STRING)
    private EstadoArtigo estado;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataRegistro = LocalDate.now();

    public HistoricoEstado() {
    }
    public HistoricoEstado(Artigo artigo, EstadoArtigo estado) {
        this.artigo = artigo;
        this.estado = estado;
    }

}

