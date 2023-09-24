package com.tccspring.services;

import com.tccspring.domains.Cliente;
import com.tccspring.dtos.ClienteDTO;
import com.tccspring.repositories.ClienteRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<ClienteDTO> listarClientes() {
        List<Cliente> clientes = clienteRepository.findAll();
        return clientes.stream()
                .map(cliente -> modelMapper.map(cliente, ClienteDTO.class))
                .collect(Collectors.toList());
    }

    public ClienteDTO obterCliente(Long id) {
        Optional<Cliente> clienteOptional = clienteRepository.findById(id);
        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            return modelMapper.map(cliente, ClienteDTO.class);
        } else {
            return null;
        }
    }

    public ClienteDTO criarCliente(ClienteDTO clienteDTO) {
        Cliente cliente = modelMapper.map(clienteDTO, Cliente.class);
        cliente = clienteRepository.save(cliente);
        return modelMapper.map(cliente, ClienteDTO.class);
    }

    public ClienteDTO atualizarCliente(Long id, ClienteDTO clienteDTO) {
        Optional<Cliente> clienteOptional = clienteRepository.findById(id);
        if (clienteOptional.isPresent()) {
            Cliente clienteExistente = clienteOptional.get();
            modelMapper.map(clienteDTO, clienteExistente);
            clienteExistente = clienteRepository.save(clienteExistente);
            return modelMapper.map(clienteExistente, ClienteDTO.class);
        } else {
            return null;
        }
    }

    public boolean excluirCliente(Long id) {
        Optional<Cliente> clienteOptional = clienteRepository.findById(id);
        if (clienteOptional.isPresent()) {
            clienteRepository.delete(clienteOptional.get());
            return true;
        }
        return false;
    }
}
