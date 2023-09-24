package com.tccspring.domains;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tccspring.domains.enums.EstadoArtigo;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Artigo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String conteudo;
    private String palavraChave;
    private String idPastaDrive;
    private String idDocumentoDrive;

    @ManyToOne
    private Redator redator;

    @ManyToOne
    private Revisor revisor;

    @ManyToOne
    private Cliente cliente;

    @Enumerated(EnumType.STRING)
    private EstadoArtigo estadoAtual;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataCriacao = LocalDate.now();

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataFinalizacao;

    @OneToMany(mappedBy = "artigo", cascade = CascadeType.ALL)
    private List<HistoricoEstado> historicoEstados = new ArrayList<>();


    public void adicionarHistorico(EstadoArtigo estado) {
        HistoricoEstado historico = new HistoricoEstado(this, estado);
        historicoEstados.add(historico);
    }
}
