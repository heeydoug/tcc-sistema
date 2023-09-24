package com.tccspring.dtos;

import com.tccspring.domains.Usuario;
import com.tccspring.domains.enums.TipoUsuario;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class UsuarioDTO {
    @NotBlank(message = "O nome do usuário é obrigatório.")
    private String nome;

    @NotBlank(message = "O email do usuário é obrigatório.")
    @Email(message = "O email do usuário deve ser válido.")
    private String email;

    private String urlFoto;

    @NotNull(message = "O tipo do usuário é obrigatório.")
    private TipoUsuario tipo;

    @NotNull(message = "O status do usuário é obrigatório.")
    private Boolean ativo;

    // Método para converter o DTO em uma entidade Usuário
    public Usuario toUsuario() {
        Usuario usuario = new Usuario();
        usuario.setNome(this.nome);
        usuario.setEmail(this.email);
        usuario.setUrlFoto(this.urlFoto);
        usuario.setTipo(this.tipo);
        usuario.setAtivo(this.ativo);
        return usuario;
    }
}

