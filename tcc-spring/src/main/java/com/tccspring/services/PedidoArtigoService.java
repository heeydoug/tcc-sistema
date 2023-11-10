package com.tccspring.services;

import com.tccspring.domains.PedidoArtigo;
import com.tccspring.dtos.PedidoArtigoDTO;
import com.tccspring.exceptions.ObjectNotFoundException;
import com.tccspring.repositories.PedidoArtigoRepository;
import com.tccspring.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PedidoArtigoService {
    private final PedidoArtigoRepository pedidoArtigoRepository;
    private final UsuarioRepository clienteRepository;

    @Autowired
    public PedidoArtigoService(PedidoArtigoRepository pedidoArtigoRepository, UsuarioRepository clienteRepository) {
        this.pedidoArtigoRepository = pedidoArtigoRepository;
        this.clienteRepository = clienteRepository;
    }

    public PedidoArtigo criarPedidoArtigo(PedidoArtigoDTO pedidoArtigoDTO) {
        PedidoArtigo pedidoArtigo = new PedidoArtigo();
        pedidoArtigo.setConteudo(pedidoArtigoDTO.getConteudo());
        pedidoArtigo.setDataCriacao(pedidoArtigoDTO.getDataCriacao());
        pedidoArtigo.setCliente(clienteRepository.findById(pedidoArtigoDTO.getClienteId()).orElse(null));
        return pedidoArtigoRepository.save(pedidoArtigo);
    }

    public PedidoArtigo buscarPedidoArtigoPorId(Long id) {
        Optional<PedidoArtigo> pedidoOptional = pedidoArtigoRepository.findById(id);

        if (pedidoOptional.isPresent()) {
            return pedidoOptional.get();
        } else {
            throw new ObjectNotFoundException("Pedido de artigo com ID " + id + " não encontrado");
        }
    }

    public List<PedidoArtigoDTO> listarPedidosArtigoPorCliente(Long clienteId) {
        List<PedidoArtigo> pedidos = pedidoArtigoRepository.findByClienteId(clienteId);
        return pedidos.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PedidoArtigo salvarPedidoArtigo(PedidoArtigo pedidoArtigo) {
        return pedidoArtigoRepository.save(pedidoArtigo);
    }

    public List<PedidoArtigoDTO> listarPedidosArtigo() {
        List<PedidoArtigo> pedidos = pedidoArtigoRepository.findAll();
        return pedidos.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private PedidoArtigoDTO convertToDTO(PedidoArtigo pedidoArtigo) {
        PedidoArtigoDTO pedidoArtigoDTO = new PedidoArtigoDTO();
        pedidoArtigoDTO.setId(pedidoArtigo.getId());
        pedidoArtigoDTO.setConteudo(pedidoArtigo.getConteudo());
        pedidoArtigoDTO.setClienteId(pedidoArtigo.getCliente() != null ? pedidoArtigo.getCliente().getId() : null);
        return pedidoArtigoDTO;
    }

    public void excluirPedidoArtigo(Long id) {
        pedidoArtigoRepository.deleteById(id);
    }
}
