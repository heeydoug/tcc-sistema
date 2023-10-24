package com.tccspring.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tccspring.domains.Artigo;
import com.tccspring.domains.Usuario;
import com.tccspring.domains.enums.TipoUsuario;
import jakarta.persistence.OneToMany;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
    @OneToMany(mappedBy = "redator")
    private List<Artigo> artigosRedator = new ArrayList<>();
    @OneToMany(mappedBy = "revisor")
    private List<Artigo> artigosRevisor = new ArrayList<>();
    @OneToMany(mappedBy = "cliente")
    private List<Artigo> artigosCliente = new ArrayList<>();


}

