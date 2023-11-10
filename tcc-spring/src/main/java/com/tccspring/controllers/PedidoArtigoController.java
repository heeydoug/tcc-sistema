package com.tccspring.controllers;

import com.tccspring.domains.PedidoArtigo;
import com.tccspring.dtos.PedidoArtigoDTO;
import com.tccspring.exceptions.ObjectNotFoundException;
import com.tccspring.services.PedidoArtigoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/pedidos")
public class PedidoArtigoController {
    private final PedidoArtigoService pedidoArtigoService;

    @Autowired
    public PedidoArtigoController(PedidoArtigoService pedidoArtigoService) {
        this.pedidoArtigoService = pedidoArtigoService;
    }

    @PostMapping
    public PedidoArtigoDTO criarPedidoArtigo(@RequestBody PedidoArtigoDTO pedidoArtigoDTO) {
        return convertToDTO(pedidoArtigoService.criarPedidoArtigo(pedidoArtigoDTO));
    }

    @PutMapping("/{id}")
    public PedidoArtigoDTO atualizarPedidoArtigo(@PathVariable Long id, @RequestBody PedidoArtigoDTO pedidoArtigoDTO) {
        PedidoArtigo pedidoExistente = pedidoArtigoService.buscarPedidoArtigoPorId(id);

        if (pedidoExistente == null) {
            throw new ObjectNotFoundException("Pedido de artigo com ID " + id + " não encontrado");
        }

        pedidoExistente.setConteudo(pedidoArtigoDTO.getConteudo());

        PedidoArtigo pedidoAtualizado = pedidoArtigoService.salvarPedidoArtigo(pedidoExistente);

        return convertToDTO(pedidoAtualizado);
    }


    @DeleteMapping("/{id}")
    public void excluirPedidoArtigo(@PathVariable Long id) {
        pedidoArtigoService.excluirPedidoArtigo(id);
    }

    @GetMapping
    public List<PedidoArtigoDTO> listarPedidosArtigo() {
        return pedidoArtigoService.listarPedidosArtigo();
    }

    @GetMapping("/{clienteId}")
    public List<PedidoArtigoDTO> listarPedidosArtigoPorCliente(@PathVariable Long clienteId) {
        return pedidoArtigoService.listarPedidosArtigoPorCliente(clienteId);
    }

    private PedidoArtigoDTO convertToDTO(PedidoArtigo pedidoArtigo) {
        PedidoArtigoDTO pedidoArtigoDTO = new PedidoArtigoDTO();
        pedidoArtigoDTO.setId(pedidoArtigo.getId());
        pedidoArtigoDTO.setConteudo(pedidoArtigo.getConteudo());
        pedidoArtigoDTO.setClienteId(pedidoArtigo.getCliente() != null ? pedidoArtigo.getCliente().getId() : null);
        return pedidoArtigoDTO;
    }
}
