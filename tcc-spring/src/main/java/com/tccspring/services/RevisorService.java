package com.tccspring.services;

import com.tccspring.domains.Revisor;
import com.tccspring.dtos.RevisorDTO;
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
            modelMapper.map(revisorDTO, revisorExistente);
            revisorExistente = revisorRepository.save(revisorExistente);
            return modelMapper.map(revisorExistente, RevisorDTO.class);
        } else {
            return null;
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
}

