package com.tccspring.controllers;

import com.tccspring.domains.enums.TipoUsuario;
import com.tccspring.dtos.ClienteDTO;
import com.tccspring.exceptions.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tccspring.services.ClienteService;
import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<ClienteDTO>> listarClientes() {
        List<ClienteDTO> clientes = clienteService.listarClientes();
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTO> obterCliente(@PathVariable Long id) {
        ClienteDTO cliente = clienteService.obterCliente(id);
        if (cliente != null) {
            return ResponseEntity.ok(cliente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> criarCliente(@RequestBody ClienteDTO clienteDTO) {
        if (clienteService.existeClienteComEmail(clienteDTO.getEmail())) {
            ErrorMessage errorMessage = new ErrorMessage("Já existe um Cliente cadastrado com este email.");
            return ResponseEntity.badRequest().body(errorMessage);
        }
        clienteDTO.setTipo(TipoUsuario.CLIENTE);
        clienteDTO.setAtivo(true);
        ClienteDTO novoCliente = clienteService.criarCliente(clienteDTO);
        return ResponseEntity.ok(novoCliente);
    }


    @PutMapping("/{id}")
    public ResponseEntity<ClienteDTO> atualizarCliente(@PathVariable Long id, @RequestBody ClienteDTO clienteDTO) {
        ClienteDTO clienteAtualizado = clienteService.atualizarCliente(id, clienteDTO);
        if (clienteAtualizado != null) {
            return ResponseEntity.ok(clienteAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirCliente(@PathVariable Long id) {
        boolean clienteExcluido = clienteService.excluirCliente(id);
        if (clienteExcluido) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
