package com.tccspring.domains;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @JsonIgnoreProperties(value = "artigosRedator")
    private Usuario redator;
    @ManyToOne
    @JsonIgnoreProperties(value = "artigosRevisor")
    private Usuario revisor;
    @ManyToOne
    @JsonIgnoreProperties(value = "artigosCliente")
    private Usuario cliente;
    @Enumerated(EnumType.STRING)
    private EstadoArtigo estadoAtual;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataCriacao = LocalDate.now();
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataFinalizacao;
    @OneToMany(mappedBy = "artigo", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<HistoricoEstado> historicoEstados = new ArrayList<>();
    public void adicionarHistorico(EstadoArtigo estado) {
        HistoricoEstado historico = new HistoricoEstado(this, estado);
        historicoEstados.add(historico);
    }

}
