package com.tccspring.domains;

import com.tccspring.domains.enums.TipoUsuario;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Cliente extends Usuario{
    @OneToMany(mappedBy = "cliente")
    private List<Artigo> artigos = new ArrayList<>();

    public Cliente() {
        this.setTipo(TipoUsuario.CLIENTE);
    }
}
