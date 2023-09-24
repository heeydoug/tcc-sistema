package com.tccspring.dtos;

import com.tccspring.domains.Revisor;
import com.tccspring.domains.enums.TipoUsuario;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class RevisorDTO {
    @NotBlank(message = "O nome do revisor é obrigatório.")
    private String nome;

    @NotBlank(message = "O email do revisor é obrigatório.")
    @Email(message = "O email do revisor deve ser válido.")
    private String email;

    private String urlFoto;

    @NotNull(message = "O tipo do revisor é obrigatório.")
    private TipoUsuario tipo;

    @NotNull(message = "O status do revisor é obrigatório.")
    private Boolean ativo;

    // Método para converter o DTO em uma entidade Revisor
    public Revisor toRevisor() {
        Revisor revisor = new Revisor();
        revisor.setNome(this.nome);
        revisor.setEmail(this.email);
        revisor.setUrlFoto(this.urlFoto);
        revisor.setTipo(this.tipo);
        revisor.setAtivo(this.ativo);
        return revisor;
    }
}

