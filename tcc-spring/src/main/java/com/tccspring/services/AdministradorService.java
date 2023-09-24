package com.tccspring.services;

import com.tccspring.domains.Administrador;
import com.tccspring.dtos.AdministradorDTO;
import com.tccspring.repositories.AdministradorRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdministradorService {

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<AdministradorDTO> listarAdministradores() {
        List<Administrador> administradores = administradorRepository.findAll();
        return administradores.stream()
                .map(administrador -> modelMapper.map(administrador, AdministradorDTO.class))
                .collect(Collectors.toList());
    }

    public AdministradorDTO obterAdministrador(Long id) {
        Optional<Administrador> administradorOptional = administradorRepository.findById(id);
        if (administradorOptional.isPresent()) {
            Administrador administrador = administradorOptional.get();
            return modelMapper.map(administrador, AdministradorDTO.class);
        } else {
            return null;
        }
    }

    public AdministradorDTO criarAdministrador(AdministradorDTO administradorDTO) {
        Administrador administrador = modelMapper.map(administradorDTO, Administrador.class);
        administrador = administradorRepository.save(administrador);
        return modelMapper.map(administrador, AdministradorDTO.class);
    }

    public AdministradorDTO atualizarAdministrador(Long id, AdministradorDTO administradorDTO) {
        Optional<Administrador> administradorOptional = administradorRepository.findById(id);
        if (administradorOptional.isPresent()) {
            Administrador administradorExistente = administradorOptional.get();
            modelMapper.map(administradorDTO, administradorExistente);
            administradorExistente = administradorRepository.save(administradorExistente);
            return modelMapper.map(administradorExistente, AdministradorDTO.class);
        } else {
            return null;
        }
    }

    public boolean excluirAdministrador(Long id) {
        Optional<Administrador> administradorOptional = administradorRepository.findById(id);
        if (administradorOptional.isPresent()) {
            administradorRepository.delete(administradorOptional.get());
            return true;
        }
        return false;
    }
}

