package com.tccspring.repositories;

import com.tccspring.domains.Redator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RedatorRepository extends JpaRepository<Redator, Long> {
    boolean existsByEmail(String email);
}
