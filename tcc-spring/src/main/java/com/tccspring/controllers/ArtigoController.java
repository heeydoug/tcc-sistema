package com.tccspring.controllers;

import com.tccspring.domains.Artigo;
import com.tccspring.domains.Usuario;
import com.tccspring.domains.enums.TipoUsuario;
import com.tccspring.services.ArtigoService;
import com.tccspring.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.tccspring.domains.enums.TipoUsuario.*;

@RestController
@RequestMapping("/artigos")
public class ArtigoController {

    @Autowired
    private ArtigoService artigoService;

    @Autowired
    private UsuarioService usuarioService;

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

    @GetMapping("/artigos-do-usuario")
    public List<Artigo> listarArtigosDoUsuarioPorEmailETipo(@RequestParam String email, @RequestParam TipoUsuario tipo) {
        Usuario usuario = usuarioService.findByEmail(email);

        if (usuario != null && usuario.getTipo() == tipo) {
            switch (tipo) {
                case REDATOR:
                    return usuario.getArtigosRedator();
                case REVISOR:
                    return usuario.getArtigosRevisor();
                case CLIENTE:
                    return usuario.getArtigosCliente();
                default:
                    return null; // Trate outros tipos, se necessário.
            }
        } else {
            return null;
        }
    }
}
