package com.tccspring.controllers;

import com.tccspring.domains.enums.TipoUsuario;
import com.tccspring.dtos.UsuarioDTO;
import com.tccspring.exceptions.ErrorMessage;
import com.tccspring.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listarUsuarios() {
        List<UsuarioDTO> usuarios = usuarioService.listarUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> obterUsuario(@PathVariable Long id) {
        UsuarioDTO usuario = usuarioService.obterUsuario(id);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> criarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        if (usuarioService.existeUsuarioComEmail(usuarioDTO.getEmail())) {
            ErrorMessage errorMessage = new ErrorMessage("Já existe um Usuário cadastrado com este email.");
            return ResponseEntity.badRequest().body(errorMessage);
        }
        usuarioDTO.setTipo(TipoUsuario.USUARIO);
        usuarioDTO.setAtivo(true);
        UsuarioDTO novoUsuario = usuarioService.criarUsuario(usuarioDTO);
        return ResponseEntity.ok(novoUsuario);
    }


    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> atualizarUsuario(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDTO) {
        UsuarioDTO usuarioAtualizado = usuarioService.atualizarUsuario(id, usuarioDTO);
        if (usuarioAtualizado != null) {
            return ResponseEntity.ok(usuarioAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirUsuario(@PathVariable Long id) {
        boolean usuarioExcluido = usuarioService.excluirUsuario(id);
        if (usuarioExcluido) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/verificar-email")
    public boolean verificarEmailExistente(@RequestParam String email) {
        return usuarioService.existeUsuarioComEmail(email);
    }


    @GetMapping("/tipoUsuario")
    public ResponseEntity<List<UsuarioDTO>> listarUsuariosTipoUsuario() {
        List<UsuarioDTO> usuariosTipoUsuario = usuarioService.listarUsuariosTipoUsuario();
        return ResponseEntity.ok(usuariosTipoUsuario);
    }

    @GetMapping("/tipoCliente")
    public ResponseEntity<List<UsuarioDTO>> listarUsuariosTipoCliente() {
        List<UsuarioDTO> usuariosTipoCliente = usuarioService.listarUsuariosTipoCliente();
        return ResponseEntity.ok(usuariosTipoCliente);
    }

    @GetMapping("/tipoRedator")
    public ResponseEntity<List<UsuarioDTO>> listarUsuariosTipoRedator() {
        List<UsuarioDTO> usuariosTipoRedator = usuarioService.listarUsuariosTipoRedator();
        return ResponseEntity.ok(usuariosTipoRedator);
    }

    @GetMapping("/tipoRevisor")
    public ResponseEntity<List<UsuarioDTO>> listarUsuariosTipoRevisor() {
        List<UsuarioDTO> usuariosTipoRevisor = usuarioService.listarUsuariosTipoRevisor();
        return ResponseEntity.ok(usuariosTipoRevisor);
    }

    @GetMapping("/tipoAdm")
    public ResponseEntity<List<UsuarioDTO>> listarUsuariosTipoAdm() {
        List<UsuarioDTO> usuariosTipoAdm = usuarioService.listarUsuariosTipoAdm();
        return ResponseEntity.ok(usuariosTipoAdm);
    }


}

