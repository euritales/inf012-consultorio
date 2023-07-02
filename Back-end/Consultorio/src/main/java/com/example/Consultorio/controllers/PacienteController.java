package com.example.Consultorio.controllers;

import com.example.Consultorio.dto.PacienteDTO;
import com.example.Consultorio.entities.PacienteEntity;
import com.example.Consultorio.services.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<PacienteEntity>> listarPacientes() {
        return ResponseEntity.ok(pacienteService.listarPacientes());
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Page<PacienteDTO>> listarPacientesPorPaginacao(@RequestParam(defaultValue = "0") int pagina) {
        Page<PacienteDTO> pacienteDTO = pacienteService.listarPacientesPorPaginacao(pagina);
        return ResponseEntity.ok(pacienteDTO);
    }

    @GetMapping("/ativos")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Page<PacienteDTO>> listarPacientesAtivos(@RequestParam(defaultValue = "0") int pagina) {
        Page<PacienteDTO> pacienteDTO = pacienteService.listarPacientesAtivos(pagina);
        return ResponseEntity.ok(pacienteDTO);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity cadastrarPaciente(@RequestBody PacienteEntity pacienteEntity) {
        PacienteDTO pacienteDTO = pacienteService.cadastrarPaciente(pacienteEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(pacienteDTO);
    }
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity atualizarPaciente(@PathVariable Long id, @RequestBody PacienteEntity pacienteEntity) {
        return ResponseEntity.ok(pacienteService.atualizarPaciente(id, pacienteEntity));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> excluirPaciente(@PathVariable Long id){
        pacienteService.softDeletePaciente(id);
        return ResponseEntity.noContent().build();
    }
}
