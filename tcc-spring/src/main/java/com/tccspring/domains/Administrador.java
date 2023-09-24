package com.tccspring.domains;

import com.tccspring.domains.enums.TipoUsuario;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Administrador extends Usuario{

    public Administrador() {
        this.setTipo(TipoUsuario.ADMINISTRADOR);
    }
}
