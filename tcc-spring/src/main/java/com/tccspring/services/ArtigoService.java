package com.tccspring.services;

import com.tccspring.domains.Artigo;
import com.tccspring.domains.enums.EstadoArtigo;
import com.tccspring.domains.enums.TipoUsuario;
import com.tccspring.repositories.ArtigoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtigoService {
    @Autowired
    private ArtigoRepository artigoRepository;

    public Artigo criarArtigo(Artigo artigo) {
        return artigoRepository.save(artigo);
    }

    public Artigo obterArtigoPorId(Long id) {
        return artigoRepository.findById(id).orElse(null);
    }

    public List<Artigo> listarArtigos() {
        return artigoRepository.findAll();
    }

    public Artigo atualizarArtigo(Long id, Artigo artigo) {
        if (artigoRepository.existsById(id)) {
            artigo.setId(id);
            return artigoRepository.save(artigo);
        }
        return null;
    }

    public List<Artigo> listarArtigosPorEmailTipoEStatus(String email, TipoUsuario tipoUsuario, EstadoArtigo estadoArtigo) {
        return artigoRepository.findByRedatorEmailAndEstadoAtual(email, estadoArtigo);
    }


    public void excluirArtigo(Long id) {
        artigoRepository.deleteById(id);
    }

}
