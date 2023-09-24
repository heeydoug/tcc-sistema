package com.tccspring.dtos;

import com.tccspring.domains.Redator;
import com.tccspring.domains.enums.TipoUsuario;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class RedatorDTO {
    @NotBlank(message = "O nome do redator é obrigatório.")
    private String nome;

    @NotBlank(message = "O email do redator é obrigatório.")
    @Email(message = "O email do redator deve ser válido.")
    private String email;

    private String urlFoto;

    @NotNull(message = "O tipo do redator é obrigatório.")
    private TipoUsuario tipo;

    @NotNull(message = "O status do redator é obrigatório.")
    private Boolean ativo;

    // Método para converter o DTO em uma entidade Redator
    public Redator toRedator() {
        Redator redator = new Redator();
        redator.setNome(this.nome);
        redator.setEmail(this.email);
        redator.setUrlFoto(this.urlFoto);
        redator.setTipo(this.tipo);
        redator.setAtivo(this.ativo);
        return redator;
    }
}

