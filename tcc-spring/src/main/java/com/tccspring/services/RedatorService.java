package com.tccspring.services;

import com.tccspring.domains.Redator;
import com.tccspring.dtos.RedatorDTO;
import com.tccspring.repositories.RedatorRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RedatorService {

    @Autowired
    private RedatorRepository redatorRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<RedatorDTO> listarRedatores() {
        List<Redator> redatores = redatorRepository.findAll();
        return redatores.stream()
                .map(redator -> modelMapper.map(redator, RedatorDTO.class))
                .collect(Collectors.toList());
    }

    public RedatorDTO obterRedator(Long id) {
        Optional<Redator> redatorOptional = redatorRepository.findById(id);
        if (redatorOptional.isPresent()) {
            Redator redator = redatorOptional.get();
            return modelMapper.map(redator, RedatorDTO.class);
        } else {
            return null;
        }
    }

    public RedatorDTO criarRedator(RedatorDTO redatorDTO) {
        Redator redator = modelMapper.map(redatorDTO, Redator.class);
        redator = redatorRepository.save(redator);
        return modelMapper.map(redator, RedatorDTO.class);
    }

    public RedatorDTO atualizarRedator(Long id, RedatorDTO redatorDTO) {
        Optional<Redator> redatorOptional = redatorRepository.findById(id);
        if (redatorOptional.isPresent()) {
            Redator redatorExistente = redatorOptional.get();
            modelMapper.map(redatorDTO, redatorExistente);
            redatorExistente = redatorRepository.save(redatorExistente);
            return modelMapper.map(redatorExistente, RedatorDTO.class);
        } else {
            return null;
        }
    }

    public boolean excluirRedator(Long id) {
        Optional<Redator> redatorOptional = redatorRepository.findById(id);
        if (redatorOptional.isPresent()) {
            redatorRepository.delete(redatorOptional.get());
            return true;
        }
        return false;
    }
}

