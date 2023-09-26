package com.tccspring.repositories;

import com.tccspring.domains.Administrador;
import com.tccspring.domains.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
    boolean existsByEmail(String email);
}
