package com.tccspring.repositories;

import com.tccspring.domains.Artigo;
import com.tccspring.domains.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtigoRepository extends JpaRepository<Artigo, Long> {
}
