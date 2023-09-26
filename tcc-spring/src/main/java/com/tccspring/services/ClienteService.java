package com.tccspring.services;

import com.tccspring.domains.Cliente;
import com.tccspring.dtos.ClienteDTO;
import com.tccspring.exceptions.EmailEmUsoException;
import com.tccspring.exceptions.ObjectNotFoundException;
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

            if (clienteDTO.getNome() != null) {
                clienteExistente.setNome(clienteDTO.getNome());
            }

            if (clienteDTO.getTipo() != null) {
                clienteExistente.setTipo(clienteDTO.getTipo());
            }

            clienteExistente = clienteRepository.save(clienteExistente);

            return modelMapper.map(clienteExistente, ClienteDTO.class);
        } else {
            throw new ObjectNotFoundException("Cliente com ID " + id + " não encontrado.");
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
    public boolean existeClienteComEmail(String email) {
        return clienteRepository.existsByEmail(email);
    }
}
