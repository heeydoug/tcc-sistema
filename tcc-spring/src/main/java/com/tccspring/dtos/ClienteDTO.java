package com.tccspring.dtos;

import com.tccspring.domains.Cliente;
import com.tccspring.domains.enums.TipoUsuario;
import lombok.Data;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class ClienteDTO {

    private Long id;
    @NotBlank(message = "O nome do cliente é obrigatório.")
    private String nome;

    @NotBlank(message = "O email do cliente é obrigatório.")
    @Email(message = "O email do cliente deve ser válido.")
    private String email;

    private String urlFoto;

    @NotNull(message = "O tipo do cliente é obrigatório.")
    private TipoUsuario tipo;

    @NotNull(message = "O status do cliente é obrigatório.")
    private Boolean ativo;


    // Método para converter o DTO em uma entidade Cliente
    public Cliente toCliente() {
        Cliente cliente = new Cliente();
        cliente.setNome(this.nome);
        cliente.setEmail(this.email);
        cliente.setUrlFoto(this.urlFoto);
        cliente.setTipo(this.tipo);
        cliente.setAtivo(this.ativo);
        return cliente;
    }
}
