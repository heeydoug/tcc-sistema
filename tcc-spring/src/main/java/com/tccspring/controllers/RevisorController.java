package com.tccspring.controllers;

import com.tccspring.domains.enums.TipoUsuario;
import com.tccspring.dtos.RevisorDTO;
import com.tccspring.exceptions.ErrorMessage;
import com.tccspring.services.RevisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/revisores")
public class RevisorController {

    @Autowired
    private RevisorService revisorService;

    @GetMapping
    public ResponseEntity<List<RevisorDTO>> listarRevisores() {
        List<RevisorDTO> revisores = revisorService.listarRevisores();
        return ResponseEntity.ok(revisores);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RevisorDTO> obterRevisor(@PathVariable Long id) {
        RevisorDTO revisor = revisorService.obterRevisor(id);
        if (revisor != null) {
            return ResponseEntity.ok(revisor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> criarRevisor(@RequestBody RevisorDTO revisorDTO) {
        if (revisorService.existeRevisorComEmail(revisorDTO.getEmail())) {
            ErrorMessage errorMessage = new ErrorMessage("Já existe um Revisor cadastrado com este email.");
            return ResponseEntity.badRequest().body(errorMessage);
        }

        revisorDTO.setTipo(TipoUsuario.REVISOR);
        revisorDTO.setAtivo(true);
        RevisorDTO novoRevisor = revisorService.criarRevisor(revisorDTO);
        return ResponseEntity.ok(novoRevisor);
    }


    @PutMapping("/{id}")
    public ResponseEntity<RevisorDTO> atualizarRevisor(@PathVariable Long id, @RequestBody RevisorDTO revisorDTO) {
        RevisorDTO revisorAtualizado = revisorService.atualizarRevisor(id, revisorDTO);
        if (revisorAtualizado != null) {
            return ResponseEntity.ok(revisorAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirRevisor(@PathVariable Long id) {
        boolean revisorExcluido = revisorService.excluirRevisor(id);
        if (revisorExcluido) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

