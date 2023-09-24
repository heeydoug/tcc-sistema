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
public class Revisor extends Usuario{
    @OneToMany(mappedBy = "revisor")
    private List<Artigo> artigos = new ArrayList<>();

    public Revisor() {
        this.setTipo(TipoUsuario.REVISOR);
    }
}
