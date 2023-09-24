package com.tccspring.controllers;

import com.tccspring.dtos.AdministradorDTO;
import com.tccspring.services.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/administradores")
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;

    @GetMapping
    public ResponseEntity<List<AdministradorDTO>> listarAdministradores() {
        List<AdministradorDTO> administradores = administradorService.listarAdministradores();
        return ResponseEntity.ok(administradores);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdministradorDTO> obterAdministrador(@PathVariable Long id) {
        AdministradorDTO administrador = administradorService.obterAdministrador(id);
        if (administrador != null) {
            return ResponseEntity.ok(administrador);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<AdministradorDTO> criarAdministrador(@RequestBody AdministradorDTO administradorDTO) {
        AdministradorDTO novoAdministrador = administradorService.criarAdministrador(administradorDTO);
        return ResponseEntity.ok(novoAdministrador);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdministradorDTO> atualizarAdministrador(@PathVariable Long id, @RequestBody AdministradorDTO administradorDTO) {
        AdministradorDTO administradorAtualizado = administradorService.atualizarAdministrador(id, administradorDTO);
        if (administradorAtualizado != null) {
            return ResponseEntity.ok(administradorAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirAdministrador(@PathVariable Long id) {
        boolean administradorExcluido = administradorService.excluirAdministrador(id);
        if (administradorExcluido) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


