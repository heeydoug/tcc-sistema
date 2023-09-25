package com.tccspring.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tccspring.domains.Usuario;
import com.tccspring.domains.enums.TipoUsuario;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class UsuarioDTO {

    private Long id;
    @NotBlank(message = "O nome do usuário é obrigatório.")
    private String nome;

    @NotBlank(message = "O email do usuário é obrigatório.")
    @Email(message = "O email do usuário deve ser válido.")
    private String email;

    private String urlFoto;

    @NotNull(message = "O tipo do usuário é obrigatório.")
    private TipoUsuario tipo;

    @JsonFormat(pattern = "dd/MM/yyyy")
    protected LocalDate dataCriacao = LocalDate.now();

    @NotNull(message = "O status do usuário é obrigatório.")
    private Boolean ativo;

    // Método para converter o DTO em uma entidade Usuário
    public Usuario toUsuario() {
        Usuario usuario = new Usuario();
        usuario.setId(this.id);
        usuario.setNome(this.nome);
        usuario.setEmail(this.email);
        usuario.setUrlFoto(this.urlFoto);
        usuario.setTipo(this.tipo);
        usuario.setDataCriacao(this.dataCriacao);
        usuario.setAtivo(this.ativo);
        return usuario;
    }
}

