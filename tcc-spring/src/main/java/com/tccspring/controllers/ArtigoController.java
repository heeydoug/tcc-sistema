package com.tccspring.controllers;

import com.tccspring.domains.Artigo;
import com.tccspring.domains.EstadoArtigoRequest;
import com.tccspring.domains.Usuario;
import com.tccspring.domains.enums.EstadoArtigo;
import com.tccspring.domains.enums.TipoUsuario;
import com.tccspring.services.ArtigoService;
import com.tccspring.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    @PutMapping("/{id}/alterar-status")
    public Artigo alterarStatusArtigo(@PathVariable Long id, @RequestBody EstadoArtigoRequest estadoAtual) {
        Artigo artigo = artigoService.obterArtigoPorId(id);
        String estado = estadoAtual.getEstadoAtual();

        if (artigo != null) {
            // Verifica se o estado é 'CANCELADO' ou 'ACEITO'
            if (estado.equals("CANCELADO") || estado.equals("ACEITO")) {
                // Define a dataFinalizacao como a data atual
                artigo.setDataFinalizacao(LocalDate.now());
            }

            artigo.setEstadoAtual(EstadoArtigo.valueOf(estado));
            artigo.adicionarHistorico(EstadoArtigo.valueOf(estado));

            return artigoService.atualizarArtigo(id, artigo);
        } else {
            return null;
        }
    }

    @GetMapping("/artigos-do-usuario")
    public List<Artigo> listarArtigosDoUsuarioPorEmailETipo(@RequestParam String email, @RequestParam TipoUsuario tipo) {
        Usuario usuario = usuarioService.findByEmail(email);

        if (usuario != null && usuario.getTipo() == tipo) {
            return switch (tipo) {
                case REDATOR -> usuario.getArtigosRedator();
                case REVISOR -> usuario.getArtigosRevisor();
                case CLIENTE -> usuario.getArtigosCliente();
                default -> null;
            };
        } else {
            return null;
        }
    }

    @GetMapping("/quantidade-artigos-do-usuario")
    public ResponseEntity<Integer> obterQuantidadeArtigosDoUsuarioPorEmailETipo(@RequestParam String email, @RequestParam TipoUsuario tipo) {
        Usuario usuario = usuarioService.findByEmail(email);

        if (usuario != null && usuario.getTipo() == tipo) {
            List<Artigo> artigos = switch (tipo) {
                case REDATOR -> usuario.getArtigosRedator();
                case REVISOR -> usuario.getArtigosRevisor();
                case CLIENTE -> usuario.getArtigosCliente();
                default -> null;
            };

            if (artigos != null) {
                int quantidadeArtigos = artigos.size();
                return ResponseEntity.ok(quantidadeArtigos);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/listarArtigos")
    public List<Artigo> listarArtigosPorEmailTipoEStatus(
            @RequestParam String email,
            @RequestParam String tipo,
            @RequestParam EstadoArtigo estadoAtual
    ) {
        return artigoService.listarArtigosPorEmailTipoEStatus(email, tipo, estadoAtual);
    }





}
