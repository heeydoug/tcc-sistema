package com.tccspring.repositories;

import com.tccspring.domains.PedidoArtigo;
import com.tccspring.dtos.PedidoArtigoDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PedidoArtigoRepository extends JpaRepository<PedidoArtigo, Long> {

    List<PedidoArtigo> findByClienteId(Long clienteId);

}
