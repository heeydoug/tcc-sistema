package com.tccspring.repositories;

import com.tccspring.domains.PedidoArtigo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoArtigoRepository extends JpaRepository<PedidoArtigo, Long> {
}
