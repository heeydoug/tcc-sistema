package com.tccspring.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PedidoArtigoDTO {
        private Long id;
        private String conteudo;
        @JsonFormat(pattern = "dd/MM/yyyy")
        private LocalDate dataCriacao = LocalDate.now();
        private Long clienteId;
}
