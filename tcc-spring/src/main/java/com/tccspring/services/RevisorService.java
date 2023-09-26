package com.tccspring.services;

import com.tccspring.domains.Revisor;
import com.tccspring.dtos.RevisorDTO;
import com.tccspring.exceptions.ObjectNotFoundException;
import com.tccspring.repositories.RevisorRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RevisorService {

    @Autowired
    private RevisorRepository revisorRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<RevisorDTO> listarRevisores() {
        List<Revisor> revisores = revisorRepository.findAll();
        return revisores.stream()
                .map(revisor -> modelMapper.map(revisor, RevisorDTO.class))
                .collect(Collectors.toList());
    }

    public RevisorDTO obterRevisor(Long id) {
        Optional<Revisor> revisorOptional = revisorRepository.findById(id);
        if (revisorOptional.isPresent()) {
            Revisor revisor = revisorOptional.get();
            return modelMapper.map(revisor, RevisorDTO.class);
        } else {
            return null;
        }
    }

    public RevisorDTO criarRevisor(RevisorDTO revisorDTO) {
        Revisor revisor = modelMapper.map(revisorDTO, Revisor.class);
        revisor = revisorRepository.save(revisor);
        return modelMapper.map(revisor, RevisorDTO.class);
    }

    public RevisorDTO atualizarRevisor(Long id, RevisorDTO revisorDTO) {
        Optional<Revisor> revisorOptional = revisorRepository.findById(id);

        if (revisorOptional.isPresent()) {
            Revisor revisorExistente = revisorOptional.get();

            if (revisorDTO.getNome() != null) {
                revisorExistente.setNome(revisorDTO.getNome());
            }

            if (revisorDTO.getTipo() != null) {
                revisorExistente.setTipo(revisorDTO.getTipo());
            }

            revisorExistente = revisorRepository.save(revisorExistente);

            return modelMapper.map(revisorExistente, RevisorDTO.class);
        } else {
            throw new ObjectNotFoundException("Revisor com ID " + id + " não encontrado.");
        }
    }


    public boolean excluirRevisor(Long id) {
        Optional<Revisor> revisorOptional = revisorRepository.findById(id);
        if (revisorOptional.isPresent()) {
            revisorRepository.delete(revisorOptional.get());
            return true;
        }
        return false;
    }

    public boolean existeRevisorComEmail(String email) {
        return revisorRepository.existsByEmail(email);
    }
}

