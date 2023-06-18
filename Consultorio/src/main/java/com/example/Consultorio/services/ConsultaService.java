package com.example.Consultorio.services;

import com.example.Consultorio.dto.ConsultaDTO;
import com.example.Consultorio.entities.ConsultaEntity;
import com.example.Consultorio.entities.MedicoEntity;
import com.example.Consultorio.entities.PacienteEntity;
import com.example.Consultorio.repository.ConsultaRepository;
import com.example.Consultorio.repository.MedicoRepository;
import com.example.Consultorio.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ConsultaService {
    @Autowired
    private ConsultaRepository consultaRepository;
    private MedicoRepository medicoRepository;
    private PacienteRepository pacienteRepository;


    public List<ConsultaEntity> listarConsultas() {
        List<ConsultaEntity> consultas = consultaRepository.findAll();
        return consultas;
    }

    public ConsultaDTO agendarConsulta(ConsultaEntity consultaEntity) {
        // Verificar se paciente e médico existem e estão ativos
        System.out.println("-------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- -------- ");

        System.out.println(consultaEntity.getPaciente());
        PacienteEntity paciente = pacienteRepository.findByIdAndStatusTrue(consultaEntity.getPaciente().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Paciente não encontrado ou inativo."));
        MedicoEntity medico = null;
        if (consultaEntity.getPaciente().getId() != null) {
            medico = medicoRepository.findByIdAndStatusTrue(consultaEntity.getMedico().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Médico não encontrado ou inativo."));
        }

        // Verificar se a data/hora está dentro do horário permitido
        LocalDateTime dataHora = consultaEntity.getDataHora();
        if (dataHora.getDayOfWeek() == DayOfWeek.SUNDAY || dataHora.getHour() < 7 || dataHora.getHour() >= 19) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A consulta deve ser agendada entre segunda e sábado, das 07:00 às 19:00.");
        }

        // Verificar se a data/hora está disponível para o médico
        if (medico != null && consultaRepository.existsByMedicoAndDataHora(medico, dataHora)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "O médico já possui uma consulta agendada na mesma data/hora.");
        }

        // Verificar se o paciente já possui uma consulta agendada no mesmo dia
        if (consultaRepository.existsByPacienteAndDataHoraBetween(paciente, dataHora.toLocalDate().atStartOfDay(), dataHora.toLocalDate().atTime(23, 59, 59))) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "O paciente já possui uma consulta agendada para o mesmo dia.");
        }

        // Criar a consulta e salvar no banco de dados
        ConsultaEntity consulta = new ConsultaEntity();
        consulta.setPaciente(paciente);
        consulta.setMedico(medico);
        consulta.setDataHora(dataHora);
        consulta.setStatus(true);
        ConsultaEntity consultaSalva = consultaRepository.save(consulta);

        return ConsultaDTO.fromEntity(consultaSalva);

    }

}
