package com.tccspring.controllers;

import com.tccspring.dtos.RedatorDTO;
import com.tccspring.services.RedatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/redatores")
public class RedatorController {

    @Autowired
    private RedatorService redatorService;

    @GetMapping
    public ResponseEntity<List<RedatorDTO>> listarRedatores() {
        List<RedatorDTO> redatores = redatorService.listarRedatores();
        return ResponseEntity.ok(redatores);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RedatorDTO> obterRedator(@PathVariable Long id) {
        RedatorDTO redator = redatorService.obterRedator(id);
        if (redator != null) {
            return ResponseEntity.ok(redator);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<RedatorDTO> criarRedator(@RequestBody RedatorDTO redatorDTO) {
        RedatorDTO novoRedator = redatorService.criarRedator(redatorDTO);
        return ResponseEntity.ok(novoRedator);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RedatorDTO> atualizarRedator(@PathVariable Long id, @RequestBody RedatorDTO redatorDTO) {
        RedatorDTO redatorAtualizado = redatorService.atualizarRedator(id, redatorDTO);
        if (redatorAtualizado != null) {
            return ResponseEntity.ok(redatorAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirRedator(@PathVariable Long id) {
        boolean redatorExcluido = redatorService.excluirRedator(id);
        if (redatorExcluido) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

