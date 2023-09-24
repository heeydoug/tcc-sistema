package com.tccspring.dtos;

import com.tccspring.domains.Administrador;
import com.tccspring.domains.enums.TipoUsuario;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class AdministradorDTO {
    @NotBlank(message = "O nome do administrador é obrigatório.")
    private String nome;

    @NotBlank(message = "O email do administrador é obrigatório.")
    @Email(message = "O email do administrador deve ser válido.")
    private String email;

    private String urlFoto;

    @NotNull(message = "O tipo do administrador é obrigatório.")
    private TipoUsuario tipo;

    @NotNull(message = "O status do administrador é obrigatório.")
    private Boolean ativo;

    // Método para converter o DTO em uma entidade Administrador
    public Administrador toAdministrador() {
        Administrador administrador = new Administrador();
        administrador.setNome(this.nome);
        administrador.setEmail(this.email);
        administrador.setUrlFoto(this.urlFoto);
        administrador.setTipo(this.tipo);
        administrador.setAtivo(this.ativo);
        return administrador;
    }
}

