package com.tccspring.repositories;

import com.tccspring.domains.Cliente;
import com.tccspring.domains.Revisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RevisorRepository extends JpaRepository<Revisor, Long> {
    boolean existsByEmail(String email);
}
