package com.example.Consultorio.services;

import com.example.Consultorio.dto.MedicoDTO;
import com.example.Consultorio.entities.MedicoEntity;
import com.example.Consultorio.repository.MedicoRepository;
import org.modelmapper.internal.util.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MedicoService {
    @Autowired
    private  MedicoRepository medicoRepository;


    public List<MedicoEntity> listarMedicos() {
        List<MedicoEntity> medicos = medicoRepository.findAll();
        return medicos;
    }
    public Page<MedicoDTO> listarMedicosPorPaginacao(int pagina) {
        Pageable pageable = PageRequest.of(pagina, 10, Sort.by("nome").ascending());
        Page<MedicoEntity> medicoPage = medicoRepository.findAllByOrderByNomeAsc(pageable);
        return medicoPage.map(MedicoDTO::fromEntity);
    }
    public Page<MedicoDTO> listarMedicosAtivos(int pagina) {
        Pageable pageable = PageRequest.of(pagina, 10, Sort.by("nome").ascending());
        Page<MedicoEntity> medicoPage = medicoRepository.findAllByStatusTrueOrderByNomeAsc(pageable);
        return medicoPage.map(MedicoDTO::fromEntity);
    }

    public MedicoDTO cadastrarMedico(MedicoEntity medicoEntity) {
        Assert.isNull(medicoEntity.getId(), "Não foi possivel salvar este registro");
        medicoEntity.setStatus(true); // Definir status como ativo por padrão
        System.out.println(medicoEntity);
        MedicoEntity medico = medicoRepository.save(medicoEntity);
        return MedicoDTO.fromEntity(medico);
    }
    public MedicoDTO atualizarMedico(Long id, MedicoEntity medicoEntity) {
        Assert.isNull(medicoEntity.getId(), "Não foi possivel salvar este registro");
        MedicoEntity medico = medicoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Médico não encontrado"));

        if (!medicoEntity.getEmail().equals(medico.getEmail()) ||
                !medicoEntity.getCrm().equals(medico.getCrm()) ||
                !medicoEntity.getEspecialidade().equals(medico.getEspecialidade())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Campos inválidos para atualização");
        }

        medico.setNome(medicoEntity.getNome());
        medico.setTelefone(medicoEntity.getTelefone());
        medico.setEndereco(medicoEntity.getEndereco());
        medicoRepository.save(medico);
        return null;
    }

    public void softDeleteMedico(Long id) {
       medicoRepository.findById(id).map(medicoAtual ->{
           medicoAtual.setStatus(false);
           medicoRepository.save(medicoAtual);
           return new ResponseStatusException(HttpStatus.OK);
       }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Medico não encontrado"));
    }


//    public MedicoDTO cadastrarMedico(MedicoDTO medicoDTO) {
//        MedicoEntity medico = medicoDTO.toEntity(medicoDTO);
//        System.out.println(medico.getEnderecoEntity());
//        medico.setStatus(true); // Definir status como ativo por padrão
//        MedicoEntity novoMedico = medicoRepository.save(medico);
//        System.out.println(novoMedico.getEnderecoEntity());
//        return medicoDTO.fromEntity(novoMedico);
//    }






//    public List<MedicoDTO> listarMedicos() {
//        return medicoRepository.findAll().stream()
//                .map(MedicoDTO::fromEntity)
//                .collect(Collectors.toList());
//    }


//    public MedicoDTO cadastrarMedico(MedicoDTO medicoDTO) {
//        MedicoEntity medicoEntity = MedicoDTO.fromEntity(medicoDTO);
//        MedicoEntity savedMedico = medicoRepository.save(medicoEntity);
//        return MedicoDTO.toDTO(savedMedico);
//    }
//
//
//
//    public MedicoDTO atualizarMedico(Long id, MedicoDTO medicoDTO) {
//        MedicoEntity medicoExistente = medicoRepository.findById(id)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Médico não encontrado"));
//
//        MedicoDTO.fromEntity(medicoDTO, medicoExistente);
//        MedicoEntity savedMedico = medicoRepository.save(medicoExistente);
//        return MedicoDTO.toDTO(savedMedico);
//    }
//
//    public void excluirMedico(Long id) {
//        MedicoEntity medicoExistente = medicoRepository.findById(id)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Médico não encontrado"));
//
//        medicoRepository.delete(medicoExistente);
//    }
}
