package com.tccspring.controllers;

import com.tccspring.domains.Artigo;
import com.tccspring.services.ArtigoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/artigos")
public class ArtigoController {

    @Autowired
    private ArtigoService artigoService;

    @PostMapping
    public Artigo criarArtigo(@RequestBody Artigo artigo) {
        return artigoService.criarArtigo(artigo);
    }

    @GetMapping("/{id}")
    public Artigo obterArtigoPorId(@PathVariable Long id) {
        return artigoService.obterArtigoPorId(id);
    }

    @GetMapping
    public List<Artigo> listarArtigos() {
        return artigoService.listarArtigos();
    }

    @PutMapping("/{id}")
    public Artigo atualizarArtigo(@PathVariable Long id, @RequestBody Artigo artigo) {
        return artigoService.atualizarArtigo(id, artigo);
    }

    @DeleteMapping("/{id}")
    public void excluirArtigo(@PathVariable Long id) {
        artigoService.excluirArtigo(id);
    }
}
