package com.tccspring.services;

import com.tccspring.domains.Usuario;
import com.tccspring.domains.enums.TipoUsuario;
import com.tccspring.dtos.UsuarioDTO;
import com.tccspring.exceptions.ObjectNotFoundException;
import com.tccspring.repositories.UsuarioRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<UsuarioDTO> listarUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios.stream()
                .map(usuario -> modelMapper.map(usuario, UsuarioDTO.class))
                .collect(Collectors.toList());
    }

    public UsuarioDTO obterUsuario(Long id) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            return modelMapper.map(usuario, UsuarioDTO.class);
        } else {
            return null;
        }
    }

    public UsuarioDTO criarUsuario(UsuarioDTO usuarioDTO) {
        Usuario usuario = modelMapper.map(usuarioDTO, Usuario.class);
        usuario = usuarioRepository.save(usuario);
        return modelMapper.map(usuario, UsuarioDTO.class);
    }

    public UsuarioDTO atualizarUsuario(Long id, UsuarioDTO usuarioDTO) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);

        if (usuarioOptional.isPresent()) {
            Usuario usuarioExistente = usuarioOptional.get();

            if (usuarioDTO.getNome() != null) {
                usuarioExistente.setNome(usuarioDTO.getNome());
            }

            if (usuarioDTO.getTipo() != null) {
                usuarioExistente.setTipo(usuarioDTO.getTipo());
            }

            usuarioExistente = usuarioRepository.save(usuarioExistente);

            return modelMapper.map(usuarioExistente, UsuarioDTO.class);
        } else {
            throw new ObjectNotFoundException("Usuário com ID " + id + " não encontrado.");
        }
    }

    public boolean excluirUsuario(Long id) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if (usuarioOptional.isPresent()) {
            usuarioRepository.delete(usuarioOptional.get());
            return true;
        }
        return false;
    }

    public boolean existeUsuarioComEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    public List<UsuarioDTO> listarUsuariosTipoUsuario() {
        return listarUsuarios().stream()
                .filter(usuario -> usuario.getTipo() == TipoUsuario.USUARIO)
                .collect(Collectors.toList());
    }

    public List<UsuarioDTO> listarUsuariosTipoCliente() {
        return listarUsuarios().stream()
                .filter(usuario -> usuario.getTipo() == TipoUsuario.CLIENTE)
                .collect(Collectors.toList());
    }
    public List<UsuarioDTO> listarUsuariosTipoRedator() {
        return listarUsuarios().stream()
                .filter(usuario -> usuario.getTipo() == TipoUsuario.REDATOR)
                .collect(Collectors.toList());
    }
    public List<UsuarioDTO> listarUsuariosTipoRevisor() {
        return listarUsuarios().stream()
                .filter(usuario -> usuario.getTipo() == TipoUsuario.REVISOR)
                .collect(Collectors.toList());
    }
    public List<UsuarioDTO> listarUsuariosTipoAdm() {
        return listarUsuarios().stream()
                .filter(usuario -> usuario.getTipo() == TipoUsuario.ADMINISTRADOR)
                .collect(Collectors.toList());
    }

    public Usuario findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
}

