package com.tccspring.repositories;

import com.tccspring.domains.Artigo;
import com.tccspring.domains.Cliente;
import com.tccspring.domains.enums.EstadoArtigo;
import com.tccspring.domains.enums.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtigoRepository extends JpaRepository<Artigo, Long> {

    @Query("SELECT a FROM Artigo a " +
            "WHERE a.estadoAtual = :estadoAtual " +
            "AND ((:tipo = 'CLIENTE' AND a.cliente.email = :email) " +
            "OR (:tipo = 'REVISOR' AND a.revisor.email = :email) " +
            "OR (:tipo = 'REDATOR' AND a.redator.email = :email))")
    List<Artigo> listarArtigosPorFiltro(
            String email,
            String tipo,
            EstadoArtigo estadoAtual
    );

    List<Artigo> findByRedatorEmailAndEstadoAtual(String email, EstadoArtigo estadoAtual);

}
